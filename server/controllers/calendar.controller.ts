import { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import * as calendarService from '../services/calendar.service';
import { z } from 'zod';
import { ValidationError } from '../utils/errors';

/**
 * Calendar Controller
 *
 * Handles HTTP requests for calendar event operations.
 * Delegates business logic to the calendar service.
 */

/**
 * GET /api/calendar-events
 * Get all calendar events with optional filtering
 *
 * Query params:
 * - userId: Filter by user ID
 * - startDate: Filter by start date (ISO 8601)
 * - endDate: Filter by end date (ISO 8601)
 */
export const getCalendarEvents = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.query.userId as string | undefined;
  const startDate = req.query.startDate ? new Date(req.query.startDate as string) : undefined;
  const endDate = req.query.endDate ? new Date(req.query.endDate as string) : undefined;

  // Validate dates if provided
  if (startDate && isNaN(startDate.getTime())) {
    throw new ValidationError('Invalid startDate format');
  }
  if (endDate && isNaN(endDate.getTime())) {
    throw new ValidationError('Invalid endDate format');
  }

  const events = await calendarService.getCalendarEvents(userId, startDate, endDate);
  res.json(events);
});

/**
 * GET /api/calendar-events/:id
 * Get a single calendar event by ID
 */
export const getCalendarEventById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const event = await calendarService.getCalendarEventById(id);
  res.json(event);
});

/**
 * Validation schema for creating/updating calendar events
 * Matches the actual database schema
 */
const calendarEventInputSchema = z.object({
  userId: z.string(),
  personId: z.string().nullable().optional(),
  title: z.string().min(1, 'Title is required').max(255),
  description: z.string().nullable().optional(),
  eventType: z.string().optional(), // "call", "email", "meeting", "task", etc.
  scheduledAt: z.coerce.date(),
  duration: z.number().int().positive().nullable().optional(), // Minutes
  aiSuggestedTime: z.coerce.date().nullable().optional(),
  priority: z.string().nullable().optional(), // "high", "medium", "low"
  estimatedImpact: z.string().nullable().optional(), // Decimal stored as string
  meetingBriefId: z.string().nullable().optional(),
  taskId: z.string().nullable().optional(),
  completed: z.number().int().min(0).max(1).default(0),
  outcome: z.string().nullable().optional(),
});

/**
 * POST /api/calendar-events
 * Create a new calendar event
 */
export const createCalendarEvent = asyncHandler(async (req: Request, res: Response) => {
  // Validate input
  const parsed = calendarEventInputSchema.safeParse(req.body);
  if (!parsed.success) {
    throw new ValidationError('Invalid calendar event data', parsed.error.errors);
  }

  const event = await calendarService.createCalendarEvent(parsed.data);
  res.status(201).json(event);
});

/**
 * PATCH /api/calendar-events/:id
 * Update an existing calendar event
 */
export const updateCalendarEvent = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  // Validate input (partial update)
  const updateSchema = calendarEventInputSchema.partial();
  const parsed = updateSchema.safeParse(req.body);
  if (!parsed.success) {
    throw new ValidationError('Invalid calendar event data', parsed.error.errors);
  }

  const event = await calendarService.updateCalendarEvent(id, parsed.data);
  res.json(event);
});

/**
 * DELETE /api/calendar-events/:id
 * Delete a calendar event
 */
export const deleteCalendarEvent = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const event = await calendarService.deleteCalendarEvent(id);
  res.json(event);
});
