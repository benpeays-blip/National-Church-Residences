import { db } from '../../db';
import { interactions, Interaction, InsertInteraction } from '@shared/schema';
import { eq, desc } from 'drizzle-orm';

/**
 * Interactions Repository
 *
 * Handles database operations for interaction tracking
 */

export async function findInteractions(personId?: string): Promise<Interaction[]> {
  if (personId) {
    return db
      .select()
      .from(interactions)
      .where(eq(interactions.personId, personId))
      .orderBy(desc(interactions.occurredAt));
  }

  return db.select().from(interactions).orderBy(desc(interactions.occurredAt));
}

export async function findInteractionById(id: string): Promise<Interaction | null> {
  const result = await db.select().from(interactions).where(eq(interactions.id, id));
  return result[0] || null;
}

export async function createInteraction(data: InsertInteraction): Promise<Interaction> {
  const result = await db.insert(interactions).values(data).returning();
  return result[0];
}

export async function updateInteraction(
  id: string,
  data: Partial<InsertInteraction>
): Promise<Interaction | null> {
  const result = await db
    .update(interactions)
    .set(data)
    .where(eq(interactions.id, id))
    .returning();

  return result[0] || null;
}

export async function deleteInteraction(id: string): Promise<Interaction | null> {
  const result = await db.delete(interactions).where(eq(interactions.id, id)).returning();
  return result[0] || null;
}

export async function findInteractionsByPersonId(personId: string): Promise<Interaction[]> {
  return db
    .select()
    .from(interactions)
    .where(eq(interactions.personId, personId))
    .orderBy(desc(interactions.occurredAt));
}
