/**
 * Unit Tests for Analytics Service
 *
 * Tests business logic for analytics and reporting operations
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as analyticsService from '../../../server/services/analytics.service';
import { db } from '../../../server/db';

// Mock the database
vi.mock('../../../server/db', () => ({
  db: {
    select: vi.fn(),
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

describe('Analytics Service Unit Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getPeerBenchmarks', () => {
    it('should fetch peer benchmarks ordered by calculatedAt', async () => {
      const mockBenchmarks = [
        {
          id: '1',
          metric: 'avg_gift_size',
          value: '5000',
          percentile: 75,
          calculatedAt: new Date('2026-01-28'),
        },
        {
          id: '2',
          metric: 'donor_retention',
          value: '0.85',
          percentile: 80,
          calculatedAt: new Date('2026-01-27'),
        },
      ];

      const mockOrderBy = vi.fn().mockResolvedValue(mockBenchmarks);
      const mockFrom = vi.fn().mockReturnValue({ orderBy: mockOrderBy });
      vi.mocked(db.select).mockReturnValue({ from: mockFrom } as any);

      const result = await analyticsService.getPeerBenchmarks();

      expect(result).toEqual(mockBenchmarks);
      expect(db.select).toHaveBeenCalled();
      expect(mockFrom).toHaveBeenCalled();
      expect(mockOrderBy).toHaveBeenCalled();
    });

    it('should return empty array when no benchmarks exist', async () => {
      const mockOrderBy = vi.fn().mockResolvedValue([]);
      const mockFrom = vi.fn().mockReturnValue({ orderBy: mockOrderBy });
      vi.mocked(db.select).mockReturnValue({ from: mockFrom } as any);

      const result = await analyticsService.getPeerBenchmarks();

      expect(result).toEqual([]);
      expect(result).toHaveLength(0);
    });
  });

  describe('getSentimentAnalysis', () => {
    it('should fetch sentiment analysis with limit of 100', async () => {
      const mockSentiment = [
        {
          id: '1',
          personId: 'p1',
          sentiment: 'positive',
          score: 0.85,
          analysisDate: new Date('2026-01-28'),
        },
        {
          id: '2',
          personId: 'p2',
          sentiment: 'neutral',
          score: 0.50,
          analysisDate: new Date('2026-01-27'),
        },
      ];

      const mockLimit = vi.fn().mockResolvedValue(mockSentiment);
      const mockOrderBy = vi.fn().mockReturnValue({ limit: mockLimit });
      const mockFrom = vi.fn().mockReturnValue({ orderBy: mockOrderBy });
      vi.mocked(db.select).mockReturnValue({ from: mockFrom } as any);

      const result = await analyticsService.getSentimentAnalysis();

      expect(result).toEqual(mockSentiment);
      expect(mockLimit).toHaveBeenCalledWith(100);
    });

    it('should return empty array when no sentiment data exists', async () => {
      const mockLimit = vi.fn().mockResolvedValue([]);
      const mockOrderBy = vi.fn().mockReturnValue({ limit: mockLimit });
      const mockFrom = vi.fn().mockReturnValue({ orderBy: mockOrderBy });
      vi.mocked(db.select).mockReturnValue({ from: mockFrom } as any);

      const result = await analyticsService.getSentimentAnalysis();

      expect(result).toEqual([]);
    });
  });

  describe('getPortfolioOptimizations', () => {
    it('should fetch portfolio optimizations with limit of 10', async () => {
      const mockOptimizations = [
        {
          id: '1',
          recommendedAction: 'Increase major gifts focus',
          expectedImpact: '50000',
          priority: 'high',
          runDate: new Date('2026-01-28'),
        },
        {
          id: '2',
          recommendedAction: 'Expand annual fund',
          expectedImpact: '25000',
          priority: 'medium',
          runDate: new Date('2026-01-27'),
        },
      ];

      const mockLimit = vi.fn().mockResolvedValue(mockOptimizations);
      const mockOrderBy = vi.fn().mockReturnValue({ limit: mockLimit });
      const mockFrom = vi.fn().mockReturnValue({ orderBy: mockOrderBy });
      vi.mocked(db.select).mockReturnValue({ from: mockFrom } as any);

      const result = await analyticsService.getPortfolioOptimizations();

      expect(result).toEqual(mockOptimizations);
      expect(mockLimit).toHaveBeenCalledWith(10);
    });

    it('should return empty array when no optimizations exist', async () => {
      const mockLimit = vi.fn().mockResolvedValue([]);
      const mockOrderBy = vi.fn().mockReturnValue({ limit: mockLimit });
      const mockFrom = vi.fn().mockReturnValue({ orderBy: mockOrderBy });
      vi.mocked(db.select).mockReturnValue({ from: mockFrom } as any);

      const result = await analyticsService.getPortfolioOptimizations();

      expect(result).toEqual([]);
    });
  });
});
