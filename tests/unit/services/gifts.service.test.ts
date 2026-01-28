/**
 * Unit Tests for Gifts Service
 *
 * Tests business logic in the gifts service layer
 * Mocks repository calls to test service logic in isolation
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as giftsService from '../../../server/services/gifts.service';
import * as giftsRepository from '../../../server/services/storage/gifts.repository';
import { NotFoundError, ValidationError } from '../../../server/utils/errors';
import { createTestGift } from '../../helpers/factories';

// Mock the repository module
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

describe('Gifts Service', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getGifts', () => {
    it('should fetch all gifts without personId filter', async () => {
      const mockGifts = [
        { id: '1', amount: '100.00', personId: 'p1', receivedAt: new Date() },
        { id: '2', amount: '200.00', personId: 'p2', receivedAt: new Date() },
      ];

      vi.mocked(giftsRepository.findGifts).mockResolvedValue(mockGifts as any);

      const result = await giftsService.getGifts();

      expect(result).toEqual(mockGifts);
      expect(giftsRepository.findGifts).toHaveBeenCalledWith(undefined);
    });

    it('should fetch gifts filtered by personId', async () => {
      const mockGifts = [
        { id: '1', amount: '100.00', personId: 'p1', receivedAt: new Date() },
      ];

      vi.mocked(giftsRepository.findGifts).mockResolvedValue(mockGifts as any);

      const result = await giftsService.getGifts('p1');

      expect(result).toEqual(mockGifts);
      expect(giftsRepository.findGifts).toHaveBeenCalledWith('p1');
    });
  });

  describe('getGiftById', () => {
    it('should fetch a gift by ID', async () => {
      const mockGift = { id: '1', amount: '100.00', personId: 'p1', receivedAt: new Date() };

      vi.mocked(giftsRepository.findGiftById).mockResolvedValue(mockGift as any);

      const result = await giftsService.getGiftById('1');

      expect(result).toEqual(mockGift);
      expect(giftsRepository.findGiftById).toHaveBeenCalledWith('1');
    });

    it('should throw NotFoundError when gift does not exist', async () => {
      vi.mocked(giftsRepository.findGiftById).mockResolvedValue(null);

      await expect(giftsService.getGiftById('nonexistent'))
        .rejects.toThrow(NotFoundError);
    });
  });


  describe('createGift', () => {
    it('should create a gift with valid data', async () => {
      const giftData = createTestGift();
      const createdGift = { ...giftData, id: 'new-id' };

      vi.mocked(giftsRepository.createGift).mockResolvedValue(createdGift as any);

      const result = await giftsService.createGift(giftData);

      expect(result).toEqual(createdGift);
      expect(giftsRepository.createGift).toHaveBeenCalledWith(giftData);
    });

    it('should throw ValidationError when personId is missing', async () => {
      const giftData = createTestGift({ personId: '' });

      await expect(giftsService.createGift(giftData))
        .rejects.toThrow(ValidationError);
      await expect(giftsService.createGift(giftData))
        .rejects.toThrow('Person ID is required');
    });

    it('should throw ValidationError when amount is missing', async () => {
      const giftData = createTestGift({ amount: '' });

      await expect(giftsService.createGift(giftData))
        .rejects.toThrow(ValidationError);
      await expect(giftsService.createGift(giftData))
        .rejects.toThrow('Gift amount must be greater than zero');
    });

    it('should throw ValidationError when amount is zero', async () => {
      const giftData = createTestGift({ amount: '0' });

      await expect(giftsService.createGift(giftData))
        .rejects.toThrow(ValidationError);
    });

    it('should throw ValidationError when amount is negative', async () => {
      const giftData = createTestGift({ amount: '-100.00' });

      await expect(giftsService.createGift(giftData))
        .rejects.toThrow(ValidationError);
    });

    it('should throw ValidationError for invalid gift type', async () => {
      const giftData = createTestGift({ giftType: 'invalid' as any });

      await expect(giftsService.createGift(giftData))
        .rejects.toThrow(ValidationError);
      await expect(giftsService.createGift(giftData))
        .rejects.toThrow('Gift type must be one of');
    });

    it('should accept valid gift types', async () => {
      const validTypes = ['one_time', 'major', 'recurring', 'planned', 'pledge', 'in_kind'];

      for (const giftType of validTypes) {
        vi.clearAllMocks();
        const giftData = createTestGift({ giftType: giftType as any });
        const createdGift = { ...giftData, id: 'new-id' };

        vi.mocked(giftsRepository.createGift).mockResolvedValue(createdGift as any);

        await expect(giftsService.createGift(giftData)).resolves.toBeDefined();
      }
    });

    it('should throw ValidationError when receivedAt is missing', async () => {
      const giftData = createTestGift({ receivedAt: undefined as any });

      await expect(giftsService.createGift(giftData))
        .rejects.toThrow(ValidationError);
      await expect(giftsService.createGift(giftData))
        .rejects.toThrow('Received date is required');
    });
  });

  describe('updateGift', () => {
    it('should update a gift with valid data', async () => {
      const existingGift = { id: '1', amount: '100.00', personId: 'p1', receivedAt: new Date() };
      const updateData = { amount: '150.00' };
      const updatedGift = { ...existingGift, ...updateData };

      vi.mocked(giftsRepository.findGiftById).mockResolvedValue(existingGift as any);
      vi.mocked(giftsRepository.updateGift).mockResolvedValue(updatedGift as any);

      const result = await giftsService.updateGift('1', updateData);

      expect(result).toEqual(updatedGift);
      expect(giftsRepository.updateGift).toHaveBeenCalledWith('1', updateData);
    });

    it('should throw NotFoundError when gift does not exist', async () => {
      vi.mocked(giftsRepository.findGiftById).mockResolvedValue(null);

      await expect(giftsService.updateGift('nonexistent', { amount: '150.00' }))
        .rejects.toThrow(NotFoundError);
    });

    it('should validate amount when updating', async () => {
      const existingGift = { id: '1', amount: '100.00', personId: 'p1', receivedAt: new Date() };

      vi.mocked(giftsRepository.findGiftById).mockResolvedValue(existingGift as any);

      await expect(giftsService.updateGift('1', { amount: '-50.00' }))
        .rejects.toThrow(ValidationError);
    });

    it('should validate gift type when updating', async () => {
      const existingGift = { id: '1', amount: '100.00', personId: 'p1', receivedAt: new Date() };

      vi.mocked(giftsRepository.findGiftById).mockResolvedValue(existingGift as any);

      await expect(giftsService.updateGift('1', { giftType: 'invalid' as any }))
        .rejects.toThrow(ValidationError);
    });

    it('should throw NotFoundError when update returns null', async () => {
      const existingGift = { id: '1', amount: '100.00', personId: 'p1', receivedAt: new Date() };

      vi.mocked(giftsRepository.findGiftById).mockResolvedValue(existingGift as any);
      vi.mocked(giftsRepository.updateGift).mockResolvedValue(null);

      await expect(giftsService.updateGift('1', { amount: '150.00' }))
        .rejects.toThrow(NotFoundError);
    });
  });

  describe('deleteGift', () => {
    it('should delete a gift', async () => {
      const deletedGift = { id: '1', amount: '100.00', personId: 'p1', receivedAt: new Date() };

      vi.mocked(giftsRepository.deleteGift).mockResolvedValue(deletedGift as any);

      const result = await giftsService.deleteGift('1');

      expect(result).toEqual(deletedGift);
      expect(giftsRepository.deleteGift).toHaveBeenCalledWith('1');
    });

    it('should throw NotFoundError when gift does not exist', async () => {
      vi.mocked(giftsRepository.deleteGift).mockResolvedValue(null);

      await expect(giftsService.deleteGift('nonexistent'))
        .rejects.toThrow(NotFoundError);
    });
  });

});
