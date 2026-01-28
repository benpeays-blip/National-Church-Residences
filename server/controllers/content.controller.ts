import { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import * as contentService from '../services/content.service';

/**
 * Content Controller
 *
 * Handles HTTP requests for content management operations.
 */

export const getOutreachTemplates = asyncHandler(async (_req: Request, res: Response) => {
  const templates = await contentService.getOutreachTemplates();
  res.json(templates);
});

export const getGrantProposals = asyncHandler(async (_req: Request, res: Response) => {
  const proposals = await contentService.getGrantProposals();
  res.json(proposals);
});

export const getImpactReports = asyncHandler(async (_req: Request, res: Response) => {
  const reports = await contentService.getImpactReports();
  res.json(reports);
});
