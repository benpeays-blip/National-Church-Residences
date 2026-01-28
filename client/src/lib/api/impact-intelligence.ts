/**
 * Impact Intelligence API Client
 *
 * Typed methods for AI-powered impact story assistant
 */

import { apiClient } from './client';

/**
 * Chat message
 */
export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp?: string;
}

/**
 * Chat request
 */
export interface ChatRequest {
  message: string;
  context?: {
    programId?: string;
    metricId?: string;
    dateRange?: {
      start: string;
      end: string;
    };
  };
  conversationHistory?: ChatMessage[];
}

/**
 * Chat response
 */
export interface ChatResponse {
  message: string;
  suggestions?: string[];
  relatedMetrics?: Array<{
    id: string;
    name: string;
    value: string;
  }>;
  relatedStories?: Array<{
    id: string;
    title: string;
    summary: string;
  }>;
}

export const impactIntelligenceApi = {
  /**
   * Chat with AI assistant for impact stories and outcomes
   */
  chat: (request: ChatRequest) => {
    return apiClient.post<ChatResponse, ChatRequest>('/impact-intelligence/chat', request);
  },
};
