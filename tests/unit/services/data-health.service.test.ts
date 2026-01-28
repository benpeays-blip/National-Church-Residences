/**
 * Unit Tests for Data Health Service
 *
 * Tests business logic for data quality and health monitoring
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as dataHealthService from '../../../server/services/data-health.service';
import { db } from '../../../server/db';

// Mock the database
vi.mock('../../../server/db', () => ({
  db: {
    select: vi.fn(),
    execute: vi.fn(),
  },
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

describe('Data Health Service Unit Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getDataHealthMetrics', () => {
    it('should calculate metrics for healthy data', async () => {
      // Mock persons data with complete profiles
      const mockPersons = [
        {
          id: '1',
          firstName: 'John',
          lastName: 'Doe',
          primaryEmail: 'john@example.com',
          primaryPhone: '555-1234',
          organizationName: 'Acme Corp',
          wealthBand: 'high',
        },
        {
          id: '2',
          firstName: 'Jane',
          lastName: 'Smith',
          primaryEmail: 'jane@example.com',
          primaryPhone: '555-5678',
          organizationName: 'Smith Foundation',
          wealthBand: 'medium',
        },
      ];

      const mockInteractions = [{ id: '1', occurredAt: new Date() }];
      const mockOpportunities = [];
      const mockDuplicates = { rows: [{ count: 0 }] };

      // Mock select chains for persons
      const mockFrom1 = vi.fn().mockResolvedValue(mockPersons);
      vi.mocked(db.select).mockReturnValueOnce({ from: mockFrom1 } as any);

      // Mock select chains for interactions
      const mockWhere = vi.fn().mockResolvedValue(mockInteractions);
      const mockFrom2 = vi.fn().mockReturnValue({ where: mockWhere });
      vi.mocked(db.select).mockReturnValueOnce({ from: mockFrom2 } as any);

      // Mock select chains for opportunities
      const mockWhere2 = vi.fn().mockResolvedValue(mockOpportunities);
      const mockFrom3 = vi.fn().mockReturnValue({ where: mockWhere2 });
      vi.mocked(db.select).mockReturnValueOnce({ from: mockFrom3 } as any);

      // Mock execute for duplicates
      vi.mocked(db.execute).mockResolvedValue(mockDuplicates as any);

      const result = await dataHealthService.getDataHealthMetrics();

      expect(result).toHaveProperty('metrics');
      expect(result).toHaveProperty('qualityChecks');
      expect(result).toHaveProperty('actionItems');
      expect(result.metrics.overallHealth).toBe(100);
      expect(result.metrics.profileCompleteness).toBe(100);
      expect(result.metrics.missingEmails).toBe(0);
      expect(result.metrics.dataFreshness).toBe('Good');
      expect(result.qualityChecks.emailValidation).toBe('Passing');
      expect(result.actionItems).toHaveLength(0);
    });

    it('should detect missing emails', async () => {
      const mockPersons = [
        {
          id: '1',
          firstName: 'John',
          lastName: 'Doe',
          primaryEmail: '',
          primaryPhone: '555-1234',
        },
        {
          id: '2',
          firstName: 'Jane',
          lastName: 'Smith',
          primaryEmail: null,
          primaryPhone: '555-5678',
        },
      ];

      const mockInteractions = [{ id: '1', occurredAt: new Date() }];
      const mockOpportunities = [];
      const mockDuplicates = { rows: [{ count: 0 }] };

      const mockFrom1 = vi.fn().mockResolvedValue(mockPersons);
      vi.mocked(db.select).mockReturnValueOnce({ from: mockFrom1 } as any);

      const mockWhere = vi.fn().mockResolvedValue(mockInteractions);
      const mockFrom2 = vi.fn().mockReturnValue({ where: mockWhere });
      vi.mocked(db.select).mockReturnValueOnce({ from: mockFrom2 } as any);

      const mockWhere2 = vi.fn().mockResolvedValue(mockOpportunities);
      const mockFrom3 = vi.fn().mockReturnValue({ where: mockWhere2 });
      vi.mocked(db.select).mockReturnValueOnce({ from: mockFrom3 } as any);

      vi.mocked(db.execute).mockResolvedValue(mockDuplicates as any);

      const result = await dataHealthService.getDataHealthMetrics();

      expect(result.metrics.missingEmails).toBe(2);
      expect(result.qualityChecks.emailValidation).toBe('Warning');
      expect(result.actionItems).toContainEqual(
        expect.objectContaining({
          id: 'missing-emails',
          title: expect.stringContaining('2 donors missing email'),
        })
      );
    });

    it('should detect incomplete profiles', async () => {
      const mockPersons = [
        {
          id: '1',
          firstName: 'John',
          lastName: 'Doe',
          primaryEmail: 'john@example.com',
          primaryPhone: '555-1234',
          organizationName: null,
          wealthBand: null,
        },
      ];

      const mockInteractions = [{ id: '1', occurredAt: new Date() }];
      const mockOpportunities = [];
      const mockDuplicates = { rows: [{ count: 0 }] };

      const mockFrom1 = vi.fn().mockResolvedValue(mockPersons);
      vi.mocked(db.select).mockReturnValueOnce({ from: mockFrom1 } as any);

      const mockWhere = vi.fn().mockResolvedValue(mockInteractions);
      const mockFrom2 = vi.fn().mockReturnValue({ where: mockWhere });
      vi.mocked(db.select).mockReturnValueOnce({ from: mockFrom2 } as any);

      const mockWhere2 = vi.fn().mockResolvedValue(mockOpportunities);
      const mockFrom3 = vi.fn().mockReturnValue({ where: mockWhere2 });
      vi.mocked(db.select).mockReturnValueOnce({ from: mockFrom3 } as any);

      vi.mocked(db.execute).mockResolvedValue(mockDuplicates as any);

      const result = await dataHealthService.getDataHealthMetrics();

      expect(result.metrics.profileCompleteness).toBe(0);
      expect(result.qualityChecks.addressCompleteness).toBe('Warning');
    });

    it('should detect unassigned opportunities', async () => {
      const mockPersons = [
        {
          id: '1',
          firstName: 'John',
          lastName: 'Doe',
          primaryEmail: 'john@example.com',
          primaryPhone: '555-1234',
          organizationName: 'Acme',
        },
      ];

      const mockInteractions = [{ id: '1', occurredAt: new Date() }];
      const mockOpportunities = [
        { id: 'opp1', name: 'Unassigned Opp', ownerId: null },
        { id: 'opp2', name: 'Another Unassigned', ownerId: '' },
      ];
      const mockDuplicates = { rows: [{ count: 0 }] };

      const mockFrom1 = vi.fn().mockResolvedValue(mockPersons);
      vi.mocked(db.select).mockReturnValueOnce({ from: mockFrom1 } as any);

      const mockWhere = vi.fn().mockResolvedValue(mockInteractions);
      const mockFrom2 = vi.fn().mockReturnValue({ where: mockWhere });
      vi.mocked(db.select).mockReturnValueOnce({ from: mockFrom2 } as any);

      const mockWhere2 = vi.fn().mockResolvedValue(mockOpportunities);
      const mockFrom3 = vi.fn().mockReturnValue({ where: mockWhere2 });
      vi.mocked(db.select).mockReturnValueOnce({ from: mockFrom3 } as any);

      vi.mocked(db.execute).mockResolvedValue(mockDuplicates as any);

      const result = await dataHealthService.getDataHealthMetrics();

      expect(result.actionItems).toContainEqual(
        expect.objectContaining({
          id: 'unassigned-opps',
          title: expect.stringContaining('2 opportunities without owners'),
        })
      );
    });

    it('should detect potential duplicates', async () => {
      const mockPersons = [
        {
          id: '1',
          firstName: 'John',
          lastName: 'Doe',
          primaryEmail: 'john@example.com',
          primaryPhone: '555-1234',
        },
      ];

      const mockInteractions = [{ id: '1', occurredAt: new Date() }];
      const mockOpportunities = [];
      const mockDuplicates = { rows: [{ count: 5 }] };

      const mockFrom1 = vi.fn().mockResolvedValue(mockPersons);
      vi.mocked(db.select).mockReturnValueOnce({ from: mockFrom1 } as any);

      const mockWhere = vi.fn().mockResolvedValue(mockInteractions);
      const mockFrom2 = vi.fn().mockReturnValue({ where: mockWhere });
      vi.mocked(db.select).mockReturnValueOnce({ from: mockFrom2 } as any);

      const mockWhere2 = vi.fn().mockResolvedValue(mockOpportunities);
      const mockFrom3 = vi.fn().mockReturnValue({ where: mockWhere2 });
      vi.mocked(db.select).mockReturnValueOnce({ from: mockFrom3 } as any);

      vi.mocked(db.execute).mockResolvedValue(mockDuplicates as any);

      const result = await dataHealthService.getDataHealthMetrics();

      expect(result.qualityChecks.duplicateDetection).toBe('Failing');
      expect(result.actionItems).toContainEqual(
        expect.objectContaining({
          id: 'duplicates',
          title: expect.stringContaining('5 potential duplicate records'),
        })
      );
    });

    it('should detect stale data when no recent interactions', async () => {
      const mockPersons = [
        {
          id: '1',
          firstName: 'John',
          lastName: 'Doe',
          primaryEmail: 'john@example.com',
        },
      ];

      const mockInteractions = []; // No recent interactions
      const mockOpportunities = [];
      const mockDuplicates = { rows: [{ count: 0 }] };

      const mockFrom1 = vi.fn().mockResolvedValue(mockPersons);
      vi.mocked(db.select).mockReturnValueOnce({ from: mockFrom1 } as any);

      const mockWhere = vi.fn().mockResolvedValue(mockInteractions);
      const mockFrom2 = vi.fn().mockReturnValue({ where: mockWhere });
      vi.mocked(db.select).mockReturnValueOnce({ from: mockFrom2 } as any);

      const mockWhere2 = vi.fn().mockResolvedValue(mockOpportunities);
      const mockFrom3 = vi.fn().mockReturnValue({ where: mockWhere2 });
      vi.mocked(db.select).mockReturnValueOnce({ from: mockFrom3 } as any);

      vi.mocked(db.execute).mockResolvedValue(mockDuplicates as any);

      const result = await dataHealthService.getDataHealthMetrics();

      expect(result.metrics.dataFreshness).toBe('Needs Attention');
    });

    it('should handle empty database gracefully', async () => {
      const mockPersons = [];
      const mockInteractions = [];
      const mockOpportunities = [];
      const mockDuplicates = { rows: [{ count: 0 }] };

      const mockFrom1 = vi.fn().mockResolvedValue(mockPersons);
      vi.mocked(db.select).mockReturnValueOnce({ from: mockFrom1 } as any);

      const mockWhere = vi.fn().mockResolvedValue(mockInteractions);
      const mockFrom2 = vi.fn().mockReturnValue({ where: mockWhere });
      vi.mocked(db.select).mockReturnValueOnce({ from: mockFrom2 } as any);

      const mockWhere2 = vi.fn().mockResolvedValue(mockOpportunities);
      const mockFrom3 = vi.fn().mockReturnValue({ where: mockWhere2 });
      vi.mocked(db.select).mockReturnValueOnce({ from: mockFrom3 } as any);

      vi.mocked(db.execute).mockResolvedValue(mockDuplicates as any);

      const result = await dataHealthService.getDataHealthMetrics();

      expect(result.metrics.overallHealth).toBe(100);
      expect(result.metrics.profileCompleteness).toBe(100);
      expect(result.actionItems).toHaveLength(0);
    });
  });
});
