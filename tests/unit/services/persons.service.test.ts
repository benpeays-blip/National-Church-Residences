/**
 * Unit Tests for Persons Service
 *
 * Tests business logic in the persons service layer
 * Mocks repository calls to test service logic in isolation
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as personsService from '../../../server/services/persons.service';
import * as personsRepository from '../../../server/services/storage/persons.repository';
import { NotFoundError, ValidationError } from '../../../server/utils/errors';
import { createTestPerson } from '../../helpers/factories';

// Mock the repository module
vi.mock('../../../server/services/storage/persons.repository');

// Mock the logger
vi.mock('../../../server/config/logging', () => ({
  logger: {
    debug: vi.fn(),
    info: vi.fn(),
    warn: vi.fn(),
    error: vi.fn(),
  },
}));

describe('Persons Service', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getPersons', () => {
    it('should fetch all persons without search', async () => {
      const mockPersons = [
        { id: '1', firstName: 'John', lastName: 'Doe' },
        { id: '2', firstName: 'Jane', lastName: 'Smith' },
      ];

      vi.mocked(personsRepository.findPersons).mockResolvedValue(mockPersons as any);

      const result = await personsService.getPersons();

      expect(result).toEqual(mockPersons);
      expect(personsRepository.findPersons).toHaveBeenCalledWith(undefined);
    });

    it('should fetch persons with search filter', async () => {
      const mockPersons = [{ id: '1', firstName: 'John', lastName: 'Doe' }];

      vi.mocked(personsRepository.findPersons).mockResolvedValue(mockPersons as any);

      const result = await personsService.getPersons('John');

      expect(result).toEqual(mockPersons);
      expect(personsRepository.findPersons).toHaveBeenCalledWith('John');
    });
  });

  describe('getPersonById', () => {
    it('should fetch a person by ID', async () => {
      const mockPerson = { id: '1', firstName: 'John', lastName: 'Doe' };

      vi.mocked(personsRepository.findPersonById).mockResolvedValue(mockPerson as any);

      const result = await personsService.getPersonById('1');

      expect(result).toEqual(mockPerson);
      expect(personsRepository.findPersonById).toHaveBeenCalledWith('1');
    });

    it('should throw NotFoundError when person does not exist', async () => {
      vi.mocked(personsRepository.findPersonById).mockResolvedValue(null);

      await expect(personsService.getPersonById('nonexistent'))
        .rejects.toThrow(NotFoundError);
    });
  });

  describe('getPersonProfile', () => {
    it('should fetch person profile with related data', async () => {
      const mockProfile = {
        id: '1',
        firstName: 'John',
        lastName: 'Doe',
        gifts: [{ id: 'g1', amount: '100.00' }],
        interactions: [{ id: 'i1', type: 'meeting' }],
        opportunities: [],
        tasks: [],
        household: null,
      };

      vi.mocked(personsRepository.findPersonProfile).mockResolvedValue(mockProfile as any);

      const result = await personsService.getPersonProfile('1');

      expect(result).toEqual(mockProfile);
      expect(personsRepository.findPersonProfile).toHaveBeenCalledWith('1');
    });

    it('should throw NotFoundError when person profile does not exist', async () => {
      vi.mocked(personsRepository.findPersonProfile).mockResolvedValue(null);

      await expect(personsService.getPersonProfile('nonexistent'))
        .rejects.toThrow(NotFoundError);
    });
  });

  describe('getDonorProfile', () => {
    it('should fetch donor profile with statistics', async () => {
      const mockProfile = {
        id: '1',
        firstName: 'John',
        lastName: 'Doe',
        stats: {
          totalGifts: 5,
          totalGiving: '5000.00',
          averageGift: '1000.00',
          largestGift: '2000.00',
          firstGiftDate: new Date('2020-01-01'),
          lastGiftDate: new Date('2025-12-01'),
        },
        gifts: [],
        interactions: [],
      };

      vi.mocked(personsRepository.findDonorProfile).mockResolvedValue(mockProfile as any);

      const result = await personsService.getDonorProfile('1');

      expect(result).toEqual(mockProfile);
      expect(personsRepository.findDonorProfile).toHaveBeenCalledWith('1');
    });

    it('should throw NotFoundError when donor does not exist', async () => {
      vi.mocked(personsRepository.findDonorProfile).mockResolvedValue(null);

      await expect(personsService.getDonorProfile('nonexistent'))
        .rejects.toThrow(NotFoundError);
    });
  });

  describe('getDonorsForQuadrant', () => {
    it('should fetch all donors with quadrant metrics', async () => {
      const mockDonors = [
        {
          id: '1',
          firstName: 'John',
          lastName: 'Doe',
          energyScore: 75,
          structureScore: 60,
          giftCount: 5,
          relationshipMonths: 12,
          recentGiftCount: 2,
        },
      ];

      vi.mocked(personsRepository.findDonorsForQuadrant).mockResolvedValue(mockDonors as any);

      const result = await personsService.getDonorsForQuadrant();

      expect(result).toEqual(mockDonors);
      expect(personsRepository.findDonorsForQuadrant).toHaveBeenCalled();
    });
  });

  describe('createPerson', () => {
    it('should create a person with valid data', async () => {
      const personData = createTestPerson();
      const createdPerson = { ...personData, id: 'new-id' };

      vi.mocked(personsRepository.createPerson).mockResolvedValue(createdPerson as any);

      const result = await personsService.createPerson(personData);

      expect(result).toEqual(createdPerson);
      expect(personsRepository.createPerson).toHaveBeenCalledWith(personData);
    });

    it('should throw ValidationError when firstName is missing', async () => {
      const personData = createTestPerson({ firstName: '' });

      await expect(personsService.createPerson(personData))
        .rejects.toThrow(ValidationError);
      await expect(personsService.createPerson(personData))
        .rejects.toThrow('First name is required');
    });

    it('should throw ValidationError when firstName is only whitespace', async () => {
      const personData = createTestPerson({ firstName: '   ' });

      await expect(personsService.createPerson(personData))
        .rejects.toThrow(ValidationError);
    });

    it('should throw ValidationError when lastName is missing', async () => {
      const personData = createTestPerson({ lastName: '' });

      await expect(personsService.createPerson(personData))
        .rejects.toThrow(ValidationError);
      await expect(personsService.createPerson(personData))
        .rejects.toThrow('Last name is required');
    });

    it('should throw ValidationError for invalid email format', async () => {
      const personData = createTestPerson({ primaryEmail: 'invalid-email' });

      await expect(personsService.createPerson(personData))
        .rejects.toThrow(ValidationError);
      await expect(personsService.createPerson(personData))
        .rejects.toThrow('Invalid email format');
    });

    it('should accept valid email formats', async () => {
      const validEmails = [
        'test@example.com',
        'user.name@domain.co.uk',
        'user+tag@example.org',
      ];

      for (const email of validEmails) {
        vi.clearAllMocks();
        const personData = createTestPerson({ primaryEmail: email });
        const createdPerson = { ...personData, id: 'new-id' };

        vi.mocked(personsRepository.createPerson).mockResolvedValue(createdPerson as any);

        await expect(personsService.createPerson(personData)).resolves.toBeDefined();
      }
    });

    it('should throw ValidationError for invalid phone number', async () => {
      const personData = createTestPerson({ primaryPhone: '123' }); // Too short

      await expect(personsService.createPerson(personData))
        .rejects.toThrow(ValidationError);
      await expect(personsService.createPerson(personData))
        .rejects.toThrow('Phone number must have at least 10 digits');
    });

    it('should accept valid phone formats', async () => {
      const validPhones = [
        '5551234567',
        '555-123-4567',
        '(555) 123-4567',
        '+1-555-123-4567',
      ];

      for (const phone of validPhones) {
        vi.clearAllMocks();
        const personData = createTestPerson({ primaryPhone: phone });
        const createdPerson = { ...personData, id: 'new-id' };

        vi.mocked(personsRepository.createPerson).mockResolvedValue(createdPerson as any);

        await expect(personsService.createPerson(personData)).resolves.toBeDefined();
      }
    });
  });

  describe('updatePerson', () => {
    it('should update a person with valid data', async () => {
      const existingPerson = { id: '1', firstName: 'John', lastName: 'Doe' };
      const updateData = { firstName: 'Jonathan' };
      const updatedPerson = { ...existingPerson, ...updateData };

      vi.mocked(personsRepository.findPersonById).mockResolvedValue(existingPerson as any);
      vi.mocked(personsRepository.updatePerson).mockResolvedValue(updatedPerson as any);

      const result = await personsService.updatePerson('1', updateData);

      expect(result).toEqual(updatedPerson);
      expect(personsRepository.updatePerson).toHaveBeenCalledWith('1', updateData);
    });

    it('should throw NotFoundError when person does not exist', async () => {
      vi.mocked(personsRepository.findPersonById).mockResolvedValue(null);

      await expect(personsService.updatePerson('nonexistent', { firstName: 'John' }))
        .rejects.toThrow(NotFoundError);
    });

    it('should validate email format when updating', async () => {
      const existingPerson = { id: '1', firstName: 'John', lastName: 'Doe' };

      vi.mocked(personsRepository.findPersonById).mockResolvedValue(existingPerson as any);

      await expect(personsService.updatePerson('1', { primaryEmail: 'invalid-email' }))
        .rejects.toThrow(ValidationError);
    });

    it('should validate phone format when updating', async () => {
      const existingPerson = { id: '1', firstName: 'John', lastName: 'Doe' };

      vi.mocked(personsRepository.findPersonById).mockResolvedValue(existingPerson as any);

      await expect(personsService.updatePerson('1', { primaryPhone: '123' }))
        .rejects.toThrow(ValidationError);
    });

    it('should throw NotFoundError when update returns null', async () => {
      const existingPerson = { id: '1', firstName: 'John', lastName: 'Doe' };

      vi.mocked(personsRepository.findPersonById).mockResolvedValue(existingPerson as any);
      vi.mocked(personsRepository.updatePerson).mockResolvedValue(null);

      await expect(personsService.updatePerson('1', { firstName: 'Jonathan' }))
        .rejects.toThrow(NotFoundError);
    });
  });

  describe('updateDonorEnergyScore', () => {
    it('should update energy score with valid value', async () => {
      const existingPerson = { id: '1', firstName: 'John', lastName: 'Doe', relationshipEnergy: 50 };
      const updatedPerson = { ...existingPerson, relationshipEnergy: 75 };

      vi.mocked(personsRepository.findPersonById).mockResolvedValue(existingPerson as any);
      vi.mocked(personsRepository.updatePerson).mockResolvedValue(updatedPerson as any);

      const result = await personsService.updateDonorEnergyScore('1', 75);

      expect(result.relationshipEnergy).toBe(75);
      expect(personsRepository.updatePerson).toHaveBeenCalledWith('1', { relationshipEnergy: 75 });
    });

    it('should throw ValidationError for energy score below 0', async () => {
      await expect(personsService.updateDonorEnergyScore('1', -1))
        .rejects.toThrow(ValidationError);
      await expect(personsService.updateDonorEnergyScore('1', -1))
        .rejects.toThrow('Energy score must be between 0 and 100');
    });

    it('should throw ValidationError for energy score above 100', async () => {
      await expect(personsService.updateDonorEnergyScore('1', 101))
        .rejects.toThrow(ValidationError);
      await expect(personsService.updateDonorEnergyScore('1', 101))
        .rejects.toThrow('Energy score must be between 0 and 100');
    });

    it('should accept boundary values 0 and 100', async () => {
      const existingPerson = { id: '1', firstName: 'John', lastName: 'Doe', relationshipEnergy: 50 };

      vi.mocked(personsRepository.findPersonById).mockResolvedValue(existingPerson as any);
      vi.mocked(personsRepository.updatePerson).mockResolvedValue({ ...existingPerson, relationshipEnergy: 0 } as any);

      await expect(personsService.updateDonorEnergyScore('1', 0)).resolves.toBeDefined();

      vi.mocked(personsRepository.updatePerson).mockResolvedValue({ ...existingPerson, relationshipEnergy: 100 } as any);

      await expect(personsService.updateDonorEnergyScore('1', 100)).resolves.toBeDefined();
    });
  });

  describe('updateDonorStructureScore', () => {
    it('should update structure score with valid value', async () => {
      const existingPerson = { id: '1', firstName: 'John', lastName: 'Doe', relationshipStructure: 50 };
      const updatedPerson = { ...existingPerson, relationshipStructure: 75 };

      vi.mocked(personsRepository.findPersonById).mockResolvedValue(existingPerson as any);
      vi.mocked(personsRepository.updatePerson).mockResolvedValue(updatedPerson as any);

      const result = await personsService.updateDonorStructureScore('1', 75);

      expect(result.relationshipStructure).toBe(75);
      expect(personsRepository.updatePerson).toHaveBeenCalledWith('1', { relationshipStructure: 75 });
    });

    it('should throw ValidationError for structure score below 0', async () => {
      await expect(personsService.updateDonorStructureScore('1', -1))
        .rejects.toThrow(ValidationError);
      await expect(personsService.updateDonorStructureScore('1', -1))
        .rejects.toThrow('Structure score must be between 0 and 100');
    });

    it('should throw ValidationError for structure score above 100', async () => {
      await expect(personsService.updateDonorStructureScore('1', 101))
        .rejects.toThrow(ValidationError);
    });
  });
});
