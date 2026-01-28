/**
 * Integration Tests for Calendar Routes
 *
 * Tests the full request/response cycle for calendar endpoints
 * Uses real services but mocked database operations
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import request from 'supertest';
import express from 'express';
import { calendarRouter } from '../../../server/routes/calendar.routes';
import * as calendarRepository from '../../../server/services/storage/calendar.repository';
import { errorHandler, notFoundHandler } from '../../../server/middleware/errorHandler';

// Mock the repository
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

describe('Calendar Routes Integration Tests', () => {
  let app: express.Express;

  beforeEach(() => {
    vi.clearAllMocks();

    // Create a fresh Express app for each test
    app = express();
    app.use(express.json());
    app.use('/api/calendar-events', calendarRouter);
    app.use(notFoundHandler);
    app.use(errorHandler);
  });

  describe('GET /api/calendar-events', () => {
    it('should return all calendar events', async () => {
      const mockEvents = [
        {
          id: '1',
          title: 'Meeting with Donor',
          scheduledAt: new Date('2026-02-15T10:00:00'),
          duration: 60,
        },
        {
          id: '2',
          title: 'Follow-up Call',
          scheduledAt: new Date('2026-02-16T14:00:00'),
          duration: 30,
        },
      ];

      vi.mocked(calendarRepository.findCalendarEvents).mockResolvedValue(mockEvents as any);

      const response = await request(app)
        .get('/api/calendar-events')
        .expect(200);

      expect(response.body).toHaveLength(2);
      expect(response.body[0].title).toBe('Meeting with Donor');
      expect(calendarRepository.findCalendarEvents).toHaveBeenCalledWith(
        undefined,
        undefined,
        undefined
      );
    });

    it('should return events filtered by userId', async () => {
      const mockEvents = [
        {
          id: '1',
          title: 'My Meeting',
          userId: 'user123',
          scheduledAt: new Date('2026-02-15T10:00:00'),
        },
      ];

      vi.mocked(calendarRepository.findCalendarEvents).mockResolvedValue(mockEvents as any);

      const response = await request(app)
        .get('/api/calendar-events?userId=user123')
        .expect(200);

      expect(response.body).toHaveLength(1);
      expect(calendarRepository.findCalendarEvents).toHaveBeenCalledWith(
        'user123',
        undefined,
        undefined
      );
    });

    it('should handle database errors gracefully', async () => {
      vi.mocked(calendarRepository.findCalendarEvents).mockRejectedValue(
        new Error('Database connection failed')
      );

      await request(app)
        .get('/api/calendar-events')
        .expect(500);
    });
  });

  describe('GET /api/calendar-events/:id', () => {
    it('should return a single calendar event', async () => {
      const mockEvent = {
        id: '1',
        title: 'Important Meeting',
        description: 'Discuss annual giving campaign',
        scheduledAt: new Date('2026-02-15T10:00:00'),
        duration: 60,
      };

      vi.mocked(calendarRepository.findCalendarEventById).mockResolvedValue(mockEvent as any);

      const response = await request(app)
        .get('/api/calendar-events/1')
        .expect(200);

      expect(response.body.id).toBe('1');
      expect(response.body.title).toBe('Important Meeting');
      expect(calendarRepository.findCalendarEventById).toHaveBeenCalledWith('1');
    });

    it('should return 404 when event not found', async () => {
      vi.mocked(calendarRepository.findCalendarEventById).mockResolvedValue(null);

      const response = await request(app)
        .get('/api/calendar-events/nonexistent')
        .expect(404);

      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toContain('not found');
    });
  });

  describe('POST /api/calendar-events', () => {
    it('should create a new calendar event', async () => {
      const newEventData = {
        userId: 'user123',
        title: 'New Meeting',
        description: 'Strategy session',
        type: 'meeting',
        scheduledAt: '2026-02-20T10:00:00',
        duration: 90,
        location: 'Conference Room A',
        status: 'scheduled',
      };

      const createdEvent = {
        ...newEventData,
        id: 'new-id',
        scheduledAt: new Date(newEventData.scheduledAt),
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      vi.mocked(calendarRepository.createCalendarEvent).mockResolvedValue(createdEvent as any);

      const response = await request(app)
        .post('/api/calendar-events')
        .send(newEventData)
        .expect(201);

      expect(response.body.id).toBe('new-id');
      expect(response.body.title).toBe('New Meeting');
      expect(calendarRepository.createCalendarEvent).toHaveBeenCalled();
    });

    it('should return 400 when title is missing', async () => {
      const invalidData = {
        userId: 'user123',
        scheduledAt: '2026-02-20T10:00:00',
        // title is missing
      };

      const response = await request(app)
        .post('/api/calendar-events')
        .send(invalidData)
        .expect(400);

      expect(response.body).toHaveProperty('message');
    });

    it('should return 400 when scheduledAt is missing', async () => {
      const invalidData = {
        userId: 'user123',
        title: 'New Meeting',
        // scheduledAt is missing
      };

      const response = await request(app)
        .post('/api/calendar-events')
        .send(invalidData)
        .expect(400);

      expect(response.body).toHaveProperty('message');
    });
  });

  describe('PATCH /api/calendar-events/:id', () => {
    it('should update an existing calendar event', async () => {
      const existingEvent = {
        id: '1',
        title: 'Old Title',
        scheduledAt: new Date('2026-02-15T10:00:00'),
      };

      const updatedEvent = {
        ...existingEvent,
        title: 'Updated Title',
        updatedAt: new Date(),
      };

      vi.mocked(calendarRepository.findCalendarEventById).mockResolvedValue(existingEvent as any);
      vi.mocked(calendarRepository.updateCalendarEvent).mockResolvedValue(updatedEvent as any);

      const response = await request(app)
        .patch('/api/calendar-events/1')
        .send({ title: 'Updated Title' })
        .expect(200);

      expect(response.body.title).toBe('Updated Title');
      expect(calendarRepository.updateCalendarEvent).toHaveBeenCalledWith(
        '1',
        expect.objectContaining({ title: 'Updated Title' })
      );
    });

    it('should return 404 when updating non-existent event', async () => {
      vi.mocked(calendarRepository.findCalendarEventById).mockResolvedValue(null);

      const response = await request(app)
        .patch('/api/calendar-events/nonexistent')
        .send({ title: 'Updated Title' })
        .expect(404);

      expect(response.body).toHaveProperty('message');
    });
  });

  describe('DELETE /api/calendar-events/:id', () => {
    it('should delete a calendar event', async () => {
      const deletedEvent = {
        id: '1',
        title: 'Event to Delete',
        scheduledAt: new Date('2026-02-15T10:00:00'),
      };

      vi.mocked(calendarRepository.deleteCalendarEvent).mockResolvedValue(deletedEvent as any);

      const response = await request(app)
        .delete('/api/calendar-events/1')
        .expect(200);

      expect(response.body.id).toBe('1');
      expect(response.body.title).toBe('Event to Delete');
      expect(calendarRepository.deleteCalendarEvent).toHaveBeenCalledWith('1');
    });

    it('should return 404 when deleting non-existent event', async () => {
      vi.mocked(calendarRepository.deleteCalendarEvent).mockResolvedValue(null);

      const response = await request(app)
        .delete('/api/calendar-events/nonexistent')
        .expect(404);

      expect(response.body).toHaveProperty('message');
    });
  });
});
