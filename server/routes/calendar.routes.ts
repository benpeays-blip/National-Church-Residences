import { Router } from 'express';
import * as calendarController from '../controllers/calendar.controller';

/**
 * Calendar Routes
 *
 * Defines all routes for calendar event operations:
 * - GET    /api/calendar-events       - Get all calendar events (with optional filters)
 * - GET    /api/calendar-events/:id   - Get a single calendar event
 * - POST   /api/calendar-events       - Create a new calendar event
 * - PATCH  /api/calendar-events/:id   - Update a calendar event
 * - DELETE /api/calendar-events/:id   - Delete a calendar event
 */

export const calendarRouter = Router();

// GET all calendar events (with optional filtering)
calendarRouter.get('/', calendarController.getCalendarEvents);

// GET single calendar event by ID
calendarRouter.get('/:id', calendarController.getCalendarEventById);

// POST create new calendar event
calendarRouter.post('/', calendarController.createCalendarEvent);

// PATCH update calendar event
calendarRouter.patch('/:id', calendarController.updateCalendarEvent);

// DELETE calendar event
calendarRouter.delete('/:id', calendarController.deleteCalendarEvent);
