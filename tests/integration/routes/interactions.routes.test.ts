/**
 * Integration Tests for Interactions Routes
 *
 * Tests the full request/response cycle for interaction tracking endpoints
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import request from 'supertest';
import express from 'express';
import { interactionsRouter } from '../../../server/routes/interactions.routes';
import * as interactionsRepo from '../../../server/services/storage/interactions.repository';
import { errorHandler, notFoundHandler } from '../../../server/middleware/errorHandler';

// Mock the repository
vi.mock('../../../server/services/storage/interactions.repository');

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

describe('Interactions Routes Integration Tests', () => {
  let app: express.Express;

  beforeEach(() => {
    vi.clearAllMocks();

    // Create a fresh Express app for each test
    app = express();
    app.use(express.json());
    app.use('/api/interactions', interactionsRouter);
    app.use(notFoundHandler);
    app.use(errorHandler);
  });

  describe('GET /api/interactions', () => {
    it('should return all interactions without filter', async () => {
      const mockInteractions = [
        {
          id: '1',
          personId: 'p1',
          type: 'meeting',
          occurredAt: new Date('2026-01-10T10:00:00Z'),
          ownerId: 'user1',
          notes: 'Discussed capital campaign plans',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: '2',
          personId: 'p2',
          type: 'call',
          occurredAt: new Date('2026-01-12T14:30:00Z'),
          ownerId: 'user2',
          notes: 'Thank you call for recent gift',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      vi.mocked(interactionsRepo.findInteractions).mockResolvedValue(mockInteractions as any);

      const response = await request(app)
        .get('/api/interactions')
        .expect(200);

      expect(response.body).toHaveLength(2);
      expect(response.body[0].type).toBe('meeting');
      expect(interactionsRepo.findInteractions).toHaveBeenCalledWith(undefined);
    });

    it('should return filtered interactions by personId', async () => {
      const mockInteractions = [
        {
          id: '1',
          personId: 'p1',
          type: 'email_open',
          occurredAt: new Date('2026-01-08T09:15:00Z'),
          source: 'marketing_campaign_123',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: '2',
          personId: 'p1',
          type: 'email_click',
          occurredAt: new Date('2026-01-08T09:20:00Z'),
          source: 'marketing_campaign_123',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      vi.mocked(interactionsRepo.findInteractions).mockResolvedValue(mockInteractions as any);

      const response = await request(app)
        .get('/api/interactions?personId=p1')
        .expect(200);

      expect(response.body).toHaveLength(2);
      expect(response.body[0].personId).toBe('p1');
      expect(response.body[1].personId).toBe('p1');
      expect(interactionsRepo.findInteractions).toHaveBeenCalledWith('p1');
    });

    it('should return empty array when no interactions exist', async () => {
      vi.mocked(interactionsRepo.findInteractions).mockResolvedValue([]);

      const response = await request(app)
        .get('/api/interactions')
        .expect(200);

      expect(response.body).toEqual([]);
      expect(interactionsRepo.findInteractions).toHaveBeenCalled();
    });
  });

  describe('GET /api/interactions/:id', () => {
    it('should return a single interaction', async () => {
      const mockInteraction = {
        id: '1',
        personId: 'p1',
        type: 'event',
        occurredAt: new Date('2026-01-15T18:00:00Z'),
        ownerId: 'user1',
        notes: 'Attended annual gala',
        source: 'event_registration',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      vi.mocked(interactionsRepo.findInteractionById).mockResolvedValue(mockInteraction as any);

      const response = await request(app)
        .get('/api/interactions/1')
        .expect(200);

      expect(response.body.id).toBe('1');
      expect(response.body.type).toBe('event');
      expect(response.body.personId).toBe('p1');
      expect(interactionsRepo.findInteractionById).toHaveBeenCalledWith('1');
    });

    it('should return 404 when interaction not found', async () => {
      vi.mocked(interactionsRepo.findInteractionById).mockResolvedValue(null);

      const response = await request(app)
        .get('/api/interactions/nonexistent')
        .expect(404);

      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toContain('not found');
    });
  });

  describe('POST /api/interactions', () => {
    it('should create a new interaction', async () => {
      const newInteractionData = {
        personId: 'p1',
        type: 'meeting',
        occurredAt: '2026-01-20T15:00:00Z',
        ownerId: 'user1',
        notes: 'Quarterly donor meeting',
      };

      const createdInteraction = {
        ...newInteractionData,
        id: 'new-id',
        occurredAt: new Date('2026-01-20T15:00:00Z'),
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      vi.mocked(interactionsRepo.createInteraction).mockResolvedValue(createdInteraction as any);

      const response = await request(app)
        .post('/api/interactions')
        .send(newInteractionData)
        .expect(201);

      expect(response.body.id).toBe('new-id');
      expect(response.body.type).toBe('meeting');
      expect(response.body.personId).toBe('p1');
      expect(interactionsRepo.createInteraction).toHaveBeenCalled();
    });

    it('should create an interaction with minimum required fields', async () => {
      const newInteractionData = {
        personId: 'p1',
        type: 'note',
        occurredAt: '2026-01-19T12:00:00Z',
      };

      const createdInteraction = {
        ...newInteractionData,
        id: 'new-id',
        occurredAt: new Date('2026-01-19T12:00:00Z'),
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      vi.mocked(interactionsRepo.createInteraction).mockResolvedValue(createdInteraction as any);

      const response = await request(app)
        .post('/api/interactions')
        .send(newInteractionData)
        .expect(201);

      expect(response.body.id).toBe('new-id');
      expect(response.body.type).toBe('note');
      expect(interactionsRepo.createInteraction).toHaveBeenCalled();
    });

    it('should create an email tracking interaction', async () => {
      const newInteractionData = {
        personId: 'p1',
        type: 'email_open',
        occurredAt: '2026-01-18T09:30:00Z',
        source: 'campaign_winter_2026',
        sourceSystem: 'mailchimp',
        sourceRecordId: 'mc_123456',
      };

      const createdInteraction = {
        ...newInteractionData,
        id: 'new-id',
        occurredAt: new Date('2026-01-18T09:30:00Z'),
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      vi.mocked(interactionsRepo.createInteraction).mockResolvedValue(createdInteraction as any);

      const response = await request(app)
        .post('/api/interactions')
        .send(newInteractionData)
        .expect(201);

      expect(response.body.id).toBe('new-id');
      expect(response.body.type).toBe('email_open');
      expect(response.body.sourceSystem).toBe('mailchimp');
      expect(interactionsRepo.createInteraction).toHaveBeenCalled();
    });

    it('should return 400 when personId is missing', async () => {
      const invalidData = {
        type: 'call',
        occurredAt: '2026-01-20T10:00:00Z',
        // personId is missing
      };

      const response = await request(app)
        .post('/api/interactions')
        .send(invalidData)
        .expect(400);

      expect(response.body).toHaveProperty('message');
    });

    it('should return 400 when type is missing', async () => {
      const invalidData = {
        personId: 'p1',
        occurredAt: '2026-01-20T10:00:00Z',
        // type is missing
      };

      const response = await request(app)
        .post('/api/interactions')
        .send(invalidData)
        .expect(400);

      expect(response.body).toHaveProperty('message');
    });

    it('should return 400 when occurredAt is missing', async () => {
      const invalidData = {
        personId: 'p1',
        type: 'meeting',
        // occurredAt is missing
      };

      const response = await request(app)
        .post('/api/interactions')
        .send(invalidData)
        .expect(400);

      expect(response.body).toHaveProperty('message');
    });

    it('should return 400 when type is invalid', async () => {
      const invalidData = {
        personId: 'p1',
        type: 'invalid_type',
        occurredAt: '2026-01-20T10:00:00Z',
      };

      const response = await request(app)
        .post('/api/interactions')
        .send(invalidData)
        .expect(400);

      expect(response.body).toHaveProperty('message');
    });
  });

  describe('PATCH /api/interactions/:id', () => {
    it('should update an existing interaction', async () => {
      const updateData = {
        notes: 'Updated: Discussed major gift opportunity',
        ownerId: 'user2',
      };

      const existingInteraction = {
        id: '1',
        personId: 'p1',
        type: 'meeting',
        occurredAt: new Date('2026-01-15T14:00:00Z'),
        ownerId: 'user1',
        notes: 'Initial meeting',
      };

      const updatedInteraction = {
        id: '1',
        personId: 'p1',
        type: 'meeting',
        occurredAt: new Date('2026-01-15T14:00:00Z'),
        ownerId: 'user2',
        notes: 'Updated: Discussed major gift opportunity',
        updatedAt: new Date(),
      };

      vi.mocked(interactionsRepo.findInteractionById).mockResolvedValue(existingInteraction as any);
      vi.mocked(interactionsRepo.updateInteraction).mockResolvedValue(updatedInteraction as any);

      const response = await request(app)
        .patch('/api/interactions/1')
        .send(updateData)
        .expect(200);

      expect(response.body.notes).toBe('Updated: Discussed major gift opportunity');
      expect(response.body.ownerId).toBe('user2');
      expect(interactionsRepo.updateInteraction).toHaveBeenCalled();
    });

    it('should return 404 when updating non-existent interaction', async () => {
      vi.mocked(interactionsRepo.updateInteraction).mockResolvedValue(null);

      const response = await request(app)
        .patch('/api/interactions/nonexistent')
        .send({ notes: 'Updated notes' })
        .expect(404);

      expect(response.body).toHaveProperty('message');
    });

    it('should return 400 when updating with invalid type', async () => {
      const response = await request(app)
        .patch('/api/interactions/1')
        .send({ type: 'invalid_interaction_type' })
        .expect(400);

      expect(response.body).toHaveProperty('message');
    });
  });

  describe('DELETE /api/interactions/:id', () => {
    it('should delete an interaction', async () => {
      const existingInteraction = {
        id: '1',
        personId: 'p1',
        type: 'note',
        occurredAt: new Date('2026-01-10T08:00:00Z'),
        notes: 'Test interaction to delete',
      };

      vi.mocked(interactionsRepo.deleteInteraction).mockResolvedValue(existingInteraction as any);

      const response = await request(app)
        .delete('/api/interactions/1')
        .expect(200);

      expect(response.body.id).toBe('1');
      expect(interactionsRepo.deleteInteraction).toHaveBeenCalledWith('1');
    });

    it('should return 404 when deleting non-existent interaction', async () => {
      vi.mocked(interactionsRepo.deleteInteraction).mockResolvedValue(null);

      const response = await request(app)
        .delete('/api/interactions/nonexistent')
        .expect(404);

      expect(response.body).toHaveProperty('message');
    });
  });
});
