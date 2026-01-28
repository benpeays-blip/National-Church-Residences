/**
 * Integration Tests for Grants Routes
 *
 * Tests the full request/response cycle for grant management endpoints
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import request from 'supertest';
import express from 'express';
import { grantsRouter } from '../../../server/routes/grants.routes';
import * as grantsRepo from '../../../server/services/storage/grants.repository';
import { errorHandler, notFoundHandler } from '../../../server/middleware/errorHandler';

// Mock the repository
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

// Mock authentication middleware
vi.mock('../../../server/middleware/auth', () => ({
  isAuthenticated: (req: any, res: any, next: any) => next(),
}));

describe('Grants Routes Integration Tests', () => {
  let app: express.Express;

  beforeEach(() => {
    vi.clearAllMocks();

    // Create a fresh Express app for each test
    app = express();
    app.use(express.json());
    app.use('/api/grants', grantsRouter);
    app.use(notFoundHandler);
    app.use(errorHandler);
  });

  describe('GET /api/grants', () => {
    it('should return all grants without filters', async () => {
      const mockGrants = [
        {
          id: '1',
          funderName: 'Smith Foundation',
          askAmount: '50000',
          stage: 'Research',
          applicationDueDate: new Date('2026-03-01'),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: '2',
          funderName: 'Johnson Trust',
          askAmount: '75000',
          stage: 'Submitted',
          applicationDueDate: new Date('2026-04-15'),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      vi.mocked(grantsRepo.findGrants).mockResolvedValue(mockGrants as any);

      const response = await request(app)
        .get('/api/grants')
        .expect(200);

      expect(response.body).toHaveLength(2);
      expect(response.body[0].funderName).toBe('Smith Foundation');
      expect(grantsRepo.findGrants).toHaveBeenCalledWith(undefined, undefined);
    });

    it('should return filtered grants by ownerId', async () => {
      const mockGrants = [
        {
          id: '1',
          funderName: 'Smith Foundation',
          ownerId: 'user1',
          stage: 'Research',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      vi.mocked(grantsRepo.findGrants).mockResolvedValue(mockGrants as any);

      const response = await request(app)
        .get('/api/grants?ownerId=user1')
        .expect(200);

      expect(response.body).toHaveLength(1);
      expect(response.body[0].ownerId).toBe('user1');
      expect(grantsRepo.findGrants).toHaveBeenCalledWith('user1', undefined);
    });

    it('should return filtered grants by stage', async () => {
      const mockGrants = [
        {
          id: '1',
          funderName: 'Smith Foundation',
          stage: 'Submitted',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      vi.mocked(grantsRepo.findGrants).mockResolvedValue(mockGrants as any);

      const response = await request(app)
        .get('/api/grants?stage=Submitted')
        .expect(200);

      expect(response.body).toHaveLength(1);
      expect(response.body[0].stage).toBe('Submitted');
      expect(grantsRepo.findGrants).toHaveBeenCalledWith(undefined, 'Submitted');
    });
  });

  describe('GET /api/grants/:id', () => {
    it('should return a single grant', async () => {
      const mockGrant = {
        id: '1',
        funderName: 'Medical Foundation',
        askAmount: '100000',
        stage: 'Awarded',
        purpose: 'Improve healthcare access in rural communities',
        applicationDueDate: new Date('2026-02-15'),
        decisionDate: new Date('2026-03-01'),
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      vi.mocked(grantsRepo.findGrantById).mockResolvedValue(mockGrant as any);

      const response = await request(app)
        .get('/api/grants/1')
        .expect(200);

      expect(response.body.id).toBe('1');
      expect(response.body.funderName).toBe('Medical Foundation');
      expect(response.body.stage).toBe('Awarded');
      expect(grantsRepo.findGrantById).toHaveBeenCalledWith('1');
    });

    it('should return 404 when grant not found', async () => {
      vi.mocked(grantsRepo.findGrantById).mockResolvedValue(null);

      const response = await request(app)
        .get('/api/grants/nonexistent')
        .expect(404);

      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toContain('not found');
    });
  });

  describe('POST /api/grants', () => {
    it('should create a new grant', async () => {
      const newGrantData = {
        funderName: 'Science Foundation',
        ownerId: 'user1',
        stage: 'Research',
        askAmount: '50000',
        applicationDueDate: '2026-06-01',
        purpose: 'Fund research into new treatments',
      };

      const createdGrant = {
        ...newGrantData,
        id: 'new-id',
        askAmount: '50000',
        applicationDueDate: new Date('2026-06-01'),
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      vi.mocked(grantsRepo.createGrant).mockResolvedValue(createdGrant as any);

      const response = await request(app)
        .post('/api/grants')
        .send(newGrantData)
        .expect(201);

      expect(response.body.id).toBe('new-id');
      expect(response.body.funderName).toBe('Science Foundation');
      expect(grantsRepo.createGrant).toHaveBeenCalled();
    });

    it('should return 400 when funderName is missing', async () => {
      const invalidData = {
        ownerId: 'user1',
        stage: 'Research',
        askAmount: '50000',
        // funderName is missing
      };

      const response = await request(app)
        .post('/api/grants')
        .send(invalidData)
        .expect(400);

      expect(response.body).toHaveProperty('message');
    });

    it('should return 400 when stage is invalid', async () => {
      const invalidData = {
        funderName: 'Science Foundation',
        ownerId: 'user1',
        stage: 'invalid_stage',
        askAmount: '50000',
      };

      const response = await request(app)
        .post('/api/grants')
        .send(invalidData)
        .expect(400);

      expect(response.body).toHaveProperty('message');
    });
  });

  describe('PATCH /api/grants/:id', () => {
    it('should update an existing grant', async () => {
      const updateData = {
        stage: 'Awarded',
        awardedAmount: '45000',
        notes: 'Grant approved with reduced amount',
      };

      const existingGrant = {
        id: '1',
        funderName: 'Science Foundation',
        stage: 'Submitted',
        askAmount: '50000',
      };

      const updatedGrant = {
        id: '1',
        funderName: 'Science Foundation',
        stage: 'Awarded',
        askAmount: '50000',
        awardedAmount: '45000',
        notes: 'Grant approved with reduced amount',
        updatedAt: new Date(),
      };

      vi.mocked(grantsRepo.findGrantById).mockResolvedValue(existingGrant as any);
      vi.mocked(grantsRepo.updateGrant).mockResolvedValue(updatedGrant as any);

      const response = await request(app)
        .patch('/api/grants/1')
        .send(updateData)
        .expect(200);

      expect(response.body.stage).toBe('Awarded');
      expect(response.body.awardedAmount).toBe('45000');
      expect(response.body.notes).toBe('Grant approved with reduced amount');
      expect(grantsRepo.updateGrant).toHaveBeenCalled();
    });

    it('should return 404 when updating non-existent grant', async () => {
      vi.mocked(grantsRepo.updateGrant).mockResolvedValue(null);

      const response = await request(app)
        .patch('/api/grants/nonexistent')
        .send({ stage: 'Awarded' })
        .expect(404);

      expect(response.body).toHaveProperty('message');
    });

    it('should return 400 when updating with invalid stage', async () => {
      const response = await request(app)
        .patch('/api/grants/1')
        .send({ stage: 'invalid_stage' })
        .expect(400);

      expect(response.body).toHaveProperty('message');
    });
  });

  describe('DELETE /api/grants/:id', () => {
    it('should delete a grant', async () => {
      const existingGrant = {
        id: '1',
        funderName: 'Foundation',
        stage: 'Declined',
        askAmount: '10000',
      };

      vi.mocked(grantsRepo.deleteGrant).mockResolvedValue(existingGrant as any);

      const response = await request(app)
        .delete('/api/grants/1')
        .expect(200);

      expect(response.body.id).toBe('1');
      expect(grantsRepo.deleteGrant).toHaveBeenCalledWith('1');
    });

    it('should return 404 when deleting non-existent grant', async () => {
      vi.mocked(grantsRepo.deleteGrant).mockResolvedValue(null);

      const response = await request(app)
        .delete('/api/grants/nonexistent')
        .expect(404);

      expect(response.body).toHaveProperty('message');
    });
  });
});
