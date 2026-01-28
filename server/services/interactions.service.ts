import { Interaction, InsertInteraction } from '@shared/schema';
import * as interactionsRepository from './storage/interactions.repository';
import { NotFoundError, ValidationError } from '../utils/errors';
import { logger } from '../config/logging';

/**
 * Interactions Service
 *
 * Contains business logic for interaction tracking operations.
 */

export async function getInteractions(personId?: string): Promise<Interaction[]> {
  logger.debug('Fetching interactions', { personId });
  const interactionsList = await interactionsRepository.findInteractions(personId);
  logger.info('Interactions fetched', { count: interactionsList.length, personId });
  return interactionsList;
}

export async function getInteractionById(id: string): Promise<Interaction> {
  logger.debug('Fetching interaction', { id });
  const interaction = await interactionsRepository.findInteractionById(id);

  if (!interaction) {
    throw new NotFoundError('Interaction');
  }

  return interaction;
}

export async function getInteractionsByPersonId(personId: string): Promise<Interaction[]> {
  logger.debug('Fetching interactions by person', { personId });
  const interactionsList = await interactionsRepository.findInteractionsByPersonId(personId);
  logger.info('Interactions fetched for person', { personId, count: interactionsList.length });
  return interactionsList;
}

export async function createInteraction(data: InsertInteraction): Promise<Interaction> {
  logger.debug('Creating interaction', { personId: data.personId, type: data.type });

  if (!data.personId) {
    throw new ValidationError('Person ID is required');
  }

  if (!data.type) {
    throw new ValidationError('Interaction type is required');
  }

  const validTypes = ['email_open', 'email_click', 'meeting', 'call', 'event', 'note'];
  if (!validTypes.includes(data.type)) {
    throw new ValidationError(`Type must be one of: ${validTypes.join(', ')}`);
  }

  if (!data.occurredAt) {
    throw new ValidationError('Occurred date/time is required');
  }

  const interaction = await interactionsRepository.createInteraction(data);
  logger.info('Interaction created', { id: interaction.id, personId: interaction.personId, type: interaction.type });
  return interaction;
}

export async function updateInteraction(id: string, data: Partial<InsertInteraction>): Promise<Interaction> {
  logger.debug('Updating interaction', { id, updates: Object.keys(data) });

  const existingInteraction = await interactionsRepository.findInteractionById(id);
  if (!existingInteraction) {
    throw new NotFoundError('Interaction');
  }

  if (data.type) {
    const validTypes = ['email_open', 'email_click', 'meeting', 'call', 'event', 'note'];
    if (!validTypes.includes(data.type)) {
      throw new ValidationError(`Type must be one of: ${validTypes.join(', ')}`);
    }
  }

  const updated = await interactionsRepository.updateInteraction(id, data);
  if (!updated) {
    throw new NotFoundError('Interaction');
  }

  logger.info('Interaction updated', { id, personId: updated.personId, type: updated.type });
  return updated;
}

export async function deleteInteraction(id: string): Promise<Interaction> {
  logger.debug('Deleting interaction', { id });
  const deleted = await interactionsRepository.deleteInteraction(id);

  if (!deleted) {
    throw new NotFoundError('Interaction');
  }

  logger.info('Interaction deleted', { id, personId: deleted.personId });
  return deleted;
}
