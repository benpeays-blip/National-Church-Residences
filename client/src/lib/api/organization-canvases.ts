/**
 * Organization Canvases API Client
 *
 * Typed methods for organization canvas management
 */

import type { OrganizationCanvas, InsertOrganizationCanvas } from '@shared/schema';
import { apiClient } from './client';

export const organizationCanvasesApi = {
  /**
   * Get all organization canvases with optional owner filter
   */
  getAll: (ownerId?: string) => {
    return apiClient.get<OrganizationCanvas[]>('/organization-canvases', {
      params: ownerId ? { ownerId } : undefined,
    });
  },

  /**
   * Get a single organization canvas by ID
   */
  getById: (id: string) => {
    return apiClient.get<OrganizationCanvas>(`/organization-canvases/${id}`);
  },

  /**
   * Create a new organization canvas
   */
  create: (data: InsertOrganizationCanvas) => {
    return apiClient.post<OrganizationCanvas, InsertOrganizationCanvas>(
      '/organization-canvases',
      data
    );
  },

  /**
   * Update an existing organization canvas
   */
  update: (id: string, data: Partial<InsertOrganizationCanvas>) => {
    return apiClient.put<OrganizationCanvas, Partial<InsertOrganizationCanvas>>(
      `/organization-canvases/${id}`,
      data
    );
  },

  /**
   * Delete an organization canvas
   */
  delete: (id: string) => {
    return apiClient.delete<OrganizationCanvas>(`/organization-canvases/${id}`);
  },
};
