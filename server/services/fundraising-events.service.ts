import { FundraisingEvent } from '@shared/schema';
import * as fundraisingEventsRepository from './storage/fundraising-events.repository';
import { logger } from '../config/logging';

/**
 * Fundraising Events Service
 *
 * Contains business logic for fundraising event operations.
 */

export async function getFundraisingEvents(): Promise<FundraisingEvent[]> {
  logger.debug('Fetching fundraising events');
  const events = await fundraisingEventsRepository.findFundraisingEvents();
  logger.info('Fundraising events fetched', { count: events.length });
  return events;
}
