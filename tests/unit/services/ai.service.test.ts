/**
 * Unit Tests for AI Service
 *
 * Tests business logic in the AI service layer including:
 * - Data retrieval for AI features
 * - Impact Intelligence chat with OpenAI
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import * as aiService from '../../../server/services/ai.service';
import * as aiRepository from '../../../server/services/storage/ai.repository';
import { ValidationError } from '../../../server/utils/errors';

// Mock the repository module
vi.mock('../../../server/services/storage/ai.repository');

// Mock the logger
vi.mock('../../../server/config/logging', () => ({
  logger: {
    debug: vi.fn(),
    info: vi.fn(),
    warn: vi.fn(),
    error: vi.fn(),
  },
}));

// Mock OpenAI
vi.mock('openai', () => {
  return {
    default: vi.fn().mockImplementation(() => ({
      chat: {
        completions: {
          create: vi.fn(),
        },
      },
    })),
  };
});

describe('AI Service', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getPredictiveTiming', () => {
    it('should fetch predictive timing scores', async () => {
      const mockPredictions = [
        {
          score: { id: '1', personId: 'person1', givingProbability: 0.85 },
          person: { id: 'person1', firstName: 'John', lastName: 'Doe' },
        },
        {
          score: { id: '2', personId: 'person2', givingProbability: 0.72 },
          person: { id: 'person2', firstName: 'Jane', lastName: 'Smith' },
        },
      ];

      vi.mocked(aiRepository.findPredictiveTiming).mockResolvedValue(mockPredictions as any);

      const result = await aiService.getPredictiveTiming();

      expect(result).toEqual(mockPredictions);
      expect(aiRepository.findPredictiveTiming).toHaveBeenCalledOnce();
    });
  });

  describe('getWealthEvents', () => {
    it('should fetch wealth events', async () => {
      const mockEvents = [
        {
          event: { id: '1', personId: 'person1', eventType: 'Stock Sale', eventDate: new Date() },
          person: { id: 'person1', firstName: 'John', lastName: 'Doe' },
        },
      ];

      vi.mocked(aiRepository.findWealthEvents).mockResolvedValue(mockEvents as any);

      const result = await aiService.getWealthEvents();

      expect(result).toEqual(mockEvents);
      expect(aiRepository.findWealthEvents).toHaveBeenCalledOnce();
    });
  });

  describe('getMeetingBriefs', () => {
    it('should fetch meeting briefs', async () => {
      const mockBriefs = [
        {
          brief: { id: '1', personId: 'person1', summary: 'Meeting summary', createdAt: new Date() },
          person: { id: 'person1', firstName: 'John', lastName: 'Doe' },
        },
      ];

      vi.mocked(aiRepository.findMeetingBriefs).mockResolvedValue(mockBriefs as any);

      const result = await aiService.getMeetingBriefs();

      expect(result).toEqual(mockBriefs);
      expect(aiRepository.findMeetingBriefs).toHaveBeenCalledOnce();
    });
  });

  describe('getVoiceNotes', () => {
    it('should fetch voice notes', async () => {
      const mockNotes = [
        { id: '1', transcription: 'Note transcript', recordedAt: new Date() },
      ];

      vi.mocked(aiRepository.findVoiceNotes).mockResolvedValue(mockNotes as any);

      const result = await aiService.getVoiceNotes();

      expect(result).toEqual(mockNotes);
      expect(aiRepository.findVoiceNotes).toHaveBeenCalledOnce();
    });
  });

  describe('chat', () => {
    const mockEnv = {
      AI_INTEGRATIONS_OPENAI_BASE_URL: process.env.AI_INTEGRATIONS_OPENAI_BASE_URL,
      AI_INTEGRATIONS_OPENAI_API_KEY: process.env.AI_INTEGRATIONS_OPENAI_API_KEY,
    };

    beforeEach(() => {
      // Set up environment variables for tests
      process.env.AI_INTEGRATIONS_OPENAI_BASE_URL = 'https://api.openai.com/v1';
      process.env.AI_INTEGRATIONS_OPENAI_API_KEY = 'test-api-key';
    });

    afterEach(() => {
      // Restore original environment variables
      process.env.AI_INTEGRATIONS_OPENAI_BASE_URL = mockEnv.AI_INTEGRATIONS_OPENAI_BASE_URL;
      process.env.AI_INTEGRATIONS_OPENAI_API_KEY = mockEnv.AI_INTEGRATIONS_OPENAI_API_KEY;
    });

    it('should throw ValidationError when message is empty', async () => {
      await expect(aiService.chat(''))
        .rejects.toThrow(ValidationError);
      await expect(aiService.chat(''))
        .rejects.toThrow('Message is required');
    });

    it('should throw ValidationError when message is only whitespace', async () => {
      await expect(aiService.chat('   '))
        .rejects.toThrow(ValidationError);
    });

    it('should throw error when OpenAI is not configured', async () => {
      delete process.env.AI_INTEGRATIONS_OPENAI_BASE_URL;
      delete process.env.AI_INTEGRATIONS_OPENAI_API_KEY;

      await expect(aiService.chat('Hello'))
        .rejects.toThrow('OpenAI is not configured');
    });

    // Note: OpenAI integration tests are covered in integration tests
    // Unit tests focus on validation logic only
  });
});
