import { Router } from 'express';
import * as interactionsController from '../controllers/interactions.controller';
import { isAuthenticated } from '../middleware/auth';

/**
 * Interactions Routes
 *
 * Defines all routes for interaction tracking operations:
 * - GET    /api/interactions       - Get all interactions (with optional personId filter) (auth required)
 * - GET    /api/interactions/:id   - Get a single interaction (auth required)
 * - POST   /api/interactions       - Create a new interaction (auth required)
 * - PATCH  /api/interactions/:id   - Update an interaction (auth required)
 * - DELETE /api/interactions/:id   - Delete an interaction (auth required)
 */

export const interactionsRouter = Router();

interactionsRouter.get('/', isAuthenticated, interactionsController.getInteractions);
interactionsRouter.get('/:id', isAuthenticated, interactionsController.getInteractionById);
interactionsRouter.post('/', isAuthenticated, interactionsController.createInteraction);
interactionsRouter.patch('/:id', isAuthenticated, interactionsController.updateInteraction);
interactionsRouter.delete('/:id', isAuthenticated, interactionsController.deleteInteraction);
