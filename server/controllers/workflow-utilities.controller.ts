import { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import * as workflowUtilitiesService from '../services/workflow-utilities.service';

/**
 * Workflow Utilities Controller
 *
 * Handles HTTP requests for workflow-related utility endpoints.
 */

export const getCalendarEvents = asyncHandler(async (_req: Request, res: Response) => {
  const events = await workflowUtilitiesService.getCalendarEvents();
  res.json(events);
});

export const getStewardshipWorkflows = asyncHandler(
  async (_req: Request, res: Response) => {
    const workflows = await workflowUtilitiesService.getStewardshipWorkflows();
    res.json(workflows);
  }
);

export const getTaskPriorities = asyncHandler(async (_req: Request, res: Response) => {
  const priorities = await workflowUtilitiesService.getTaskPriorities();
  res.json(priorities);
});

export const getGiftRegistries = asyncHandler(async (_req: Request, res: Response) => {
  const registries = await workflowUtilitiesService.getGiftRegistries();
  res.json(registries);
});
