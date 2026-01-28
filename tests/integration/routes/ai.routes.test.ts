/**
 * Integration Tests for AI Routes
 *
 * Tests the full request/response cycle for AI endpoints
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import request from 'supertest';
import express from 'express';
import { aiRouter } from '../../../server/routes/ai.routes';
import { impactIntelligenceRouter } from '../../../server/routes/impact-intelligence.routes';
import * as aiRepository from '../../../server/services/storage/ai.repository';
import { errorHandler, notFoundHandler } from '../../../server/middleware/errorHandler';

// Mock the repository
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

describe('AI Routes Integration Tests', () => {
  let app: express.Express;

  beforeEach(() => {
    vi.clearAllMocks();

    // Create a fresh Express app for each test
    app = express();
    app.use(express.json());
    app.use('/api/ai', aiRouter);
    app.use('/api/impact-intelligence', impactIntelligenceRouter);
    app.use(notFoundHandler);
    app.use(errorHandler);

    // Set up OpenAI environment variables
    process.env.AI_INTEGRATIONS_OPENAI_BASE_URL = 'https://api.openai.com/v1';
    process.env.AI_INTEGRATIONS_OPENAI_API_KEY = 'test-api-key';
  });

  describe('GET /api/ai/predictive-timing', () => {
    it('should return predictive timing scores', async () => {
      const mockPredictions = [
        {
          score: { id: '1', personId: 'person1', givingProbability: 0.85, nextGiftAmount: 10000 },
          person: { id: 'person1', firstName: 'John', lastName: 'Doe', email: 'john@example.com' },
        },
        {
          score: { id: '2', personId: 'person2', givingProbability: 0.72, nextGiftAmount: 5000 },
          person: { id: 'person2', firstName: 'Jane', lastName: 'Smith', email: 'jane@example.com' },
        },
      ];

      vi.mocked(aiRepository.findPredictiveTiming).mockResolvedValue(mockPredictions as any);

      const response = await request(app)
        .get('/api/ai/predictive-timing')
        .expect(200);

      expect(response.body).toHaveLength(2);
      expect(response.body[0].score.givingProbability).toBe(0.85);
      expect(response.body[0].person.firstName).toBe('John');
    });
  });

  describe('GET /api/ai/wealth-events', () => {
    it('should return wealth events', async () => {
      const mockEvents = [
        {
          event: {
            id: '1',
            personId: 'person1',
            eventType: 'Stock Sale',
            estimatedValue: 500000,
            eventDate: new Date('2026-01-01'),
          },
          person: { id: 'person1', firstName: 'John', lastName: 'Doe' },
        },
      ];

      vi.mocked(aiRepository.findWealthEvents).mockResolvedValue(mockEvents as any);

      const response = await request(app)
        .get('/api/ai/wealth-events')
        .expect(200);

      expect(response.body).toHaveLength(1);
      expect(response.body[0].event.eventType).toBe('Stock Sale');
      expect(response.body[0].person.firstName).toBe('John');
    });
  });

  describe('GET /api/ai/meeting-briefs', () => {
    it('should return meeting briefs', async () => {
      const mockBriefs = [
        {
          brief: {
            id: '1',
            personId: 'person1',
            summary: 'Discussed major gift opportunity',
            createdAt: new Date('2026-01-10'),
          },
          person: { id: 'person1', firstName: 'John', lastName: 'Doe' },
        },
      ];

      vi.mocked(aiRepository.findMeetingBriefs).mockResolvedValue(mockBriefs as any);

      const response = await request(app)
        .get('/api/ai/meeting-briefs')
        .expect(200);

      expect(response.body).toHaveLength(1);
      expect(response.body[0].brief.summary).toBe('Discussed major gift opportunity');
    });
  });

  describe('GET /api/ai/voice-notes', () => {
    it('should return voice notes', async () => {
      const mockNotes = [
        {
          id: '1',
          transcription: 'Meeting with John Doe went well',
          recordedAt: new Date('2026-01-10'),
          duration: 300,
        },
      ];

      vi.mocked(aiRepository.findVoiceNotes).mockResolvedValue(mockNotes as any);

      const response = await request(app)
        .get('/api/ai/voice-notes')
        .expect(200);

      expect(response.body).toHaveLength(1);
      expect(response.body[0].transcription).toBe('Meeting with John Doe went well');
    });
  });

  describe('POST /api/impact-intelligence/chat', () => {
    // Note: Full OpenAI integration testing would require API key setup
    // These tests focus on validation logic

    it('should return 400 when message is missing', async () => {
      const response = await request(app)
        .post('/api/impact-intelligence/chat')
        .send({})
        .expect(400);

      expect(response.body).toHaveProperty('message');
    });

    it('should return 400 when message is empty', async () => {
      const response = await request(app)
        .post('/api/impact-intelligence/chat')
        .send({ message: '' })
        .expect(400);

      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toContain('Message is required');
    });

    it('should return 400 when message is only whitespace', async () => {
      const response = await request(app)
        .post('/api/impact-intelligence/chat')
        .send({ message: '   ' })
        .expect(400);

      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toContain('Message is required');
    });
  });
});
