import { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import * as campaignsService from '../services/campaigns.service';
import { z } from 'zod';
import { ValidationError } from '../utils/errors';

/**
 * Campaigns Controller
 *
 * Handles HTTP requests for campaign management operations.
 */

export const getCampaigns = asyncHandler(async (_req: Request, res: Response) => {
  const campaignsList = await campaignsService.getCampaigns();
  res.json(campaignsList);
});

export const getCampaignById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const campaign = await campaignsService.getCampaignById(id);
  res.json(campaign);
});

const campaignInputSchema = z.object({
  name: z.string().min(1, 'Campaign name is required').max(255),
  type: z.string().min(1, 'Campaign type is required'),
  description: z.string().optional().nullable(),
  status: z.enum(['planning', 'active', 'completed', 'paused']).default('planning'),
  goal: z.string().optional().nullable(),
  raised: z.string().optional().nullable(),
  donorCount: z.number().int().min(0).optional().nullable(),
  avgGiftSize: z.string().optional().nullable(),
  totalGifts: z.number().int().min(0).optional().nullable(),
  ownerId: z.string().optional().nullable(),
  startDate: z.coerce.date().optional().nullable(),
  endDate: z.coerce.date().optional().nullable(),
});

export const createCampaign = asyncHandler(async (req: Request, res: Response) => {
  const parsed = campaignInputSchema.safeParse(req.body);
  if (!parsed.success) {
    throw new ValidationError('Invalid campaign data', parsed.error.errors);
  }

  const campaign = await campaignsService.createCampaign(parsed.data);
  res.status(201).json(campaign);
});

export const updateCampaign = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const updateSchema = campaignInputSchema.partial();
  const parsed = updateSchema.safeParse(req.body);
  if (!parsed.success) {
    throw new ValidationError('Invalid campaign data', parsed.error.errors);
  }

  const campaign = await campaignsService.updateCampaign(id, parsed.data);
  res.json(campaign);
});

export const deleteCampaign = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const campaign = await campaignsService.deleteCampaign(id);
  res.json(campaign);
});
