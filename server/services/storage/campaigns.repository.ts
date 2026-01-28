import { db } from '../../db';
import { campaigns, users, Campaign, InsertCampaign } from '@shared/schema';
import { eq, sql } from 'drizzle-orm';

/**
 * Campaigns Repository
 *
 * Handles database operations for campaign management
 */

/**
 * Find all campaigns
 */
export async function findCampaigns(): Promise<Campaign[]> {
  return db.select().from(campaigns).orderBy(campaigns.startDate);
}

/**
 * Find a single campaign by ID with owner information
 */
export async function findCampaignById(id: string) {
  const [campaign] = await db
    .select({
      id: campaigns.id,
      name: campaigns.name,
      type: campaigns.type,
      description: campaigns.description,
      status: campaigns.status,
      goal: campaigns.goal,
      raised: campaigns.raised,
      donorCount: campaigns.donorCount,
      avgGiftSize: campaigns.avgGiftSize,
      totalGifts: campaigns.totalGifts,
      ownerId: campaigns.ownerId,
      startDate: campaigns.startDate,
      endDate: campaigns.endDate,
      createdAt: campaigns.createdAt,
      updatedAt: campaigns.updatedAt,
      ownerName: sql<string>`CONCAT(${users.firstName}, ' ', ${users.lastName})`,
    })
    .from(campaigns)
    .leftJoin(users, eq(campaigns.ownerId, users.id))
    .where(eq(campaigns.id, id));

  return campaign || null;
}

/**
 * Create a new campaign
 */
export async function createCampaign(data: InsertCampaign): Promise<Campaign> {
  const result = await db.insert(campaigns).values(data).returning();
  return result[0];
}

/**
 * Update an existing campaign
 */
export async function updateCampaign(
  id: string,
  data: Partial<InsertCampaign>
): Promise<Campaign | null> {
  const result = await db
    .update(campaigns)
    .set({ ...data, updatedAt: new Date() })
    .where(eq(campaigns.id, id))
    .returning();

  return result[0] || null;
}

/**
 * Delete a campaign
 */
export async function deleteCampaign(id: string): Promise<Campaign | null> {
  const result = await db.delete(campaigns).where(eq(campaigns.id, id)).returning();
  return result[0] || null;
}

/**
 * Find campaigns by status
 */
export async function findCampaignsByStatus(status: string): Promise<Campaign[]> {
  return db
    .select()
    .from(campaigns)
    .where(eq(campaigns.status, status))
    .orderBy(campaigns.startDate);
}

/**
 * Find campaigns by owner
 */
export async function findCampaignsByOwnerId(ownerId: string): Promise<Campaign[]> {
  return db
    .select()
    .from(campaigns)
    .where(eq(campaigns.ownerId, ownerId))
    .orderBy(campaigns.startDate);
}
