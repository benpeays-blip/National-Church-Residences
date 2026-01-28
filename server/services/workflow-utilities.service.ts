import { db } from '../db';
import {
  calendarEvents,
  stewardshipWorkflows,
  taskPriorityScores,
  giftRegistries,
  persons,
  gifts,
  tasks,
} from '@shared/schema';
import { eq, desc } from 'drizzle-orm';
import { logger } from '../config/logging';

/**
 * Workflow Utilities Service
 *
 * Business logic for workflow-related utility endpoints:
 * - Calendar events
 * - Stewardship workflows
 * - Task priority scores
 * - Gift registries
 */

export async function getCalendarEvents() {
  logger.debug('Fetching calendar events for workflow');

  const results = await db
    .select()
    .from(calendarEvents)
    .orderBy(desc(calendarEvents.scheduledAt))
    .limit(100);

  logger.info('Calendar events fetched', { count: results.length });
  return results;
}

export async function getStewardshipWorkflows() {
  logger.debug('Fetching stewardship workflows');

  const workflows = await db
    .select({
      workflow: stewardshipWorkflows,
      person: persons,
      gift: gifts,
    })
    .from(stewardshipWorkflows)
    .innerJoin(persons, eq(stewardshipWorkflows.personId, persons.id))
    .innerJoin(gifts, eq(stewardshipWorkflows.giftId, gifts.id))
    .orderBy(desc(stewardshipWorkflows.createdAt))
    .limit(50);

  logger.info('Stewardship workflows fetched', { count: workflows.length });
  return workflows;
}

export async function getTaskPriorities() {
  logger.debug('Fetching task priority scores');

  const priorities = await db
    .select({
      priorityScore: taskPriorityScores,
      task: tasks,
    })
    .from(taskPriorityScores)
    .innerJoin(tasks, eq(taskPriorityScores.taskId, tasks.id))
    .orderBy(desc(taskPriorityScores.finalPriority))
    .limit(100);

  logger.info('Task priorities fetched', { count: priorities.length });
  return priorities;
}

export async function getGiftRegistries() {
  logger.debug('Fetching gift registries for workflow');

  const registries = await db
    .select({
      registry: giftRegistries,
      person: persons,
    })
    .from(giftRegistries)
    .innerJoin(persons, eq(giftRegistries.personId, persons.id))
    .orderBy(desc(giftRegistries.createdAt))
    .limit(100);

  logger.info('Gift registries fetched', { count: registries.length });
  return registries;
}
