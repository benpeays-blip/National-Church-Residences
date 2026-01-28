/**
 * Unit Tests for Health Service
 *
 * Tests business logic for health check operations
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as healthService from '../../../server/services/health.service';
import { db } from '../../../server/db';
import * as fileStorageFactory from '../../../server/services/storage/fileStorageFactory';

// Mock the database
vi.mock('../../../server/db', () => ({
  db: {
    execute: vi.fn(),
  },
}));

// Mock the file storage factory
vi.mock('../../../server/services/storage/fileStorageFactory', () => ({
  getFileStorage: vi.fn(),
}));

// Mock the logger
vi.mock('../../../server/config/logging', () => ({
  logger: {
    debug: vi.fn(),
    info: vi.fn(),
    warn: vi.fn(),
    error: vi.fn(),
  },
}));

describe('Health Service Unit Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getHealthStatus', () => {
    it('should return healthy status when all checks pass', async () => {
      // Mock successful database query
      vi.mocked(db.execute).mockResolvedValue({} as any);

      // Mock successful storage check
      const mockStorage = {
        list: vi.fn().mockResolvedValue([]),
      };
      vi.mocked(fileStorageFactory.getFileStorage).mockReturnValue(mockStorage as any);

      const result = await healthService.getHealthStatus();

      expect(result.status).toBe('healthy');
      expect(result.checks.database.status).toBe('up');
      expect(result.checks.storage.status).toBe('up');
      expect(result.checks.memory.status).toBe('up');
      expect(result).toHaveProperty('timestamp');
      expect(result).toHaveProperty('uptime');
      expect(result).toHaveProperty('version');
    });

    it('should return unhealthy status when database is down', async () => {
      // Mock failed database query
      vi.mocked(db.execute).mockRejectedValue(new Error('Connection refused'));

      // Mock successful storage check
      const mockStorage = {
        list: vi.fn().mockResolvedValue([]),
      };
      vi.mocked(fileStorageFactory.getFileStorage).mockReturnValue(mockStorage as any);

      const result = await healthService.getHealthStatus();

      expect(result.status).toBe('unhealthy');
      expect(result.checks.database.status).toBe('down');
      expect(result.checks.database.message).toContain('Connection refused');
    });

    it('should return unhealthy status when storage is down', async () => {
      // Mock successful database query
      vi.mocked(db.execute).mockResolvedValue({} as any);

      // Mock failed storage check
      const mockStorage = {
        list: vi.fn().mockRejectedValue(new Error('Storage unavailable')),
      };
      vi.mocked(fileStorageFactory.getFileStorage).mockReturnValue(mockStorage as any);

      const result = await healthService.getHealthStatus();

      expect(result.status).toBe('unhealthy');
      expect(result.checks.storage.status).toBe('down');
      expect(result.checks.storage.message).toContain('Storage unavailable');
    });

    it('should return degraded status when database is slow', async () => {
      // Mock slow database query (>1 second)
      vi.mocked(db.execute).mockImplementation(
        () => new Promise((resolve) => setTimeout(resolve, 1100))
      );

      // Mock successful storage check
      const mockStorage = {
        list: vi.fn().mockResolvedValue([]),
      };
      vi.mocked(fileStorageFactory.getFileStorage).mockReturnValue(mockStorage as any);

      const result = await healthService.getHealthStatus();

      expect(result.status).toBe('degraded');
      expect(result.checks.database.status).toBe('degraded');
      expect(result.checks.database.message).toContain('slow');
      expect(result.checks.database.responseTime).toBeGreaterThan(1000);
    });

    it('should return degraded status when storage is slow', async () => {
      // Mock successful database query
      vi.mocked(db.execute).mockResolvedValue({} as any);

      // Mock slow storage check (>2 seconds)
      const mockStorage = {
        list: vi.fn().mockImplementation(
          () => new Promise((resolve) => setTimeout(() => resolve([]), 2100))
        ),
      };
      vi.mocked(fileStorageFactory.getFileStorage).mockReturnValue(mockStorage as any);

      const result = await healthService.getHealthStatus();

      expect(result.status).toBe('degraded');
      expect(result.checks.storage.status).toBe('degraded');
      expect(result.checks.storage.message).toContain('slow');
      expect(result.checks.storage.responseTime).toBeGreaterThan(2000);
    });

    it('should include response times in health checks', async () => {
      // Mock successful database query
      vi.mocked(db.execute).mockResolvedValue({} as any);

      // Mock successful storage check
      const mockStorage = {
        list: vi.fn().mockResolvedValue([]),
      };
      vi.mocked(fileStorageFactory.getFileStorage).mockReturnValue(mockStorage as any);

      const result = await healthService.getHealthStatus();

      expect(result.checks.database.responseTime).toBeDefined();
      expect(result.checks.database.responseTime).toBeGreaterThanOrEqual(0);
      expect(result.checks.storage.responseTime).toBeDefined();
      expect(result.checks.storage.responseTime).toBeGreaterThanOrEqual(0);
    });

    it('should include memory details in checks', async () => {
      // Mock successful database query
      vi.mocked(db.execute).mockResolvedValue({} as any);

      // Mock successful storage check
      const mockStorage = {
        list: vi.fn().mockResolvedValue([]),
      };
      vi.mocked(fileStorageFactory.getFileStorage).mockReturnValue(mockStorage as any);

      const result = await healthService.getHealthStatus();

      expect(result.checks.memory.details).toBeDefined();
      expect(result.checks.memory.details).toHaveProperty('heapUsed');
      expect(result.checks.memory.details).toHaveProperty('heapTotal');
      expect(result.checks.memory.details).toHaveProperty('rss');
      expect(result.checks.memory.details).toHaveProperty('heapPercentage');
    });
  });

  describe('getLiveness', () => {
    it('should return alive status', async () => {
      const result = await healthService.getLiveness();

      expect(result).toEqual({ status: 'alive' });
    });
  });

  describe('getReadiness', () => {
    it('should return ready status when database is up', async () => {
      // Mock successful database query
      vi.mocked(db.execute).mockResolvedValue({} as any);

      const result = await healthService.getReadiness();

      expect(result.status).toBe('ready');
      expect(result.checks.database.status).toBe('up');
    });

    it('should return not_ready status when database is down', async () => {
      // Mock failed database query
      vi.mocked(db.execute).mockRejectedValue(new Error('Database error'));

      const result = await healthService.getReadiness();

      expect(result.status).toBe('not_ready');
      expect(result.checks.database.status).toBe('down');
    });

    it('should include database response time', async () => {
      // Mock successful database query
      vi.mocked(db.execute).mockResolvedValue({} as any);

      const result = await healthService.getReadiness();

      expect(result.checks.database.responseTime).toBeDefined();
      expect(result.checks.database.responseTime).toBeGreaterThanOrEqual(0);
    });
  });
});
