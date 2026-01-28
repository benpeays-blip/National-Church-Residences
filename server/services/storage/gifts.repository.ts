import { db } from '../../db';
import { gifts, type Gift, type InsertGift } from '@shared/schema';
import { eq, desc } from 'drizzle-orm';

/**
 * Gifts Repository
 *
 * Handles all database operations for gifts/donations.
 * Provides a clean abstraction over Drizzle ORM.
 */

/**
 * Get all gifts, optionally filtered by person ID
 *
 * @param personId - Optional person ID to filter gifts
 */
export async function findGifts(personId?: string): Promise<Gift[]> {
  if (personId) {
    return db
      .select()
      .from(gifts)
      .where(eq(gifts.personId, personId))
      .orderBy(desc(gifts.receivedAt));
  }

  return db
    .select()
    .from(gifts)
    .orderBy(desc(gifts.receivedAt));
}

/**
 * Get a single gift by ID
 */
export async function findGiftById(id: string): Promise<Gift | undefined> {
  const [gift] = await db
    .select()
    .from(gifts)
    .where(eq(gifts.id, id))
    .limit(1);

  return gift;
}

/**
 * Create a new gift
 */
export async function createGift(data: InsertGift): Promise<Gift> {
  const [gift] = await db
    .insert(gifts)
    .values(data)
    .returning();

  return gift;
}

/**
 * Update an existing gift
 */
export async function updateGift(
  id: string,
  data: Partial<InsertGift>
): Promise<Gift | undefined> {
  const [gift] = await db
    .update(gifts)
    .set(data)
    .where(eq(gifts.id, id))
    .returning();

  return gift;
}

/**
 * Delete a gift
 */
export async function deleteGift(id: string): Promise<Gift | undefined> {
  const [gift] = await db
    .delete(gifts)
    .where(eq(gifts.id, id))
    .returning();

  return gift;
}

/**
 * Get total giving for a person
 */
export async function getTotalGivingByPerson(personId: string): Promise<number> {
  const personGifts = await findGifts(personId);
  return personGifts.reduce((sum, gift) => sum + parseFloat(gift.amount), 0);
}

/**
 * Get gift count for a person
 */
export async function getGiftCountByPerson(personId: string): Promise<number> {
  const personGifts = await findGifts(personId);
  return personGifts.length;
}
