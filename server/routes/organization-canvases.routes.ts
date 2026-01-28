import { Router } from 'express';
import * as organizationCanvasesController from '../controllers/organization-canvases.controller';

/**
 * Organization Canvases Routes
 *
 * Defines routes for organization canvas management:
 * - GET    /api/organization-canvases       - Get all organization canvases (optional ownerId filter)
 * - GET    /api/organization-canvases/:id   - Get single organization canvas
 * - POST   /api/organization-canvases       - Create organization canvas
 * - PUT    /api/organization-canvases/:id   - Update organization canvas
 * - DELETE /api/organization-canvases/:id   - Delete organization canvas
 */

export const organizationCanvasesRouter = Router();

organizationCanvasesRouter.get(
  '/',
  organizationCanvasesController.getOrganizationCanvases
);
organizationCanvasesRouter.get(
  '/:id',
  organizationCanvasesController.getOrganizationCanvasById
);
organizationCanvasesRouter.post(
  '/',
  organizationCanvasesController.createOrganizationCanvas
);
organizationCanvasesRouter.put(
  '/:id',
  organizationCanvasesController.updateOrganizationCanvas
);
organizationCanvasesRouter.delete(
  '/:id',
  organizationCanvasesController.deleteOrganizationCanvas
);
