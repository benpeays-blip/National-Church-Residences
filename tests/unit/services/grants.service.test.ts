/**
 * Unit Tests for Grants Service
 *
 * Tests business logic in the grants service layer
 * Mocks repository calls to test service logic in isolation
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as grantsService from '../../../server/services/grants.service';
import * as grantsRepository from '../../../server/services/storage/grants.repository';
import { NotFoundError, ValidationError } from '../../../server/utils/errors';

// Mock the repository module
vi.mock('../../../server/services/storage/grants.repository');

// Mock the logger
vi.mock('../../../server/config/logging', () => ({
  logger: {
    debug: vi.fn(),
    info: vi.fn(),
    warn: vi.fn(),
    error: vi.fn(),
  },
}));

describe('Grants Service', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getGrants', () => {
    it('should fetch all grants without filters', async () => {
      const mockGrants = [
        { id: '1', foundationName: 'Foundation A', stage: 'research' },
        { id: '2', foundationName: 'Foundation B', stage: 'submitted' },
      ];

      vi.mocked(grantsRepository.findGrants).mockResolvedValue(mockGrants as any);

      const result = await grantsService.getGrants();

      expect(result).toEqual(mockGrants);
      expect(grantsRepository.findGrants).toHaveBeenCalledWith(undefined, undefined);
    });

    it('should fetch grants with ownerId filter', async () => {
      const mockGrants = [{ id: '1', foundationName: 'Foundation A', ownerId: 'user123' }];

      vi.mocked(grantsRepository.findGrants).mockResolvedValue(mockGrants as any);

      const result = await grantsService.getGrants('user123');

      expect(result).toEqual(mockGrants);
      expect(grantsRepository.findGrants).toHaveBeenCalledWith('user123', undefined);
    });

    it('should fetch grants with stage filter', async () => {
      const mockGrants = [{ id: '1', funderName: 'Foundation A', stage: 'Awarded' }];

      vi.mocked(grantsRepository.findGrants).mockResolvedValue(mockGrants as any);

      const result = await grantsService.getGrants(undefined, 'Awarded');

      expect(result).toEqual(mockGrants);
      expect(grantsRepository.findGrants).toHaveBeenCalledWith(undefined, 'Awarded');
    });
  });

  describe('getGrantById', () => {
    it('should fetch a grant by ID', async () => {
      const mockGrant = { id: '1', foundationName: 'Test Foundation', stage: 'research' };

      vi.mocked(grantsRepository.findGrantById).mockResolvedValue(mockGrant as any);

      const result = await grantsService.getGrantById('1');

      expect(result).toEqual(mockGrant);
      expect(grantsRepository.findGrantById).toHaveBeenCalledWith('1');
    });

    it('should throw NotFoundError when grant does not exist', async () => {
      vi.mocked(grantsRepository.findGrantById).mockResolvedValue(null);

      await expect(grantsService.getGrantById('nonexistent'))
        .rejects.toThrow(NotFoundError);
    });
  });

  describe('createGrant', () => {
    it('should create a grant with valid data', async () => {
      const grantData = {
        funderName: 'New Foundation',
        askAmount: '50000.00',
        stage: 'Research' as any,
        loiDueDate: new Date('2026-03-01'),
        applicationDueDate: new Date('2026-04-01'),
      };
      const createdGrant = { ...grantData, id: 'new-id' };

      vi.mocked(grantsRepository.createGrant).mockResolvedValue(createdGrant as any);

      const result = await grantsService.createGrant(grantData);

      expect(result).toEqual(createdGrant);
      expect(grantsRepository.createGrant).toHaveBeenCalledWith(grantData);
    });

    it('should throw ValidationError when funder name is missing', async () => {
      const grantData = {
        funderName: '',
        askAmount: '50000.00',
        stage: 'Research' as any,
      };

      await expect(grantsService.createGrant(grantData as any))
        .rejects.toThrow(ValidationError);
      await expect(grantsService.createGrant(grantData as any))
        .rejects.toThrow('Funder name is required');
    });

    it('should throw ValidationError when ask amount is zero', async () => {
      const grantData = {
        funderName: 'Test Foundation',
        askAmount: '0',
        stage: 'Research' as any,
      };

      await expect(grantsService.createGrant(grantData as any))
        .rejects.toThrow(ValidationError);
      await expect(grantsService.createGrant(grantData as any))
        .rejects.toThrow('Ask amount must be greater than zero');
    });

    it('should throw ValidationError when ask amount is negative', async () => {
      const grantData = {
        funderName: 'Test Foundation',
        askAmount: '-1000',
        stage: 'Research' as any,
      };

      await expect(grantsService.createGrant(grantData as any))
        .rejects.toThrow(ValidationError);
      await expect(grantsService.createGrant(grantData as any))
        .rejects.toThrow('Ask amount must be greater than zero');
    });

    it('should throw ValidationError when LOI due date is after application due date', async () => {
      const grantData = {
        funderName: 'Test Foundation',
        askAmount: '50000.00',
        stage: 'Research' as any,
        loiDueDate: new Date('2026-04-01'),
        applicationDueDate: new Date('2026-03-01'),
      };

      await expect(grantsService.createGrant(grantData as any))
        .rejects.toThrow(ValidationError);
      await expect(grantsService.createGrant(grantData as any))
        .rejects.toThrow('LOI due date must be before application due date');
    });

    it('should allow awarded amount equal to ask amount', async () => {
      const grantData = {
        funderName: 'Test Foundation',
        askAmount: '50000.00',
        awardedAmount: '50000.00',
        stage: 'Awarded' as any,
      };
      const createdGrant = { ...grantData, id: 'new-id' };

      vi.mocked(grantsRepository.createGrant).mockResolvedValue(createdGrant as any);

      const result = await grantsService.createGrant(grantData as any);

      expect(result).toEqual(createdGrant);
    });
  });

  describe('updateGrant', () => {
    it('should update a grant with valid data', async () => {
      const existingGrant = {
        id: '1',
        funderName: 'Old Foundation',
        askAmount: '50000.00',
        stage: 'Research',
      };
      const updateData = { funderName: 'Updated Foundation' };
      const updatedGrant = { ...existingGrant, ...updateData };

      vi.mocked(grantsRepository.findGrantById).mockResolvedValue(existingGrant as any);
      vi.mocked(grantsRepository.updateGrant).mockResolvedValue(updatedGrant as any);

      const result = await grantsService.updateGrant('1', updateData);

      expect(result).toEqual(updatedGrant);
      expect(grantsRepository.updateGrant).toHaveBeenCalledWith('1', updateData);
    });

    it('should throw NotFoundError when grant does not exist', async () => {
      vi.mocked(grantsRepository.findGrantById).mockResolvedValue(null);

      await expect(grantsService.updateGrant('nonexistent', { funderName: 'New Name' }))
        .rejects.toThrow(NotFoundError);
    });

    it('should throw ValidationError when updating ask amount to zero', async () => {
      const existingGrant = { id: '1', funderName: 'Foundation', askAmount: '50000.00' };

      vi.mocked(grantsRepository.findGrantById).mockResolvedValue(existingGrant as any);

      await expect(grantsService.updateGrant('1', { askAmount: '0' }))
        .rejects.toThrow(ValidationError);
      await expect(grantsService.updateGrant('1', { askAmount: '0' }))
        .rejects.toThrow('Ask amount must be greater than zero');
    });
  });

  describe('deleteGrant', () => {
    it('should delete a grant', async () => {
      const deletedGrant = { id: '1', funderName: 'Test Foundation' };

      vi.mocked(grantsRepository.deleteGrant).mockResolvedValue(deletedGrant as any);

      const result = await grantsService.deleteGrant('1');

      expect(result).toEqual(deletedGrant);
      expect(grantsRepository.deleteGrant).toHaveBeenCalledWith('1');
    });

    it('should throw NotFoundError when grant does not exist', async () => {
      vi.mocked(grantsRepository.deleteGrant).mockResolvedValue(null);

      await expect(grantsService.deleteGrant('nonexistent'))
        .rejects.toThrow(NotFoundError);
    });
  });
});
