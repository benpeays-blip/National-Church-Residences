import { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import { insertOrganizationCanvasSchema } from '@shared/schema';
import * as organizationCanvasesService from '../services/organization-canvases.service';

/**
 * Organization Canvases Controller
 *
 * Handles HTTP requests for organization canvas management.
 */

export const getOrganizationCanvases = asyncHandler(
  async (req: Request, res: Response) => {
    const ownerId = req.query.ownerId as string | undefined;
    const canvases = await organizationCanvasesService.getOrganizationCanvases(ownerId);
    res.json(canvases);
  }
);

export const getOrganizationCanvasById = asyncHandler(
  async (req: Request, res: Response) => {
    const canvas = await organizationCanvasesService.getOrganizationCanvasById(
      req.params.id
    );
    res.json(canvas);
  }
);

export const createOrganizationCanvas = asyncHandler(
  async (req: Request, res: Response) => {
    const validated = insertOrganizationCanvasSchema.parse(req.body);
    const canvas = await organizationCanvasesService.createOrganizationCanvas(validated);
    res.json(canvas);
  }
);

export const updateOrganizationCanvas = asyncHandler(
  async (req: Request, res: Response) => {
    // Partial validation - only validate fields that are provided
    const canvas = await organizationCanvasesService.updateOrganizationCanvas(
      req.params.id,
      req.body
    );
    res.json(canvas);
  }
);

export const deleteOrganizationCanvas = asyncHandler(
  async (req: Request, res: Response) => {
    await organizationCanvasesService.deleteOrganizationCanvas(req.params.id);
    res.json({ success: true });
  }
);
