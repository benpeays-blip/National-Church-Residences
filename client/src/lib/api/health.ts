/**
 * Health Check API Client
 *
 * Typed methods for system health monitoring
 */

import { apiClient } from './client';

/**
 * Overall system health status
 */
export interface HealthStatus {
  status: 'healthy' | 'degraded' | 'unhealthy';
  timestamp: string;
  uptime: number;
  version?: string;
  checks: {
    database: {
      status: 'healthy' | 'unhealthy';
      responseTime?: number;
      error?: string;
    };
    storage: {
      status: 'healthy' | 'unhealthy';
      error?: string;
    };
    redis?: {
      status: 'healthy' | 'unhealthy';
      error?: string;
    };
  };
}

/**
 * Liveness probe response (Kubernetes)
 */
export interface LivenessStatus {
  status: 'alive';
  timestamp: string;
}

/**
 * Readiness probe response (Kubernetes)
 */
export interface ReadinessStatus {
  status: 'ready' | 'not ready';
  timestamp: string;
  checks: {
    database: boolean;
    storage: boolean;
  };
}

export const healthApi = {
  /**
   * Get overall system health
   */
  getHealth: () => {
    return apiClient.get<HealthStatus>('/health');
  },

  /**
   * Get liveness status (Kubernetes liveness probe)
   */
  getLiveness: () => {
    return apiClient.get<LivenessStatus>('/health/live');
  },

  /**
   * Get readiness status (Kubernetes readiness probe)
   */
  getReadiness: () => {
    return apiClient.get<ReadinessStatus>('/health/ready');
  },
};
