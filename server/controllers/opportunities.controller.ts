import { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import * as opportunitiesService from '../services/opportunities.service';
import { z } from 'zod';
import { ValidationError } from '../utils/errors';

/**
 * Opportunities Controller
 *
 * Handles HTTP requests for fundraising opportunity operations.
 * Delegates business logic to the opportunities service.
 */

/**
 * GET /api/opportunities
 * Get all opportunities with optional filtering
 *
 * Query params:
 * - ownerId: Optional owner (MGO) ID to filter opportunities
 */
export const getOpportunities = asyncHandler(async (req: Request, res: Response) => {
  const ownerId = req.query.ownerId as string | undefined;
  const opportunities = await opportunitiesService.getOpportunities(ownerId);
  res.json(opportunities);
});

/**
 * GET /api/opportunities/:id
 * Get a single opportunity by ID
 */
export const getOpportunityById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const opportunity = await opportunitiesService.getOpportunityById(id);
  res.json(opportunity);
});

/**
 * Validation schema for creating/updating opportunities
 * Matches the database opportunities table schema
 */
const opportunityInputSchema = z.object({
  personId: z.string().min(1, 'Person ID is required'),
  ownerId: z.string().optional().nullable(),
  stage: z
    .enum(['Prospect', 'Cultivation', 'Ask', 'Steward', 'Renewal'])
    .default('Prospect'),
  askAmount: z.string().refine((val) => parseFloat(val) > 0, {
    message: 'Ask amount must be greater than zero',
  }).optional().nullable(),
  probability: z.number().int().min(0).max(100).optional().nullable(),
  closeDate: z.coerce.date().optional().nullable(),
  notes: z.string().optional().nullable(),
  daysInStage: z.number().int().min(0).optional().nullable(),
  sourceSystem: z.string().optional().nullable(),
  sourceRecordId: z.string().optional().nullable(),
  syncedAt: z.coerce.date().optional().nullable(),
  dataQualityScore: z.number().int().min(0).max(100).optional().nullable(),
});

/**
 * POST /api/opportunities
 * Create a new opportunity
 */
export const createOpportunity = asyncHandler(async (req: Request, res: Response) => {
  // Validate input
  const parsed = opportunityInputSchema.safeParse(req.body);
  if (!parsed.success) {
    throw new ValidationError('Invalid opportunity data', parsed.error.errors);
  }

  const opportunity = await opportunitiesService.createOpportunity(parsed.data);
  res.status(201).json(opportunity);
});

/**
 * PATCH /api/opportunities/:id
 * Update an existing opportunity
 */
export const updateOpportunity = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  // Validate input (partial update)
  const updateSchema = opportunityInputSchema.partial();
  const parsed = updateSchema.safeParse(req.body);
  if (!parsed.success) {
    throw new ValidationError('Invalid opportunity data', parsed.error.errors);
  }

  const opportunity = await opportunitiesService.updateOpportunity(id, parsed.data);
  res.json(opportunity);
});

/**
 * DELETE /api/opportunities/:id
 * Delete an opportunity
 */
export const deleteOpportunity = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const opportunity = await opportunitiesService.deleteOpportunity(id);
  res.json(opportunity);
});
