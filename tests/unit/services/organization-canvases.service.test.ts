/**
 * Unit Tests for Organization Canvases Service
 *
 * Tests business logic for organization canvas management including validation.
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as organizationCanvasesService from '../../../server/services/organization-canvases.service';
import * as organizationCanvasesRepo from '../../../server/services/storage/organization-canvases.repository';
import { NotFoundError, ValidationError } from '../../../server/utils/errors';

// Mock the repository module
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

describe('Organization Canvases Service', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getOrganizationCanvases', () => {
    it('should fetch all organization canvases without filter', async () => {
      const mockCanvases = [
        { id: '1', name: 'Canvas A', ownerId: 'user1' },
        { id: '2', name: 'Canvas B', ownerId: 'user2' },
      ];

      vi.mocked(organizationCanvasesRepo.findOrganizationCanvases).mockResolvedValue(mockCanvases as any);

      const result = await organizationCanvasesService.getOrganizationCanvases();

      expect(result).toEqual(mockCanvases);
      expect(organizationCanvasesRepo.findOrganizationCanvases).toHaveBeenCalledWith(undefined);
    });

    it('should fetch organization canvases with ownerId filter', async () => {
      const mockCanvases = [{ id: '1', name: 'Canvas A', ownerId: 'user1' }];

      vi.mocked(organizationCanvasesRepo.findOrganizationCanvases).mockResolvedValue(mockCanvases as any);

      const result = await organizationCanvasesService.getOrganizationCanvases('user1');

      expect(result).toEqual(mockCanvases);
      expect(organizationCanvasesRepo.findOrganizationCanvases).toHaveBeenCalledWith('user1');
    });
  });

  describe('getOrganizationCanvasById', () => {
    it('should fetch an organization canvas by ID', async () => {
      const mockCanvas = { id: '1', name: 'Test Canvas', ownerId: 'user1' };

      vi.mocked(organizationCanvasesRepo.findOrganizationCanvasById).mockResolvedValue(mockCanvas as any);

      const result = await organizationCanvasesService.getOrganizationCanvasById('1');

      expect(result).toEqual(mockCanvas);
      expect(organizationCanvasesRepo.findOrganizationCanvasById).toHaveBeenCalledWith('1');
    });

    it('should throw NotFoundError when canvas does not exist', async () => {
      vi.mocked(organizationCanvasesRepo.findOrganizationCanvasById).mockResolvedValue(null);

      await expect(organizationCanvasesService.getOrganizationCanvasById('nonexistent'))
        .rejects.toThrow(NotFoundError);
      await expect(organizationCanvasesService.getOrganizationCanvasById('nonexistent'))
        .rejects.toThrow('Organization canvas not found');
    });
  });

  describe('createOrganizationCanvas', () => {
    it('should create an organization canvas with valid data', async () => {
      const canvasData = {
        name: 'New Canvas',
        ownerId: 'user123',
        canvasData: { nodes: [], edges: [] },
      };
      const createdCanvas = { ...canvasData, id: 'new-id' };

      vi.mocked(organizationCanvasesRepo.insertOrganizationCanvas).mockResolvedValue(createdCanvas as any);

      const result = await organizationCanvasesService.createOrganizationCanvas(canvasData as any);

      expect(result).toEqual(createdCanvas);
      expect(organizationCanvasesRepo.insertOrganizationCanvas).toHaveBeenCalledWith(canvasData);
    });

    it('should throw ValidationError when canvas name is missing', async () => {
      const canvasData = {
        name: '',
        ownerId: 'user123',
        canvasData: { nodes: [], edges: [] },
      };

      await expect(organizationCanvasesService.createOrganizationCanvas(canvasData as any))
        .rejects.toThrow(ValidationError);
      await expect(organizationCanvasesService.createOrganizationCanvas(canvasData as any))
        .rejects.toThrow('Canvas name is required');
    });

    it('should throw ValidationError when canvas name is only whitespace', async () => {
      const canvasData = {
        name: '   ',
        ownerId: 'user123',
        canvasData: { nodes: [], edges: [] },
      };

      await expect(organizationCanvasesService.createOrganizationCanvas(canvasData as any))
        .rejects.toThrow(ValidationError);
      await expect(organizationCanvasesService.createOrganizationCanvas(canvasData as any))
        .rejects.toThrow('Canvas name is required');
    });

    it('should throw ValidationError when owner ID is missing', async () => {
      const canvasData = {
        name: 'Test Canvas',
        ownerId: '',
        canvasData: { nodes: [], edges: [] },
      };

      await expect(organizationCanvasesService.createOrganizationCanvas(canvasData as any))
        .rejects.toThrow(ValidationError);
      await expect(organizationCanvasesService.createOrganizationCanvas(canvasData as any))
        .rejects.toThrow('Owner ID is required');
    });
  });

  describe('updateOrganizationCanvas', () => {
    it('should update an organization canvas with valid data', async () => {
      const updateData = { name: 'Updated Canvas' };
      const updatedCanvas = { id: '1', name: 'Updated Canvas', ownerId: 'user1', canvasData: {} };

      vi.mocked(organizationCanvasesRepo.updateOrganizationCanvasById).mockResolvedValue(updatedCanvas as any);

      const result = await organizationCanvasesService.updateOrganizationCanvas('1', updateData);

      expect(result).toEqual(updatedCanvas);
      expect(organizationCanvasesRepo.updateOrganizationCanvasById).toHaveBeenCalledWith('1', updateData);
    });

    it('should throw NotFoundError when canvas does not exist', async () => {
      vi.mocked(organizationCanvasesRepo.updateOrganizationCanvasById).mockResolvedValue(null);

      await expect(organizationCanvasesService.updateOrganizationCanvas('nonexistent', { name: 'New Name' }))
        .rejects.toThrow(NotFoundError);
      await expect(organizationCanvasesService.updateOrganizationCanvas('nonexistent', { name: 'New Name' }))
        .rejects.toThrow('Organization canvas not found');
    });

    it('should throw ValidationError when updating canvas name to empty', async () => {
      await expect(organizationCanvasesService.updateOrganizationCanvas('1', { name: '' }))
        .rejects.toThrow(ValidationError);
      await expect(organizationCanvasesService.updateOrganizationCanvas('1', { name: '' }))
        .rejects.toThrow('Canvas name cannot be empty');
    });

    it('should throw ValidationError when updating owner ID to empty', async () => {
      await expect(organizationCanvasesService.updateOrganizationCanvas('1', { ownerId: '' }))
        .rejects.toThrow(ValidationError);
      await expect(organizationCanvasesService.updateOrganizationCanvas('1', { ownerId: '' }))
        .rejects.toThrow('Owner ID cannot be empty');
    });
  });

  describe('deleteOrganizationCanvas', () => {
    it('should delete an organization canvas', async () => {
      const existingCanvas = { id: '1', name: 'Test Canvas', ownerId: 'user1', canvasData: {} };

      vi.mocked(organizationCanvasesRepo.findOrganizationCanvasById).mockResolvedValue(existingCanvas as any);
      vi.mocked(organizationCanvasesRepo.deleteOrganizationCanvasById).mockResolvedValue(existingCanvas as any);

      await organizationCanvasesService.deleteOrganizationCanvas('1');

      expect(organizationCanvasesRepo.findOrganizationCanvasById).toHaveBeenCalledWith('1');
      expect(organizationCanvasesRepo.deleteOrganizationCanvasById).toHaveBeenCalledWith('1');
    });

    it('should throw NotFoundError when canvas does not exist', async () => {
      vi.mocked(organizationCanvasesRepo.findOrganizationCanvasById).mockResolvedValue(null);

      await expect(organizationCanvasesService.deleteOrganizationCanvas('nonexistent'))
        .rejects.toThrow(NotFoundError);
      await expect(organizationCanvasesService.deleteOrganizationCanvas('nonexistent'))
        .rejects.toThrow('Organization canvas not found');
    });
  });
});
