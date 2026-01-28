import { Router } from 'express';
import * as dashboardsController from '../controllers/dashboards.controller';

/**
 * Dashboards Routes
 *
 * Defines routes for executive and role-based dashboards:
 * - GET /api/dashboard/home          - Executive overview dashboard
 * - GET /api/dashboard/mgo           - Major Gifts Officer portfolio dashboard
 * - GET /api/dashboard/dev-director  - Development Director operational dashboard
 * - GET /api/dashboard/ceo           - CEO strategic dashboard
 */

export const dashboardsRouter = Router();

dashboardsRouter.get('/home', dashboardsController.getHomeDashboard);
dashboardsRouter.get('/mgo', dashboardsController.getMGODashboard);
dashboardsRouter.get('/dev-director', dashboardsController.getDevDirectorDashboard);
dashboardsRouter.get('/ceo', dashboardsController.getCEODashboard);
