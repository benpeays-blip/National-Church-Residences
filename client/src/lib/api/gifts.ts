/**
 * Gifts API Client
 *
 * Typed methods for gift operations
 */

import type { Gift, InsertGift } from '@shared/schema';
import { apiClient } from './client';

export const giftsApi = {
  /**
   * Get all gifts with optional person filter
   */
  getAll: (personId?: string) => {
    return apiClient.get<Gift[]>('/gifts', {
      params: personId ? { personId } : undefined,
    });
  },

  /**
   * Get a single gift by ID
   */
  getById: (id: string) => {
    return apiClient.get<Gift>(`/gifts/${id}`);
  },

  /**
   * Create a new gift
   */
  create: (data: InsertGift) => {
    return apiClient.post<Gift, InsertGift>('/gifts', data);
  },

  /**
   * Update an existing gift
   */
  update: (id: string, data: Partial<InsertGift>) => {
    return apiClient.patch<Gift, Partial<InsertGift>>(`/gifts/${id}`, data);
  },

  /**
   * Delete a gift
   */
  delete: (id: string) => {
    return apiClient.delete<Gift>(`/gifts/${id}`);
  },
};
