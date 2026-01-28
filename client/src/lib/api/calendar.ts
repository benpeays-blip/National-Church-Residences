/**
 * Calendar API Client
 *
 * Typed methods for calendar event operations
 */

import type { CalendarEvent, InsertCalendarEvent } from '@shared/schema';
import { apiClient } from './client';

export const calendarApi = {
  /**
   * Get all calendar events with optional filters
   */
  getAll: (userId?: string, startDate?: Date, endDate?: Date) => {
    const params: Record<string, string> = {};
    if (userId) params.userId = userId;
    if (startDate) params.startDate = startDate.toISOString();
    if (endDate) params.endDate = endDate.toISOString();

    return apiClient.get<CalendarEvent[]>('/calendar-events', {
      params: Object.keys(params).length > 0 ? params : undefined,
    });
  },

  /**
   * Get a single calendar event by ID
   */
  getById: (id: string) => {
    return apiClient.get<CalendarEvent>(`/calendar-events/${id}`);
  },

  /**
   * Create a new calendar event
   */
  create: (data: InsertCalendarEvent) => {
    return apiClient.post<CalendarEvent, InsertCalendarEvent>('/calendar-events', data);
  },

  /**
   * Update an existing calendar event
   */
  update: (id: string, data: Partial<InsertCalendarEvent>) => {
    return apiClient.patch<CalendarEvent, Partial<InsertCalendarEvent>>(`/calendar-events/${id}`, data);
  },

  /**
   * Delete a calendar event
   */
  delete: (id: string) => {
    return apiClient.delete<CalendarEvent>(`/calendar-events/${id}`);
  },
};
