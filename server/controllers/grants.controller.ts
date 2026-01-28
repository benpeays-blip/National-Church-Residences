import { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import * as grantsService from '../services/grants.service';
import { z } from 'zod';
import { ValidationError } from '../utils/errors';

/**
 * Grants Controller
 *
 * Handles HTTP requests for grant management operations.
 * Delegates business logic to the grants service.
 */

/**
 * GET /api/grants
 * Get all grants with optional filtering
 *
 * Query params:
 * - ownerId: Optional owner (grant writer/manager) ID to filter grants
 * - stage: Optional stage to filter grants (Research, LOI, Submitted, Awarded, Declined, ReportDue)
 */
export const getGrants = asyncHandler(async (req: Request, res: Response) => {
  const ownerId = req.query.ownerId as string | undefined;
  const stage = req.query.stage as string | undefined;

  const grantsList = await grantsService.getGrants(ownerId, stage);
  res.json(grantsList);
});

/**
 * GET /api/grants/:id
 * Get a single grant by ID
 */
export const getGrantById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const grant = await grantsService.getGrantById(id);
  res.json(grant);
});

/**
 * Validation schema for creating/updating grants
 */
const grantInputSchema = z.object({
  funderName: z.string().min(1, 'Funder name is required').max(255),
  funderContactId: z.string().optional().nullable(),
  stage: z
    .enum(['Research', 'LOI', 'Submitted', 'Awarded', 'Declined', 'ReportDue'])
    .default('Research'),
  purpose: z.string().optional().nullable(),
  askAmount: z.string().optional().nullable(),
  awardedAmount: z.string().optional().nullable(),
  campaignId: z.string().optional().nullable(),
  ownerId: z.string().optional().nullable(),
  loiDueDate: z.coerce.date().optional().nullable(),
  applicationDueDate: z.coerce.date().optional().nullable(),
  decisionDate: z.coerce.date().optional().nullable(),
  reportDueDate: z.coerce.date().optional().nullable(),
  notes: z.string().optional().nullable(),
  sourceSystem: z.string().optional().nullable(),
  sourceRecordId: z.string().optional().nullable(),
  syncedAt: z.coerce.date().optional().nullable(),
  dataQualityScore: z.number().int().min(0).max(100).optional().nullable(),
});

/**
 * POST /api/grants
 * Create a new grant
 */
export const createGrant = asyncHandler(async (req: Request, res: Response) => {
  // Validate input
  const parsed = grantInputSchema.safeParse(req.body);
  if (!parsed.success) {
    throw new ValidationError('Invalid grant data', parsed.error.errors);
  }

  const grant = await grantsService.createGrant(parsed.data);
  res.status(201).json(grant);
});

/**
 * PATCH /api/grants/:id
 * Update an existing grant
 */
export const updateGrant = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  // Validate input (partial update)
  const updateSchema = grantInputSchema.partial();
  const parsed = updateSchema.safeParse(req.body);
  if (!parsed.success) {
    throw new ValidationError('Invalid grant data', parsed.error.errors);
  }

  const grant = await grantsService.updateGrant(id, parsed.data);
  res.json(grant);
});

/**
 * DELETE /api/grants/:id
 * Delete a grant
 */
export const deleteGrant = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const grant = await grantsService.deleteGrant(id);
  res.json(grant);
});
