/**
 * Dashboards API Client
 *
 * Typed methods for executive and role-based dashboard data
 */

import { apiClient } from './client';

/**
 * Common metric structure
 */
interface DashboardMetric {
  label: string;
  value: string | number;
  change?: {
    value: number;
    period: string;
    direction: 'up' | 'down' | 'neutral';
  };
}

/**
 * Home dashboard data (executive overview)
 */
export interface HomeDashboard {
  summary: {
    totalRevenue: DashboardMetric;
    ytdProgress: DashboardMetric;
    activeDonors: DashboardMetric;
    majorGiftsPipeline: DashboardMetric;
  };
  recentActivity: Array<{
    id: string;
    type: 'gift' | 'interaction' | 'opportunity' | 'task';
    description: string;
    timestamp: string;
    personName?: string;
  }>;
  upcomingTasks: Array<{
    id: string;
    title: string;
    dueDate: string;
    priority: 'high' | 'medium' | 'low';
  }>;
  charts: {
    revenueByMonth: Array<{ month: string; amount: number }>;
    giftsByType: Array<{ type: string; count: number; amount: number }>;
  };
}

/**
 * MGO dashboard data (Major Gifts Officer portfolio)
 */
export interface MGODashboard {
  portfolio: {
    totalProspects: number;
    activeOpportunities: number;
    pipelineValue: number;
    avgGiftSize: number;
  };
  prospects: Array<{
    personId: string;
    personName: string;
    stage: string;
    estimatedCapacity: number;
    nextAction: string;
    nextActionDate: string;
  }>;
  recentInteractions: Array<{
    id: string;
    personName: string;
    type: string;
    date: string;
    summary: string;
  }>;
  tasks: Array<{
    id: string;
    title: string;
    personName: string;
    dueDate: string;
    priority: 'high' | 'medium' | 'low';
  }>;
}

/**
 * Development Director dashboard data (operational overview)
 */
export interface DevDirectorDashboard {
  teamPerformance: {
    totalRevenue: number;
    goalProgress: number;
    teamSize: number;
    avgGiftsPerOfficer: number;
  };
  officers: Array<{
    officerId: string;
    officerName: string;
    portfolioSize: number;
    ytdRevenue: number;
    goalProgress: number;
    opportunities: number;
  }>;
  pipeline: {
    totalValue: number;
    byStage: Array<{ stage: string; count: number; value: number }>;
  };
  metrics: {
    donorRetention: number;
    avgGiftSize: number;
    newDonors: number;
    lapsedDonors: number;
  };
}

/**
 * CEO dashboard data (strategic overview)
 */
export interface CEODashboard {
  strategic: {
    annualGoal: number;
    ytdRevenue: number;
    goalProgress: number;
    projectedRevenue: number;
  };
  trends: {
    revenueByQuarter: Array<{ quarter: string; revenue: number; goal: number }>;
    donorGrowth: Array<{ month: string; new: number; lapsed: number; net: number }>;
  };
  majorInitiatives: Array<{
    id: string;
    name: string;
    goal: number;
    raised: number;
    progress: number;
    endDate: string;
  }>;
  board: {
    givingParticipation: number;
    totalBoardGiving: number;
    avgBoardGift: number;
  };
}

export const dashboardsApi = {
  /**
   * Get executive overview dashboard
   */
  getHome: () => {
    return apiClient.get<HomeDashboard>('/dashboard/home');
  },

  /**
   * Get Major Gifts Officer portfolio dashboard
   */
  getMGO: () => {
    return apiClient.get<MGODashboard>('/dashboard/mgo');
  },

  /**
   * Get Development Director operational dashboard
   */
  getDevDirector: () => {
    return apiClient.get<DevDirectorDashboard>('/dashboard/dev-director');
  },

  /**
   * Get CEO strategic dashboard
   */
  getCEO: () => {
    return apiClient.get<CEODashboard>('/dashboard/ceo');
  },
};
