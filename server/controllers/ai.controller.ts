import { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import * as aiService from '../services/ai.service';

/**
 * AI Controller
 *
 * Handles HTTP requests for AI-powered features.
 */

export const getPredictiveTiming = asyncHandler(async (_req: Request, res: Response) => {
  const predictions = await aiService.getPredictiveTiming();
  res.json(predictions);
});

export const getWealthEvents = asyncHandler(async (_req: Request, res: Response) => {
  const events = await aiService.getWealthEvents();
  res.json(events);
});

export const getMeetingBriefs = asyncHandler(async (_req: Request, res: Response) => {
  const briefs = await aiService.getMeetingBriefs();
  res.json(briefs);
});

export const getVoiceNotes = asyncHandler(async (_req: Request, res: Response) => {
  const notes = await aiService.getVoiceNotes();
  res.json(notes);
});

/**
 * POST /api/impact-intelligence/chat
 * Chat with Impact Intelligence AI assistant
 */
export const chat = asyncHandler(async (req: Request, res: Response) => {
  const { message, context } = req.body;
  const reply = await aiService.chat(message, context);
  res.json({ reply });
});
