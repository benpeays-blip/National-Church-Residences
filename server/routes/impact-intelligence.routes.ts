import { Router } from 'express';
import * as aiController from '../controllers/ai.controller';

/**
 * Impact Intelligence Routes
 *
 * Defines routes for Impact Intelligence AI assistant:
 * - POST /api/impact-intelligence/chat - Chat with AI assistant for impact stories and outcomes
 */

export const impactIntelligenceRouter = Router();

impactIntelligenceRouter.post('/chat', aiController.chat);
