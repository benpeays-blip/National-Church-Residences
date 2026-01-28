/**
 * E2E Tests: Donor Management Flow
 *
 * Tests the complete donor management lifecycle:
 * 1. Create a new donor (person)
 * 2. Update donor information
 * 3. Update relationship scores (energy/structure)
 * 4. View donor profile with related data
 * 5. Delete donor
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import request from 'supertest';
import express from 'express';
import { personsRouter, donorsRouter } from '../../server/routes/persons.routes';
import { giftsRouter } from '../../server/routes/gifts.routes';
import * as personsRepository from '../../server/services/storage/persons.repository';
import * as giftsRepository from '../../server/services/storage/gifts.repository';
import { errorHandler, notFoundHandler } from '../../server/middleware/errorHandler';
import { createTestPerson, createTestGift } from '../helpers/factories';

// Mock repositories
vi.mock('../../server/services/storage/persons.repository');
vi.mock('../../server/services/storage/gifts.repository');

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

describe('E2E: Donor Management Flow', () => {
  let app: express.Express;
  let createdPersonId: string;

  beforeEach(() => {
    vi.clearAllMocks();

    // Create a fresh Express app for each test
    app = express();
    app.use(express.json());
    app.use('/api/persons', personsRouter);
    app.use('/api/donors', donorsRouter);
    app.use('/api/gifts', giftsRouter);
    app.use(notFoundHandler);
    app.use(errorHandler);

    createdPersonId = 'test-person-123';
  });

  describe('Complete Donor Lifecycle', () => {
    it('should create a new donor and track through lifecycle', async () => {
      // Step 1: Create a new person/donor
      const newPerson = createTestPerson({
        firstName: 'Jane',
        lastName: 'Smith',
        primaryEmail: 'jane.smith@example.com',
        organizationName: null,
        relationshipEnergy: 50,
        relationshipStructure: 50,
      });

      const createdPerson = {
        id: createdPersonId,
        ...newPerson,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      vi.mocked(personsRepository.createPerson).mockResolvedValue(createdPerson as any);

      const createResponse = await request(app)
        .post('/api/persons')
        .send(newPerson)
        .expect(201);

      expect(createResponse.body).toMatchObject({
        id: createdPersonId,
        firstName: 'Jane',
        lastName: 'Smith',
        primaryEmail: 'jane.smith@example.com',
      });

      // Step 2: Fetch the created person
      vi.mocked(personsRepository.findPersonById).mockResolvedValue(createdPerson as any);

      const getResponse = await request(app)
        .get(`/api/persons/${createdPersonId}`)
        .expect(200);

      expect(getResponse.body).toMatchObject({
        id: createdPersonId,
        firstName: 'Jane',
        lastName: 'Smith',
      });

      // Step 3: Update relationship energy score (moving them up the quadrant)
      const updatedPersonWithEnergy = {
        ...createdPerson,
        relationshipEnergy: 85,
      };

      vi.mocked(personsRepository.findPersonById).mockResolvedValue(createdPerson as any);
      vi.mocked(personsRepository.updatePerson).mockResolvedValue(
        updatedPersonWithEnergy as any
      );

      const updateEnergyResponse = await request(app)
        .patch(`/api/donors/${createdPersonId}/energy`)
        .send({ energyScore: 85 })
        .expect(200);

      expect(updateEnergyResponse.body.relationshipEnergy).toBe(85);

      // Step 4: Update relationship structure score
      const updatedPersonWithBoth = {
        ...updatedPersonWithEnergy,
        relationshipStructure: 75,
      };

      vi.mocked(personsRepository.findPersonById).mockResolvedValue(updatedPersonWithEnergy as any);
      vi.mocked(personsRepository.updatePerson).mockResolvedValue(
        updatedPersonWithBoth as any
      );

      const updateStructureResponse = await request(app)
        .patch(`/api/donors/${createdPersonId}/structure`)
        .send({ structureScore: 75 })
        .expect(200);

      expect(updateStructureResponse.body.relationshipStructure).toBe(75);

      // Step 5: Get donor profile with stats (simulating donor 360° view)
      const mockDonorProfile = {
        person: updatedPersonWithBoth,
        stats: {
          totalGifts: 2,
          totalGiving: '3500.00',
          largestGift: '2500.00',
          firstGiftDate: new Date(),
          lastGiftDate: new Date(),
        },
        giftStats: {
          totalGiven: '3500.00',
          giftCount: 2,
        },
      };

      vi.mocked(personsRepository.findDonorProfile).mockResolvedValue(mockDonorProfile as any);

      const profileResponse = await request(app)
        .get(`/api/donors/${createdPersonId}`)
        .expect(200);

      expect(profileResponse.body).toHaveProperty('person');
      expect(profileResponse.body).toHaveProperty('stats');
      expect(profileResponse.body.person.id).toBe(createdPersonId);

      // Verify all operations were called with correct parameters
      expect(personsRepository.createPerson).toHaveBeenCalledWith(
        expect.objectContaining({
          firstName: 'Jane',
          lastName: 'Smith',
          primaryEmail: 'jane.smith@example.com',
        })
      );
      expect(personsRepository.findPersonById).toHaveBeenCalledWith(createdPersonId);
      expect(personsRepository.updatePerson).toHaveBeenCalledWith(
        createdPersonId,
        { relationshipEnergy: 85 }
      );
      expect(personsRepository.updatePerson).toHaveBeenCalledWith(
        createdPersonId,
        { relationshipStructure: 75 }
      );
      expect(personsRepository.findDonorProfile).toHaveBeenCalledWith(createdPersonId);
    });

    it('should handle donor updates correctly', async () => {
      const existingPerson = {
        id: createdPersonId,
        ...createTestPerson(),
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      // Update donor information
      const updates = {
        primaryPhone: '555-555-9999',
        primaryEmail: 'new.email@example.com',
        wealthBand: 'P4',
      };

      const updatedPerson = {
        ...existingPerson,
        ...updates,
      };

      vi.mocked(personsRepository.findPersonById).mockResolvedValue(existingPerson as any);
      vi.mocked(personsRepository.updatePerson).mockResolvedValue(updatedPerson as any);

      const response = await request(app)
        .patch(`/api/persons/${createdPersonId}`)
        .send(updates)
        .expect(200);

      expect(response.body).toMatchObject(updates);
      expect(personsRepository.findPersonById).toHaveBeenCalledWith(createdPersonId);
      expect(personsRepository.updatePerson).toHaveBeenCalledWith(
        createdPersonId,
        expect.any(Object)
      );
    });

    it('should retrieve donors for quadrant view', async () => {
      const mockDonors = [
        {
          id: 'donor-1',
          firstName: 'High',
          lastName: 'Energy',
          relationshipEnergy: 90,
          relationshipStructure: 80,
          totalGiven: '10000.00',
          giftCount: 5,
        },
        {
          id: 'donor-2',
          firstName: 'Medium',
          lastName: 'Structure',
          relationshipEnergy: 60,
          relationshipStructure: 70,
          totalGiven: '5000.00',
          giftCount: 3,
        },
      ];

      vi.mocked(personsRepository.findDonorsForQuadrant).mockResolvedValue(mockDonors as any);

      const response = await request(app)
        .get('/api/donors/quadrant')
        .expect(200);

      expect(response.body).toHaveLength(2);
      expect(response.body[0]).toMatchObject({
        firstName: 'High',
        lastName: 'Energy',
        relationshipEnergy: 90,
        relationshipStructure: 80,
      });
    });
  });

  describe('Error Handling', () => {
    it('should return 404 when donor not found', async () => {
      vi.mocked(personsRepository.findPersonById).mockResolvedValue(null);

      await request(app)
        .get('/api/persons/nonexistent-id')
        .expect(404);
    });

    it('should return 400 for invalid email format', async () => {
      const invalidPerson = createTestPerson({
        primaryEmail: 'not-an-email',
      });

      await request(app)
        .post('/api/persons')
        .send(invalidPerson)
        .expect(400);
    });

    it('should return 400 for invalid energy score', async () => {
      await request(app)
        .patch(`/api/donors/${createdPersonId}/energy`)
        .send({ energyScore: 150 }) // Invalid: > 100
        .expect(400);
    });

    it('should return 400 for invalid structure score', async () => {
      await request(app)
        .patch(`/api/donors/${createdPersonId}/structure`)
        .send({ structureScore: -10 }) // Invalid: < 0
        .expect(400);
    });
  });
});
