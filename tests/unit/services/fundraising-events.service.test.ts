/**
 * Unit Tests for Fundraising Events Service
 *
 * Tests business logic in the fundraising events service layer
 * Mocks repository calls to test service logic in isolation
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as fundraisingEventsService from '../../../server/services/fundraising-events.service';
import * as fundraisingEventsRepository from '../../../server/services/storage/fundraising-events.repository';

// Mock the repository module
vi.mock('../../../server/services/storage/fundraising-events.repository');

// Mock the logger
vi.mock('../../../server/config/logging', () => ({
  logger: {
    debug: vi.fn(),
    info: vi.fn(),
    warn: vi.fn(),
    error: vi.fn(),
  },
}));

describe('Fundraising Events Service', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getFundraisingEvents', () => {
    it('should fetch all fundraising events', async () => {
      const mockEvents = [
        {
          id: '1',
          name: 'Annual Gala',
          eventType: 'gala',
          eventDate: new Date('2026-06-15'),
          venue: 'Grand Hotel',
          description: 'Annual fundraising gala',
          goalAmount: '100000.00',
          amountRaised: '75000.00',
          attendees: 200,
          sponsors: ['Sponsor A', 'Sponsor B'],
          status: 'upcoming',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: '2',
          name: 'Golf Tournament',
          eventType: 'golf',
          eventDate: new Date('2026-08-20'),
          venue: 'Country Club',
          description: 'Charity golf tournament',
          goalAmount: '50000.00',
          amountRaised: '45000.00',
          attendees: 80,
          sponsors: ['Sponsor C'],
          status: 'upcoming',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      vi.mocked(fundraisingEventsRepository.findFundraisingEvents).mockResolvedValue(mockEvents as any);

      const result = await fundraisingEventsService.getFundraisingEvents();

      expect(result).toEqual(mockEvents);
      expect(fundraisingEventsRepository.findFundraisingEvents).toHaveBeenCalledOnce();
    });

    it('should return empty array when no events exist', async () => {
      vi.mocked(fundraisingEventsRepository.findFundraisingEvents).mockResolvedValue([]);

      const result = await fundraisingEventsService.getFundraisingEvents();

      expect(result).toEqual([]);
      expect(fundraisingEventsRepository.findFundraisingEvents).toHaveBeenCalledOnce();
    });
  });
});
