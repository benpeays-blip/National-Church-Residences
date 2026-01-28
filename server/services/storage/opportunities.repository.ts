import { db } from '../../db';
import {
  opportunities,
  persons,
  users,
  type Opportunity,
  type InsertOpportunity,
} from '@shared/schema';
import { eq, desc } from 'drizzle-orm';

/**
 * Opportunities Repository
 *
 * Handles all database operations for fundraising opportunities.
 * Provides a clean abstraction over Drizzle ORM.
 */

/**
 * Get all opportunities with optional filtering by owner
 *
 * Returns opportunities with related person and owner information
 *
 * @param ownerId - Optional owner (MGO) ID to filter opportunities
 */
export async function findOpportunities(ownerId?: string) {
  const baseQuery = db
    .select({
      opportunity: opportunities,
      person: {
        firstName: persons.firstName,
        lastName: persons.lastName,
      },
      owner: {
        firstName: users.firstName,
        lastName: users.lastName,
      },
    })
    .from(opportunities)
    .leftJoin(persons, eq(opportunities.personId, persons.id))
    .leftJoin(users, eq(opportunities.ownerId, users.id))
    .orderBy(desc(opportunities.closeDate));

  const results = ownerId
    ? await baseQuery.where(eq(opportunities.ownerId, ownerId))
    : await baseQuery;

  return results.map((row) => ({
    ...row.opportunity,
    person: row.person,
    owner: row.owner,
  }));
}

/**
 * Get a single opportunity by ID
 */
export async function findOpportunityById(id: string): Promise<Opportunity | undefined> {
  const [opportunity] = await db
    .select()
    .from(opportunities)
    .where(eq(opportunities.id, id))
    .limit(1);

  return opportunity;
}

/**
 * Get opportunities by person ID
 */
export async function findOpportunitiesByPersonId(personId: string): Promise<Opportunity[]> {
  return db
    .select()
    .from(opportunities)
    .where(eq(opportunities.personId, personId))
    .orderBy(desc(opportunities.closeDate));
}

/**
 * Create a new opportunity
 */
export async function createOpportunity(data: InsertOpportunity): Promise<Opportunity> {
  const [opportunity] = await db
    .insert(opportunities)
    .values(data)
    .returning();

  return opportunity;
}

/**
 * Update an existing opportunity
 */
export async function updateOpportunity(
  id: string,
  data: Partial<InsertOpportunity>
): Promise<Opportunity | undefined> {
  const [opportunity] = await db
    .update(opportunities)
    .set({
      ...data,
      updatedAt: new Date(),
    })
    .where(eq(opportunities.id, id))
    .returning();

  return opportunity;
}

/**
 * Delete an opportunity
 */
export async function deleteOpportunity(id: string): Promise<Opportunity | undefined> {
  const [opportunity] = await db
    .delete(opportunities)
    .where(eq(opportunities.id, id))
    .returning();

  return opportunity;
}

/**
 * Get opportunities by stage
 */
export async function findOpportunitiesByStage(stage: string): Promise<Opportunity[]> {
  return db
    .select()
    .from(opportunities)
    .where(eq(opportunities.stage, stage as any))
    .orderBy(desc(opportunities.closeDate));
}
