import { Opportunity, InsertOpportunity } from '@shared/schema';
import * as opportunitiesRepository from './storage/opportunities.repository';
import { NotFoundError, ValidationError } from '../utils/errors';
import { logger } from '../config/logging';

/**
 * Opportunities Service
 *
 * Contains business logic for fundraising opportunity operations.
 * Acts as an intermediary between controllers and repositories.
 */

/**
 * Get all opportunities with optional filtering by owner
 */
export async function getOpportunities(ownerId?: string) {
  logger.debug('Fetching opportunities', { ownerId });

  const opportunities = await opportunitiesRepository.findOpportunities(ownerId);

  logger.info('Opportunities fetched', { count: opportunities.length, ownerId });
  return opportunities;
}

/**
 * Get a single opportunity by ID
 */
export async function getOpportunityById(id: string): Promise<Opportunity> {
  logger.debug('Fetching opportunity', { id });

  const opportunity = await opportunitiesRepository.findOpportunityById(id);

  if (!opportunity) {
    throw new NotFoundError('Opportunity');
  }

  return opportunity;
}

/**
 * Get opportunities by person ID
 */
export async function getOpportunitiesByPersonId(personId: string): Promise<Opportunity[]> {
  logger.debug('Fetching opportunities by person', { personId });

  const opportunities = await opportunitiesRepository.findOpportunitiesByPersonId(personId);

  logger.info('Opportunities fetched for person', { personId, count: opportunities.length });
  return opportunities;
}

/**
 * Create a new opportunity
 */
export async function createOpportunity(data: InsertOpportunity): Promise<Opportunity> {
  logger.debug('Creating opportunity', {
    personId: data.personId,
    askAmount: data.askAmount,
    stage: data.stage,
  });

  // Business logic validations
  if (!data.personId) {
    throw new ValidationError('Person ID is required');
  }

  // Validate ask amount if provided
  if (data.askAmount && parseFloat(data.askAmount) <= 0) {
    throw new ValidationError('Ask amount must be greater than zero');
  }

  // Validate stage
  const validStages = ['Prospect', 'Cultivation', 'Ask', 'Steward', 'Renewal'];
  if (data.stage && !validStages.includes(data.stage)) {
    throw new ValidationError(`Stage must be one of: ${validStages.join(', ')}`);
  }

  // Validate probability (0-100)
  if (data.probability !== undefined && data.probability !== null) {
    const prob = parseInt(data.probability.toString());
    if (prob < 0 || prob > 100) {
      throw new ValidationError('Probability must be between 0 and 100');
    }
  }

  // Validate close date is in the future (warning, not error)
  if (data.closeDate && new Date(data.closeDate) < new Date()) {
    logger.warn('Opportunity created with past close date', {
      closeDate: data.closeDate,
    });
  }

  const opportunity = await opportunitiesRepository.createOpportunity(data);

  logger.info('Opportunity created', {
    id: opportunity.id,
    personId: opportunity.personId,
    askAmount: opportunity.askAmount,
    stage: opportunity.stage,
  });

  return opportunity;
}

/**
 * Update an existing opportunity
 */
export async function updateOpportunity(
  id: string,
  data: Partial<InsertOpportunity>
): Promise<Opportunity> {
  logger.debug('Updating opportunity', { id, updates: Object.keys(data) });

  // Verify opportunity exists
  const existingOpportunity = await opportunitiesRepository.findOpportunityById(id);
  if (!existingOpportunity) {
    throw new NotFoundError('Opportunity');
  }

  // Validate ask amount if being updated
  if (data.askAmount !== undefined && data.askAmount !== null && parseFloat(data.askAmount) <= 0) {
    throw new ValidationError('Ask amount must be greater than zero');
  }

  // Validate stage if being updated
  if (data.stage) {
    const validStages = ['Prospect', 'Cultivation', 'Ask', 'Steward', 'Renewal'];
    if (!validStages.includes(data.stage)) {
      throw new ValidationError(`Stage must be one of: ${validStages.join(', ')}`);
    }
  }

  // Validate probability if being updated
  if (data.probability !== undefined && data.probability !== null) {
    const prob = parseInt(data.probability.toString());
    if (prob < 0 || prob > 100) {
      throw new ValidationError('Probability must be between 0 and 100');
    }
  }

  const updated = await opportunitiesRepository.updateOpportunity(id, data);

  if (!updated) {
    throw new NotFoundError('Opportunity');
  }

  logger.info('Opportunity updated', {
    id,
    personId: updated.personId,
    stage: updated.stage,
  });

  return updated;
}

/**
 * Delete an opportunity
 */
export async function deleteOpportunity(id: string): Promise<Opportunity> {
  logger.debug('Deleting opportunity', { id });

  const deleted = await opportunitiesRepository.deleteOpportunity(id);

  if (!deleted) {
    throw new NotFoundError('Opportunity');
  }

  logger.info('Opportunity deleted', {
    id,
    personId: deleted.personId,
    askAmount: deleted.askAmount,
  });

  return deleted;
}

/**
 * Get opportunities by stage
 */
export async function getOpportunitiesByStage(stage: string): Promise<Opportunity[]> {
  logger.debug('Fetching opportunities by stage', { stage });

  // Validate stage
  const validStages = [
    'prospect',
    'cultivation',
    'solicitation',
    'stewardship',
    'closed_won',
    'closed_lost',
  ];
  if (!validStages.includes(stage)) {
    throw new ValidationError(`Stage must be one of: ${validStages.join(', ')}`);
  }

  const opportunities = await opportunitiesRepository.findOpportunitiesByStage(stage);

  logger.info('Opportunities fetched by stage', { stage, count: opportunities.length });
  return opportunities;
}
