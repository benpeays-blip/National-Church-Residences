import { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import * as analyticsService from '../services/analytics.service';

/**
 * Analytics Controller
 *
 * Handles HTTP requests for analytics and reporting operations.
 */

export const getPeerBenchmarks = asyncHandler(async (_req: Request, res: Response) => {
  const benchmarks = await analyticsService.getPeerBenchmarks();
  res.json(benchmarks);
});

export const getSentimentAnalysis = asyncHandler(async (_req: Request, res: Response) => {
  const results = await analyticsService.getSentimentAnalysis();
  res.json(results);
});

export const getPortfolioOptimizations = asyncHandler(async (_req: Request, res: Response) => {
  const optimizations = await analyticsService.getPortfolioOptimizations();
  res.json(optimizations);
});
