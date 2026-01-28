/**
 * Tasks API Client
 *
 * Typed methods for task operations
 */

import type { Task, InsertTask } from '@shared/schema';
import { apiClient } from './client';

export const tasksApi = {
  /**
   * Get all tasks with optional filters
   */
  getAll: (ownerId?: string, completed?: boolean) => {
    const params: Record<string, string> = {};
    if (ownerId) params.ownerId = ownerId;
    if (completed !== undefined) params.completed = String(completed);

    return apiClient.get<Task[]>('/tasks', {
      params: Object.keys(params).length > 0 ? params : undefined,
    });
  },

  /**
   * Get a single task by ID
   */
  getById: (id: string) => {
    return apiClient.get<Task>(`/tasks/${id}`);
  },

  /**
   * Create a new task
   */
  create: (data: InsertTask) => {
    return apiClient.post<Task, InsertTask>('/tasks', data);
  },

  /**
   * Update an existing task
   */
  update: (id: string, data: Partial<InsertTask>) => {
    return apiClient.patch<Task, Partial<InsertTask>>(`/tasks/${id}`, data);
  },

  /**
   * Delete a task
   */
  delete: (id: string) => {
    return apiClient.delete<Task>(`/tasks/${id}`);
  },
};
