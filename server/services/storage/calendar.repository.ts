import { db } from '../../db';
import { calendarEvents, type CalendarEvent, type InsertCalendarEvent } from '@shared/schema';
import { eq, and, gte, lte } from 'drizzle-orm';

/**
 * Calendar Repository
 *
 * Handles all database operations for calendar events.
 * Provides a clean abstraction over Drizzle ORM.
 */

/**
 * Get all calendar events, optionally filtered by user ID and date range
 */
export async function findCalendarEvents(
  userId?: string,
  startDate?: Date,
  endDate?: Date
): Promise<CalendarEvent[]> {
  const conditions = [];

  if (userId) {
    conditions.push(eq(calendarEvents.userId, userId));
  }

  if (startDate) {
    conditions.push(gte(calendarEvents.scheduledAt, startDate));
  }

  if (endDate) {
    conditions.push(lte(calendarEvents.scheduledAt, endDate));
  }

  return db
    .select()
    .from(calendarEvents)
    .where(conditions.length > 0 ? and(...conditions) : undefined)
    .orderBy(calendarEvents.scheduledAt);
}

/**
 * Get a single calendar event by ID
 */
export async function findCalendarEventById(id: string): Promise<CalendarEvent | undefined> {
  const [event] = await db
    .select()
    .from(calendarEvents)
    .where(eq(calendarEvents.id, id))
    .limit(1);

  return event;
}

/**
 * Create a new calendar event
 */
export async function createCalendarEvent(data: InsertCalendarEvent): Promise<CalendarEvent> {
  const [event] = await db
    .insert(calendarEvents)
    .values(data)
    .returning();

  return event;
}

/**
 * Update an existing calendar event
 */
export async function updateCalendarEvent(
  id: string,
  data: Partial<InsertCalendarEvent>
): Promise<CalendarEvent | undefined> {
  const [event] = await db
    .update(calendarEvents)
    .set(data)
    .where(eq(calendarEvents.id, id))
    .returning();

  return event;
}

/**
 * Delete a calendar event
 */
export async function deleteCalendarEvent(id: string): Promise<CalendarEvent | undefined> {
  const [event] = await db
    .delete(calendarEvents)
    .where(eq(calendarEvents.id, id))
    .returning();

  return event;
}

/**
 * Get calendar events by person ID
 */
export async function findCalendarEventsByPersonId(personId: string): Promise<CalendarEvent[]> {
  return db
    .select()
    .from(calendarEvents)
    .where(eq(calendarEvents.personId, personId))
    .orderBy(calendarEvents.scheduledAt);
}
