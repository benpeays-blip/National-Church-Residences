/**
 * Final API Client Tests
 *
 * Unit tests for remaining API client modules (analytics, content, data-health, dashboards,
 * workflows, workflow-utilities, meeting-notes, organization-canvases, impact-intelligence, health)
 *
 * @vitest-environment jsdom
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { api, ApiError } from '@/lib/api';

// Mock fetch globally
const mockFetch = vi.fn();
global.fetch = mockFetch;

describe('Final API Modules', () => {
  beforeEach(() => {
    mockFetch.mockReset();
  });

  describe('api.analytics', () => {
    it('should call getPeerBenchmarks', async () => {
      const mockBenchmarks = [
        {
          metric: 'Average Gift Size',
          organizationValue: 250,
          peerAverage: 200,
          peerMedian: 180,
          percentile: 75,
          category: 'Fundraising',
        },
      ];

      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => mockBenchmarks,
      });

      const benchmarks = await api.analytics.getPeerBenchmarks();

      expect(mockFetch).toHaveBeenCalledWith(
        '/api/analytics/peer-benchmarks',
        expect.any(Object)
      );
      expect(benchmarks).toEqual(mockBenchmarks);
    });

    it('should call getSentimentAnalysis', async () => {
      const mockSentiment = [
        {
          personId: 'person-123',
          overallSentiment: 'positive' as const,
          score: 8.5,
          recentInteractions: 5,
          engagementTrend: 'increasing' as const,
          lastContactDate: '2026-01-15',
        },
      ];

      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => mockSentiment,
      });

      const sentiment = await api.analytics.getSentimentAnalysis();

      expect(mockFetch).toHaveBeenCalledWith(
        '/api/analytics/sentiment',
        expect.any(Object)
      );
      expect(sentiment).toEqual(mockSentiment);
    });

    it('should call getPortfolioOptimization', async () => {
      const mockOptimization = [
        {
          officerId: 'user-123',
          officerName: 'John Smith',
          currentPortfolioSize: 75,
          optimalPortfolioSize: 50,
          addRecommendations: [],
          removeRecommendations: [],
        },
      ];

      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => mockOptimization,
      });

      const optimization = await api.analytics.getPortfolioOptimization();

      expect(mockFetch).toHaveBeenCalledWith(
        '/api/analytics/portfolio-optimization',
        expect.any(Object)
      );
      expect(optimization).toEqual(mockOptimization);
    });
  });

  describe('api.content', () => {
    it('should call getOutreachTemplates', async () => {
      const mockTemplates = [
        {
          id: 'template-1',
          type: 'email' as const,
          purpose: 'Follow-up',
          subject: 'Thank you for your support',
          content: 'Dear [Name]...',
          tone: 'personal' as const,
          personalizationFields: ['name', 'lastGiftAmount'],
          createdAt: '2026-01-28T10:00:00Z',
        },
      ];

      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => mockTemplates,
      });

      const templates = await api.content.getOutreachTemplates();

      expect(mockFetch).toHaveBeenCalledWith(
        '/api/content/outreach-templates',
        expect.any(Object)
      );
      expect(templates).toEqual(mockTemplates);
    });

    it('should call getGrantProposals', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => [],
      });

      await api.content.getGrantProposals();

      expect(mockFetch).toHaveBeenCalledWith(
        '/api/content/grant-proposals',
        expect.any(Object)
      );
    });

    it('should call getImpactReports', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => [],
      });

      await api.content.getImpactReports();

      expect(mockFetch).toHaveBeenCalledWith(
        '/api/content/impact-reports',
        expect.any(Object)
      );
    });
  });

  describe('api.dataHealth', () => {
    it('should call getMetrics', async () => {
      const mockMetrics = {
        overall: {
          score: 85,
          status: 'good' as const,
          lastChecked: '2026-01-28T10:00:00Z',
        },
        metrics: {
          completeness: { score: 90, details: [] },
          accuracy: { score: 85, details: [] },
          consistency: { score: 80, details: [] },
          timeliness: { score: 85, details: [] },
        },
        recommendations: [],
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => mockMetrics,
      });

      const metrics = await api.dataHealth.getMetrics();

      expect(mockFetch).toHaveBeenCalledWith(
        '/api/data-health',
        expect.any(Object)
      );
      expect(metrics).toEqual(mockMetrics);
    });
  });

  describe('api.dashboards', () => {
    it('should call getHome', async () => {
      const mockDashboard = {
        summary: {
          totalRevenue: { label: 'Total Revenue', value: 1000000 },
          ytdProgress: { label: 'YTD Progress', value: 75 },
          activeDonors: { label: 'Active Donors', value: 500 },
          majorGiftsPipeline: { label: 'Pipeline', value: 2500000 },
        },
        recentActivity: [],
        upcomingTasks: [],
        charts: {
          revenueByMonth: [],
          giftsByType: [],
        },
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => mockDashboard,
      });

      const dashboard = await api.dashboards.getHome();

      expect(mockFetch).toHaveBeenCalledWith(
        '/api/dashboard/home',
        expect.any(Object)
      );
      expect(dashboard).toEqual(mockDashboard);
    });

    it('should call getMGO', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => ({ portfolio: {}, prospects: [], recentInteractions: [], tasks: [] }),
      });

      await api.dashboards.getMGO();

      expect(mockFetch).toHaveBeenCalledWith(
        '/api/dashboard/mgo',
        expect.any(Object)
      );
    });

    it('should call getDevDirector', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => ({ teamPerformance: {}, officers: [], pipeline: {}, metrics: {} }),
      });

      await api.dashboards.getDevDirector();

      expect(mockFetch).toHaveBeenCalledWith(
        '/api/dashboard/dev-director',
        expect.any(Object)
      );
    });

    it('should call getCEO', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => ({ strategic: {}, trends: {}, majorInitiatives: [], board: {} }),
      });

      await api.dashboards.getCEO();

      expect(mockFetch).toHaveBeenCalledWith(
        '/api/dashboard/ceo',
        expect.any(Object)
      );
    });
  });

  describe('api.workflows', () => {
    it('should call getAll without filters', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => [],
      });

      await api.workflows.getAll();

      expect(mockFetch).toHaveBeenCalledWith(
        '/api/workflows',
        expect.any(Object)
      );
    });

    it('should call getAll with filters', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => [],
      });

      await api.workflows.getAll({ status: 'active', type: 'stewardship' });

      expect(mockFetch).toHaveBeenCalledWith(
        '/api/workflows?status=active&type=stewardship',
        expect.any(Object)
      );
    });

    it('should call getById', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => ({ id: 'workflow-123', name: 'Test Workflow' }),
      });

      await api.workflows.getById('workflow-123');

      expect(mockFetch).toHaveBeenCalledWith(
        '/api/workflows/workflow-123',
        expect.any(Object)
      );
    });

    it('should call create', async () => {
      const newWorkflow = { name: 'New Workflow', type: 'stewardship' };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 201,
        json: async () => ({ id: 'workflow-456', ...newWorkflow }),
      });

      await api.workflows.create(newWorkflow);

      expect(mockFetch).toHaveBeenCalledWith(
        '/api/workflows',
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify(newWorkflow),
        })
      );
    });

    it('should call clone', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 201,
        json: async () => ({ id: 'workflow-clone-789' }),
      });

      await api.workflows.clone('workflow-123');

      expect(mockFetch).toHaveBeenCalledWith(
        '/api/workflows/workflow-123/clone',
        expect.objectContaining({
          method: 'POST',
        })
      );
    });

    it('should call getBlocks', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => [],
      });

      await api.workflows.getBlocks('workflow-123');

      expect(mockFetch).toHaveBeenCalledWith(
        '/api/workflows/workflow-123/blocks',
        expect.any(Object)
      );
    });

    it('should call updateBlockPositions', async () => {
      const positions = [
        { id: 'block-1', positionX: 100, positionY: 200 },
        { id: 'block-2', positionX: 300, positionY: 400 },
      ];

      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => undefined,
      });

      await api.workflows.updateBlockPositions('workflow-123', positions);

      expect(mockFetch).toHaveBeenCalledWith(
        '/api/workflows/workflow-123/blocks/positions',
        expect.objectContaining({
          method: 'PATCH',
          body: JSON.stringify({ positions }),
        })
      );
    });

    it('should call getConnections', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => [],
      });

      await api.workflows.getConnections('workflow-123');

      expect(mockFetch).toHaveBeenCalledWith(
        '/api/workflows/workflow-123/connections',
        expect.any(Object)
      );
    });
  });

  describe('api.workflowUtilities', () => {
    it('should call getCalendarEvents', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => [],
      });

      await api.workflowUtilities.getCalendarEvents();

      expect(mockFetch).toHaveBeenCalledWith(
        '/api/workflow/calendar',
        expect.any(Object)
      );
    });

    it('should call getStewardshipWorkflows', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => [],
      });

      await api.workflowUtilities.getStewardshipWorkflows();

      expect(mockFetch).toHaveBeenCalledWith(
        '/api/workflow/stewardship',
        expect.any(Object)
      );
    });

    it('should call getTaskPriorities', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => [],
      });

      await api.workflowUtilities.getTaskPriorities();

      expect(mockFetch).toHaveBeenCalledWith(
        '/api/workflow/task-priorities',
        expect.any(Object)
      );
    });

    it('should call getGiftRegistries', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => [],
      });

      await api.workflowUtilities.getGiftRegistries();

      expect(mockFetch).toHaveBeenCalledWith(
        '/api/workflow/gift-registries',
        expect.any(Object)
      );
    });
  });

  describe('api.meetingNotes', () => {
    it('should call getAll', async () => {
      const mockNotes = [
        {
          id: 'note-1',
          userId: 'user-123',
          date: '2026-01-28',
          transcription: 'Meeting notes...',
          summary: 'Discussed planned gift',
          keyPoints: ['Key point 1'],
          actionItems: ['Action 1'],
          nextSteps: ['Follow up'],
          createdAt: '2026-01-28T10:00:00Z',
          updatedAt: '2026-01-28T10:00:00Z',
        },
      ];

      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => mockNotes,
      });

      const notes = await api.meetingNotes.getAll();

      expect(mockFetch).toHaveBeenCalledWith(
        '/api/meeting-notes',
        expect.any(Object)
      );
      expect(notes).toEqual(mockNotes);
    });

    it('should call transcribe with audio file', async () => {
      const mockResult = {
        id: 'transcription-1',
        audioUrl: 'https://storage.example.com/audio.mp3',
        transcription: 'Meeting transcript...',
        summary: 'Meeting summary',
        keyPoints: [],
        actionItems: [],
        nextSteps: [],
        sentiment: 'positive' as const,
        duration: 180,
        processingTime: 5,
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => mockResult,
      });

      const file = new File(['audio content'], 'meeting.mp3', { type: 'audio/mpeg' });
      const result = await api.meetingNotes.transcribe(file);

      expect(mockFetch).toHaveBeenCalledWith(
        '/api/meeting-notes/transcribe',
        expect.objectContaining({
          method: 'POST',
        })
      );
      expect(result).toEqual(mockResult);
    });
  });

  describe('api.organizationCanvases', () => {
    it('should call getAll without filter', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => [],
      });

      await api.organizationCanvases.getAll();

      expect(mockFetch).toHaveBeenCalledWith(
        '/api/organization-canvases',
        expect.any(Object)
      );
    });

    it('should call getAll with ownerId filter', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => [],
      });

      await api.organizationCanvases.getAll('user-123');

      expect(mockFetch).toHaveBeenCalledWith(
        '/api/organization-canvases?ownerId=user-123',
        expect.any(Object)
      );
    });

    it('should call create', async () => {
      const newCanvas = {
        name: 'Test Canvas',
        data: { nodes: [], edges: [] },
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 201,
        json: async () => ({ id: 'canvas-456', ...newCanvas }),
      });

      await api.organizationCanvases.create(newCanvas);

      expect(mockFetch).toHaveBeenCalledWith(
        '/api/organization-canvases',
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify(newCanvas),
        })
      );
    });
  });

  describe('api.impactIntelligence', () => {
    it('should call chat', async () => {
      const request = {
        message: 'What impact did we have in 2025?',
        context: {
          programId: 'program-123',
          dateRange: {
            start: '2025-01-01',
            end: '2025-12-31',
          },
        },
      };

      const mockResponse = {
        message: 'In 2025, your organization served 1,000 families...',
        suggestions: ['Learn more about housing programs', 'See financial breakdown'],
        relatedMetrics: [],
        relatedStories: [],
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => mockResponse,
      });

      const response = await api.impactIntelligence.chat(request);

      expect(mockFetch).toHaveBeenCalledWith(
        '/api/impact-intelligence/chat',
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify(request),
        })
      );
      expect(response).toEqual(mockResponse);
    });
  });

  describe('api.health', () => {
    it('should call getHealth', async () => {
      const mockHealth = {
        status: 'healthy' as const,
        timestamp: '2026-01-28T10:00:00Z',
        uptime: 3600,
        checks: {
          database: { status: 'healthy' as const, responseTime: 5 },
          storage: { status: 'healthy' as const },
        },
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => mockHealth,
      });

      const health = await api.health.getHealth();

      expect(mockFetch).toHaveBeenCalledWith(
        '/api/health',
        expect.any(Object)
      );
      expect(health).toEqual(mockHealth);
    });

    it('should call getLiveness', async () => {
      const mockLiveness = {
        status: 'alive' as const,
        timestamp: '2026-01-28T10:00:00Z',
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => mockLiveness,
      });

      const liveness = await api.health.getLiveness();

      expect(mockFetch).toHaveBeenCalledWith(
        '/api/health/live',
        expect.any(Object)
      );
      expect(liveness).toEqual(mockLiveness);
    });

    it('should call getReadiness', async () => {
      const mockReadiness = {
        status: 'ready' as const,
        timestamp: '2026-01-28T10:00:00Z',
        checks: {
          database: true,
          storage: true,
        },
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => mockReadiness,
      });

      const readiness = await api.health.getReadiness();

      expect(mockFetch).toHaveBeenCalledWith(
        '/api/health/ready',
        expect.any(Object)
      );
      expect(readiness).toEqual(mockReadiness);
    });
  });

  describe('Error Handling', () => {
    it('should handle 404 errors for workflows', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 404,
        statusText: 'Not Found',
        text: async () => 'Workflow not found',
      });

      try {
        await api.workflows.getById('999');
        expect.fail('Should have thrown ApiError');
      } catch (error) {
        expect(error).toBeInstanceOf(ApiError);
        expect(error).toMatchObject({
          status: 404,
          message: 'Workflow not found',
        });
      }
    });

    it('should handle 500 errors for analytics', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
        statusText: 'Internal Server Error',
        text: async () => 'Analytics service unavailable',
      });

      try {
        await api.analytics.getPeerBenchmarks();
        expect.fail('Should have thrown ApiError');
      } catch (error) {
        expect(error).toBeInstanceOf(ApiError);
        expect(error).toMatchObject({
          status: 500,
          message: 'Analytics service unavailable',
        });
      }
    });
  });
});
