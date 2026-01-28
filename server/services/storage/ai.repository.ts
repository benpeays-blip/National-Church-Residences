import { db } from '../../db';
import {
  predictiveScores,
  wealthEvents,
  meetingBriefs,
  voiceNotes,
  persons
} from '../../../shared/schema';
import { eq, desc } from 'drizzle-orm';

/**
 * AI Repository
 *
 * Data access layer for AI-powered features:
 * - Predictive major gift timing
 * - Wealth events monitoring
 * - Meeting briefs
 * - Voice notes
 */

/**
 * Get predictive timing scores with associated person data
 * Orders by giving probability (highest first)
 */
export async function findPredictiveTiming() {
  return await db
    .select({
      score: predictiveScores,
      person: persons,
    })
    .from(predictiveScores)
    .innerJoin(persons, eq(predictiveScores.personId, persons.id))
    .orderBy(desc(predictiveScores.givingProbability));
}

/**
 * Get wealth events with associated person data
 * Orders by event date (most recent first)
 * Limits to 100 most recent events
 */
export async function findWealthEvents() {
  return await db
    .select({
      event: wealthEvents,
      person: persons,
    })
    .from(wealthEvents)
    .innerJoin(persons, eq(wealthEvents.personId, persons.id))
    .orderBy(desc(wealthEvents.eventDate))
    .limit(100);
}

/**
 * Get meeting briefs with associated person data
 * Orders by creation date (most recent first)
 * Limits to 50 most recent briefs
 */
export async function findMeetingBriefs() {
  return await db
    .select({
      brief: meetingBriefs,
      person: persons,
    })
    .from(meetingBriefs)
    .innerJoin(persons, eq(meetingBriefs.personId, persons.id))
    .orderBy(desc(meetingBriefs.createdAt))
    .limit(50);
}

/**
 * Get voice notes
 * Orders by recording date (most recent first)
 * Limits to 50 most recent notes
 */
export async function findVoiceNotes() {
  return await db
    .select()
    .from(voiceNotes)
    .orderBy(desc(voiceNotes.recordedAt))
    .limit(50);
}
