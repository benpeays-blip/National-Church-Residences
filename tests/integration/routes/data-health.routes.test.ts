/**
 * Integration Tests for Data Health Routes
 *
 * Tests the full request/response cycle for data health endpoints
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import request from 'supertest';
import express from 'express';
import { dataHealthRouter } from '../../../server/routes/data-health.routes';
import * as dataHealthService from '../../../server/services/data-health.service';
import { errorHandler, notFoundHandler } from '../../../server/middleware/errorHandler';

// Mock the service
vi.mock('../../../server/services/data-health.service');

// Mock the logger
vi.mock('../../../server/config/logging', () => ({
  logger: {
    debug: vi.fn(),
    info: vi.fn(),
    warn: vi.fn(),
    error: vi.fn(),
  },
}));

describe('Data Health Routes Integration Tests', () => {
  let app: express.Express;

  beforeEach(() => {
    vi.clearAllMocks();

    // Create a fresh Express app for each test
    app = express();
    app.use(express.json());
    app.use('/api/data-health', dataHealthRouter);
    app.use(notFoundHandler);
    app.use(errorHandler);
  });

  describe('GET /api/data-health', () => {
    it('should return comprehensive data health metrics', async () => {
      const mockMetrics = {
        metrics: {
          overallHealth: 85,
          profileCompleteness: 90,
          missingEmails: 5,
          dataFreshness: 'Good',
        },
        qualityChecks: {
          emailValidation: 'Passing',
          phoneFormatting: 'Warning',
          addressCompleteness: 'Passing',
          duplicateDetection: 'Passing',
        },
        actionItems: [
          {
            id: 'missing-emails',
            title: '5 donors missing email addresses',
            description: 'Update contact information to improve engagement',
          },
        ],
      };

      vi.mocked(dataHealthService.getDataHealthMetrics).mockResolvedValue(mockMetrics as any);

      const response = await request(app)
        .get('/api/data-health')
        .expect(200);

      expect(response.body).toHaveProperty('metrics');
      expect(response.body).toHaveProperty('qualityChecks');
      expect(response.body).toHaveProperty('actionItems');
      expect(response.body.metrics.overallHealth).toBe(85);
      expect(response.body.metrics.profileCompleteness).toBe(90);
      expect(response.body.qualityChecks.emailValidation).toBe('Passing');
      expect(response.body.actionItems).toHaveLength(1);
      expect(dataHealthService.getDataHealthMetrics).toHaveBeenCalled();
    });

    it('should return perfect health when no issues exist', async () => {
      const mockMetrics = {
        metrics: {
          overallHealth: 100,
          profileCompleteness: 100,
          missingEmails: 0,
          dataFreshness: 'Good',
        },
        qualityChecks: {
          emailValidation: 'Passing',
          phoneFormatting: 'Passing',
          addressCompleteness: 'Passing',
          duplicateDetection: 'Passing',
        },
        actionItems: [],
      };

      vi.mocked(dataHealthService.getDataHealthMetrics).mockResolvedValue(mockMetrics as any);

      const response = await request(app)
        .get('/api/data-health')
        .expect(200);

      expect(response.body.metrics.overallHealth).toBe(100);
      expect(response.body.actionItems).toHaveLength(0);
    });

    it('should return low health score with multiple issues', async () => {
      const mockMetrics = {
        metrics: {
          overallHealth: 45,
          profileCompleteness: 50,
          missingEmails: 25,
          dataFreshness: 'Needs Attention',
        },
        qualityChecks: {
          emailValidation: 'Failing',
          phoneFormatting: 'Failing',
          addressCompleteness: 'Warning',
          duplicateDetection: 'Failing',
        },
        actionItems: [
          {
            id: 'missing-emails',
            title: '25 donors missing email addresses',
            description: 'Update contact information to improve engagement',
          },
          {
            id: 'unassigned-opps',
            title: '15 opportunities without owners',
            description: 'Assign portfolio managers to track these prospects',
          },
          {
            id: 'duplicates',
            title: '10 potential duplicate records detected',
            description: 'Review and merge duplicate donor profiles',
          },
        ],
      };

      vi.mocked(dataHealthService.getDataHealthMetrics).mockResolvedValue(mockMetrics as any);

      const response = await request(app)
        .get('/api/data-health')
        .expect(200);

      expect(response.body.metrics.overallHealth).toBe(45);
      expect(response.body.metrics.dataFreshness).toBe('Needs Attention');
      expect(response.body.qualityChecks.emailValidation).toBe('Failing');
      expect(response.body.actionItems).toHaveLength(3);
    });

    it('should handle database errors gracefully', async () => {
      vi.mocked(dataHealthService.getDataHealthMetrics).mockRejectedValue(
        new Error('Database connection failed')
      );

      await request(app)
        .get('/api/data-health')
        .expect(500);
    });

    it('should handle calculation errors gracefully', async () => {
      vi.mocked(dataHealthService.getDataHealthMetrics).mockRejectedValue(
        new Error('Metrics calculation failed')
      );

      await request(app)
        .get('/api/data-health')
        .expect(500);
    });
  });
});
