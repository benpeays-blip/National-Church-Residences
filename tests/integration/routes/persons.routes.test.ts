/**
 * Integration Tests for Persons Routes
 *
 * Tests the full request/response cycle for person/donor endpoints
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import request from 'supertest';
import express from 'express';
import { personsRouter, donorsRouter } from '../../../server/routes/persons.routes';
import * as personsRepo from '../../../server/services/storage/persons.repository';
import { errorHandler, notFoundHandler } from '../../../server/middleware/errorHandler';

// Mock the repository
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

// Mock authentication middleware
vi.mock('../../../server/middleware/auth', () => ({
  isAuthenticated: (req: any, res: any, next: any) => next(),
}));

describe('Persons Routes Integration Tests', () => {
  let app: express.Express;

  beforeEach(() => {
    vi.clearAllMocks();

    // Create a fresh Express app for each test
    app = express();
    app.use(express.json());
    app.use('/api/persons', personsRouter);
    app.use('/api/donors', donorsRouter);
    app.use(notFoundHandler);
    app.use(errorHandler);
  });

  describe('GET /api/persons', () => {
    it('should return all persons without search', async () => {
      const mockPersons = [
        {
          id: '1',
          firstName: 'John',
          lastName: 'Doe',
          email: 'john@example.com',
          personType: 'donor',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: '2',
          firstName: 'Jane',
          lastName: 'Smith',
          email: 'jane@example.com',
          personType: 'prospect',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      vi.mocked(personsRepo.findPersons).mockResolvedValue(mockPersons as any);

      const response = await request(app)
        .get('/api/persons')
        .expect(200);

      expect(response.body).toHaveLength(2);
      expect(response.body[0].firstName).toBe('John');
      expect(personsRepo.findPersons).toHaveBeenCalledWith(undefined);
    });

    it('should return filtered persons with search query', async () => {
      const mockPersons = [
        {
          id: '1',
          firstName: 'John',
          lastName: 'Doe',
          email: 'john@example.com',
          personType: 'donor',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      vi.mocked(personsRepo.findPersons).mockResolvedValue(mockPersons as any);

      const response = await request(app)
        .get('/api/persons?search=john')
        .expect(200);

      expect(response.body).toHaveLength(1);
      expect(response.body[0].firstName).toBe('John');
      expect(personsRepo.findPersons).toHaveBeenCalledWith('john');
    });
  });

  describe('GET /api/persons/:id', () => {
    it('should return a single person', async () => {
      const mockPerson = {
        id: '1',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        personType: 'donor',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      vi.mocked(personsRepo.findPersonById).mockResolvedValue(mockPerson as any);

      const response = await request(app)
        .get('/api/persons/1')
        .expect(200);

      expect(response.body.id).toBe('1');
      expect(response.body.firstName).toBe('John');
      expect(personsRepo.findPersonById).toHaveBeenCalledWith('1');
    });

    it('should return 404 when person not found', async () => {
      vi.mocked(personsRepo.findPersonById).mockResolvedValue(null);

      const response = await request(app)
        .get('/api/persons/nonexistent')
        .expect(404);

      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toContain('not found');
    });
  });

  describe('GET /api/persons/:id/profile', () => {
    it('should return person profile with related data', async () => {
      const mockProfile = {
        person: {
          id: '1',
          firstName: 'John',
          lastName: 'Doe',
          email: 'john@example.com',
          personType: 'donor',
        },
        gifts: [
          { id: 'g1', amount: 1000, giftDate: new Date() },
          { id: 'g2', amount: 500, giftDate: new Date() },
        ],
        opportunities: [
          { id: 'o1', name: 'Major Gift', stage: 'cultivation' },
        ],
        tasks: [
          { id: 't1', title: 'Follow up call', status: 'pending' },
        ],
        interactions: [
          { id: 'i1', type: 'meeting', notes: 'Great conversation' },
        ],
      };

      vi.mocked(personsRepo.findPersonProfile).mockResolvedValue(mockProfile as any);

      const response = await request(app)
        .get('/api/persons/1/profile')
        .expect(200);

      expect(response.body).toHaveProperty('person');
      expect(response.body).toHaveProperty('gifts');
      expect(response.body).toHaveProperty('opportunities');
      expect(response.body.gifts).toHaveLength(2);
      expect(personsRepo.findPersonProfile).toHaveBeenCalledWith('1');
    });

    it('should return 404 when person profile not found', async () => {
      vi.mocked(personsRepo.findPersonProfile).mockResolvedValue(null);

      const response = await request(app)
        .get('/api/persons/nonexistent/profile')
        .expect(404);

      expect(response.body).toHaveProperty('message');
    });
  });

  describe('POST /api/persons', () => {
    it('should create a new person', async () => {
      const newPersonData = {
        firstName: 'Alice',
        lastName: 'Johnson',
        email: 'alice@example.com',
        personType: 'prospect',
      };

      const createdPerson = {
        ...newPersonData,
        id: 'new-id',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      vi.mocked(personsRepo.createPerson).mockResolvedValue(createdPerson as any);

      const response = await request(app)
        .post('/api/persons')
        .send(newPersonData)
        .expect(201);

      expect(response.body.id).toBe('new-id');
      expect(response.body.firstName).toBe('Alice');
      expect(personsRepo.createPerson).toHaveBeenCalled();
    });

    it('should return 400 when firstName is missing', async () => {
      const invalidData = {
        lastName: 'Johnson',
        email: 'alice@example.com',
        // firstName is missing
      };

      const response = await request(app)
        .post('/api/persons')
        .send(invalidData)
        .expect(400);

      expect(response.body).toHaveProperty('message');
    });

    it('should return 400 when lastName is missing', async () => {
      const invalidData = {
        firstName: 'Alice',
        email: 'alice@example.com',
        // lastName is missing
      };

      const response = await request(app)
        .post('/api/persons')
        .send(invalidData)
        .expect(400);

      expect(response.body).toHaveProperty('message');
    });
  });

  describe('PATCH /api/persons/:id', () => {
    it('should update an existing person', async () => {
      const updateData = {
        firstName: 'Updated Name',
        phone: '555-1234',
      };

      const existingPerson = {
        id: '1',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        personType: 'donor',
      };

      const updatedPerson = {
        id: '1',
        firstName: 'Updated Name',
        lastName: 'Doe',
        email: 'john@example.com',
        phone: '555-1234',
        personType: 'donor',
        updatedAt: new Date(),
      };

      vi.mocked(personsRepo.findPersonById).mockResolvedValue(existingPerson as any);
      vi.mocked(personsRepo.updatePerson).mockResolvedValue(updatedPerson as any);

      const response = await request(app)
        .patch('/api/persons/1')
        .send(updateData)
        .expect(200);

      expect(response.body.firstName).toBe('Updated Name');
      expect(response.body.phone).toBe('555-1234');
      expect(personsRepo.updatePerson).toHaveBeenCalled();
    });

    it('should return 404 when updating non-existent person', async () => {
      vi.mocked(personsRepo.updatePerson).mockResolvedValue(undefined);

      const response = await request(app)
        .patch('/api/persons/nonexistent')
        .send({ firstName: 'Updated' })
        .expect(404);

      expect(response.body).toHaveProperty('message');
    });
  });

  describe('GET /api/donors/quadrant', () => {
    it('should return donors for quadrant view', async () => {
      const mockDonors = [
        {
          id: '1',
          firstName: 'John',
          lastName: 'Doe',
          energyScore: 85,
          structureScore: 75,
          totalGiving: 10000,
        },
        {
          id: '2',
          firstName: 'Jane',
          lastName: 'Smith',
          energyScore: 60,
          structureScore: 90,
          totalGiving: 25000,
        },
      ];

      vi.mocked(personsRepo.findDonorsForQuadrant).mockResolvedValue(mockDonors as any);

      const response = await request(app)
        .get('/api/donors/quadrant')
        .expect(200);

      expect(response.body).toHaveLength(2);
      expect(response.body[0]).toHaveProperty('energyScore');
      expect(response.body[0]).toHaveProperty('structureScore');
      expect(personsRepo.findDonorsForQuadrant).toHaveBeenCalled();
    });
  });

  describe('GET /api/donors/:id', () => {
    it('should return donor profile with giving stats', async () => {
      const mockDonorProfile = {
        person: {
          id: '1',
          firstName: 'John',
          lastName: 'Doe',
          primaryEmail: 'john@example.com',
          energyScore: 85,
          structureScore: 75,
        },
        household: null,
        gifts: [],
        interactions: [],
        opportunities: [],
        tasks: [],
        stats: {
          totalGifts: 12,
          totalGiving: 50000,
          avgGiftSize: 4166.67,
          firstGiftDate: new Date('2025-01-01'),
          daysSinceLastGift: 30,
          giftFrequency: 'Monthly donor',
        },
      };

      vi.mocked(personsRepo.findDonorProfile).mockResolvedValue(mockDonorProfile as any);

      const response = await request(app)
        .get('/api/donors/1')
        .expect(200);

      expect(response.body.person.id).toBe('1');
      expect(response.body.stats.totalGiving).toBe(50000);
      expect(response.body.person).toHaveProperty('energyScore');
      expect(personsRepo.findDonorProfile).toHaveBeenCalledWith('1');
    });

    it('should return 404 when donor not found', async () => {
      vi.mocked(personsRepo.findDonorProfile).mockResolvedValue(null);

      const response = await request(app)
        .get('/api/donors/nonexistent')
        .expect(404);

      expect(response.body).toHaveProperty('message');
    });
  });

  describe('PATCH /api/donors/:id/energy', () => {
    it('should update donor energy score', async () => {
      const existingDonor = {
        id: '1',
        firstName: 'John',
        lastName: 'Doe',
        relationshipEnergy: 50,
      };

      const updatedDonor = {
        ...existingDonor,
        relationshipEnergy: 85,
      };

      vi.mocked(personsRepo.findPersonById).mockResolvedValue(existingDonor as any);
      vi.mocked(personsRepo.updatePerson).mockResolvedValue(updatedDonor as any);

      const response = await request(app)
        .patch('/api/donors/1/energy')
        .send({ energyScore: 85 })
        .expect(200);

      expect(response.body.relationshipEnergy).toBe(85);
      expect(personsRepo.updatePerson).toHaveBeenCalledWith('1', { relationshipEnergy: 85 });
    });

    it('should return 400 when energy score is invalid', async () => {
      const response = await request(app)
        .patch('/api/donors/1/energy')
        .send({ energyScore: 150 }) // Invalid: > 100
        .expect(400);

      expect(response.body).toHaveProperty('message');
    });

    it('should return 404 when donor not found', async () => {
      vi.mocked(personsRepo.findPersonById).mockResolvedValue(null);

      const response = await request(app)
        .patch('/api/donors/nonexistent/energy')
        .send({ energyScore: 85 })
        .expect(404);

      expect(response.body).toHaveProperty('message');
    });
  });

  describe('PATCH /api/donors/:id/structure', () => {
    it('should update donor structure score', async () => {
      const existingDonor = {
        id: '1',
        firstName: 'John',
        lastName: 'Doe',
        relationshipStructure: 50,
      };

      const updatedDonor = {
        ...existingDonor,
        relationshipStructure: 75,
      };

      vi.mocked(personsRepo.findPersonById).mockResolvedValue(existingDonor as any);
      vi.mocked(personsRepo.updatePerson).mockResolvedValue(updatedDonor as any);

      const response = await request(app)
        .patch('/api/donors/1/structure')
        .send({ structureScore: 75 })
        .expect(200);

      expect(response.body.relationshipStructure).toBe(75);
      expect(personsRepo.updatePerson).toHaveBeenCalledWith('1', { relationshipStructure: 75 });
    });

    it('should return 400 when structure score is invalid', async () => {
      const response = await request(app)
        .patch('/api/donors/1/structure')
        .send({ structureScore: -10 }) // Invalid: < 0
        .expect(400);

      expect(response.body).toHaveProperty('message');
    });

    it('should return 404 when donor not found', async () => {
      vi.mocked(personsRepo.findPersonById).mockResolvedValue(null);

      const response = await request(app)
        .patch('/api/donors/nonexistent/structure')
        .send({ structureScore: 75 })
        .expect(404);

      expect(response.body).toHaveProperty('message');
    });
  });
});
