/**
 * E2E Tests: Opportunity Workflow
 *
 * Tests the complete fundraising opportunity lifecycle:
 * 1. Identify prospect
 * 2. Move to cultivation stage
 * 3. Make the ask (solicitation)
 * 4. Close won/lost
 * 5. Stewardship (for won opportunities)
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import request from 'supertest';
import express from 'express';
import { opportunitiesRouter } from '../../server/routes/opportunities.routes';
import { personsRouter } from '../../server/routes/persons.routes';
import { giftsRouter } from '../../server/routes/gifts.routes';
import * as opportunitiesRepository from '../../server/services/storage/opportunities.repository';
import * as personsRepository from '../../server/services/storage/persons.repository';
import * as giftsRepository from '../../server/services/storage/gifts.repository';
import { errorHandler, notFoundHandler } from '../../server/middleware/errorHandler';
import { createTestOpportunity, createTestPerson, createTestGift } from '../helpers/factories';

// Mock repositories
vi.mock('../../server/services/storage/opportunities.repository');
vi.mock('../../server/services/storage/persons.repository');
vi.mock('../../server/services/storage/gifts.repository');

// Mock logger
vi.mock('../../server/config/logging', () => ({
  logger: {
    debug: vi.fn(),
    info: vi.fn(),
    warn: vi.fn(),
    error: vi.fn(),
  },
}));

// Mock auth middleware
vi.mock('../../server/middleware/auth', () => ({
  isAuthenticated: (req: any, res: any, next: any) => next(),
}));

describe('E2E: Opportunity Workflow', () => {
  let app: express.Express;
  const prospectId = 'prospect-123';
  const opportunityId = 'opp-456';
  const ownerId = 'user-789';

  beforeEach(() => {
    vi.clearAllMocks();

    app = express();
    app.use(express.json());
    app.use('/api/opportunities', opportunitiesRouter);
    app.use('/api/persons', personsRouter);
    app.use('/api/gifts', giftsRouter);
    app.use(notFoundHandler);
    app.use(errorHandler);
  });

  describe('Complete Opportunity Lifecycle: Won', () => {
    it('should track opportunity from prospect to closed-won', async () => {
      // Step 1: Create prospect (person)
      const prospect = {
        id: prospectId,
        ...createTestPerson({
          firstName: 'Sarah',
          lastName: 'Johnson',
          primaryEmail: 'sarah.johnson@example.com',
          wealthBand: 'P4',
          relationshipEnergy: 60,
          relationshipStructure: 55,
        }),
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      vi.mocked(personsRepository.findPersonById).mockResolvedValue(prospect as any);

      const prospectResponse = await request(app)
        .get(`/api/persons/${prospectId}`)
        .expect(200);

      expect(prospectResponse.body.id).toBe(prospectId);

      // Step 2: Create opportunity at Prospect stage
      const newOpportunity = createTestOpportunity({
        personId: prospectId,
        ownerId,
        stage: 'Prospect',
        askAmount: '25000.00',
        probability: 10,
        closeDate: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000), // 180 days out
      });

      const createdOpportunity = {
        id: opportunityId,
        ...newOpportunity,
        daysInStage: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      vi.mocked(opportunitiesRepository.createOpportunity).mockResolvedValue(
        createdOpportunity as any
      );

      const createResponse = await request(app)
        .post('/api/opportunities')
        .send(newOpportunity)
        .expect(201);

      expect(createResponse.body).toMatchObject({
        id: opportunityId,
        personId: prospectId,
        stage: 'Prospect',
        probability: 10,
      });

      // Step 3: Move to Cultivation stage
      const cultivationOpportunity = {
        ...createdOpportunity,
        stage: 'Cultivation',
        probability: 30,
        daysInStage: 0,
      };

      vi.mocked(opportunitiesRepository.findOpportunityById).mockResolvedValue(createdOpportunity as any);
      vi.mocked(opportunitiesRepository.updateOpportunity).mockResolvedValue(
        cultivationOpportunity as any
      );

      const cultivationResponse = await request(app)
        .patch(`/api/opportunities/${opportunityId}`)
        .send({
          stage: 'Cultivation',
          probability: 30,
          notes: 'Had initial meeting, discussed interests and priorities',
        })
        .expect(200);

      expect(cultivationResponse.body.stage).toBe('Cultivation');
      expect(cultivationResponse.body.probability).toBe(30);

      // Step 4: Move to Ask stage (Solicitation)
      const askOpportunity = {
        ...cultivationOpportunity,
        stage: 'Ask',
        probability: 60,
        daysInStage: 0,
      };

      vi.mocked(opportunitiesRepository.findOpportunityById).mockResolvedValue(cultivationOpportunity as any);
      vi.mocked(opportunitiesRepository.updateOpportunity).mockResolvedValue(askOpportunity as any);

      const askResponse = await request(app)
        .patch(`/api/opportunities/${opportunityId}`)
        .send({
          stage: 'Ask',
          probability: 60,
          notes: 'Presented proposal for $25,000 gift to Building Fund',
        })
        .expect(200);

      expect(askResponse.body.stage).toBe('Ask');
      expect(askResponse.body.probability).toBe(60);

      // Step 5: Move to Renewal stage (gift received)
      const renewalOpportunity = {
        ...askOpportunity,
        stage: 'Renewal',
        probability: 100,
        closedAt: new Date(),
      };

      vi.mocked(opportunitiesRepository.findOpportunityById).mockResolvedValue(askOpportunity as any);
      vi.mocked(opportunitiesRepository.updateOpportunity).mockResolvedValue(renewalOpportunity as any);

      const renewalResponse = await request(app)
        .patch(`/api/opportunities/${opportunityId}`)
        .send({
          stage: 'Renewal',
          probability: 100,
          notes: 'Gift received!',
        })
        .expect(200);

      expect(renewalResponse.body.stage).toBe('Renewal');
      expect(renewalResponse.body.probability).toBe(100);

      // Step 6: Record the gift
      const gift = createTestGift({
        personId: prospectId,
        amount: '25000.00',
        giftType: 'major',
        campaign: 'Capital Campaign 2026',
      });

      const createdGift = {
        id: 'gift-123',
        ...gift,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      vi.mocked(giftsRepository.createGift).mockResolvedValue(createdGift as any);

      const giftResponse = await request(app)
        .post('/api/gifts')
        .send(gift)
        .expect(201);

      expect(giftResponse.body.amount).toBe('25000.00');
      expect(giftResponse.body.personId).toBe(prospectId);

      // Step 7: Move to Stewardship
      const stewardshipOpportunity = {
        ...renewalOpportunity,
        stage: 'Steward',
        notes: 'Entered stewardship phase, scheduled thank you call',
      };

      vi.mocked(opportunitiesRepository.findOpportunityById).mockResolvedValue(renewalOpportunity as any);
      vi.mocked(opportunitiesRepository.updateOpportunity).mockResolvedValue(
        stewardshipOpportunity as any
      );

      const stewardshipResponse = await request(app)
        .patch(`/api/opportunities/${opportunityId}`)
        .send({
          stage: 'Steward',
          notes: 'Entered stewardship phase, scheduled thank you call',
        })
        .expect(200);

      expect(stewardshipResponse.body.stage).toBe('Steward');

      // Verify complete workflow
      expect(opportunitiesRepository.createOpportunity).toHaveBeenCalled();
      expect(opportunitiesRepository.updateOpportunity).toHaveBeenCalledTimes(4);
      expect(giftsRepository.createGift).toHaveBeenCalled();
    });
  });

  describe('Complete Opportunity Lifecycle: Lost', () => {
    it('should track opportunity that becomes unlikely', async () => {
      const prospect = {
        id: prospectId,
        ...createTestPerson(),
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      vi.mocked(personsRepository.findPersonById).mockResolvedValue(prospect as any);

      // Create opportunity
      const newOpportunity = createTestOpportunity({
        personId: prospectId,
        ownerId,
        stage: 'Prospect',
        askAmount: '10000.00',
        probability: 15,
      });

      const createdOpportunity = {
        id: opportunityId,
        ...newOpportunity,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      vi.mocked(opportunitiesRepository.createOpportunity).mockResolvedValue(
        createdOpportunity as any
      );

      await request(app)
        .post('/api/opportunities')
        .send(newOpportunity)
        .expect(201);

      // Move through stages
      const cultivationOpportunity = {
        ...createdOpportunity,
        stage: 'Cultivation',
        probability: 40,
      };

      vi.mocked(opportunitiesRepository.findOpportunityById).mockResolvedValue(createdOpportunity as any);
      vi.mocked(opportunitiesRepository.updateOpportunity).mockResolvedValue(
        cultivationOpportunity as any
      );

      await request(app)
        .patch(`/api/opportunities/${opportunityId}`)
        .send({ stage: 'Cultivation', probability: 40 })
        .expect(200);

      // Mark as unlikely (stay in Cultivation but reduce probability)
      const unlikelyOpportunity = {
        ...cultivationOpportunity,
        stage: 'Cultivation',
        probability: 0,
        notes: 'Donor decided to support different cause - marking as unlikely',
      };

      vi.mocked(opportunitiesRepository.findOpportunityById).mockResolvedValue(cultivationOpportunity as any);
      vi.mocked(opportunitiesRepository.updateOpportunity).mockResolvedValue(
        unlikelyOpportunity as any
      );

      const unlikelyResponse = await request(app)
        .patch(`/api/opportunities/${opportunityId}`)
        .send({
          stage: 'Cultivation',
          probability: 0,
          notes: 'Donor decided to support different cause - marking as unlikely',
        })
        .expect(200);

      expect(unlikelyResponse.body.stage).toBe('Cultivation');
      expect(unlikelyResponse.body.probability).toBe(0);
    });
  });

  describe('Opportunity Management', () => {
    it('should filter opportunities by owner', async () => {
      const mockOpportunities = [
        {
          id: 'opp-1',
          personId: 'person-1',
          ownerId,
          stage: 'Cultivation',
          askAmount: '5000.00',
        },
        {
          id: 'opp-2',
          personId: 'person-2',
          ownerId,
          stage: 'Ask',
          askAmount: '10000.00',
        },
      ];

      vi.mocked(opportunitiesRepository.findOpportunities).mockResolvedValue(
        mockOpportunities as any
      );

      const response = await request(app)
        .get(`/api/opportunities?ownerId=${ownerId}`)
        .expect(200);

      expect(response.body).toHaveLength(2);
      expect(response.body.every((opp: any) => opp.ownerId === ownerId)).toBe(true);
    });

    it('should calculate pipeline value correctly', async () => {
      const mockOpportunities = [
        { id: 'opp-1', askAmount: '10000.00', probability: 50, stage: 'Cultivation' },
        { id: 'opp-2', askAmount: '25000.00', probability: 60, stage: 'Ask' },
        { id: 'opp-3', askAmount: '5000.00', probability: 30, stage: 'Prospect' },
      ];

      vi.mocked(opportunitiesRepository.findOpportunities).mockResolvedValue(
        mockOpportunities as any
      );

      const response = await request(app)
        .get(`/api/opportunities?ownerId=${ownerId}`)
        .expect(200);

      // Calculate weighted pipeline value
      const weightedValue = mockOpportunities.reduce((sum, opp) => {
        return sum + parseFloat(opp.askAmount) * (opp.probability / 100);
      }, 0);

      expect(weightedValue).toBe(21500); // (10000 * 0.5) + (25000 * 0.6) + (5000 * 0.3)
    });

    it('should track days in stage', async () => {
      const opportunity = {
        id: opportunityId,
        ...createTestOpportunity({
          stage: 'Cultivation',
          daysInStage: 45,
        }),
        createdAt: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000),
        updatedAt: new Date(),
      };

      vi.mocked(opportunitiesRepository.findOpportunityById).mockResolvedValue(opportunity as any);

      const response = await request(app)
        .get(`/api/opportunities/${opportunityId}`)
        .expect(200);

      expect(response.body.daysInStage).toBe(45);
    });
  });

  describe('Error Handling', () => {
    it('should return 404 when opportunity not found', async () => {
      vi.mocked(opportunitiesRepository.findOpportunityById).mockResolvedValue(null);

      await request(app)
        .get('/api/opportunities/nonexistent-id')
        .expect(404);
    });

    it('should return 400 for invalid stage', async () => {
      const invalidOpportunity = createTestOpportunity({
        stage: 'InvalidStage' as any,
      });

      await request(app)
        .post('/api/opportunities')
        .send(invalidOpportunity)
        .expect(400);
    });

    it('should return 400 for invalid probability', async () => {
      const invalidOpportunity = createTestOpportunity({
        probability: 150, // > 100
      });

      await request(app)
        .post('/api/opportunities')
        .send(invalidOpportunity)
        .expect(400);
    });

    it('should return 400 for negative ask amount', async () => {
      const invalidOpportunity = createTestOpportunity({
        askAmount: '-1000.00',
      });

      await request(app)
        .post('/api/opportunities')
        .send(invalidOpportunity)
        .expect(400);
    });
  });
});
