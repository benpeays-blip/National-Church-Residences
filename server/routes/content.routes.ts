import { Router } from 'express';
import * as contentController from '../controllers/content.controller';

/**
 * Content Routes
 *
 * Defines routes for content management operations:
 * - GET /api/content/outreach-templates   - Get outreach templates
 * - GET /api/content/grant-proposals      - Get grant proposals
 * - GET /api/content/impact-reports       - Get impact reports
 */

export const contentRouter = Router();

contentRouter.get('/outreach-templates', contentController.getOutreachTemplates);
contentRouter.get('/grant-proposals', contentController.getGrantProposals);
contentRouter.get('/impact-reports', contentController.getImpactReports);
