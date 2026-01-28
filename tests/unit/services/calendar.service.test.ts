/**
 * Unit Tests for Calendar Service
 *
 * Tests business logic in the calendar service layer
 * Mocks repository calls to test service logic in isolation
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as calendarService from '../../../server/services/calendar.service';
import * as calendarRepository from '../../../server/services/storage/calendar.repository';
import { NotFoundError, ValidationError } from '../../../server/utils/errors';
import { createTestCalendarEvent } from '../../helpers/factories';

// Mock the repository module
vi.mock('../../../server/services/storage/calendar.repository');

// Mock the logger
vi.mock('../../../server/config/logging', () => ({
  logger: {
    debug: vi.fn(),
    info: vi.fn(),
    warn: vi.fn(),
    error: vi.fn(),
  },
}));

describe('Calendar Service', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getCalendarEvents', () => {
    it('should fetch all calendar events without filters', async () => {
      const mockEvents = [
        { id: '1', title: 'Event 1', scheduledAt: new Date() },
        { id: '2', title: 'Event 2', scheduledAt: new Date() },
      ];

      vi.mocked(calendarRepository.findCalendarEvents).mockResolvedValue(mockEvents as any);

      const result = await calendarService.getCalendarEvents();

      expect(result).toEqual(mockEvents);
      expect(calendarRepository.findCalendarEvents).toHaveBeenCalledWith(undefined, undefined, undefined);
    });

    it('should fetch calendar events with userId filter', async () => {
      const mockEvents = [{ id: '1', title: 'Event 1', userId: 'user123', scheduledAt: new Date() }];

      vi.mocked(calendarRepository.findCalendarEvents).mockResolvedValue(mockEvents as any);

      const result = await calendarService.getCalendarEvents('user123');

      expect(result).toEqual(mockEvents);
      expect(calendarRepository.findCalendarEvents).toHaveBeenCalledWith('user123', undefined, undefined);
    });

    it('should fetch calendar events with date range filter', async () => {
      const startDate = new Date('2026-01-01');
      const endDate = new Date('2026-01-31');
      const mockEvents = [{ id: '1', title: 'Event 1', scheduledAt: new Date('2026-01-15') }];

      vi.mocked(calendarRepository.findCalendarEvents).mockResolvedValue(mockEvents as any);

      const result = await calendarService.getCalendarEvents(undefined, startDate, endDate);

      expect(result).toEqual(mockEvents);
      expect(calendarRepository.findCalendarEvents).toHaveBeenCalledWith(undefined, startDate, endDate);
    });
  });

  describe('getCalendarEventById', () => {
    it('should fetch a calendar event by ID', async () => {
      const mockEvent = { id: '1', title: 'Test Event', scheduledAt: new Date() };

      vi.mocked(calendarRepository.findCalendarEventById).mockResolvedValue(mockEvent as any);

      const result = await calendarService.getCalendarEventById('1');

      expect(result).toEqual(mockEvent);
      expect(calendarRepository.findCalendarEventById).toHaveBeenCalledWith('1');
    });

    it('should throw NotFoundError when event does not exist', async () => {
      vi.mocked(calendarRepository.findCalendarEventById).mockResolvedValue(null);

      await expect(calendarService.getCalendarEventById('nonexistent'))
        .rejects.toThrow(NotFoundError);
    });
  });

  describe('createCalendarEvent', () => {
    it('should create a calendar event with valid data', async () => {
      const eventData = createTestCalendarEvent();
      const createdEvent = { ...eventData, id: 'new-id' };

      vi.mocked(calendarRepository.createCalendarEvent).mockResolvedValue(createdEvent as any);

      const result = await calendarService.createCalendarEvent(eventData);

      expect(result).toEqual(createdEvent);
      expect(calendarRepository.createCalendarEvent).toHaveBeenCalledWith(eventData);
    });

    it('should throw ValidationError when title is missing', async () => {
      const eventData = createTestCalendarEvent({ title: '' });

      await expect(calendarService.createCalendarEvent(eventData))
        .rejects.toThrow(ValidationError);
      await expect(calendarService.createCalendarEvent(eventData))
        .rejects.toThrow('Title is required');
    });

    it('should throw ValidationError when title is only whitespace', async () => {
      const eventData = createTestCalendarEvent({ title: '   ' });

      await expect(calendarService.createCalendarEvent(eventData))
        .rejects.toThrow(ValidationError);
      await expect(calendarService.createCalendarEvent(eventData))
        .rejects.toThrow('Title is required');
    });

    it('should throw ValidationError when scheduledAt is missing', async () => {
      const eventData = createTestCalendarEvent({ scheduledAt: undefined as any });

      await expect(calendarService.createCalendarEvent(eventData))
        .rejects.toThrow(ValidationError);
      await expect(calendarService.createCalendarEvent(eventData))
        .rejects.toThrow('Scheduled time is required');
    });
  });

  describe('updateCalendarEvent', () => {
    it('should update a calendar event with valid data', async () => {
      const existingEvent = { id: '1', title: 'Old Title', scheduledAt: new Date() };
      const updateData = { title: 'New Title' };
      const updatedEvent = { ...existingEvent, ...updateData };

      vi.mocked(calendarRepository.findCalendarEventById).mockResolvedValue(existingEvent as any);
      vi.mocked(calendarRepository.updateCalendarEvent).mockResolvedValue(updatedEvent as any);

      const result = await calendarService.updateCalendarEvent('1', updateData);

      expect(result).toEqual(updatedEvent);
      expect(calendarRepository.findCalendarEventById).toHaveBeenCalledWith('1');
      expect(calendarRepository.updateCalendarEvent).toHaveBeenCalledWith('1', updateData);
    });

    it('should throw NotFoundError when event does not exist', async () => {
      vi.mocked(calendarRepository.findCalendarEventById).mockResolvedValue(null);

      await expect(calendarService.updateCalendarEvent('nonexistent', { title: 'New Title' }))
        .rejects.toThrow(NotFoundError);
    });

    it('should throw NotFoundError when update returns null', async () => {
      const existingEvent = { id: '1', title: 'Old Title', scheduledAt: new Date() };

      vi.mocked(calendarRepository.findCalendarEventById).mockResolvedValue(existingEvent as any);
      vi.mocked(calendarRepository.updateCalendarEvent).mockResolvedValue(null);

      await expect(calendarService.updateCalendarEvent('1', { title: 'New Title' }))
        .rejects.toThrow(NotFoundError);
    });
  });

  describe('deleteCalendarEvent', () => {
    it('should delete a calendar event', async () => {
      const deletedEvent = { id: '1', title: 'Deleted Event', scheduledAt: new Date() };

      vi.mocked(calendarRepository.deleteCalendarEvent).mockResolvedValue(deletedEvent as any);

      const result = await calendarService.deleteCalendarEvent('1');

      expect(result).toEqual(deletedEvent);
      expect(calendarRepository.deleteCalendarEvent).toHaveBeenCalledWith('1');
    });

    it('should throw NotFoundError when event does not exist', async () => {
      vi.mocked(calendarRepository.deleteCalendarEvent).mockResolvedValue(null);

      await expect(calendarService.deleteCalendarEvent('nonexistent'))
        .rejects.toThrow(NotFoundError);
    });
  });

  describe('getCalendarEventsByPersonId', () => {
    it('should fetch calendar events for a person', async () => {
      const mockEvents = [
        { id: '1', title: 'Meeting with person', personId: 'person123', scheduledAt: new Date() },
        { id: '2', title: 'Follow-up call', personId: 'person123', scheduledAt: new Date() },
      ];

      vi.mocked(calendarRepository.findCalendarEventsByPersonId).mockResolvedValue(mockEvents as any);

      const result = await calendarService.getCalendarEventsByPersonId('person123');

      expect(result).toEqual(mockEvents);
      expect(calendarRepository.findCalendarEventsByPersonId).toHaveBeenCalledWith('person123');
    });

    it('should return empty array when person has no events', async () => {
      vi.mocked(calendarRepository.findCalendarEventsByPersonId).mockResolvedValue([]);

      const result = await calendarService.getCalendarEventsByPersonId('person123');

      expect(result).toEqual([]);
    });
  });
});
