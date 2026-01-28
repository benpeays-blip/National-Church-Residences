import { db } from '../db';
import { peerBenchmarks, sentimentAnalysis, portfolioOptimizations } from '@shared/schema';
import { desc } from 'drizzle-orm';
import { logger } from '../config/logging';

/**
 * Analytics Service
 *
 * Contains business logic for analytics and reporting operations.
 */

export async function getPeerBenchmarks() {
  logger.debug('Fetching peer benchmarks');

  const benchmarks = await db
    .select()
    .from(peerBenchmarks)
    .orderBy(desc(peerBenchmarks.calculatedAt));

  logger.info('Peer benchmarks fetched', { count: benchmarks.length });
  return benchmarks;
}

export async function getSentimentAnalysis() {
  logger.debug('Fetching sentiment analysis');

  const results = await db
    .select()
    .from(sentimentAnalysis)
    .orderBy(desc(sentimentAnalysis.analysisDate))
    .limit(100);

  logger.info('Sentiment analysis fetched', { count: results.length });
  return results;
}

export async function getPortfolioOptimizations() {
  logger.debug('Fetching portfolio optimizations');

  const optimizations = await db
    .select()
    .from(portfolioOptimizations)
    .orderBy(desc(portfolioOptimizations.runDate))
    .limit(10);

  logger.info('Portfolio optimizations fetched', { count: optimizations.length });
  return optimizations;
}
