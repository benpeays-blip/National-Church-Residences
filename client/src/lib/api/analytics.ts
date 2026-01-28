/**
 * Analytics API Client
 *
 * Typed methods for analytics and reporting operations
 */

import { apiClient } from './client';

/**
 * Peer benchmarking data
 */
export interface PeerBenchmark {
  metric: string;
  organizationValue: number;
  peerAverage: number;
  peerMedian: number;
  percentile: number;
  category: string;
}

/**
 * Sentiment analysis result
 */
export interface SentimentAnalysis {
  personId: string;
  overallSentiment: 'positive' | 'neutral' | 'negative';
  score: number;
  recentInteractions: number;
  engagementTrend: 'increasing' | 'stable' | 'decreasing';
  lastContactDate: string;
}

/**
 * Portfolio optimization recommendation
 */
export interface PortfolioOptimization {
  officerId: string;
  officerName: string;
  currentPortfolioSize: number;
  optimalPortfolioSize: number;
  addRecommendations: Array<{
    personId: string;
    personName: string;
    score: number;
    reason: string;
  }>;
  removeRecommendations: Array<{
    personId: string;
    personName: string;
    reason: string;
  }>;
}

export const analyticsApi = {
  /**
   * Get peer benchmarking data comparing organization to peers
   */
  getPeerBenchmarks: () => {
    return apiClient.get<PeerBenchmark[]>('/analytics/peer-benchmarks');
  },

  /**
   * Get sentiment analysis for donors
   */
  getSentimentAnalysis: () => {
    return apiClient.get<SentimentAnalysis[]>('/analytics/sentiment');
  },

  /**
   * Get portfolio optimization recommendations
   */
  getPortfolioOptimization: () => {
    return apiClient.get<PortfolioOptimization[]>('/analytics/portfolio-optimization');
  },
};
