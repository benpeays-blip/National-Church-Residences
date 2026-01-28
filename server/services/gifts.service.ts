import { Gift, InsertGift } from '@shared/schema';
import * as giftsRepository from './storage/gifts.repository';
import { NotFoundError, ValidationError } from '../utils/errors';
import { logger } from '../config/logging';

/**
 * Gifts Service
 *
 * Contains business logic for gift/donation operations.
 * Acts as an intermediary between controllers and repositories.
 */

/**
 * Get all gifts with optional filtering by person
 */
export async function getGifts(personId?: string): Promise<Gift[]> {
  logger.debug('Fetching gifts', { personId });

  const gifts = await giftsRepository.findGifts(personId);

  logger.info('Gifts fetched', { count: gifts.length, personId });
  return gifts;
}

/**
 * Get a single gift by ID
 */
export async function getGiftById(id: string): Promise<Gift> {
  logger.debug('Fetching gift', { id });

  const gift = await giftsRepository.findGiftById(id);

  if (!gift) {
    throw new NotFoundError('Gift');
  }

  return gift;
}

/**
 * Create a new gift
 */
export async function createGift(data: InsertGift): Promise<Gift> {
  logger.debug('Creating gift', {
    personId: data.personId,
    amount: data.amount,
    type: data.giftType,
  });

  // Business logic validations
  if (!data.personId) {
    throw new ValidationError('Person ID is required');
  }

  if (!data.amount || parseFloat(data.amount) <= 0) {
    throw new ValidationError('Gift amount must be greater than zero');
  }

  if (!data.receivedAt) {
    throw new ValidationError('Received date is required');
  }

  // Validate gift type
  const validGiftTypes = ['one_time', 'major', 'recurring', 'planned', 'pledge', 'in_kind'];
  if (data.giftType && !validGiftTypes.includes(data.giftType)) {
    throw new ValidationError(`Gift type must be one of: ${validGiftTypes.join(', ')}`);
  }

  // Validate currency
  if (data.currency) {
    const validCurrencies = ['USD', 'EUR', 'GBP', 'CAD'];
    if (!validCurrencies.includes(data.currency)) {
      throw new ValidationError(`Currency must be one of: ${validCurrencies.join(', ')}`);
    }
  }

  const gift = await giftsRepository.createGift(data);

  // TODO: Update donor scores after gift creation
  // This should trigger recalculation of:
  // - engagementScore
  // - capacityScore
  // - affinityScore
  // - totalLifetimeGiving
  // - lastGiftDate
  // - lastGiftAmount

  logger.info('Gift created', {
    id: gift.id,
    personId: gift.personId,
    amount: gift.amount,
    type: gift.giftType,
  });

  return gift;
}

/**
 * Update an existing gift
 */
export async function updateGift(
  id: string,
  data: Partial<InsertGift>
): Promise<Gift> {
  logger.debug('Updating gift', { id, updates: Object.keys(data) });

  // Verify gift exists
  const existingGift = await giftsRepository.findGiftById(id);
  if (!existingGift) {
    throw new NotFoundError('Gift');
  }

  // Validate amount if being updated
  if (data.amount !== undefined && parseFloat(data.amount) <= 0) {
    throw new ValidationError('Gift amount must be greater than zero');
  }

  // Validate gift type if being updated
  if (data.giftType) {
    const validGiftTypes = ['one_time', 'major', 'recurring', 'planned', 'pledge', 'in_kind'];
    if (!validGiftTypes.includes(data.giftType)) {
      throw new ValidationError(`Gift type must be one of: ${validGiftTypes.join(', ')}`);
    }
  }

  const updated = await giftsRepository.updateGift(id, data);

  if (!updated) {
    throw new NotFoundError('Gift');
  }

  // TODO: Update donor scores after gift update

  logger.info('Gift updated', {
    id,
    personId: updated.personId,
    amount: updated.amount,
  });

  return updated;
}

/**
 * Delete a gift
 */
export async function deleteGift(id: string): Promise<Gift> {
  logger.debug('Deleting gift', { id });

  const deleted = await giftsRepository.deleteGift(id);

  if (!deleted) {
    throw new NotFoundError('Gift');
  }

  // TODO: Update donor scores after gift deletion

  logger.info('Gift deleted', {
    id,
    personId: deleted.personId,
    amount: deleted.amount,
  });

  return deleted;
}

/**
 * Get total giving for a person
 */
export async function getTotalGivingByPerson(personId: string): Promise<number> {
  logger.debug('Calculating total giving', { personId });

  const total = await giftsRepository.getTotalGivingByPerson(personId);

  logger.info('Total giving calculated', { personId, total });
  return total;
}
