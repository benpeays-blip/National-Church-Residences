/**
 * Data Health API Client
 *
 * Typed methods for data quality and health monitoring
 */

import { apiClient } from './client';

/**
 * Data health metrics and quality checks
 */
export interface DataHealthMetrics {
  overall: {
    score: number;
    status: 'excellent' | 'good' | 'fair' | 'poor';
    lastChecked: string;
  };
  metrics: {
    completeness: {
      score: number;
      details: Array<{
        field: string;
        completionRate: number;
        missingCount: number;
      }>;
    };
    accuracy: {
      score: number;
      details: Array<{
        field: string;
        errorRate: number;
        errorCount: number;
      }>;
    };
    consistency: {
      score: number;
      details: Array<{
        issue: string;
        count: number;
      }>;
    };
    timeliness: {
      score: number;
      details: Array<{
        dataType: string;
        avgAge: number;
        staleCount: number;
      }>;
    };
  };
  recommendations: Array<{
    priority: 'high' | 'medium' | 'low';
    issue: string;
    suggestion: string;
    affectedRecords: number;
  }>;
}

export const dataHealthApi = {
  /**
   * Get data health metrics and quality checks
   */
  getMetrics: () => {
    return apiClient.get<DataHealthMetrics>('/data-health');
  },
};
