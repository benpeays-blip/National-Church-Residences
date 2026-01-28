/**
 * Extended API Client Tests
 *
 * Unit tests for additional API client modules (grants, campaigns, tasks, interactions, fundraising-events, ai)
 *
 * @vitest-environment jsdom
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { api, ApiError } from '@/lib/api';

// Mock fetch globally
const mockFetch = vi.fn();
global.fetch = mockFetch;

describe('Extended API Modules', () => {
  beforeEach(() => {
    mockFetch.mockReset();
  });

  describe('api.grants', () => {
    it('should call getAll without filters', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => [{ id: '1', title: 'Test Grant' }],
      });

      await api.grants.getAll();

      expect(mockFetch).toHaveBeenCalledWith(
        '/api/grants',
        expect.any(Object)
      );
    });

    it('should call getAll with ownerId filter', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => [{ id: '1', ownerId: 'user-123' }],
      });

      await api.grants.getAll('user-123');

      expect(mockFetch).toHaveBeenCalledWith(
        '/api/grants?ownerId=user-123',
        expect.any(Object)
      );
    });

    it('should call getAll with stage filter', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => [{ id: '1', stage: 'submitted' }],
      });

      await api.grants.getAll(undefined, 'submitted');

      expect(mockFetch).toHaveBeenCalledWith(
        '/api/grants?stage=submitted',
        expect.any(Object)
      );
    });

    it('should call getAll with both filters', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => [{ id: '1', ownerId: 'user-123', stage: 'awarded' }],
      });

      await api.grants.getAll('user-123', 'awarded');

      expect(mockFetch).toHaveBeenCalledWith(
        '/api/grants?ownerId=user-123&stage=awarded',
        expect.any(Object)
      );
    });

    it('should call getById with grant ID', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => ({ id: '123', title: 'Grant Title' }),
      });

      await api.grants.getById('123');

      expect(mockFetch).toHaveBeenCalledWith(
        '/api/grants/123',
        expect.any(Object)
      );
    });

    it('should call create with grant data', async () => {
      const newGrant = {
        title: 'New Grant',
        organizationId: 'org-123',
        amount: '50000.00',
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 201,
        json: async () => ({ id: '456', ...newGrant }),
      });

      await api.grants.create(newGrant);

      expect(mockFetch).toHaveBeenCalledWith(
        '/api/grants',
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify(newGrant),
        })
      );
    });

    it('should call update with grant ID and data', async () => {
      const updateData = { stage: 'awarded' };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => ({ id: '123', ...updateData }),
      });

      await api.grants.update('123', updateData);

      expect(mockFetch).toHaveBeenCalledWith(
        '/api/grants/123',
        expect.objectContaining({
          method: 'PATCH',
          body: JSON.stringify(updateData),
        })
      );
    });

    it('should call delete with grant ID', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 204,
      });

      await api.grants.delete('123');

      expect(mockFetch).toHaveBeenCalledWith(
        '/api/grants/123',
        expect.objectContaining({
          method: 'DELETE',
        })
      );
    });
  });

  describe('api.campaigns', () => {
    it('should call getAll', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => [{ id: '1', name: 'Annual Fund' }],
      });

      await api.campaigns.getAll();

      expect(mockFetch).toHaveBeenCalledWith(
        '/api/campaigns',
        expect.any(Object)
      );
    });

    it('should call getById with campaign ID', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => ({ id: '123', name: 'Campaign Name' }),
      });

      await api.campaigns.getById('123');

      expect(mockFetch).toHaveBeenCalledWith(
        '/api/campaigns/123',
        expect.any(Object)
      );
    });

    it('should call create with campaign data', async () => {
      const newCampaign = {
        name: 'New Campaign',
        goal: '100000.00',
        startDate: '2026-01-01',
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 201,
        json: async () => ({ id: '456', ...newCampaign }),
      });

      await api.campaigns.create(newCampaign);

      expect(mockFetch).toHaveBeenCalledWith(
        '/api/campaigns',
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify(newCampaign),
        })
      );
    });

    it('should call update with campaign ID and data', async () => {
      const updateData = { goal: '150000.00' };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => ({ id: '123', ...updateData }),
      });

      await api.campaigns.update('123', updateData);

      expect(mockFetch).toHaveBeenCalledWith(
        '/api/campaigns/123',
        expect.objectContaining({
          method: 'PATCH',
          body: JSON.stringify(updateData),
        })
      );
    });

    it('should call delete with campaign ID', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 204,
      });

      await api.campaigns.delete('123');

      expect(mockFetch).toHaveBeenCalledWith(
        '/api/campaigns/123',
        expect.objectContaining({
          method: 'DELETE',
        })
      );
    });
  });

  describe('api.tasks', () => {
    it('should call getAll without filters', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => [{ id: '1', title: 'Follow up call' }],
      });

      await api.tasks.getAll();

      expect(mockFetch).toHaveBeenCalledWith(
        '/api/tasks',
        expect.any(Object)
      );
    });

    it('should call getAll with ownerId filter', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => [{ id: '1', ownerId: 'user-123' }],
      });

      await api.tasks.getAll('user-123');

      expect(mockFetch).toHaveBeenCalledWith(
        '/api/tasks?ownerId=user-123',
        expect.any(Object)
      );
    });

    it('should call getAll with completed filter', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => [{ id: '1', completed: false }],
      });

      await api.tasks.getAll(undefined, false);

      expect(mockFetch).toHaveBeenCalledWith(
        '/api/tasks?completed=false',
        expect.any(Object)
      );
    });

    it('should call getAll with both filters', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => [{ id: '1', ownerId: 'user-123', completed: true }],
      });

      await api.tasks.getAll('user-123', true);

      expect(mockFetch).toHaveBeenCalledWith(
        '/api/tasks?ownerId=user-123&completed=true',
        expect.any(Object)
      );
    });

    it('should call create with task data', async () => {
      const newTask = {
        title: 'Call donor',
        ownerId: 'user-123',
        dueDate: '2026-02-01',
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 201,
        json: async () => ({ id: '456', ...newTask }),
      });

      await api.tasks.create(newTask);

      expect(mockFetch).toHaveBeenCalledWith(
        '/api/tasks',
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify(newTask),
        })
      );
    });

    it('should call update with task ID and data', async () => {
      const updateData = { completed: true };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => ({ id: '123', ...updateData }),
      });

      await api.tasks.update('123', updateData);

      expect(mockFetch).toHaveBeenCalledWith(
        '/api/tasks/123',
        expect.objectContaining({
          method: 'PATCH',
          body: JSON.stringify(updateData),
        })
      );
    });

    it('should call delete with task ID', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 204,
      });

      await api.tasks.delete('123');

      expect(mockFetch).toHaveBeenCalledWith(
        '/api/tasks/123',
        expect.objectContaining({
          method: 'DELETE',
        })
      );
    });
  });

  describe('api.interactions', () => {
    it('should call getAll without filter', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => [{ id: '1', type: 'meeting' }],
      });

      await api.interactions.getAll();

      expect(mockFetch).toHaveBeenCalledWith(
        '/api/interactions',
        expect.any(Object)
      );
    });

    it('should call getAll with personId filter', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => [{ id: '1', personId: 'person-123' }],
      });

      await api.interactions.getAll('person-123');

      expect(mockFetch).toHaveBeenCalledWith(
        '/api/interactions?personId=person-123',
        expect.any(Object)
      );
    });

    it('should call create with interaction data', async () => {
      const newInteraction = {
        personId: 'person-123',
        type: 'phone_call',
        date: '2026-01-28',
        notes: 'Discussed planned gift',
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 201,
        json: async () => ({ id: '456', ...newInteraction }),
      });

      await api.interactions.create(newInteraction);

      expect(mockFetch).toHaveBeenCalledWith(
        '/api/interactions',
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify(newInteraction),
        })
      );
    });

    it('should call update with interaction ID and data', async () => {
      const updateData = { notes: 'Updated notes' };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => ({ id: '123', ...updateData }),
      });

      await api.interactions.update('123', updateData);

      expect(mockFetch).toHaveBeenCalledWith(
        '/api/interactions/123',
        expect.objectContaining({
          method: 'PATCH',
          body: JSON.stringify(updateData),
        })
      );
    });

    it('should call delete with interaction ID', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 204,
      });

      await api.interactions.delete('123');

      expect(mockFetch).toHaveBeenCalledWith(
        '/api/interactions/123',
        expect.objectContaining({
          method: 'DELETE',
        })
      );
    });
  });

  describe('api.fundraisingEvents', () => {
    it('should call getAll', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => [
          { id: '1', name: 'Annual Gala', date: '2026-03-15' },
        ],
      });

      await api.fundraisingEvents.getAll();

      expect(mockFetch).toHaveBeenCalledWith(
        '/api/fundraising-events',
        expect.any(Object)
      );
    });

    it('should return array of fundraising events', async () => {
      const mockEvents = [
        { id: '1', name: 'Gala', date: '2026-03-15', goal: '50000.00' },
        { id: '2', name: 'Golf Tournament', date: '2026-06-01', goal: '25000.00' },
      ];

      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => mockEvents,
      });

      const events = await api.fundraisingEvents.getAll();

      expect(events).toEqual(mockEvents);
    });
  });

  describe('api.ai', () => {
    it('should call getPredictiveTiming', async () => {
      const mockTiming = [
        {
          personId: 'person-123',
          score: 85,
          confidence: 0.92,
          factors: ['Recent wealth event', 'Increased engagement'],
          suggestedAction: 'Schedule major gift conversation',
        },
      ];

      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => mockTiming,
      });

      const timing = await api.ai.getPredictiveTiming();

      expect(mockFetch).toHaveBeenCalledWith(
        '/api/ai/predictive-timing',
        expect.any(Object)
      );
      expect(timing).toEqual(mockTiming);
    });

    it('should call getWealthEvents', async () => {
      const mockEvents = [
        {
          personId: 'person-123',
          eventType: 'stock_sale',
          eventDate: '2026-01-15',
          description: 'Sold company stock',
          estimatedValue: 500000,
          source: 'SEC Filing',
        },
      ];

      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => mockEvents,
      });

      const events = await api.ai.getWealthEvents();

      expect(mockFetch).toHaveBeenCalledWith(
        '/api/ai/wealth-events',
        expect.any(Object)
      );
      expect(events).toEqual(mockEvents);
    });

    it('should call getMeetingBriefs', async () => {
      const mockBriefs = [
        {
          personId: 'person-123',
          briefDate: '2026-01-28',
          summary: 'Long-time donor, recently retired',
          keyPoints: ['Interested in planned giving', 'Has estate plan'],
          suggestedTopics: ['Charitable remainder trust', 'Legacy society'],
          recentActivity: ['Attended gala', 'Made $10,000 gift'],
        },
      ];

      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => mockBriefs,
      });

      const briefs = await api.ai.getMeetingBriefs();

      expect(mockFetch).toHaveBeenCalledWith(
        '/api/ai/meeting-briefs',
        expect.any(Object)
      );
      expect(briefs).toEqual(mockBriefs);
    });

    it('should call getVoiceNotes', async () => {
      const mockNotes = [
        {
          id: 'note-123',
          userId: 'user-123',
          personId: 'person-456',
          audioUrl: 'https://storage.example.com/audio.mp3',
          transcription: 'Had a great conversation with John...',
          summary: 'Donor interested in major gift for new building',
          actionItems: ['Send proposal', 'Schedule follow-up'],
          createdAt: '2026-01-28T10:00:00Z',
        },
      ];

      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => mockNotes,
      });

      const notes = await api.ai.getVoiceNotes();

      expect(mockFetch).toHaveBeenCalledWith(
        '/api/ai/voice-notes',
        expect.any(Object)
      );
      expect(notes).toEqual(mockNotes);
    });
  });

  describe('Error Handling', () => {
    it('should handle 404 errors for grants', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 404,
        statusText: 'Not Found',
        text: async () => 'Grant not found',
      });

      try {
        await api.grants.getById('999');
        expect.fail('Should have thrown ApiError');
      } catch (error) {
        expect(error).toBeInstanceOf(ApiError);
        expect(error).toMatchObject({
          status: 404,
          message: 'Grant not found',
        });
      }
    });

    it('should handle 400 validation errors for tasks', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 400,
        statusText: 'Bad Request',
        text: async () => 'Invalid task data',
      });

      try {
        await api.tasks.create({} as any);
        expect.fail('Should have thrown ApiError');
      } catch (error) {
        expect(error).toBeInstanceOf(ApiError);
        expect(error).toMatchObject({
          status: 400,
          message: 'Invalid task data',
        });
      }
    });

    it('should handle 500 server errors for AI endpoints', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
        statusText: 'Internal Server Error',
        text: async () => 'AI service unavailable',
      });

      try {
        await api.ai.getPredictiveTiming();
        expect.fail('Should have thrown ApiError');
      } catch (error) {
        expect(error).toBeInstanceOf(ApiError);
        expect(error).toMatchObject({
          status: 500,
          message: 'AI service unavailable',
        });
      }
    });
  });
});
