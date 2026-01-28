import { Router } from 'express';
import * as opportunitiesController from '../controllers/opportunities.controller';
import { isAuthenticated } from '../middleware/auth';

/**
 * Opportunities Routes
 *
 * Defines all routes for fundraising opportunity operations:
 * - GET    /api/opportunities           - Get all opportunities (with optional ownerId filter)
 * - GET    /api/opportunities/:id       - Get a single opportunity
 * - POST   /api/opportunities           - Create a new opportunity (auth required)
 * - PATCH  /api/opportunities/:id       - Update an opportunity (auth required)
 * - DELETE /api/opportunities/:id       - Delete an opportunity (auth required)
 */

export const opportunitiesRouter = Router();

opportunitiesRouter.get('/', opportunitiesController.getOpportunities);
opportunitiesRouter.get('/:id', opportunitiesController.getOpportunityById);
opportunitiesRouter.post('/', isAuthenticated, opportunitiesController.createOpportunity);
opportunitiesRouter.patch('/:id', isAuthenticated, opportunitiesController.updateOpportunity);
opportunitiesRouter.delete('/:id', isAuthenticated, opportunitiesController.deleteOpportunity);
