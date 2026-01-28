/**
 * Meeting Notes API Client
 *
 * Typed methods for meeting notes and transcription
 */

import { apiClient } from './client';

/**
 * Meeting note with transcription
 */
export interface MeetingNote {
  id: string;
  userId: string;
  personId?: string;
  personName?: string;
  date: string;
  audioUrl?: string;
  transcription: string;
  summary: string;
  keyPoints: string[];
  actionItems: string[];
  nextSteps: string[];
  sentiment?: 'positive' | 'neutral' | 'negative';
  createdAt: string;
  updatedAt: string;
}

/**
 * Transcription result
 */
export interface TranscriptionResult {
  id: string;
  audioUrl: string;
  transcription: string;
  summary: string;
  keyPoints: string[];
  actionItems: string[];
  nextSteps: string[];
  sentiment: 'positive' | 'neutral' | 'negative';
  duration: number;
  processingTime: number;
}

export const meetingNotesApi = {
  /**
   * Get all meeting notes
   */
  getAll: () => {
    return apiClient.get<MeetingNote[]>('/meeting-notes');
  },

  /**
   * Transcribe and analyze audio file
   * Note: This requires multipart/form-data encoding
   * Use FormData to upload the audio file
   */
  transcribe: async (audioFile: File): Promise<TranscriptionResult> => {
    const formData = new FormData();
    formData.append('audio', audioFile);

    const response = await fetch('/api/meeting-notes/transcribe', {
      method: 'POST',
      body: formData,
      credentials: 'include',
    });

    if (!response.ok) {
      const text = await response.text().catch(() => response.statusText);
      throw new Error(`Transcription failed: ${text}`);
    }

    return response.json();
  },
};
