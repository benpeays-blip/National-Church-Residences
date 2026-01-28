import { Router } from 'express';
import * as aiController from '../controllers/ai.controller';

/**
 * AI Routes
 *
 * Defines routes for AI-powered features:
 * - GET /api/ai/predictive-timing  - Get predictive major gift timing scores
 * - GET /api/ai/wealth-events      - Get wealth event monitoring data
 * - GET /api/ai/meeting-briefs     - Get AI-generated meeting briefs
 * - GET /api/ai/voice-notes        - Get voice note transcriptions
 */

export const aiRouter = Router();

aiRouter.get('/predictive-timing', aiController.getPredictiveTiming);
aiRouter.get('/wealth-events', aiController.getWealthEvents);
aiRouter.get('/meeting-briefs', aiController.getMeetingBriefs);
aiRouter.get('/voice-notes', aiController.getVoiceNotes);
