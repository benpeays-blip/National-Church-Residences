import { Router } from 'express';
import * as grantsController from '../controllers/grants.controller';
import { isAuthenticated } from '../middleware/auth';

/**
 * Grants Routes
 *
 * Defines all routes for grant management operations:
 * - GET    /api/grants           - Get all grants (with optional ownerId and stage filters)
 * - GET    /api/grants/:id       - Get a single grant
 * - POST   /api/grants           - Create a new grant (auth required)
 * - PATCH  /api/grants/:id       - Update a grant (auth required)
 * - DELETE /api/grants/:id       - Delete a grant (auth required)
 */

export const grantsRouter = Router();

grantsRouter.get('/', grantsController.getGrants);
grantsRouter.get('/:id', grantsController.getGrantById);
grantsRouter.post('/', isAuthenticated, grantsController.createGrant);
grantsRouter.patch('/:id', isAuthenticated, grantsController.updateGrant);
grantsRouter.delete('/:id', isAuthenticated, grantsController.deleteGrant);
