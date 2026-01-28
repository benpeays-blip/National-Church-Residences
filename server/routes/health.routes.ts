import { Router } from 'express';
import * as healthController from '../controllers/health.controller';

/**
 * Health Check Routes
 *
 * Defines all routes for health check operations:
 * - GET /health       - Overall system health
 * - GET /health/live  - Kubernetes liveness probe
 * - GET /health/ready - Kubernetes readiness probe
 */

export const healthRouter = Router();

healthRouter.get('/', healthController.getHealth);
healthRouter.get('/live', healthController.getLiveness);
healthRouter.get('/ready', healthController.getReadiness);
