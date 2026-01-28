import { Task, InsertTask } from '@shared/schema';
import * as tasksRepository from './storage/tasks.repository';
import { NotFoundError, ValidationError } from '../utils/errors';
import { logger } from '../config/logging';

/**
 * Tasks Service
 *
 * Contains business logic for task management operations.
 */

export async function getTasks(ownerId?: string, completed?: boolean): Promise<Task[]> {
  logger.debug('Fetching tasks', { ownerId, completed });
  const tasksList = await tasksRepository.findTasks(ownerId, completed);
  logger.info('Tasks fetched', { count: tasksList.length, ownerId, completed });
  return tasksList;
}

export async function getTaskById(id: string): Promise<Task> {
  logger.debug('Fetching task', { id });
  const task = await tasksRepository.findTaskById(id);

  if (!task) {
    throw new NotFoundError('Task');
  }

  return task;
}

export async function getTasksByPersonId(personId: string): Promise<Task[]> {
  logger.debug('Fetching tasks by person', { personId });
  const tasksList = await tasksRepository.findTasksByPersonId(personId);
  logger.info('Tasks fetched for person', { personId, count: tasksList.length });
  return tasksList;
}

export async function createTask(data: InsertTask): Promise<Task> {
  logger.debug('Creating task', { title: data.title, ownerId: data.ownerId });

  if (!data.title || data.title.trim().length === 0) {
    throw new ValidationError('Task title is required');
  }

  if (!data.ownerId) {
    throw new ValidationError('Owner ID is required');
  }

  const validPriorities = ['low', 'medium', 'high', 'urgent'];
  if (data.priority && !validPriorities.includes(data.priority)) {
    throw new ValidationError(`Priority must be one of: ${validPriorities.join(', ')}`);
  }

  const task = await tasksRepository.createTask(data);
  logger.info('Task created', { id: task.id, title: task.title });
  return task;
}

export async function updateTask(id: string, data: Partial<InsertTask>): Promise<Task> {
  logger.debug('Updating task', { id, updates: Object.keys(data) });

  const existingTask = await tasksRepository.findTaskById(id);
  if (!existingTask) {
    throw new NotFoundError('Task');
  }

  const validPriorities = ['low', 'medium', 'high', 'urgent'];
  if (data.priority && !validPriorities.includes(data.priority)) {
    throw new ValidationError(`Priority must be one of: ${validPriorities.join(', ')}`);
  }

  // Note: completedAt is managed automatically by the database or repository layer

  const updated = await tasksRepository.updateTask(id, data);
  if (!updated) {
    throw new NotFoundError('Task');
  }

  logger.info('Task updated', { id, title: updated.title, completed: updated.completed });
  return updated;
}

export async function deleteTask(id: string): Promise<Task> {
  logger.debug('Deleting task', { id });
  const deleted = await tasksRepository.deleteTask(id);

  if (!deleted) {
    throw new NotFoundError('Task');
  }

  logger.info('Task deleted', { id, title: deleted.title });
  return deleted;
}
