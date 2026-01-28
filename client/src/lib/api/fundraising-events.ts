/**
 * Fundraising Events API Client
 *
 * Typed methods for fundraising event operations
 */

import type { FundraisingEvent } from '@shared/schema';
import { apiClient } from './client';

export const fundraisingEventsApi = {
  /**
   * Get all fundraising events
   */
  getAll: () => {
    return apiClient.get<FundraisingEvent[]>('/fundraising-events');
  },
};
