/**
 * Content API Client
 *
 * Typed methods for AI-generated content operations
 */

import { apiClient } from './client';

/**
 * Outreach template
 */
export interface OutreachTemplate {
  id: string;
  type: 'email' | 'letter' | 'social';
  purpose: string;
  subject?: string;
  content: string;
  tone: 'formal' | 'casual' | 'personal';
  personalizationFields: string[];
  createdAt: string;
}

/**
 * Grant proposal
 */
export interface GrantProposal {
  id: string;
  grantId: string;
  title: string;
  summary: string;
  narrative: string;
  budget: string;
  outcomes: string;
  evaluation: string;
  generatedAt: string;
}

/**
 * Impact report
 */
export interface ImpactReport {
  id: string;
  title: string;
  period: string;
  summary: string;
  metrics: Array<{
    name: string;
    value: string;
    change?: string;
  }>;
  stories: Array<{
    title: string;
    content: string;
  }>;
  generatedAt: string;
}

export const contentApi = {
  /**
   * Get AI-generated outreach templates
   */
  getOutreachTemplates: () => {
    return apiClient.get<OutreachTemplate[]>('/content/outreach-templates');
  },

  /**
   * Get AI-generated grant proposals
   */
  getGrantProposals: () => {
    return apiClient.get<GrantProposal[]>('/content/grant-proposals');
  },

  /**
   * Get AI-generated impact reports
   */
  getImpactReports: () => {
    return apiClient.get<ImpactReport[]>('/content/impact-reports');
  },
};
