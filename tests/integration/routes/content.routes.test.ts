/**
 * Integration Tests for Content Routes
 *
 * Tests the full request/response cycle for content endpoints
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import request from 'supertest';
import express from 'express';
import { contentRouter } from '../../../server/routes/content.routes';
import * as contentService from '../../../server/services/content.service';
import { errorHandler, notFoundHandler } from '../../../server/middleware/errorHandler';

// Mock the service
vi.mock('../../../server/services/content.service');

// Mock the logger
vi.mock('../../../server/config/logging', () => ({
  logger: {
    debug: vi.fn(),
    info: vi.fn(),
    warn: vi.fn(),
    error: vi.fn(),
  },
}));

describe('Content Routes Integration Tests', () => {
  let app: express.Express;

  beforeEach(() => {
    vi.clearAllMocks();

    // Create a fresh Express app for each test
    app = express();
    app.use(express.json());
    app.use('/api/content', contentRouter);
    app.use(notFoundHandler);
    app.use(errorHandler);
  });

  describe('GET /api/content/outreach-templates', () => {
    it('should return outreach templates with person data', async () => {
      const mockTemplates = [
        {
          template: {
            id: '1',
            personId: 'p1',
            subject: 'Annual Fund Ask 2026',
            body: 'Dear {firstName}, We appreciate your past support...',
            templateType: 'email',
            createdAt: new Date('2026-01-28'),
          },
          person: {
            id: 'p1',
            firstName: 'John',
            lastName: 'Donor',
            primaryEmail: 'john@example.com',
          },
        },
        {
          template: {
            id: '2',
            personId: 'p2',
            subject: 'Thank You Letter',
            body: 'Dear {firstName}, Thank you for your generous gift...',
            templateType: 'letter',
            createdAt: new Date('2026-01-27'),
          },
          person: {
            id: 'p2',
            firstName: 'Jane',
            lastName: 'Supporter',
            primaryEmail: 'jane@example.com',
          },
        },
      ];

      vi.mocked(contentService.getOutreachTemplates).mockResolvedValue(mockTemplates as any);

      const response = await request(app)
        .get('/api/content/outreach-templates')
        .expect(200);

      expect(response.body).toHaveLength(2);
      expect(response.body[0].template.subject).toBe('Annual Fund Ask 2026');
      expect(response.body[0].person.firstName).toBe('John');
      expect(contentService.getOutreachTemplates).toHaveBeenCalled();
    });

    it('should return empty array when no templates exist', async () => {
      vi.mocked(contentService.getOutreachTemplates).mockResolvedValue([]);

      const response = await request(app)
        .get('/api/content/outreach-templates')
        .expect(200);

      expect(response.body).toEqual([]);
    });

    it('should handle database errors gracefully', async () => {
      vi.mocked(contentService.getOutreachTemplates).mockRejectedValue(
        new Error('Database connection failed')
      );

      await request(app)
        .get('/api/content/outreach-templates')
        .expect(500);
    });
  });

  describe('GET /api/content/grant-proposals', () => {
    it('should return grant proposals with grant data', async () => {
      const mockProposals = [
        {
          proposal: {
            id: '1',
            grantId: 'g1',
            title: 'Community Program Funding 2026',
            narrative: 'Our community program has served over 5000 families...',
            askAmount: '100000',
            status: 'submitted',
            createdAt: new Date('2026-01-28'),
          },
          grant: {
            id: 'g1',
            grantName: 'Smith Family Foundation Grant',
            organization: 'Smith Family Foundation',
            deadline: new Date('2026-03-01'),
            amount: '100000',
          },
        },
      ];

      vi.mocked(contentService.getGrantProposals).mockResolvedValue(mockProposals as any);

      const response = await request(app)
        .get('/api/content/grant-proposals')
        .expect(200);

      expect(response.body).toHaveLength(1);
      expect(response.body[0].proposal.title).toBe('Community Program Funding 2026');
      expect(response.body[0].grant.grantName).toBe('Smith Family Foundation Grant');
      expect(contentService.getGrantProposals).toHaveBeenCalled();
    });

    it('should return empty array when no proposals exist', async () => {
      vi.mocked(contentService.getGrantProposals).mockResolvedValue([]);

      const response = await request(app)
        .get('/api/content/grant-proposals')
        .expect(200);

      expect(response.body).toEqual([]);
    });

    it('should handle service errors', async () => {
      vi.mocked(contentService.getGrantProposals).mockRejectedValue(
        new Error('Service unavailable')
      );

      await request(app)
        .get('/api/content/grant-proposals')
        .expect(500);
    });
  });

  describe('GET /api/content/impact-reports', () => {
    it('should return impact reports with person data', async () => {
      const mockReports = [
        {
          report: {
            id: '1',
            personId: 'p1',
            title: '2025 Annual Impact Report',
            summary: 'This year we served 5000 people across 12 programs...',
            metrics: { people_served: 5000, programs: 12, volunteers: 250 },
            reportType: 'annual',
            createdAt: new Date('2026-01-28'),
          },
          person: {
            id: 'p1',
            firstName: 'Sarah',
            lastName: 'Program Director',
            primaryEmail: 'sarah@example.com',
          },
        },
        {
          report: {
            id: '2',
            personId: 'p2',
            title: 'Q4 2025 Impact Update',
            summary: 'Fourth quarter highlights include 250 families served...',
            metrics: { families: 250, meals: 15000, volunteers: 45 },
            reportType: 'quarterly',
            createdAt: new Date('2026-01-15'),
          },
          person: {
            id: 'p2',
            firstName: 'Michael',
            lastName: 'Operations Manager',
            primaryEmail: 'michael@example.com',
          },
        },
      ];

      vi.mocked(contentService.getImpactReports).mockResolvedValue(mockReports as any);

      const response = await request(app)
        .get('/api/content/impact-reports')
        .expect(200);

      expect(response.body).toHaveLength(2);
      expect(response.body[0].report.title).toBe('2025 Annual Impact Report');
      expect(response.body[0].report.metrics).toHaveProperty('people_served');
      expect(response.body[0].person.firstName).toBe('Sarah');
      expect(contentService.getImpactReports).toHaveBeenCalled();
    });

    it('should return empty array when no reports exist', async () => {
      vi.mocked(contentService.getImpactReports).mockResolvedValue([]);

      const response = await request(app)
        .get('/api/content/impact-reports')
        .expect(200);

      expect(response.body).toEqual([]);
    });

    it('should handle database errors', async () => {
      vi.mocked(contentService.getImpactReports).mockRejectedValue(
        new Error('Database query failed')
      );

      await request(app)
        .get('/api/content/impact-reports')
        .expect(500);
    });
  });
});
