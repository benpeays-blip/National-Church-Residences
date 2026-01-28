/**
 * Integration Tests for Health Routes
 *
 * Tests the full request/response cycle for health check endpoints
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import request from 'supertest';
import express from 'express';
import { healthRouter } from '../../../server/routes/health.routes';
import * as healthService from '../../../server/services/health.service';
import { errorHandler, notFoundHandler } from '../../../server/middleware/errorHandler';

// Mock the service
vi.mock('../../../server/services/health.service');

// Mock the logger
vi.mock('../../../server/config/logging', () => ({
  logger: {
    debug: vi.fn(),
    info: vi.fn(),
    warn: vi.fn(),
    error: vi.fn(),
  },
}));

describe('Health Routes Integration Tests', () => {
  let app: express.Express;

  beforeEach(() => {
    vi.clearAllMocks();

    // Create a fresh Express app for each test
    app = express();
    app.use(express.json());
    app.use('/health', healthRouter);
    app.use(notFoundHandler);
    app.use(errorHandler);
  });

  describe('GET /health', () => {
    it('should return 200 when system is healthy', async () => {
      const mockHealth = {
        status: 'healthy' as const,
        timestamp: new Date().toISOString(),
        uptime: 3600,
        version: '1.0.0',
        checks: {
          database: { status: 'up' as const, responseTime: 50 },
          storage: { status: 'up' as const, responseTime: 100 },
          memory: {
            status: 'up' as const,
            details: {
              heapUsed: '50MB',
              heapTotal: '100MB',
              rss: '150MB',
              heapPercentage: '50.0%',
            },
          },
        },
      };

      vi.mocked(healthService.getHealthStatus).mockResolvedValue(mockHealth);

      const response = await request(app)
        .get('/health')
        .expect(200);

      expect(response.body.status).toBe('healthy');
      expect(response.body.checks.database.status).toBe('up');
      expect(response.body.checks.storage.status).toBe('up');
      expect(response.body.checks.memory.status).toBe('up');
      expect(healthService.getHealthStatus).toHaveBeenCalled();
    });

    it('should return 200 when system is degraded', async () => {
      const mockHealth = {
        status: 'degraded' as const,
        timestamp: new Date().toISOString(),
        uptime: 3600,
        version: '1.0.0',
        checks: {
          database: { status: 'degraded' as const, responseTime: 1500, message: 'Database connection slow' },
          storage: { status: 'up' as const, responseTime: 100 },
          memory: {
            status: 'up' as const,
            details: {
              heapUsed: '50MB',
              heapTotal: '100MB',
              rss: '150MB',
              heapPercentage: '50.0%',
            },
          },
        },
      };

      vi.mocked(healthService.getHealthStatus).mockResolvedValue(mockHealth);

      const response = await request(app)
        .get('/health')
        .expect(200);

      expect(response.body.status).toBe('degraded');
      expect(response.body.checks.database.status).toBe('degraded');
    });

    it('should return 503 when system is unhealthy', async () => {
      const mockHealth = {
        status: 'unhealthy' as const,
        timestamp: new Date().toISOString(),
        uptime: 3600,
        version: '1.0.0',
        checks: {
          database: { status: 'down' as const, responseTime: 0, message: 'Connection refused' },
          storage: { status: 'up' as const, responseTime: 100 },
          memory: {
            status: 'up' as const,
            details: {
              heapUsed: '50MB',
              heapTotal: '100MB',
              rss: '150MB',
              heapPercentage: '50.0%',
            },
          },
        },
      };

      vi.mocked(healthService.getHealthStatus).mockResolvedValue(mockHealth);

      const response = await request(app)
        .get('/health')
        .expect(503);

      expect(response.body.status).toBe('unhealthy');
      expect(response.body.checks.database.status).toBe('down');
    });

    it('should include version and uptime', async () => {
      const mockHealth = {
        status: 'healthy' as const,
        timestamp: new Date().toISOString(),
        uptime: 7200,
        version: '2.0.0',
        checks: {
          database: { status: 'up' as const, responseTime: 50 },
          storage: { status: 'up' as const, responseTime: 100 },
          memory: {
            status: 'up' as const,
            details: {
              heapUsed: '50MB',
              heapTotal: '100MB',
              rss: '150MB',
              heapPercentage: '50.0%',
            },
          },
        },
      };

      vi.mocked(healthService.getHealthStatus).mockResolvedValue(mockHealth);

      const response = await request(app)
        .get('/health')
        .expect(200);

      expect(response.body.version).toBe('2.0.0');
      expect(response.body.uptime).toBe(7200);
      expect(response.body.timestamp).toBeDefined();
    });
  });

  describe('GET /health/live', () => {
    it('should return alive status', async () => {
      vi.mocked(healthService.getLiveness).mockResolvedValue({ status: 'alive' });

      const response = await request(app)
        .get('/health/live')
        .expect(200);

      expect(response.body.status).toBe('alive');
      expect(healthService.getLiveness).toHaveBeenCalled();
    });

    it('should always return 200 for liveness probe', async () => {
      vi.mocked(healthService.getLiveness).mockResolvedValue({ status: 'alive' });

      await request(app)
        .get('/health/live')
        .expect(200);
    });
  });

  describe('GET /health/ready', () => {
    it('should return 200 when ready', async () => {
      const mockReadiness = {
        status: 'ready' as const,
        checks: {
          database: { status: 'up' as const, responseTime: 50 },
        },
      };

      vi.mocked(healthService.getReadiness).mockResolvedValue(mockReadiness);

      const response = await request(app)
        .get('/health/ready')
        .expect(200);

      expect(response.body.status).toBe('ready');
      expect(response.body.checks.database.status).toBe('up');
      expect(healthService.getReadiness).toHaveBeenCalled();
    });

    it('should return 503 when not ready', async () => {
      const mockReadiness = {
        status: 'not_ready' as const,
        checks: {
          database: { status: 'down' as const, responseTime: 0, message: 'Database connection failed' },
        },
      };

      vi.mocked(healthService.getReadiness).mockResolvedValue(mockReadiness);

      const response = await request(app)
        .get('/health/ready')
        .expect(503);

      expect(response.body.status).toBe('not_ready');
      expect(response.body.checks.database.status).toBe('down');
    });

    it('should include database check in response', async () => {
      const mockReadiness = {
        status: 'ready' as const,
        checks: {
          database: { status: 'up' as const, responseTime: 75 },
        },
      };

      vi.mocked(healthService.getReadiness).mockResolvedValue(mockReadiness);

      const response = await request(app)
        .get('/health/ready')
        .expect(200);

      expect(response.body.checks).toHaveProperty('database');
      expect(response.body.checks.database.responseTime).toBe(75);
    });
  });
});
