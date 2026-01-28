/**
 * Persons API Client
 *
 * Typed methods for person/donor operations
 */

import type { Person, InsertPerson } from '@shared/schema';
import { apiClient } from './client';

export const personsApi = {
  /**
   * Get all persons with optional search filter
   */
  getAll: (search?: string) => {
    return apiClient.get<Person[]>('/persons', {
      params: search ? { search } : undefined,
    });
  },

  /**
   * Get a single person by ID
   */
  getById: (id: string) => {
    return apiClient.get<Person>(`/persons/${id}`);
  },

  /**
   * Create a new person
   */
  create: (data: InsertPerson) => {
    return apiClient.post<Person, InsertPerson>('/persons', data);
  },

  /**
   * Update an existing person
   */
  update: (id: string, data: Partial<InsertPerson>) => {
    return apiClient.patch<Person, Partial<InsertPerson>>(`/persons/${id}`, data);
  },

  /**
   * Delete a person
   */
  delete: (id: string) => {
    return apiClient.delete<Person>(`/persons/${id}`);
  },

  /**
   * Get donors for quadrant view
   */
  getDonors: () => {
    return apiClient.get<Person[]>('/donors');
  },

  /**
   * Update donor energy score
   */
  updateEnergyScore: (id: string, energyScore: number) => {
    return apiClient.patch<Person>(`/donors/${id}/energy`, { energyScore });
  },

  /**
   * Update donor structure score
   */
  updateStructureScore: (id: string, structureScore: number) => {
    return apiClient.patch<Person>(`/donors/${id}/structure`, { structureScore });
  },
};
