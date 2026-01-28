import { Router } from 'express';
import * as fundraisingEventsController from '../controllers/fundraising-events.controller';

/**
 * Fundraising Events Routes
 *
 * Defines routes for fundraising event operations:
 * - GET /api/fundraising-events - Get all fundraising events
 */

export const fundraisingEventsRouter = Router();

fundraisingEventsRouter.get('/', fundraisingEventsController.getFundraisingEvents);
