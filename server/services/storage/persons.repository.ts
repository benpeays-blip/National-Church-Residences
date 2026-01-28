import { db } from '../../db';
import {
  persons,
  gifts,
  interactions,
  opportunities,
  tasks,
  households,
  type Person,
  type InsertPerson,
} from '@shared/schema';
import { eq, or, ilike, desc, sql } from 'drizzle-orm';

/**
 * Persons Repository
 *
 * Handles all database operations for persons (donors/constituents).
 * Provides a clean abstraction over Drizzle ORM.
 */

/**
 * Get all persons with optional search filtering
 *
 * @param search - Optional search string to filter by name or email
 */
export async function findPersons(search?: string): Promise<Person[]> {
  if (search) {
    return db
      .select()
      .from(persons)
      .where(
        or(
          ilike(persons.firstName, `%${search}%`),
          ilike(persons.lastName, `%${search}%`),
          ilike(persons.primaryEmail, `%${search}%`)
        )
      )
      .orderBy(desc(persons.totalLifetimeGiving));
  }

  return db
    .select()
    .from(persons)
    .orderBy(desc(persons.totalLifetimeGiving));
}

/**
 * Get a single person by ID
 */
export async function findPersonById(id: string): Promise<Person | undefined> {
  const [person] = await db
    .select()
    .from(persons)
    .where(eq(persons.id, id))
    .limit(1);

  return person;
}

/**
 * Get person profile with all related data
 *
 * Returns person with gifts, interactions, opportunities, tasks, and household info
 */
export async function findPersonProfile(personId: string) {
  const person = await findPersonById(personId);

  if (!person) {
    return null;
  }

  // Fetch all related data in parallel
  const [giftsList, interactionsList, opportunitiesList, tasksList] = await Promise.all([
    db.select().from(gifts).where(eq(gifts.personId, personId)),
    db.select().from(interactions).where(eq(interactions.personId, personId)),
    db.select().from(opportunities).where(eq(opportunities.personId, personId)),
    db.select().from(tasks).where(eq(tasks.personId, personId)),
  ]);

  // Get household info if applicable
  let household = null;
  if (person.householdId) {
    const [householdRecord] = await db
      .select()
      .from(households)
      .where(eq(households.id, person.householdId))
      .limit(1);
    household = householdRecord || null;
  }

  return {
    person,
    household,
    gifts: giftsList,
    interactions: interactionsList,
    opportunities: opportunitiesList,
    tasks: tasksList,
  };
}

/**
 * Get donor profile with detailed statistics
 *
 * Similar to findPersonProfile but includes calculated stats
 */
export async function findDonorProfile(personId: string) {
  const person = await findPersonById(personId);

  if (!person) {
    return null;
  }

  // Fetch all related data in parallel
  const [giftsList, interactionsList, opportunitiesList, tasksList] = await Promise.all([
    db.select().from(gifts).where(eq(gifts.personId, personId)),
    db.select().from(interactions).where(eq(interactions.personId, personId)),
    db.select().from(opportunities).where(eq(opportunities.personId, personId)),
    db
      .select()
      .from(tasks)
      .where(eq(tasks.personId, personId))
      .orderBy(desc(tasks.createdAt))
      .limit(5),
  ]);

  // Get household info with member count
  let household = null;
  if (person.householdId) {
    const [householdRecord] = await db
      .select({
        id: households.id,
        name: households.name,
        totalMembers: sql<number>`(SELECT COUNT(*) FROM ${persons} WHERE ${persons.householdId} = ${households.id})`,
      })
      .from(households)
      .where(eq(households.id, person.householdId))
      .limit(1);
    household = householdRecord || null;
  }

  // Calculate statistics
  const totalGifts = giftsList.length;
  const totalGiving = giftsList.reduce((sum, g) => sum + parseFloat(g.amount), 0);
  const avgGiftSize = totalGifts > 0 ? totalGiving / totalGifts : 0;
  const firstGiftDate = giftsList.length > 0
    ? new Date(Math.min(...giftsList.map((g) => new Date(g.receivedAt).getTime())))
    : null;
  const daysSinceLastGift = person.lastGiftDate
    ? Math.floor((Date.now() - new Date(person.lastGiftDate).getTime()) / (1000 * 60 * 60 * 24))
    : null;

  // Calculate giving frequency
  let giftFrequency = 'Never given';
  if (totalGifts > 0) {
    if (totalGifts === 1) {
      giftFrequency = 'One-time donor';
    } else if (totalGifts >= 12) {
      giftFrequency = 'Monthly donor';
    } else if (totalGifts >= 4) {
      giftFrequency = 'Quarterly donor';
    } else {
      giftFrequency = 'Occasional donor';
    }
  }

  return {
    person,
    household,
    gifts: giftsList,
    interactions: interactionsList,
    opportunities: opportunitiesList,
    tasks: tasksList,
    stats: {
      totalGifts,
      totalGiving,
      avgGiftSize,
      firstGiftDate,
      daysSinceLastGift,
      giftFrequency,
    },
  };
}

/**
 * Get all donors for quadrant view
 *
 * Returns persons with gift statistics for energy/structure quadrant mapping
 */
export async function findDonorsForQuadrant() {
  const allDonors = await db.select().from(persons);
  const allGifts = await db.select().from(gifts);

  // Calculate gift counts and dates
  const giftCounts: Record<string, number> = {};
  const earliestGiftDates: Record<string, Date> = {};
  const recentGiftCounts: Record<string, number> = {};
  const twelveMonthsAgo = new Date();
  twelveMonthsAgo.setMonth(twelveMonthsAgo.getMonth() - 12);

  allGifts.forEach((gift) => {
    // Total gift count
    giftCounts[gift.personId] = (giftCounts[gift.personId] || 0) + 1;

    // Track earliest gift date
    const giftDate = new Date(gift.receivedAt);
    if (!earliestGiftDates[gift.personId] || giftDate < earliestGiftDates[gift.personId]) {
      earliestGiftDates[gift.personId] = giftDate;
    }

    // Count gifts in last 12 months
    if (giftDate >= twelveMonthsAgo) {
      recentGiftCounts[gift.personId] = (recentGiftCounts[gift.personId] || 0) + 1;
    }
  });

  // Calculate relationship length in months
  const now = new Date();
  const donorsWithMetrics = allDonors.map((donor) => {
    const donorGiftCount = giftCounts[donor.id] || 0;
    const earliestDate = earliestGiftDates[donor.id];
    const recentGiftCount = recentGiftCounts[donor.id] || 0;
    const relationshipMonths = earliestDate
      ? Math.floor(
          (now.getTime() - earliestDate.getTime()) / (1000 * 60 * 60 * 24 * 30)
        )
      : 0;

    return {
      ...donor,
      giftCount: donorGiftCount,
      relationshipMonths,
      recentGiftCount,
    };
  });

  return donorsWithMetrics;
}

/**
 * Create a new person
 */
export async function createPerson(data: InsertPerson): Promise<Person> {
  const [person] = await db
    .insert(persons)
    .values(data)
    .returning();

  return person;
}

/**
 * Update an existing person
 */
export async function updatePerson(
  id: string,
  data: Partial<InsertPerson>
): Promise<Person | undefined> {
  const [person] = await db
    .update(persons)
    .set({
      ...data,
      updatedAt: new Date(),
    })
    .where(eq(persons.id, id))
    .returning();

  return person;
}
