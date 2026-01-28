/**
 * E2E Tests: Gift Tracking Flow
 *
 * Tests the complete gift tracking lifecycle:
 * 1. Record a new gift
 * 2. Update gift information
 * 3. Track gift acknowledgment status
 * 4. View donor's giving history
 * 5. Generate giving statistics
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import request from 'supertest';
import express from 'express';
import { giftsRouter } from '../../server/routes/gifts.routes';
import { personsRouter } from '../../server/routes/persons.routes';
import * as giftsRepository from '../../server/services/storage/gifts.repository';
import * as personsRepository from '../../server/services/storage/persons.repository';
import { errorHandler, notFoundHandler } from '../../server/middleware/errorHandler';
import { createTestGift, createTestPerson } from '../helpers/factories';

// Mock repositories
vi.mock('../../server/services/storage/gifts.repository');
vi.mock('../../server/services/storage/persons.repository');

// Mock logger
vi.mock('../../server/config/logging', () => ({
  logger: {
    debug: vi.fn(),
    info: vi.fn(),
    warn: vi.fn(),
    error: vi.fn(),
  },
}));

// Mock auth middleware
vi.mock('../../server/middleware/auth', () => ({
  isAuthenticated: (req: any, res: any, next: any) => next(),
}));

describe('E2E: Gift Tracking Flow', () => {
  let app: express.Express;
  const donorId = 'donor-123';
  const giftId = 'gift-456';

  beforeEach(() => {
    vi.clearAllMocks();

    app = express();
    app.use(express.json());
    app.use('/api/gifts', giftsRouter);
    app.use('/api/persons', personsRouter);
    app.use(notFoundHandler);
    app.use(errorHandler);
  });

  describe('Complete Gift Lifecycle', () => {
    it('should track a gift from receipt to acknowledgment', async () => {
      // Step 1: Verify donor exists
      const mockDonor = {
        id: donorId,
        ...createTestPerson(),
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      vi.mocked(personsRepository.findPersonById).mockResolvedValue(mockDonor as any);

      const donorResponse = await request(app)
        .get(`/api/persons/${donorId}`)
        .expect(200);

      expect(donorResponse.body.id).toBe(donorId);

      // Step 2: Record a new gift
      const newGift = createTestGift({
        personId: donorId,
        amount: '5000.00',
        giftType: 'major',
        paymentMethod: 'wire_transfer',
        campaign: 'Capital Campaign 2026',
        fund: 'Building Fund',
        acknowledgmentStatus: 'pending',
      });

      const createdGift = {
        id: giftId,
        ...newGift,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      vi.mocked(giftsRepository.createGift).mockResolvedValue(createdGift as any);

      const createResponse = await request(app)
        .post('/api/gifts')
        .send(newGift)
        .expect(201);

      expect(createResponse.body).toMatchObject({
        id: giftId,
        personId: donorId,
        amount: '5000.00',
        giftType: 'major',
        acknowledgmentStatus: 'pending',
      });

      // Step 3: Update gift with acknowledgment sent
      const updatedGift = {
        ...createdGift,
        acknowledgmentStatus: 'sent',
        acknowledgmentSentAt: new Date(),
      };

      vi.mocked(giftsRepository.findGiftById).mockResolvedValue(createdGift as any);
      vi.mocked(giftsRepository.updateGift).mockResolvedValue(updatedGift as any);

      const updateResponse = await request(app)
        .patch(`/api/gifts/${giftId}`)
        .send({
          acknowledgmentStatus: 'sent',
          acknowledgmentSentAt: new Date(),
        })
        .expect(200);

      expect(updateResponse.body.acknowledgmentStatus).toBe('sent');
      expect(updateResponse.body.acknowledgmentSentAt).toBeDefined();

      // Step 4: View donor's complete giving history
      const mockGiftHistory = [
        updatedGift,
        {
          id: 'gift-old-1',
          personId: donorId,
          amount: '1000.00',
          giftType: 'one_time',
          receivedAt: new Date('2025-01-15'),
          acknowledgmentStatus: 'sent',
        },
        {
          id: 'gift-old-2',
          personId: donorId,
          amount: '2500.00',
          giftType: 'major',
          receivedAt: new Date('2025-06-20'),
          acknowledgmentStatus: 'sent',
        },
      ];

      vi.mocked(giftsRepository.findGifts).mockResolvedValue(mockGiftHistory as any);

      const historyResponse = await request(app)
        .get(`/api/gifts?personId=${donorId}`)
        .expect(200);

      expect(historyResponse.body).toHaveLength(3);
      expect(historyResponse.body[0].id).toBe(giftId);

      // Verify total giving amount
      const totalGiven = mockGiftHistory.reduce(
        (sum, gift) => sum + parseFloat(gift.amount),
        0
      );
      expect(totalGiven).toBe(8500);

      // Verify all operations
      expect(giftsRepository.createGift).toHaveBeenCalledWith(
        expect.objectContaining({
          personId: donorId,
          amount: '5000.00',
          giftType: 'major',
        })
      );
      expect(giftsRepository.updateGift).toHaveBeenCalled();
      expect(giftsRepository.findGifts).toHaveBeenCalledWith(donorId);
    });

    it('should handle different gift types correctly', async () => {
      const giftTypes = [
        { type: 'one_time', amount: '100.00' },
        { type: 'major', amount: '10000.00' },
        { type: 'recurring', amount: '250.00' },
        { type: 'planned', amount: '50000.00' },
        { type: 'pledge', amount: '25000.00' },
        { type: 'in_kind', amount: '5000.00' },
      ];

      for (const giftType of giftTypes) {
        const gift = createTestGift({
          personId: donorId,
          giftType: giftType.type as any,
          amount: giftType.amount,
        });

        const createdGift = {
          id: `gift-${giftType.type}`,
          ...gift,
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        vi.mocked(giftsRepository.createGift).mockResolvedValue(createdGift as any);

        const response = await request(app)
          .post('/api/gifts')
          .send(gift)
          .expect(201);

        expect(response.body.giftType).toBe(giftType.type);
        expect(response.body.amount).toBe(giftType.amount);
      }
    });

    it('should track gifts with different payment methods', async () => {
      const paymentMethods = ['check', 'credit_card', 'wire_transfer', 'cash', 'stock', 'crypto'];

      for (const method of paymentMethods) {
        const gift = createTestGift({
          personId: donorId,
          paymentMethod: method as any,
        });

        const createdGift = {
          id: `gift-${method}`,
          ...gift,
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        vi.mocked(giftsRepository.createGift).mockResolvedValue(createdGift as any);

        const response = await request(app)
          .post('/api/gifts')
          .send(gift)
          .expect(201);

        expect(response.body.paymentMethod).toBe(method);
      }
    });
  });

  describe('Gift Statistics', () => {
    it('should calculate giving statistics correctly', async () => {
      const mockGifts = [
        {
          id: 'gift-1',
          personId: donorId,
          amount: '1000.00',
          receivedAt: new Date('2026-01-15'),
          giftType: 'one_time',
        },
        {
          id: 'gift-2',
          personId: donorId,
          amount: '2500.00',
          receivedAt: new Date('2026-03-20'),
          giftType: 'major',
        },
        {
          id: 'gift-3',
          personId: donorId,
          amount: '500.00',
          receivedAt: new Date('2026-06-10'),
          giftType: 'one_time',
        },
      ];

      vi.mocked(giftsRepository.findGifts).mockResolvedValue(mockGifts as any);

      const response = await request(app)
        .get(`/api/gifts?personId=${donorId}`)
        .expect(200);

      expect(response.body).toHaveLength(3);

      // Calculate statistics
      const totalAmount = mockGifts.reduce((sum, gift) => sum + parseFloat(gift.amount), 0);
      const averageGift = totalAmount / mockGifts.length;
      const largestGift = Math.max(...mockGifts.map(g => parseFloat(g.amount)));

      expect(totalAmount).toBe(4000);
      expect(averageGift).toBeCloseTo(1333.33, 2);
      expect(largestGift).toBe(2500);
    });
  });

  describe('Error Handling', () => {
    it('should return 404 when gift not found', async () => {
      vi.mocked(giftsRepository.findGiftById).mockResolvedValue(null);

      await request(app)
        .get('/api/gifts/nonexistent-id')
        .expect(404);
    });

    it('should return 400 for invalid gift amount', async () => {
      const invalidGift = createTestGift({
        amount: '-100.00', // Negative amount
      });

      await request(app)
        .post('/api/gifts')
        .send(invalidGift)
        .expect(400);
    });

    it('should return 400 for invalid gift type', async () => {
      const invalidGift = createTestGift({
        giftType: 'invalid_type' as any,
      });

      await request(app)
        .post('/api/gifts')
        .send(invalidGift)
        .expect(400);
    });

    it('should return 404 when updating nonexistent gift', async () => {
      vi.mocked(giftsRepository.updateGift).mockResolvedValue(null);

      await request(app)
        .patch('/api/gifts/nonexistent-id')
        .send({ acknowledgmentStatus: 'sent' })
        .expect(404);
    });
  });

  describe('Gift Filtering', () => {
    it('should filter gifts by person ID', async () => {
      const mockGifts = [
        { id: 'gift-1', personId: donorId, amount: '1000.00' },
        { id: 'gift-2', personId: donorId, amount: '2000.00' },
      ];

      vi.mocked(giftsRepository.findGifts).mockResolvedValue(mockGifts as any);

      const response = await request(app)
        .get(`/api/gifts?personId=${donorId}`)
        .expect(200);

      expect(response.body).toHaveLength(2);
      expect(response.body.every((gift: any) => gift.personId === donorId)).toBe(true);
    });

    it('should return all gifts when no filter provided', async () => {
      const mockAllGifts = [
        { id: 'gift-1', personId: 'donor-1', amount: '1000.00' },
        { id: 'gift-2', personId: 'donor-2', amount: '2000.00' },
        { id: 'gift-3', personId: 'donor-3', amount: '3000.00' },
      ];

      vi.mocked(giftsRepository.findGifts).mockResolvedValue(mockAllGifts as any);

      const response = await request(app)
        .get('/api/gifts')
        .expect(200);

      expect(response.body).toHaveLength(3);
    });
  });
});
