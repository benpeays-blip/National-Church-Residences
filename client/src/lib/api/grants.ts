/**
 * Grants API Client
 *
 * Typed methods for grant operations
 */

import type { Grant, InsertGrant } from '@shared/schema';
import { apiClient } from './client';

export const grantsApi = {
  /**
   * Get all grants with optional filters
   */
  getAll: (ownerId?: string, stage?: string) => {
    const params: Record<string, string> = {};
    if (ownerId) params.ownerId = ownerId;
    if (stage) params.stage = stage;

    return apiClient.get<Grant[]>('/grants', {
      params: Object.keys(params).length > 0 ? params : undefined,
    });
  },

  /**
   * Get a single grant by ID
   */
  getById: (id: string) => {
    return apiClient.get<Grant>(`/grants/${id}`);
  },

  /**
   * Create a new grant
   */
  create: (data: InsertGrant) => {
    return apiClient.post<Grant, InsertGrant>('/grants', data);
  },

  /**
   * Update an existing grant
   */
  update: (id: string, data: Partial<InsertGrant>) => {
    return apiClient.patch<Grant, Partial<InsertGrant>>(`/grants/${id}`, data);
  },

  /**
   * Delete a grant
   */
  delete: (id: string) => {
    return apiClient.delete<Grant>(`/grants/${id}`);
  },
};
