import { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import * as interactionsService from '../services/interactions.service';
import { z } from 'zod';
import { ValidationError } from '../utils/errors';

/**
 * Interactions Controller
 *
 * Handles HTTP requests for interaction tracking operations.
 */

export const getInteractions = asyncHandler(async (req: Request, res: Response) => {
  const personId = req.query.personId as string | undefined;
  const interactionsList = await interactionsService.getInteractions(personId);
  res.json(interactionsList);
});

export const getInteractionById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const interaction = await interactionsService.getInteractionById(id);
  res.json(interaction);
});

const interactionInputSchema = z.object({
  personId: z.string().min(1, 'Person ID is required'),
  type: z.enum(['email_open', 'email_click', 'meeting', 'call', 'event', 'note']),
  occurredAt: z.coerce.date(),
  ownerId: z.string().optional().nullable(),
  notes: z.string().optional().nullable(),
  source: z.string().optional().nullable(),
  sourceSystem: z.string().optional().nullable(),
  sourceRecordId: z.string().optional().nullable(),
  syncedAt: z.coerce.date().optional().nullable(),
  dataQualityScore: z.number().int().min(0).max(100).optional().nullable(),
});

export const createInteraction = asyncHandler(async (req: Request, res: Response) => {
  const parsed = interactionInputSchema.safeParse(req.body);
  if (!parsed.success) {
    throw new ValidationError('Invalid interaction data', parsed.error.errors);
  }

  const interaction = await interactionsService.createInteraction(parsed.data);
  res.status(201).json(interaction);
});

export const updateInteraction = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const updateSchema = interactionInputSchema.partial();
  const parsed = updateSchema.safeParse(req.body);
  if (!parsed.success) {
    throw new ValidationError('Invalid interaction data', parsed.error.errors);
  }

  const interaction = await interactionsService.updateInteraction(id, parsed.data);
  res.json(interaction);
});

export const deleteInteraction = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const interaction = await interactionsService.deleteInteraction(id);
  res.json(interaction);
});
