import * as organizationCanvasesRepo from './storage/organization-canvases.repository';
import type { OrganizationCanvas, InsertOrganizationCanvas } from '@shared/schema';
import { logger } from '../config/logging';
import { NotFoundError, ValidationError } from '../utils/errors';

/**
 * Organization Canvases Service
 *
 * Business logic for organization canvas management.
 */

export async function getOrganizationCanvases(
  ownerId?: string
): Promise<OrganizationCanvas[]> {
  logger.debug('Fetching organization canvases', { ownerId });

  const canvases = await organizationCanvasesRepo.findOrganizationCanvases(ownerId);

  logger.info('Organization canvases fetched', {
    count: canvases.length,
    ownerId,
  });

  return canvases;
}

export async function getOrganizationCanvasById(
  id: string
): Promise<OrganizationCanvas> {
  logger.debug('Fetching organization canvas', { id });

  const canvas = await organizationCanvasesRepo.findOrganizationCanvasById(id);

  if (!canvas) {
    logger.warn('Organization canvas not found', { id });
    throw new NotFoundError('Organization canvas not found');
  }

  logger.info('Organization canvas fetched', { id });
  return canvas;
}

export async function createOrganizationCanvas(
  data: InsertOrganizationCanvas
): Promise<OrganizationCanvas> {
  logger.debug('Creating organization canvas', {
    name: data.name,
    ownerId: data.ownerId,
  });

  // Validate required fields
  if (!data.name || data.name.trim() === '') {
    throw new ValidationError('Canvas name is required');
  }

  if (!data.ownerId || data.ownerId.trim() === '') {
    throw new ValidationError('Owner ID is required');
  }

  const canvas = await organizationCanvasesRepo.insertOrganizationCanvas(data);

  logger.info('Organization canvas created', {
    id: canvas.id,
    name: canvas.name,
  });

  return canvas;
}

export async function updateOrganizationCanvas(
  id: string,
  data: Partial<InsertOrganizationCanvas>
): Promise<OrganizationCanvas> {
  logger.debug('Updating organization canvas', { id });

  // Validate canvas name if provided
  if (data.name !== undefined && data.name.trim() === '') {
    throw new ValidationError('Canvas name cannot be empty');
  }

  // Validate owner ID if provided
  if (data.ownerId !== undefined && data.ownerId !== null && data.ownerId.trim() === '') {
    throw new ValidationError('Owner ID cannot be empty');
  }

  const canvas = await organizationCanvasesRepo.updateOrganizationCanvasById(id, data);

  if (!canvas) {
    logger.warn('Organization canvas not found for update', { id });
    throw new NotFoundError('Organization canvas not found');
  }

  logger.info('Organization canvas updated', { id });
  return canvas;
}

export async function deleteOrganizationCanvas(id: string): Promise<void> {
  logger.debug('Deleting organization canvas', { id });

  // Check if canvas exists first
  const existing = await organizationCanvasesRepo.findOrganizationCanvasById(id);
  if (!existing) {
    logger.warn('Organization canvas not found for deletion', { id });
    throw new NotFoundError('Organization canvas not found');
  }

  await organizationCanvasesRepo.deleteOrganizationCanvasById(id);

  logger.info('Organization canvas deleted', { id });
}
