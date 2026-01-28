import { Router } from 'express';
import * as giftsController from '../controllers/gifts.controller';
import { isAuthenticated } from '../middleware/auth';

/**
 * Gifts Routes
 *
 * Defines all routes for gift/donation operations:
 * - GET    /api/gifts           - Get all gifts (with optional personId filter)
 * - GET    /api/gifts/:id       - Get a single gift
 * - POST   /api/gifts           - Create a new gift (auth required)
 * - PATCH  /api/gifts/:id       - Update a gift (auth required)
 * - DELETE /api/gifts/:id       - Delete a gift (auth required)
 */

export const giftsRouter = Router();

giftsRouter.get('/', giftsController.getGifts);
giftsRouter.get('/:id', giftsController.getGiftById);
giftsRouter.post('/', isAuthenticated, giftsController.createGift);
giftsRouter.patch('/:id', isAuthenticated, giftsController.updateGift);
giftsRouter.delete('/:id', isAuthenticated, giftsController.deleteGift);
