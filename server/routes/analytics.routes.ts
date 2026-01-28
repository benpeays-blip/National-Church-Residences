import { Router } from 'express';
import * as analyticsController from '../controllers/analytics.controller';

/**
 * Analytics Routes
 *
 * Defines routes for analytics and reporting operations:
 * - GET /api/analytics/peer-benchmarks          - Get peer benchmarking data
 * - GET /api/analytics/sentiment                - Get sentiment analysis results
 * - GET /api/analytics/portfolio-optimization   - Get portfolio optimization results
 */

export const analyticsRouter = Router();

analyticsRouter.get('/peer-benchmarks', analyticsController.getPeerBenchmarks);
analyticsRouter.get('/sentiment', analyticsController.getSentimentAnalysis);
analyticsRouter.get('/portfolio-optimization', analyticsController.getPortfolioOptimizations);
