/**
 * Integration Tests for Analytics Routes
 *
 * Tests the full request/response cycle for analytics endpoints
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import request from 'supertest';
import express from 'express';
import { analyticsRouter } from '../../../server/routes/analytics.routes';
import * as analyticsService from '../../../server/services/analytics.service';
import { errorHandler, notFoundHandler } from '../../../server/middleware/errorHandler';

// Mock the service
vi.mock('../../../server/services/analytics.service');

// Mock the logger
vi.mock('../../../server/config/logging', () => ({
  logger: {
    debug: vi.fn(),
    info: vi.fn(),
    warn: vi.fn(),
    error: vi.fn(),
  },
}));

describe('Analytics Routes Integration Tests', () => {
  let app: express.Express;

  beforeEach(() => {
    vi.clearAllMocks();

    // Create a fresh Express app for each test
    app = express();
    app.use(express.json());
    app.use('/api/analytics', analyticsRouter);
    app.use(notFoundHandler);
    app.use(errorHandler);
  });

  describe('GET /api/analytics/peer-benchmarks', () => {
    it('should return peer benchmarks', async () => {
      const mockBenchmarks = [
        {
          id: '1',
          metric: 'avg_gift_size',
          value: '5000',
          percentile: 75,
          organizationType: 'nonprofit',
          region: 'Midwest',
          calculatedAt: new Date('2026-01-28'),
        },
        {
          id: '2',
          metric: 'donor_retention',
          value: '0.85',
          percentile: 80,
          organizationType: 'nonprofit',
          region: 'Midwest',
          calculatedAt: new Date('2026-01-27'),
        },
      ];

      vi.mocked(analyticsService.getPeerBenchmarks).mockResolvedValue(mockBenchmarks as any);

      const response = await request(app)
        .get('/api/analytics/peer-benchmarks')
        .expect(200);

      expect(response.body).toHaveLength(2);
      expect(response.body[0].metric).toBe('avg_gift_size');
      expect(response.body[1].metric).toBe('donor_retention');
      expect(analyticsService.getPeerBenchmarks).toHaveBeenCalled();
    });

    it('should return empty array when no benchmarks exist', async () => {
      vi.mocked(analyticsService.getPeerBenchmarks).mockResolvedValue([]);

      const response = await request(app)
        .get('/api/analytics/peer-benchmarks')
        .expect(200);

      expect(response.body).toEqual([]);
    });

    it('should handle database errors gracefully', async () => {
      vi.mocked(analyticsService.getPeerBenchmarks).mockRejectedValue(
        new Error('Database connection failed')
      );

      await request(app)
        .get('/api/analytics/peer-benchmarks')
        .expect(500);
    });
  });

  describe('GET /api/analytics/sentiment', () => {
    it('should return sentiment analysis results', async () => {
      const mockSentiment = [
        {
          id: '1',
          personId: 'p1',
          sentiment: 'positive',
          score: 0.85,
          text: 'Great meeting with donor',
          analysisDate: new Date('2026-01-28'),
        },
        {
          id: '2',
          personId: 'p2',
          sentiment: 'neutral',
          score: 0.50,
          text: 'Follow-up needed',
          analysisDate: new Date('2026-01-27'),
        },
        {
          id: '3',
          personId: 'p3',
          sentiment: 'negative',
          score: 0.15,
          text: 'Concerns about project',
          analysisDate: new Date('2026-01-26'),
        },
      ];

      vi.mocked(analyticsService.getSentimentAnalysis).mockResolvedValue(mockSentiment as any);

      const response = await request(app)
        .get('/api/analytics/sentiment')
        .expect(200);

      expect(response.body).toHaveLength(3);
      expect(response.body[0].sentiment).toBe('positive');
      expect(response.body[1].sentiment).toBe('neutral');
      expect(response.body[2].sentiment).toBe('negative');
      expect(analyticsService.getSentimentAnalysis).toHaveBeenCalled();
    });

    it('should return empty array when no sentiment data exists', async () => {
      vi.mocked(analyticsService.getSentimentAnalysis).mockResolvedValue([]);

      const response = await request(app)
        .get('/api/analytics/sentiment')
        .expect(200);

      expect(response.body).toEqual([]);
    });

    it('should handle service errors', async () => {
      vi.mocked(analyticsService.getSentimentAnalysis).mockRejectedValue(
        new Error('Analysis service unavailable')
      );

      await request(app)
        .get('/api/analytics/sentiment')
        .expect(500);
    });
  });

  describe('GET /api/analytics/portfolio-optimization', () => {
    it('should return portfolio optimization recommendations', async () => {
      const mockOptimizations = [
        {
          id: '1',
          recommendedAction: 'Increase major gifts focus',
          rationale: 'High ROI opportunity identified',
          expectedImpact: '50000',
          confidence: 0.85,
          priority: 'high',
          runDate: new Date('2026-01-28'),
        },
        {
          id: '2',
          recommendedAction: 'Expand annual fund outreach',
          rationale: 'Untapped donor segment found',
          expectedImpact: '25000',
          confidence: 0.70,
          priority: 'medium',
          runDate: new Date('2026-01-27'),
        },
      ];

      vi.mocked(analyticsService.getPortfolioOptimizations).mockResolvedValue(mockOptimizations as any);

      const response = await request(app)
        .get('/api/analytics/portfolio-optimization')
        .expect(200);

      expect(response.body).toHaveLength(2);
      expect(response.body[0].priority).toBe('high');
      expect(response.body[0].expectedImpact).toBe('50000');
      expect(response.body[1].priority).toBe('medium');
      expect(analyticsService.getPortfolioOptimizations).toHaveBeenCalled();
    });

    it('should return empty array when no optimizations exist', async () => {
      vi.mocked(analyticsService.getPortfolioOptimizations).mockResolvedValue([]);

      const response = await request(app)
        .get('/api/analytics/portfolio-optimization')
        .expect(200);

      expect(response.body).toEqual([]);
    });

    it('should handle optimization engine errors', async () => {
      vi.mocked(analyticsService.getPortfolioOptimizations).mockRejectedValue(
        new Error('Optimization engine failed')
      );

      await request(app)
        .get('/api/analytics/portfolio-optimization')
        .expect(500);
    });
  });
});
