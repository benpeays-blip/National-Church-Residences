import { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import * as fundraisingEventsService from '../services/fundraising-events.service';

/**
 * Fundraising Events Controller
 *
 * Handles HTTP requests for fundraising event operations.
 */

export const getFundraisingEvents = asyncHandler(async (_req: Request, res: Response) => {
  const events = await fundraisingEventsService.getFundraisingEvents();
  res.json(events);
});
