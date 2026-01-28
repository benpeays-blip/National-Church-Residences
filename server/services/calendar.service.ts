import { CalendarEvent, InsertCalendarEvent } from '@shared/schema';
import * as calendarRepository from './storage/calendar.repository';
import { NotFoundError, ValidationError } from '../utils/errors';
import { logger } from '../config/logging';

/**
 * Calendar Service
 *
 * Contains business logic for calendar event operations.
 * Acts as an intermediary between controllers and repositories.
 */

/**
 * Get all calendar events with optional filtering
 */
export async function getCalendarEvents(
  userId?: string,
  startDate?: Date,
  endDate?: Date
): Promise<CalendarEvent[]> {
  logger.debug('Fetching calendar events', { userId, startDate, endDate });

  const events = await calendarRepository.findCalendarEvents(userId, startDate, endDate);

  logger.info('Calendar events fetched', { count: events.length });
  return events;
}

/**
 * Get a single calendar event by ID
 */
export async function getCalendarEventById(id: string): Promise<CalendarEvent> {
  logger.debug('Fetching calendar event', { id });

  const event = await calendarRepository.findCalendarEventById(id);

  if (!event) {
    throw new NotFoundError('Calendar event');
  }

  return event;
}

/**
 * Create a new calendar event
 */
export async function createCalendarEvent(data: InsertCalendarEvent): Promise<CalendarEvent> {
  logger.debug('Creating calendar event', { title: data.title, userId: data.userId });

  // Business logic validations
  if (!data.title || data.title.trim().length === 0) {
    throw new ValidationError('Title is required');
  }

  if (!data.scheduledAt) {
    throw new ValidationError('Scheduled time is required');
  }

  const event = await calendarRepository.createCalendarEvent(data);

  logger.info('Calendar event created', { id: event.id, title: event.title });
  return event;
}

/**
 * Update an existing calendar event
 */
export async function updateCalendarEvent(
  id: string,
  data: Partial<InsertCalendarEvent>
): Promise<CalendarEvent> {
  logger.debug('Updating calendar event', { id, updates: Object.keys(data) });

  // Verify event exists
  const existingEvent = await calendarRepository.findCalendarEventById(id);
  if (!existingEvent) {
    throw new NotFoundError('Calendar event');
  }

  const updated = await calendarRepository.updateCalendarEvent(id, data);

  if (!updated) {
    throw new NotFoundError('Calendar event');
  }

  logger.info('Calendar event updated', { id, title: updated.title });
  return updated;
}

/**
 * Delete a calendar event
 */
export async function deleteCalendarEvent(id: string): Promise<CalendarEvent> {
  logger.debug('Deleting calendar event', { id });

  const deleted = await calendarRepository.deleteCalendarEvent(id);

  if (!deleted) {
    throw new NotFoundError('Calendar event');
  }

  logger.info('Calendar event deleted', { id, title: deleted.title });
  return deleted;
}

/**
 * Get calendar events for a specific person
 */
export async function getCalendarEventsByPersonId(personId: string): Promise<CalendarEvent[]> {
  logger.debug('Fetching calendar events by person', { personId });

  const events = await calendarRepository.findCalendarEventsByPersonId(personId);

  logger.info('Calendar events fetched for person', { personId, count: events.length });
  return events;
}
