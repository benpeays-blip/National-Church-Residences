/**
 * Integration Tests for Gifts Routes
 *
 * Tests the full request/response cycle for gift/donation endpoints
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import request from 'supertest';
import express from 'express';
import { giftsRouter } from '../../../server/routes/gifts.routes';
import * as giftsRepo from '../../../server/services/storage/gifts.repository';
import { errorHandler, notFoundHandler } from '../../../server/middleware/errorHandler';

// Mock the repository
vi.mock('../../../server/services/storage/gifts.repository');

// Mock the logger
vi.mock('../../../server/config/logging', () => ({
  logger: {
    debug: vi.fn(),
    info: vi.fn(),
    warn: vi.fn(),
    error: vi.fn(),
  },
}));

// Mock authentication middleware
vi.mock('../../../server/middleware/auth', () => ({
  isAuthenticated: (req: any, res: any, next: any) => next(),
}));

describe('Gifts Routes Integration Tests', () => {
  let app: express.Express;

  beforeEach(() => {
    vi.clearAllMocks();

    // Create a fresh Express app for each test
    app = express();
    app.use(express.json());
    app.use('/api/gifts', giftsRouter);
    app.use(notFoundHandler);
    app.use(errorHandler);
  });

  describe('GET /api/gifts', () => {
    it('should return all gifts without filter', async () => {
      const mockGifts = [
        {
          id: '1',
          personId: 'p1',
          amount: 1000,
          receivedAt: new Date('2026-01-01'),
          giftType: 'one_time',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: '2',
          personId: 'p2',
          amount: 500,
          receivedAt: new Date('2026-01-05'),
          giftType: 'recurring',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      vi.mocked(giftsRepo.findGifts).mockResolvedValue(mockGifts as any);

      const response = await request(app)
        .get('/api/gifts')
        .expect(200);

      expect(response.body).toHaveLength(2);
      expect(response.body[0].amount).toBe(1000);
      expect(giftsRepo.findGifts).toHaveBeenCalledWith(undefined);
    });

    it('should return filtered gifts by personId', async () => {
      const mockGifts = [
        {
          id: '1',
          personId: 'p1',
          amount: 1000,
          receivedAt: new Date('2026-01-01'),
          giftType: 'one_time',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      vi.mocked(giftsRepo.findGifts).mockResolvedValue(mockGifts as any);

      const response = await request(app)
        .get('/api/gifts?personId=p1')
        .expect(200);

      expect(response.body).toHaveLength(1);
      expect(response.body[0].personId).toBe('p1');
      expect(giftsRepo.findGifts).toHaveBeenCalledWith('p1');
    });
  });

  describe('GET /api/gifts/:id', () => {
    it('should return a single gift', async () => {
      const mockGift = {
        id: '1',
        personId: 'p1',
        amount: 1000,
        receivedAt: new Date('2026-01-01'),
        giftType: 'major',
        campaign: 'Annual Fund',
        notes: 'Thank you donation',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      vi.mocked(giftsRepo.findGiftById).mockResolvedValue(mockGift as any);

      const response = await request(app)
        .get('/api/gifts/1')
        .expect(200);

      expect(response.body.id).toBe('1');
      expect(response.body.amount).toBe(1000);
      expect(response.body.campaign).toBe('Annual Fund');
      expect(giftsRepo.findGiftById).toHaveBeenCalledWith('1');
    });

    it('should return 404 when gift not found', async () => {
      vi.mocked(giftsRepo.findGiftById).mockResolvedValue(null);

      const response = await request(app)
        .get('/api/gifts/nonexistent')
        .expect(404);

      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toContain('not found');
    });
  });

  describe('POST /api/gifts', () => {
    it('should create a new gift', async () => {
      const newGiftData = {
        personId: 'p1',
        amount: '2500',
        receivedAt: '2026-01-10',
        giftType: 'one_time',
        campaign: 'Capital Campaign',
      };

      const createdGift = {
        ...newGiftData,
        id: 'new-id',
        receivedAt: new Date('2026-01-10'),
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      vi.mocked(giftsRepo.createGift).mockResolvedValue(createdGift as any);

      const response = await request(app)
        .post('/api/gifts')
        .send(newGiftData)
        .expect(201);

      expect(response.body.id).toBe('new-id');
      expect(response.body.amount).toBe('2500');
      expect(response.body.campaign).toBe('Capital Campaign');
      expect(giftsRepo.createGift).toHaveBeenCalled();
    });

    it('should return 400 when personId is missing', async () => {
      const invalidData = {
        amount: 1000,
        receivedAt: '2026-01-10',
        giftType: 'one_time',
        // personId is missing
      };

      const response = await request(app)
        .post('/api/gifts')
        .send(invalidData)
        .expect(400);

      expect(response.body).toHaveProperty('message');
    });

    it('should return 400 when amount is missing', async () => {
      const invalidData = {
        personId: 'p1',
        receivedAt: '2026-01-10',
        giftType: 'one_time',
        // amount is missing
      };

      const response = await request(app)
        .post('/api/gifts')
        .send(invalidData)
        .expect(400);

      expect(response.body).toHaveProperty('message');
    });

    it('should return 400 when amount is negative', async () => {
      const invalidData = {
        personId: 'p1',
        amount: -100,
        receivedAt: '2026-01-10',
        giftType: 'one_time',
      };

      const response = await request(app)
        .post('/api/gifts')
        .send(invalidData)
        .expect(400);

      expect(response.body).toHaveProperty('message');
    });

    it('should return 400 when giftType is invalid', async () => {
      const invalidData = {
        personId: 'p1',
        amount: 1000,
        receivedAt: '2026-01-10',
        giftType: 'invalid_type',
      };

      const response = await request(app)
        .post('/api/gifts')
        .send(invalidData)
        .expect(400);

      expect(response.body).toHaveProperty('message');
    });
  });

  describe('PATCH /api/gifts/:id', () => {
    it('should update an existing gift', async () => {
      const updateData = {
        amount: '3000',
        notes: 'Updated donation amount',
      };

      const existingGift = {
        id: '1',
        personId: 'p1',
        amount: '2000',
        receivedAt: new Date('2026-01-01'),
        giftType: 'one_time',
      };

      const updatedGift = {
        id: '1',
        personId: 'p1',
        amount: '3000',
        receivedAt: new Date('2026-01-01'),
        giftType: 'one_time',
        notes: 'Updated donation amount',
        updatedAt: new Date(),
      };

      vi.mocked(giftsRepo.findGiftById).mockResolvedValue(existingGift as any);
      vi.mocked(giftsRepo.updateGift).mockResolvedValue(updatedGift as any);

      const response = await request(app)
        .patch('/api/gifts/1')
        .send(updateData)
        .expect(200);

      expect(response.body.amount).toBe('3000');
      expect(response.body.notes).toBe('Updated donation amount');
      expect(giftsRepo.updateGift).toHaveBeenCalled();
    });

    it('should return 404 when updating non-existent gift', async () => {
      vi.mocked(giftsRepo.updateGift).mockResolvedValue(undefined);

      const response = await request(app)
        .patch('/api/gifts/nonexistent')
        .send({ amount: '2000' })
        .expect(404);

      expect(response.body).toHaveProperty('message');
    });

    it('should return 400 when updating with negative amount', async () => {
      const response = await request(app)
        .patch('/api/gifts/1')
        .send({ amount: '-500' })
        .expect(400);

      expect(response.body).toHaveProperty('message');
    });
  });

  describe('DELETE /api/gifts/:id', () => {
    it('should delete a gift', async () => {
      const existingGift = {
        id: '1',
        personId: 'p1',
        amount: '1000',
        receivedAt: new Date('2026-01-01'),
        giftType: 'one_time',
      };

      vi.mocked(giftsRepo.findGiftById).mockResolvedValue(existingGift as any);
      vi.mocked(giftsRepo.deleteGift).mockResolvedValue(existingGift as any);

      const response = await request(app)
        .delete('/api/gifts/1')
        .expect(200);

      expect(response.body.id).toBe('1');
      expect(giftsRepo.deleteGift).toHaveBeenCalledWith('1');
    });

    it('should return 404 when deleting non-existent gift', async () => {
      vi.mocked(giftsRepo.deleteGift).mockResolvedValue(undefined);

      const response = await request(app)
        .delete('/api/gifts/nonexistent')
        .expect(404);

      expect(response.body).toHaveProperty('message');
    });
  });
});
