import { Grant, InsertGrant } from '@shared/schema';
import * as grantsRepository from './storage/grants.repository';
import { NotFoundError, ValidationError } from '../utils/errors';
import { logger } from '../config/logging';

/**
 * Grants Service
 *
 * Contains business logic for grant management operations.
 * Acts as an intermediary between controllers and repositories.
 */

/**
 * Get all grants with optional filtering by owner and stage
 */
export async function getGrants(ownerId?: string, stage?: string): Promise<Grant[]> {
  logger.debug('Fetching grants', { ownerId, stage });

  // Validate stage if provided
  if (stage) {
    const validStages = ['Research', 'LOI', 'Submitted', 'Awarded', 'Declined', 'ReportDue'];
    if (!validStages.includes(stage)) {
      throw new ValidationError(`Stage must be one of: ${validStages.join(', ')}`);
    }
  }

  const grantsList = await grantsRepository.findGrants(ownerId, stage);

  logger.info('Grants fetched', { count: grantsList.length, ownerId, stage });
  return grantsList;
}

/**
 * Get a single grant by ID
 */
export async function getGrantById(id: string): Promise<Grant> {
  logger.debug('Fetching grant', { id });

  const grant = await grantsRepository.findGrantById(id);

  if (!grant) {
    throw new NotFoundError('Grant');
  }

  return grant;
}

/**
 * Get grants by campaign ID
 */
export async function getGrantsByCampaignId(campaignId: string): Promise<Grant[]> {
  logger.debug('Fetching grants by campaign', { campaignId });

  const grantsList = await grantsRepository.findGrantsByCampaignId(campaignId);

  logger.info('Grants fetched for campaign', { campaignId, count: grantsList.length });
  return grantsList;
}

/**
 * Get grants by funder contact ID
 */
export async function getGrantsByFunderContactId(funderContactId: string): Promise<Grant[]> {
  logger.debug('Fetching grants by funder contact', { funderContactId });

  const grantsList = await grantsRepository.findGrantsByFunderContactId(funderContactId);

  logger.info('Grants fetched for funder contact', { funderContactId, count: grantsList.length });
  return grantsList;
}

/**
 * Create a new grant
 */
export async function createGrant(data: InsertGrant): Promise<Grant> {
  logger.debug('Creating grant', {
    funderName: data.funderName,
    stage: data.stage,
    askAmount: data.askAmount,
  });

  // Business logic validations
  if (!data.funderName || data.funderName.trim().length === 0) {
    throw new ValidationError('Funder name is required');
  }

  // Validate stage
  const validStages = ['Research', 'LOI', 'Submitted', 'Awarded', 'Declined', 'ReportDue'];
  if (data.stage && !validStages.includes(data.stage)) {
    throw new ValidationError(`Stage must be one of: ${validStages.join(', ')}`);
  }

  // Validate ask amount if provided
  if (data.askAmount !== undefined && data.askAmount !== null) {
    const amount = parseFloat(data.askAmount);
    if (amount <= 0) {
      throw new ValidationError('Ask amount must be greater than zero');
    }
  }

  // Validate awarded amount if provided
  if (data.awardedAmount !== undefined && data.awardedAmount !== null) {
    const amount = parseFloat(data.awardedAmount);
    if (amount <= 0) {
      throw new ValidationError('Awarded amount must be greater than zero');
    }
  }

  // Validate that awarded amount doesn't exceed ask amount (warning only)
  if (
    data.askAmount &&
    data.awardedAmount &&
    parseFloat(data.awardedAmount) > parseFloat(data.askAmount)
  ) {
    logger.warn('Awarded amount exceeds ask amount', {
      askAmount: data.askAmount,
      awardedAmount: data.awardedAmount,
    });
  }

  // Validate dates are in logical order
  if (data.loiDueDate && data.applicationDueDate) {
    if (new Date(data.loiDueDate) > new Date(data.applicationDueDate)) {
      throw new ValidationError('LOI due date must be before application due date');
    }
  }

  const grant = await grantsRepository.createGrant(data);

  logger.info('Grant created', {
    id: grant.id,
    funderName: grant.funderName,
    stage: grant.stage,
  });

  return grant;
}

/**
 * Update an existing grant
 */
export async function updateGrant(
  id: string,
  data: Partial<InsertGrant>
): Promise<Grant> {
  logger.debug('Updating grant', { id, updates: Object.keys(data) });

  // Verify grant exists
  const existingGrant = await grantsRepository.findGrantById(id);
  if (!existingGrant) {
    throw new NotFoundError('Grant');
  }

  // Validate stage if being updated
  if (data.stage) {
    const validStages = ['Research', 'LOI', 'Submitted', 'Awarded', 'Declined', 'ReportDue'];
    if (!validStages.includes(data.stage)) {
      throw new ValidationError(`Stage must be one of: ${validStages.join(', ')}`);
    }
  }

  // Validate ask amount if being updated
  if (data.askAmount !== undefined && data.askAmount !== null) {
    const amount = parseFloat(data.askAmount);
    if (amount <= 0) {
      throw new ValidationError('Ask amount must be greater than zero');
    }
  }

  // Validate awarded amount if being updated
  if (data.awardedAmount !== undefined && data.awardedAmount !== null) {
    const amount = parseFloat(data.awardedAmount);
    if (amount <= 0) {
      throw new ValidationError('Awarded amount must be greater than zero');
    }
  }

  // Validate date order if being updated
  if (data.loiDueDate && data.applicationDueDate) {
    if (new Date(data.loiDueDate) > new Date(data.applicationDueDate)) {
      throw new ValidationError('LOI due date must be before application due date');
    }
  }

  const updated = await grantsRepository.updateGrant(id, data);

  if (!updated) {
    throw new NotFoundError('Grant');
  }

  logger.info('Grant updated', {
    id,
    funderName: updated.funderName,
    stage: updated.stage,
  });

  return updated;
}

/**
 * Delete a grant
 */
export async function deleteGrant(id: string): Promise<Grant> {
  logger.debug('Deleting grant', { id });

  const deleted = await grantsRepository.deleteGrant(id);

  if (!deleted) {
    throw new NotFoundError('Grant');
  }

  logger.info('Grant deleted', {
    id,
    funderName: deleted.funderName,
  });

  return deleted;
}
