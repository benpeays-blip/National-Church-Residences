import { Router } from 'express';
import * as campaignsController from '../controllers/campaigns.controller';
import { isAuthenticated } from '../middleware/auth';

/**
 * Campaigns Routes
 *
 * Defines all routes for campaign management operations:
 * - GET    /api/campaigns       - Get all campaigns
 * - GET    /api/campaigns/:id   - Get a single campaign
 * - POST   /api/campaigns       - Create a new campaign (auth required)
 * - PATCH  /api/campaigns/:id   - Update a campaign (auth required)
 * - DELETE /api/campaigns/:id   - Delete a campaign (auth required)
 */

export const campaignsRouter = Router();

campaignsRouter.get('/', campaignsController.getCampaigns);
campaignsRouter.get('/:id', campaignsController.getCampaignById);
campaignsRouter.post('/', isAuthenticated, campaignsController.createCampaign);
campaignsRouter.patch('/:id', isAuthenticated, campaignsController.updateCampaign);
campaignsRouter.delete('/:id', isAuthenticated, campaignsController.deleteCampaign);
