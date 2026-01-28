import { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import * as giftsService from '../services/gifts.service';
import { z } from 'zod';
import { ValidationError } from '../utils/errors';

/**
 * Gifts Controller
 *
 * Handles HTTP requests for gift/donation operations.
 * Delegates business logic to the gifts service.
 */

/**
 * GET /api/gifts
 * Get all gifts with optional filtering
 *
 * Query params:
 * - personId: Optional person ID to filter gifts
 */
export const getGifts = asyncHandler(async (req: Request, res: Response) => {
  const personId = req.query.personId as string | undefined;
  const gifts = await giftsService.getGifts(personId);
  res.json(gifts);
});

/**
 * GET /api/gifts/:id
 * Get a single gift by ID
 */
export const getGiftById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const gift = await giftsService.getGiftById(id);
  res.json(gift);
});

/**
 * Validation schema for creating/updating gifts
 */
const giftInputSchema = z.object({
  personId: z.string().min(1, 'Person ID is required'),
  amount: z.string().refine((val) => parseFloat(val) > 0, {
    message: 'Amount must be greater than zero',
  }),
  currency: z.string().default('USD'),
  giftType: z.enum(['one_time', 'major', 'recurring', 'planned', 'pledge', 'in_kind']).optional(),
  receivedAt: z.coerce.date(),
  fiscalYear: z.number().int().optional(),
  campaign: z.string().optional().nullable(),
  appeal: z.string().optional().nullable(),
  fund: z.string().optional().nullable(),
  designation: z.string().optional().nullable(),
  acknowledgmentStatus: z.string().optional().nullable(),
  acknowledgmentDate: z.coerce.date().optional().nullable(),
  taxDeductible: z.number().int().min(0).max(1).optional(),
  anonymous: z.number().int().min(0).max(1).optional(),
  matchingGiftEligible: z.number().int().min(0).max(1).optional(),
  matchingGiftEmployer: z.string().optional().nullable(),
  matchingGiftStatus: z.string().optional().nullable(),
  paymentMethod: z.string().optional().nullable(),
  checkNumber: z.string().optional().nullable(),
  notes: z.string().optional().nullable(),
});

/**
 * POST /api/gifts
 * Create a new gift
 */
export const createGift = asyncHandler(async (req: Request, res: Response) => {
  // Validate input
  const parsed = giftInputSchema.safeParse(req.body);
  if (!parsed.success) {
    throw new ValidationError('Invalid gift data', parsed.error.errors);
  }

  const gift = await giftsService.createGift(parsed.data);
  res.status(201).json(gift);
});

/**
 * PATCH /api/gifts/:id
 * Update an existing gift
 */
export const updateGift = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  // Validate input (partial update)
  const updateSchema = giftInputSchema.partial();
  const parsed = updateSchema.safeParse(req.body);
  if (!parsed.success) {
    throw new ValidationError('Invalid gift data', parsed.error.errors);
  }

  const gift = await giftsService.updateGift(id, parsed.data);
  res.json(gift);
});

/**
 * DELETE /api/gifts/:id
 * Delete a gift
 */
export const deleteGift = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const gift = await giftsService.deleteGift(id);
  res.json(gift);
});
