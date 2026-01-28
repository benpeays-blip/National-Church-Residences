/**
 * Interactions API Client
 *
 * Typed methods for interaction tracking operations
 */

import type { Interaction, InsertInteraction } from '@shared/schema';
import { apiClient } from './client';

export const interactionsApi = {
  /**
   * Get all interactions with optional person filter
   */
  getAll: (personId?: string) => {
    return apiClient.get<Interaction[]>('/interactions', {
      params: personId ? { personId } : undefined,
    });
  },

  /**
   * Get a single interaction by ID
   */
  getById: (id: string) => {
    return apiClient.get<Interaction>(`/interactions/${id}`);
  },

  /**
   * Create a new interaction
   */
  create: (data: InsertInteraction) => {
    return apiClient.post<Interaction, InsertInteraction>('/interactions', data);
  },

  /**
   * Update an existing interaction
   */
  update: (id: string, data: Partial<InsertInteraction>) => {
    return apiClient.patch<Interaction, Partial<InsertInteraction>>(`/interactions/${id}`, data);
  },

  /**
   * Delete an interaction
   */
  delete: (id: string) => {
    return apiClient.delete<Interaction>(`/interactions/${id}`);
  },
};
