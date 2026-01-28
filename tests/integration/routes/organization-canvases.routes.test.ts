/**
 * Integration Tests for Organization Canvases Routes
 *
 * Tests the full request/response cycle for organization canvas endpoints
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import request from 'supertest';
import express from 'express';
import { organizationCanvasesRouter } from '../../../server/routes/organization-canvases.routes';
import * as organizationCanvasesRepo from '../../../server/services/storage/organization-canvases.repository';
import { errorHandler, notFoundHandler } from '../../../server/middleware/errorHandler';

// Mock the repository
vi.mock('../../../server/services/storage/organization-canvases.repository');

// Mock the logger
vi.mock('../../../server/config/logging', () => ({
  logger: {
    debug: vi.fn(),
    info: vi.fn(),
    warn: vi.fn(),
    error: vi.fn(),
  },
}));

describe('Organization Canvases Routes Integration Tests', () => {
  let app: express.Express;

  beforeEach(() => {
    vi.clearAllMocks();

    // Create a fresh Express app for each test
    app = express();
    app.use(express.json());
    app.use('/api/organization-canvases', organizationCanvasesRouter);
    app.use(notFoundHandler);
    app.use(errorHandler);
  });

  describe('GET /api/organization-canvases', () => {
    it('should return all organization canvases', async () => {
      const mockCanvases = [
        {
          id: '1',
          name: 'Canvas A',
          ownerId: 'user1',
          canvasData: { nodes: [], edges: [] },
          isDefault: false,
          updatedAt: new Date('2026-01-10'),
        },
        {
          id: '2',
          name: 'Canvas B',
          ownerId: 'user2',
          canvasData: { nodes: [], edges: [] },
          isDefault: false,
          updatedAt: new Date('2026-01-09'),
        },
      ];

      vi.mocked(organizationCanvasesRepo.findOrganizationCanvases).mockResolvedValue(mockCanvases as any);

      const response = await request(app)
        .get('/api/organization-canvases')
        .expect(200);

      expect(response.body).toHaveLength(2);
      expect(response.body[0].name).toBe('Canvas A');
      expect(organizationCanvasesRepo.findOrganizationCanvases).toHaveBeenCalledWith(undefined);
    });

    it('should return organization canvases filtered by ownerId', async () => {
      const mockCanvases = [
        {
          id: '1',
          name: 'My Canvas',
          ownerId: 'user123',
          canvasData: { nodes: [], edges: [] },
          isDefault: false,
          updatedAt: new Date('2026-01-10'),
        },
      ];

      vi.mocked(organizationCanvasesRepo.findOrganizationCanvases).mockResolvedValue(mockCanvases as any);

      const response = await request(app)
        .get('/api/organization-canvases?ownerId=user123')
        .expect(200);

      expect(response.body).toHaveLength(1);
      expect(response.body[0].ownerId).toBe('user123');
      expect(organizationCanvasesRepo.findOrganizationCanvases).toHaveBeenCalledWith('user123');
    });
  });

  describe('GET /api/organization-canvases/:id', () => {
    it('should return a single organization canvas', async () => {
      const mockCanvas = {
        id: '1',
        name: 'Test Canvas',
        ownerId: 'user1',
        description: 'Test description',
        canvasData: { nodes: [], edges: [] },
        isDefault: false,
        updatedAt: new Date('2026-01-10'),
      };

      vi.mocked(organizationCanvasesRepo.findOrganizationCanvasById).mockResolvedValue(mockCanvas as any);

      const response = await request(app)
        .get('/api/organization-canvases/1')
        .expect(200);

      expect(response.body.id).toBe('1');
      expect(response.body.name).toBe('Test Canvas');
      expect(organizationCanvasesRepo.findOrganizationCanvasById).toHaveBeenCalledWith('1');
    });

    it('should return 404 when canvas not found', async () => {
      vi.mocked(organizationCanvasesRepo.findOrganizationCanvasById).mockResolvedValue(null);

      const response = await request(app)
        .get('/api/organization-canvases/nonexistent')
        .expect(404);

      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toContain('not found');
    });
  });

  describe('POST /api/organization-canvases', () => {
    it('should create a new organization canvas', async () => {
      const newCanvasData = {
        name: 'New Organization Canvas',
        ownerId: 'user123',
        description: 'Test canvas description',
        canvasData: {
          nodes: [],
          edges: [],
          viewport: { x: 0, y: 0, zoom: 1 }
        },
      };

      const createdCanvas = {
        ...newCanvasData,
        id: 'new-id',
        isDefault: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      vi.mocked(organizationCanvasesRepo.insertOrganizationCanvas).mockResolvedValue(createdCanvas as any);

      const response = await request(app)
        .post('/api/organization-canvases')
        .send(newCanvasData)
        .expect(200);

      expect(response.body.id).toBe('new-id');
      expect(response.body.name).toBe('New Organization Canvas');
      expect(organizationCanvasesRepo.insertOrganizationCanvas).toHaveBeenCalled();
    });

    it('should return 400 when name is missing', async () => {
      const invalidData = {
        ownerId: 'user123',
        canvasData: { nodes: [], edges: [] },
        // name is missing
      };

      const response = await request(app)
        .post('/api/organization-canvases')
        .send(invalidData)
        .expect(400);

      expect(response.body).toHaveProperty('message');
    });

    it('should return 400 when canvasData is missing', async () => {
      const invalidData = {
        name: 'Test Canvas',
        ownerId: 'user123',
        // canvasData is missing
      };

      const response = await request(app)
        .post('/api/organization-canvases')
        .send(invalidData)
        .expect(400);

      expect(response.body).toHaveProperty('message');
    });
  });

  describe('PUT /api/organization-canvases/:id', () => {
    it('should update an existing organization canvas', async () => {
      const updateData = {
        name: 'Updated Canvas Name',
        description: 'Updated description',
      };

      const updatedCanvas = {
        id: '1',
        name: 'Updated Canvas Name',
        description: 'Updated description',
        ownerId: 'user1',
        canvasData: { nodes: [], edges: [] },
        isDefault: false,
        updatedAt: new Date(),
      };

      vi.mocked(organizationCanvasesRepo.updateOrganizationCanvasById).mockResolvedValue(updatedCanvas as any);

      const response = await request(app)
        .put('/api/organization-canvases/1')
        .send(updateData)
        .expect(200);

      expect(response.body.name).toBe('Updated Canvas Name');
      expect(organizationCanvasesRepo.updateOrganizationCanvasById).toHaveBeenCalledWith(
        '1',
        expect.objectContaining(updateData)
      );
    });

    it('should return 404 when updating non-existent canvas', async () => {
      vi.mocked(organizationCanvasesRepo.updateOrganizationCanvasById).mockResolvedValue(null);

      const response = await request(app)
        .put('/api/organization-canvases/nonexistent')
        .send({ name: 'Updated Name' })
        .expect(404);

      expect(response.body).toHaveProperty('message');
    });
  });

  describe('DELETE /api/organization-canvases/:id', () => {
    it('should delete an organization canvas', async () => {
      const existingCanvas = {
        id: '1',
        name: 'Canvas to Delete',
        ownerId: 'user1',
        canvasData: { nodes: [], edges: [] },
        isDefault: false,
      };

      vi.mocked(organizationCanvasesRepo.findOrganizationCanvasById).mockResolvedValue(existingCanvas as any);
      vi.mocked(organizationCanvasesRepo.deleteOrganizationCanvasById).mockResolvedValue(existingCanvas as any);

      const response = await request(app)
        .delete('/api/organization-canvases/1')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(organizationCanvasesRepo.deleteOrganizationCanvasById).toHaveBeenCalledWith('1');
    });

    it('should return 404 when deleting non-existent canvas', async () => {
      vi.mocked(organizationCanvasesRepo.findOrganizationCanvasById).mockResolvedValue(null);

      const response = await request(app)
        .delete('/api/organization-canvases/nonexistent')
        .expect(404);

      expect(response.body).toHaveProperty('message');
    });
  });
});
