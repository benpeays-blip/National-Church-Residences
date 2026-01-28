/**
 * Campaigns API Client
 *
 * Typed methods for campaign operations
 */

import type { Campaign, InsertCampaign } from '@shared/schema';
import { apiClient } from './client';

export const campaignsApi = {
  /**
   * Get all campaigns
   */
  getAll: () => {
    return apiClient.get<Campaign[]>('/campaigns');
  },

  /**
   * Get a single campaign by ID
   */
  getById: (id: string) => {
    return apiClient.get<Campaign>(`/campaigns/${id}`);
  },

  /**
   * Create a new campaign
   */
  create: (data: InsertCampaign) => {
    return apiClient.post<Campaign, InsertCampaign>('/campaigns', data);
  },

  /**
   * Update an existing campaign
   */
  update: (id: string, data: Partial<InsertCampaign>) => {
    return apiClient.patch<Campaign, Partial<InsertCampaign>>(`/campaigns/${id}`, data);
  },

  /**
   * Delete a campaign
   */
  delete: (id: string) => {
    return apiClient.delete<Campaign>(`/campaigns/${id}`);
  },
};
