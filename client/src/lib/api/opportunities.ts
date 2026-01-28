/**
 * Opportunities API Client
 *
 * Typed methods for opportunity operations
 */

import type { Opportunity, InsertOpportunity } from '@shared/schema';
import { apiClient } from './client';

export const opportunitiesApi = {
  /**
   * Get all opportunities with optional owner filter
   */
  getAll: (ownerId?: string) => {
    return apiClient.get<Opportunity[]>('/opportunities', {
      params: ownerId ? { ownerId } : undefined,
    });
  },

  /**
   * Get a single opportunity by ID
   */
  getById: (id: string) => {
    return apiClient.get<Opportunity>(`/opportunities/${id}`);
  },

  /**
   * Create a new opportunity
   */
  create: (data: InsertOpportunity) => {
    return apiClient.post<Opportunity, InsertOpportunity>('/opportunities', data);
  },

  /**
   * Update an existing opportunity
   */
  update: (id: string, data: Partial<InsertOpportunity>) => {
    return apiClient.patch<Opportunity, Partial<InsertOpportunity>>(`/opportunities/${id}`, data);
  },

  /**
   * Delete an opportunity
   */
  delete: (id: string) => {
    return apiClient.delete<Opportunity>(`/opportunities/${id}`);
  },
};
