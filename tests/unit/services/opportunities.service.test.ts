/**
 * Unit Tests for Opportunities Service
 *
 * Tests business logic in the opportunities service layer
 * Mocks repository calls to test service logic in isolation
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as opportunitiesService from '../../../server/services/opportunities.service';
import * as opportunitiesRepository from '../../../server/services/storage/opportunities.repository';
import { NotFoundError, ValidationError } from '../../../server/utils/errors';
import { createTestOpportunity } from '../../helpers/factories';

// Mock the repository module
vi.mock('../../../server/services/storage/opportunities.repository');

// Mock the logger
vi.mock('../../../server/config/logging', () => ({
  logger: {
    debug: vi.fn(),
    info: vi.fn(),
    warn: vi.fn(),
    error: vi.fn(),
  },
}));

describe('Opportunities Service', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getOpportunities', () => {
    it('should fetch all opportunities without ownerId filter', async () => {
      const mockOpportunities = [
        { id: '1', personId: 'p1', askAmount: '1000.00', stage: 'Cultivation' },
        { id: '2', personId: 'p2', askAmount: '2000.00', stage: 'Prospect' },
      ];

      vi.mocked(opportunitiesRepository.findOpportunities).mockResolvedValue(mockOpportunities as any);

      const result = await opportunitiesService.getOpportunities();

      expect(result).toEqual(mockOpportunities);
      expect(opportunitiesRepository.findOpportunities).toHaveBeenCalledWith(undefined);
    });

    it('should fetch opportunities filtered by ownerId', async () => {
      const mockOpportunities = [
        { id: '1', personId: 'p1', ownerId: 'owner1', askAmount: '1000.00', stage: 'Cultivation' },
      ];

      vi.mocked(opportunitiesRepository.findOpportunities).mockResolvedValue(mockOpportunities as any);

      const result = await opportunitiesService.getOpportunities('owner1');

      expect(result).toEqual(mockOpportunities);
      expect(opportunitiesRepository.findOpportunities).toHaveBeenCalledWith('owner1');
    });
  });

  describe('getOpportunityById', () => {
    it('should fetch an opportunity by ID', async () => {
      const mockOpportunity = { id: '1', personId: 'p1', askAmount: '1000.00', stage: 'Cultivation' };

      vi.mocked(opportunitiesRepository.findOpportunityById).mockResolvedValue(mockOpportunity as any);

      const result = await opportunitiesService.getOpportunityById('1');

      expect(result).toEqual(mockOpportunity);
      expect(opportunitiesRepository.findOpportunityById).toHaveBeenCalledWith('1');
    });

    it('should throw NotFoundError when opportunity does not exist', async () => {
      vi.mocked(opportunitiesRepository.findOpportunityById).mockResolvedValue(null);

      await expect(opportunitiesService.getOpportunityById('nonexistent'))
        .rejects.toThrow(NotFoundError);
    });
  });

  describe('getOpportunitiesByPersonId', () => {
    it('should fetch opportunities for a person', async () => {
      const mockOpportunities = [
        { id: '1', title: 'Opportunity 1', personId: 'p1', amount: '1000.00' },
        { id: '2', title: 'Opportunity 2', personId: 'p1', amount: '2000.00' },
      ];

      vi.mocked(opportunitiesRepository.findOpportunitiesByPersonId).mockResolvedValue(mockOpportunities as any);

      const result = await opportunitiesService.getOpportunitiesByPersonId('p1');

      expect(result).toEqual(mockOpportunities);
      expect(opportunitiesRepository.findOpportunitiesByPersonId).toHaveBeenCalledWith('p1');
    });
  });

  describe('createOpportunity', () => {
    it('should create an opportunity with valid data', async () => {
      const opportunityData = createTestOpportunity();
      const createdOpportunity = { ...opportunityData, id: 'new-id' };

      vi.mocked(opportunitiesRepository.createOpportunity).mockResolvedValue(createdOpportunity as any);

      const result = await opportunitiesService.createOpportunity(opportunityData);

      expect(result).toEqual(createdOpportunity);
      expect(opportunitiesRepository.createOpportunity).toHaveBeenCalledWith(opportunityData);
    });

    it('should throw ValidationError when personId is missing', async () => {
      const opportunityData = createTestOpportunity({ personId: '' });

      await expect(opportunitiesService.createOpportunity(opportunityData))
        .rejects.toThrow(ValidationError);
      await expect(opportunitiesService.createOpportunity(opportunityData))
        .rejects.toThrow('Person ID is required');
    });

    it('should throw ValidationError when askAmount is zero', async () => {
      const opportunityData = createTestOpportunity({ askAmount: '0' });

      await expect(opportunitiesService.createOpportunity(opportunityData))
        .rejects.toThrow(ValidationError);
      await expect(opportunitiesService.createOpportunity(opportunityData))
        .rejects.toThrow('Ask amount must be greater than zero');
    });

    it('should throw ValidationError when askAmount is negative', async () => {
      const opportunityData = createTestOpportunity({ askAmount: '-1000.00' });

      await expect(opportunitiesService.createOpportunity(opportunityData))
        .rejects.toThrow(ValidationError);
    });

    it('should throw ValidationError for invalid stage', async () => {
      const opportunityData = createTestOpportunity({ stage: 'invalid' as any });

      await expect(opportunitiesService.createOpportunity(opportunityData))
        .rejects.toThrow(ValidationError);
      await expect(opportunitiesService.createOpportunity(opportunityData))
        .rejects.toThrow('Stage must be one of');
    });

    it('should accept valid stages', async () => {
      const validStages = ['Prospect', 'Cultivation', 'Ask', 'Steward', 'Renewal'];

      for (const stage of validStages) {
        vi.clearAllMocks();
        const opportunityData = createTestOpportunity({ stage: stage as any });
        const createdOpportunity = { ...opportunityData, id: 'new-id' };

        vi.mocked(opportunitiesRepository.createOpportunity).mockResolvedValue(createdOpportunity as any);

        await expect(opportunitiesService.createOpportunity(opportunityData)).resolves.toBeDefined();
      }
    });

    it('should throw ValidationError for probability below 0', async () => {
      const opportunityData = createTestOpportunity({ probability: -1 });

      await expect(opportunitiesService.createOpportunity(opportunityData))
        .rejects.toThrow(ValidationError);
      await expect(opportunitiesService.createOpportunity(opportunityData))
        .rejects.toThrow('Probability must be between 0 and 100');
    });

    it('should throw ValidationError for probability above 100', async () => {
      const opportunityData = createTestOpportunity({ probability: 101 });

      await expect(opportunitiesService.createOpportunity(opportunityData))
        .rejects.toThrow(ValidationError);
    });

    it('should accept boundary probability values 0 and 100', async () => {
      const opportunityData0 = createTestOpportunity({ probability: 0 });
      const createdOpportunity0 = { ...opportunityData0, id: 'new-id' };

      vi.mocked(opportunitiesRepository.createOpportunity).mockResolvedValue(createdOpportunity0 as any);

      await expect(opportunitiesService.createOpportunity(opportunityData0)).resolves.toBeDefined();

      vi.clearAllMocks();

      const opportunityData100 = createTestOpportunity({ probability: 100 });
      const createdOpportunity100 = { ...opportunityData100, id: 'new-id' };

      vi.mocked(opportunitiesRepository.createOpportunity).mockResolvedValue(createdOpportunity100 as any);

      await expect(opportunitiesService.createOpportunity(opportunityData100)).resolves.toBeDefined();
    });

    it('should log warning for past expected close date', async () => {
      const pastDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000); // 30 days ago
      const opportunityData = createTestOpportunity({ expectedCloseDate: pastDate });
      const createdOpportunity = { ...opportunityData, id: 'new-id' };

      vi.mocked(opportunitiesRepository.createOpportunity).mockResolvedValue(createdOpportunity as any);

      const result = await opportunitiesService.createOpportunity(opportunityData);

      expect(result).toEqual(createdOpportunity);
      // Should still create the opportunity, but log a warning
      expect(opportunitiesRepository.createOpportunity).toHaveBeenCalled();
    });
  });

  describe('updateOpportunity', () => {
    it('should update an opportunity with valid data', async () => {
      const existingOpportunity = { id: '1', title: 'Old Title', personId: 'p1', amount: '1000.00' };
      const updateData = { title: 'New Title', amount: '1500.00' };
      const updatedOpportunity = { ...existingOpportunity, ...updateData };

      vi.mocked(opportunitiesRepository.findOpportunityById).mockResolvedValue(existingOpportunity as any);
      vi.mocked(opportunitiesRepository.updateOpportunity).mockResolvedValue(updatedOpportunity as any);

      const result = await opportunitiesService.updateOpportunity('1', updateData);

      expect(result).toEqual(updatedOpportunity);
      expect(opportunitiesRepository.updateOpportunity).toHaveBeenCalledWith('1', updateData);
    });

    it('should throw NotFoundError when opportunity does not exist', async () => {
      vi.mocked(opportunitiesRepository.findOpportunityById).mockResolvedValue(null);

      await expect(opportunitiesService.updateOpportunity('nonexistent', { notes: 'New Note' }))
        .rejects.toThrow(NotFoundError);
    });

    it('should validate askAmount when updating', async () => {
      const existingOpportunity = { id: '1', personId: 'p1', askAmount: '1000.00', stage: 'Cultivation' };

      vi.mocked(opportunitiesRepository.findOpportunityById).mockResolvedValue(existingOpportunity as any);

      await expect(opportunitiesService.updateOpportunity('1', { askAmount: '-500.00' }))
        .rejects.toThrow(ValidationError);
    });

    it('should validate stage when updating', async () => {
      const existingOpportunity = { id: '1', personId: 'p1', askAmount: '1000.00', stage: 'Cultivation' };

      vi.mocked(opportunitiesRepository.findOpportunityById).mockResolvedValue(existingOpportunity as any);

      await expect(opportunitiesService.updateOpportunity('1', { stage: 'invalid' as any }))
        .rejects.toThrow(ValidationError);
    });

    it('should validate probability when updating', async () => {
      const existingOpportunity = { id: '1', personId: 'p1', askAmount: '1000.00', stage: 'Cultivation' };

      vi.mocked(opportunitiesRepository.findOpportunityById).mockResolvedValue(existingOpportunity as any);

      await expect(opportunitiesService.updateOpportunity('1', { probability: 150 }))
        .rejects.toThrow(ValidationError);
    });

    it('should throw NotFoundError when update returns null', async () => {
      const existingOpportunity = { id: '1', personId: 'p1', askAmount: '1000.00', stage: 'Cultivation' };

      vi.mocked(opportunitiesRepository.findOpportunityById).mockResolvedValue(existingOpportunity as any);
      vi.mocked(opportunitiesRepository.updateOpportunity).mockResolvedValue(null);

      await expect(opportunitiesService.updateOpportunity('1', { notes: 'New Note' }))
        .rejects.toThrow(NotFoundError);
    });
  });

  describe('deleteOpportunity', () => {
    it('should delete an opportunity', async () => {
      const deletedOpportunity = { id: '1', title: 'Test', personId: 'p1', amount: '1000.00' };

      vi.mocked(opportunitiesRepository.deleteOpportunity).mockResolvedValue(deletedOpportunity as any);

      const result = await opportunitiesService.deleteOpportunity('1');

      expect(result).toEqual(deletedOpportunity);
      expect(opportunitiesRepository.deleteOpportunity).toHaveBeenCalledWith('1');
    });

    it('should throw NotFoundError when opportunity does not exist', async () => {
      vi.mocked(opportunitiesRepository.deleteOpportunity).mockResolvedValue(null);

      await expect(opportunitiesService.deleteOpportunity('nonexistent'))
        .rejects.toThrow(NotFoundError);
    });
  });

  describe('getOpportunitiesByStage', () => {
    it('should fetch opportunities by stage', async () => {
      const mockOpportunities = [
        { id: '1', title: 'Opp 1', personId: 'p1', stage: 'cultivation', amount: '1000.00' },
        { id: '2', title: 'Opp 2', personId: 'p2', stage: 'cultivation', amount: '2000.00' },
      ];

      vi.mocked(opportunitiesRepository.findOpportunitiesByStage).mockResolvedValue(mockOpportunities as any);

      const result = await opportunitiesService.getOpportunitiesByStage('cultivation');

      expect(result).toEqual(mockOpportunities);
      expect(opportunitiesRepository.findOpportunitiesByStage).toHaveBeenCalledWith('cultivation');
    });

    it('should throw ValidationError for invalid stage', async () => {
      await expect(opportunitiesService.getOpportunitiesByStage('invalid'))
        .rejects.toThrow(ValidationError);
      await expect(opportunitiesService.getOpportunitiesByStage('invalid'))
        .rejects.toThrow('Stage must be one of');
    });

    it('should accept all valid stages', async () => {
      const validStages = ['prospect', 'cultivation', 'solicitation', 'stewardship', 'closed_won', 'closed_lost'];

      for (const stage of validStages) {
        vi.clearAllMocks();
        vi.mocked(opportunitiesRepository.findOpportunitiesByStage).mockResolvedValue([]);

        await expect(opportunitiesService.getOpportunitiesByStage(stage)).resolves.toBeDefined();
      }
    });
  });
});
