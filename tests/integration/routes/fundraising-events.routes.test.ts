/**
 * Integration Tests for Fundraising Events Routes
 *
 * Tests the full request/response cycle for fundraising events endpoints
 * Uses real services but mocked database operations
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import request from 'supertest';
import express from 'express';
import { fundraisingEventsRouter } from '../../../server/routes/fundraising-events.routes';
import * as fundraisingEventsRepository from '../../../server/services/storage/fundraising-events.repository';
import { errorHandler, notFoundHandler } from '../../../server/middleware/errorHandler';

// Mock the repository
vi.mock('../../../server/services/storage/fundraising-events.repository');

// Mock the logger
vi.mock('../../../server/config/logging', () => ({
  logger: {
    debug: vi.fn(),
    info: vi.fn(),
    warn: vi.fn(),
    error: vi.fn(),
  },
}));

describe('Fundraising Events Routes Integration Tests', () => {
  let app: express.Express;

  beforeEach(() => {
    vi.clearAllMocks();

    // Create a fresh Express app for each test
    app = express();
    app.use(express.json());
    app.use('/api/fundraising-events', fundraisingEventsRouter);
    app.use(notFoundHandler);
    app.use(errorHandler);
  });

  describe('GET /api/fundraising-events', () => {
    it('should return all fundraising events', async () => {
      const mockEvents = [
        {
          id: '1',
          name: 'Annual Gala',
          eventType: 'gala',
          eventDate: new Date('2026-06-15T19:00:00'),
          venue: 'Grand Hotel',
          description: 'Annual fundraising gala',
          goalAmount: '100000.00',
          amountRaised: '75000.00',
          attendees: 200,
          sponsors: ['Sponsor A', 'Sponsor B'],
          status: 'upcoming',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: '2',
          name: 'Golf Tournament',
          eventType: 'golf',
          eventDate: new Date('2026-08-20T08:00:00'),
          venue: 'Country Club',
          description: 'Charity golf tournament',
          goalAmount: '50000.00',
          amountRaised: '45000.00',
          attendees: 80,
          sponsors: ['Sponsor C'],
          status: 'upcoming',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      vi.mocked(fundraisingEventsRepository.findFundraisingEvents).mockResolvedValue(mockEvents as any);

      const response = await request(app)
        .get('/api/fundraising-events')
        .expect(200);

      expect(response.body).toHaveLength(2);
      expect(response.body[0].name).toBe('Annual Gala');
      expect(response.body[0].eventType).toBe('gala');
      expect(response.body[1].name).toBe('Golf Tournament');
      expect(fundraisingEventsRepository.findFundraisingEvents).toHaveBeenCalledOnce();
    });

    it('should return empty array when no events exist', async () => {
      vi.mocked(fundraisingEventsRepository.findFundraisingEvents).mockResolvedValue([]);

      const response = await request(app)
        .get('/api/fundraising-events')
        .expect(200);

      expect(response.body).toEqual([]);
      expect(fundraisingEventsRepository.findFundraisingEvents).toHaveBeenCalledOnce();
    });

    it('should handle repository errors gracefully', async () => {
      vi.mocked(fundraisingEventsRepository.findFundraisingEvents).mockRejectedValue(
        new Error('Database connection failed')
      );

      await request(app)
        .get('/api/fundraising-events')
        .expect(500);
    });
  });
});
