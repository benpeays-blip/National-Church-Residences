import { db } from '../../db';
import { fundraisingEvents, FundraisingEvent, InsertFundraisingEvent } from '@shared/schema';
import { eq, desc } from 'drizzle-orm';

/**
 * Fundraising Events Repository
 *
 * Handles database operations for fundraising event management
 */

export async function findFundraisingEvents(): Promise<FundraisingEvent[]> {
  return db.select().from(fundraisingEvents).orderBy(desc(fundraisingEvents.eventDate));
}

export async function findFundraisingEventById(id: string): Promise<FundraisingEvent | null> {
  const result = await db.select().from(fundraisingEvents).where(eq(fundraisingEvents.id, id));
  return result[0] || null;
}

export async function createFundraisingEvent(data: InsertFundraisingEvent): Promise<FundraisingEvent> {
  const result = await db.insert(fundraisingEvents).values(data).returning();
  return result[0];
}

export async function updateFundraisingEvent(
  id: string,
  data: Partial<InsertFundraisingEvent>
): Promise<FundraisingEvent | null> {
  const result = await db
    .update(fundraisingEvents)
    .set({ ...data, updatedAt: new Date() })
    .where(eq(fundraisingEvents.id, id))
    .returning();

  return result[0] || null;
}

export async function deleteFundraisingEvent(id: string): Promise<FundraisingEvent | null> {
  const result = await db.delete(fundraisingEvents).where(eq(fundraisingEvents.id, id)).returning();
  return result[0] || null;
}
