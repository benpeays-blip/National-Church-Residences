/**
 * AI API Client
 *
 * Typed methods for AI-powered features
 */

import { apiClient } from './client';

/**
 * Predictive timing score for major gift prospects
 */
export interface PredictiveTimingScore {
  personId: string;
  score: number;
  confidence: number;
  factors: string[];
  suggestedAction: string;
}

/**
 * Wealth event monitoring data
 */
export interface WealthEvent {
  personId: string;
  eventType: string;
  eventDate: string;
  description: string;
  estimatedValue?: number;
  source: string;
}

/**
 * AI-generated meeting brief
 */
export interface MeetingBrief {
  personId: string;
  briefDate: string;
  summary: string;
  keyPoints: string[];
  suggestedTopics: string[];
  recentActivity: string[];
}

/**
 * Voice note transcription
 */
export interface VoiceNote {
  id: string;
  userId: string;
  personId?: string;
  audioUrl: string;
  transcription: string;
  summary: string;
  actionItems: string[];
  createdAt: string;
}

export const aiApi = {
  /**
   * Get predictive major gift timing scores
   */
  getPredictiveTiming: () => {
    return apiClient.get<PredictiveTimingScore[]>('/ai/predictive-timing');
  },

  /**
   * Get wealth event monitoring data
   */
  getWealthEvents: () => {
    return apiClient.get<WealthEvent[]>('/ai/wealth-events');
  },

  /**
   * Get AI-generated meeting briefs
   */
  getMeetingBriefs: () => {
    return apiClient.get<MeetingBrief[]>('/ai/meeting-briefs');
  },

  /**
   * Get voice note transcriptions
   */
  getVoiceNotes: () => {
    return apiClient.get<VoiceNote[]>('/ai/voice-notes');
  },
};
