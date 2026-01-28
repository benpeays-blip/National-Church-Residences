/**
 * Integration Tests for Campaigns Routes
 *
 * Tests the full request/response cycle for campaign management endpoints
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import request from 'supertest';
import express from 'express';
import { campaignsRouter } from '../../../server/routes/campaigns.routes';
import * as campaignsRepo from '../../../server/services/storage/campaigns.repository';
import { errorHandler, notFoundHandler } from '../../../server/middleware/errorHandler';

// Mock the repository
vi.mock('../../../server/services/storage/campaigns.repository');

// Mock the logger
vi.mock('../../../server/config/logging', () => ({
  logger: {
    debug: vi.fn(),
    info: vi.fn(),
    warn: vi.fn(),
    error: vi.fn(),
  },
}));

// Mock authentication middleware
vi.mock('../../../server/middleware/auth', () => ({
  isAuthenticated: (req: any, res: any, next: any) => next(),
}));

describe('Campaigns Routes Integration Tests', () => {
  let app: express.Express;

  beforeEach(() => {
    vi.clearAllMocks();

    // Create a fresh Express app for each test
    app = express();
    app.use(express.json());
    app.use('/api/campaigns', campaignsRouter);
    app.use(notFoundHandler);
    app.use(errorHandler);
  });

  describe('GET /api/campaigns', () => {
    it('should return all campaigns', async () => {
      const mockCampaigns = [
        {
          id: '1',
          name: 'Annual Fund 2026',
          type: 'annual_fund',
          description: 'Annual giving campaign for general operations',
          startDate: new Date('2026-01-01'),
          endDate: new Date('2026-12-31'),
          goal: '500000',
          status: 'active',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: '2',
          name: 'Capital Campaign',
          type: 'capital',
          description: 'Building renovation and expansion',
          startDate: new Date('2026-03-01'),
          endDate: new Date('2027-03-01'),
          goal: '2000000',
          status: 'planning',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      vi.mocked(campaignsRepo.findCampaigns).mockResolvedValue(mockCampaigns as any);

      const response = await request(app)
        .get('/api/campaigns')
        .expect(200);

      expect(response.body).toHaveLength(2);
      expect(response.body[0].name).toBe('Annual Fund 2026');
      expect(response.body[1].name).toBe('Capital Campaign');
      expect(campaignsRepo.findCampaigns).toHaveBeenCalled();
    });

    it('should return empty array when no campaigns exist', async () => {
      vi.mocked(campaignsRepo.findCampaigns).mockResolvedValue([]);

      const response = await request(app)
        .get('/api/campaigns')
        .expect(200);

      expect(response.body).toEqual([]);
      expect(campaignsRepo.findCampaigns).toHaveBeenCalled();
    });
  });

  describe('GET /api/campaigns/:id', () => {
    it('should return a single campaign', async () => {
      const mockCampaign = {
        id: '1',
        name: 'Scholarship Fund',
        type: 'scholarship',
        description: 'Support student scholarships',
        startDate: new Date('2026-01-01'),
        endDate: new Date('2026-12-31'),
        goal: '100000',
        raised: '45000',
        status: 'active',
        ownerId: 'user1',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      vi.mocked(campaignsRepo.findCampaignById).mockResolvedValue(mockCampaign as any);

      const response = await request(app)
        .get('/api/campaigns/1')
        .expect(200);

      expect(response.body.id).toBe('1');
      expect(response.body.name).toBe('Scholarship Fund');
      expect(response.body.status).toBe('active');
      expect(response.body.goal).toBe('100000');
      expect(campaignsRepo.findCampaignById).toHaveBeenCalledWith('1');
    });

    it('should return 404 when campaign not found', async () => {
      vi.mocked(campaignsRepo.findCampaignById).mockResolvedValue(null);

      const response = await request(app)
        .get('/api/campaigns/nonexistent')
        .expect(404);

      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toContain('not found');
    });
  });

  describe('POST /api/campaigns', () => {
    it('should create a new campaign', async () => {
      const newCampaignData = {
        name: 'Holiday Giving Campaign',
        type: 'special_event',
        description: 'Year-end fundraising push',
        startDate: '2026-11-01',
        endDate: '2026-12-31',
        goal: '75000',
        status: 'planning',
        ownerId: 'user1',
      };

      const createdCampaign = {
        ...newCampaignData,
        id: 'new-id',
        startDate: new Date('2026-11-01'),
        endDate: new Date('2026-12-31'),
        raised: '0',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      vi.mocked(campaignsRepo.createCampaign).mockResolvedValue(createdCampaign as any);

      const response = await request(app)
        .post('/api/campaigns')
        .send(newCampaignData)
        .expect(201);

      expect(response.body.id).toBe('new-id');
      expect(response.body.name).toBe('Holiday Giving Campaign');
      expect(response.body.status).toBe('planning');
      expect(campaignsRepo.createCampaign).toHaveBeenCalled();
    });

    it('should return 400 when name is missing', async () => {
      const invalidData = {
        type: 'annual_fund',
        description: 'Test campaign',
        startDate: '2026-01-01',
        endDate: '2026-12-31',
        goal: '50000',
        // name is missing
      };

      const response = await request(app)
        .post('/api/campaigns')
        .send(invalidData)
        .expect(400);

      expect(response.body).toHaveProperty('message');
    });

    it('should return 400 when type is missing', async () => {
      const invalidData = {
        name: 'Test Campaign',
        description: 'Test campaign',
        startDate: '2026-01-01',
        endDate: '2026-12-31',
        goal: '50000',
        // type is missing
      };

      const response = await request(app)
        .post('/api/campaigns')
        .send(invalidData)
        .expect(400);

      expect(response.body).toHaveProperty('message');
    });

    it('should return 400 when status is invalid', async () => {
      const invalidData = {
        name: 'Test Campaign',
        type: 'annual_fund',
        description: 'Test campaign',
        startDate: '2026-01-01',
        endDate: '2026-12-31',
        goal: '50000',
        status: 'invalid_status',
      };

      const response = await request(app)
        .post('/api/campaigns')
        .send(invalidData)
        .expect(400);

      expect(response.body).toHaveProperty('message');
    });
  });

  describe('PATCH /api/campaigns/:id', () => {
    it('should update an existing campaign', async () => {
      const updateData = {
        status: 'completed',
        raised: '85000',
      };

      const existingCampaign = {
        id: '1',
        name: 'Holiday Giving Campaign',
        type: 'special_event',
        startDate: new Date('2026-11-01'),
        endDate: new Date('2026-12-31'),
        goal: '75000',
        status: 'active',
      };

      const updatedCampaign = {
        id: '1',
        name: 'Holiday Giving Campaign',
        type: 'special_event',
        startDate: new Date('2026-11-01'),
        endDate: new Date('2026-12-31'),
        goal: '75000',
        status: 'completed',
        raised: '85000',
        updatedAt: new Date(),
      };

      vi.mocked(campaignsRepo.findCampaignById).mockResolvedValue(existingCampaign as any);
      vi.mocked(campaignsRepo.updateCampaign).mockResolvedValue(updatedCampaign as any);

      const response = await request(app)
        .patch('/api/campaigns/1')
        .send(updateData)
        .expect(200);

      expect(response.body.status).toBe('completed');
      expect(response.body.raised).toBe('85000');
      expect(campaignsRepo.updateCampaign).toHaveBeenCalled();
    });

    it('should return 404 when updating non-existent campaign', async () => {
      vi.mocked(campaignsRepo.updateCampaign).mockResolvedValue(null);

      const response = await request(app)
        .patch('/api/campaigns/nonexistent')
        .send({ status: 'completed' })
        .expect(404);

      expect(response.body).toHaveProperty('message');
    });

    it('should return 400 when updating with invalid status', async () => {
      const response = await request(app)
        .patch('/api/campaigns/1')
        .send({ status: 'invalid_status' })
        .expect(400);

      expect(response.body).toHaveProperty('message');
    });
  });

  describe('DELETE /api/campaigns/:id', () => {
    it('should delete a campaign', async () => {
      const existingCampaign = {
        id: '1',
        name: 'Campaign to Delete',
        type: 'annual_fund',
        startDate: new Date('2026-01-01'),
        endDate: new Date('2026-12-31'),
        goal: '50000',
        status: 'paused',
      };

      vi.mocked(campaignsRepo.deleteCampaign).mockResolvedValue(existingCampaign as any);

      const response = await request(app)
        .delete('/api/campaigns/1')
        .expect(200);

      expect(response.body.id).toBe('1');
      expect(campaignsRepo.deleteCampaign).toHaveBeenCalledWith('1');
    });

    it('should return 404 when deleting non-existent campaign', async () => {
      vi.mocked(campaignsRepo.deleteCampaign).mockResolvedValue(null);

      const response = await request(app)
        .delete('/api/campaigns/nonexistent')
        .expect(404);

      expect(response.body).toHaveProperty('message');
    });
  });
});
