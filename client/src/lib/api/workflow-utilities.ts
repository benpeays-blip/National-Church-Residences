/**
 * Workflow Utilities API Client
 *
 * Typed methods for workflow-related utility endpoints
 */

import { apiClient } from './client';

/**
 * Stewardship workflow data
 */
export interface StewardshipWorkflow {
  personId: string;
  personName: string;
  lastGiftDate: string;
  lastGiftAmount: number;
  daysSinceGift: number;
  suggestedAction: string;
  priority: 'high' | 'medium' | 'low';
  automatedTasksScheduled: number;
}

/**
 * Task priority score
 */
export interface TaskPriorityScore {
  taskId: string;
  title: string;
  personId?: string;
  personName?: string;
  priorityScore: number;
  factors: Array<{
    factor: string;
    weight: number;
    contribution: number;
  }>;
  suggestedDueDate: string;
}

/**
 * Gift registry data
 */
export interface GiftRegistry {
  id: string;
  personId: string;
  personName: string;
  occasionType: 'birthday' | 'anniversary' | 'holiday' | 'other';
  occasionDate: string;
  suggestedGiftAmount: number;
  notes?: string;
  status: 'pending' | 'purchased' | 'sent';
}

export const workflowUtilitiesApi = {
  /**
   * Get calendar events (workflow context)
   */
  getCalendarEvents: () => {
    return apiClient.get<any[]>('/workflow/calendar');
  },

  /**
   * Get stewardship workflows
   */
  getStewardshipWorkflows: () => {
    return apiClient.get<StewardshipWorkflow[]>('/workflow/stewardship');
  },

  /**
   * Get AI-calculated task priority scores
   */
  getTaskPriorities: () => {
    return apiClient.get<TaskPriorityScore[]>('/workflow/task-priorities');
  },

  /**
   * Get gift registries for donor recognition
   */
  getGiftRegistries: () => {
    return apiClient.get<GiftRegistry[]>('/workflow/gift-registries');
  },
};
