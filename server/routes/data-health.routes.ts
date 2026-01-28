import { Router } from 'express';
import * as dataHealthController from '../controllers/data-health.controller';

/**
 * Data Health Routes
 *
 * Defines routes for data quality and health monitoring:
 * - GET /api/data-health - Get data health metrics and quality checks
 */

export const dataHealthRouter = Router();

dataHealthRouter.get('/', dataHealthController.getDataHealthMetrics);
