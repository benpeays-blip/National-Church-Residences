/**
 * Typed API Client
 *
 * Centralized, type-safe API client for all backend operations
 *
 * Usage:
 * ```typescript
 * import { api } from '@/lib/api';
 *
 * // Get all persons
 * const persons = await api.persons.getAll();
 *
 * // Create a gift
 * const gift = await api.gifts.create({ personId: '123', amount: '100.00', ... });
 *
 * // Update an opportunity
 * const opp = await api.opportunities.update('456', { stage: 'Steward' });
 *
 * // Get AI insights
 * const timing = await api.ai.getPredictiveTiming();
 * ```
 */

// Re-export for convenience
import { personsApi } from './persons';
import { giftsApi } from './gifts';
import { opportunitiesApi } from './opportunities';
import { calendarApi } from './calendar';
import { grantsApi } from './grants';
import { campaignsApi } from './campaigns';
import { tasksApi } from './tasks';
import { interactionsApi } from './interactions';
import { fundraisingEventsApi } from './fundraising-events';
import { aiApi } from './ai';
import { analyticsApi } from './analytics';
import { contentApi } from './content';
import { dataHealthApi } from './data-health';
import { dashboardsApi } from './dashboards';
import { workflowsApi } from './workflows';
import { workflowUtilitiesApi } from './workflow-utilities';
import { meetingNotesApi } from './meeting-notes';
import { organizationCanvasesApi } from './organization-canvases';
import { impactIntelligenceApi } from './impact-intelligence';
import { healthApi } from './health';

export { ApiError, apiClient } from './client';
export { personsApi } from './persons';
export { giftsApi } from './gifts';
export { opportunitiesApi } from './opportunities';
export { calendarApi } from './calendar';
export { grantsApi } from './grants';
export { campaignsApi } from './campaigns';
export { tasksApi } from './tasks';
export { interactionsApi } from './interactions';
export { fundraisingEventsApi } from './fundraising-events';
export { aiApi } from './ai';
export { analyticsApi } from './analytics';
export { contentApi } from './content';
export { dataHealthApi } from './data-health';
export { dashboardsApi } from './dashboards';
export { workflowsApi } from './workflows';
export { workflowUtilitiesApi } from './workflow-utilities';
export { meetingNotesApi } from './meeting-notes';
export { organizationCanvasesApi } from './organization-canvases';
export { impactIntelligenceApi } from './impact-intelligence';
export { healthApi } from './health';

/**
 * Main API object with all domain-specific methods
 */
export const api = {
  // Core Resources
  persons: personsApi,
  gifts: giftsApi,
  opportunities: opportunitiesApi,
  calendar: calendarApi,
  grants: grantsApi,
  campaigns: campaignsApi,
  tasks: tasksApi,
  interactions: interactionsApi,
  fundraisingEvents: fundraisingEventsApi,

  // AI & Intelligence
  ai: aiApi,
  impactIntelligence: impactIntelligenceApi,

  // Analytics & Reporting
  analytics: analyticsApi,
  dashboards: dashboardsApi,
  dataHealth: dataHealthApi,

  // Content & Communication
  content: contentApi,
  meetingNotes: meetingNotesApi,

  // Workflow Automation
  workflows: workflowsApi,
  workflowUtilities: workflowUtilitiesApi,

  // Organization
  organizationCanvases: organizationCanvasesApi,

  // System
  health: healthApi,
} as const;
