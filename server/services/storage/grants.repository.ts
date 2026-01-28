import { db } from '../../db';
import { grants, Grant, InsertGrant } from '@shared/schema';
import { eq, and } from 'drizzle-orm';

/**
 * Grants Repository
 *
 * Handles database operations for grant management
 */

/**
 * Find all grants with optional filtering by owner and stage
 */
export async function findGrants(ownerId?: string, stage?: string): Promise<Grant[]> {
  const conditions = [];

  if (ownerId) {
    conditions.push(eq(grants.ownerId, ownerId));
  }

  if (stage) {
    conditions.push(eq(grants.stage, stage as any));
  }

  if (conditions.length > 0) {
    return db
      .select()
      .from(grants)
      .where(and(...conditions))
      .orderBy(grants.applicationDueDate);
  }

  return db.select().from(grants).orderBy(grants.applicationDueDate);
}

/**
 * Find a single grant by ID
 */
export async function findGrantById(id: string): Promise<Grant | null> {
  const result = await db.select().from(grants).where(eq(grants.id, id));
  return result[0] || null;
}

/**
 * Create a new grant
 */
export async function createGrant(data: InsertGrant): Promise<Grant> {
  const result = await db.insert(grants).values(data).returning();
  return result[0];
}

/**
 * Update an existing grant
 */
export async function updateGrant(
  id: string,
  data: Partial<InsertGrant>
): Promise<Grant | null> {
  const result = await db
    .update(grants)
    .set({ ...data, updatedAt: new Date() })
    .where(eq(grants.id, id))
    .returning();

  return result[0] || null;
}

/**
 * Delete a grant
 */
export async function deleteGrant(id: string): Promise<Grant | null> {
  const result = await db.delete(grants).where(eq(grants.id, id)).returning();
  return result[0] || null;
}

/**
 * Find grants by campaign
 */
export async function findGrantsByCampaignId(campaignId: string): Promise<Grant[]> {
  return db
    .select()
    .from(grants)
    .where(eq(grants.campaignId, campaignId))
    .orderBy(grants.applicationDueDate);
}

/**
 * Find grants by funder contact
 */
export async function findGrantsByFunderContactId(funderContactId: string): Promise<Grant[]> {
  return db
    .select()
    .from(grants)
    .where(eq(grants.funderContactId, funderContactId))
    .orderBy(grants.applicationDueDate);
}
