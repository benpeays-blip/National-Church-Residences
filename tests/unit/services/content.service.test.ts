/**
 * Unit Tests for Content Service
 *
 * Tests business logic for content management operations
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as contentService from '../../../server/services/content.service';
import { db } from '../../../server/db';

// Mock the database
vi.mock('../../../server/db', () => ({
  db: {
    select: vi.fn(),
  },
}));

// Mock the logger
vi.mock('../../../server/config/logging', () => ({
  logger: {
    debug: vi.fn(),
    info: vi.fn(),
    warn: vi.fn(),
    error: vi.fn(),
  },
}));

describe('Content Service Unit Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getOutreachTemplates', () => {
    it('should fetch outreach templates with person data', async () => {
      const mockTemplates = [
        {
          template: {
            id: '1',
            personId: 'p1',
            subject: 'Annual Fund Ask',
            body: 'Dear {firstName}, We appreciate your support...',
            templateType: 'email',
            createdAt: new Date('2026-01-28'),
          },
          person: {
            id: 'p1',
            firstName: 'John',
            lastName: 'Doe',
            primaryEmail: 'john@example.com',
          },
        },
        {
          template: {
            id: '2',
            personId: 'p2',
            subject: 'Thank You Letter',
            body: 'Thank you for your generous gift...',
            templateType: 'letter',
            createdAt: new Date('2026-01-27'),
          },
          person: {
            id: 'p2',
            firstName: 'Jane',
            lastName: 'Smith',
            primaryEmail: 'jane@example.com',
          },
        },
      ];

      const mockLimit = vi.fn().mockResolvedValue(mockTemplates);
      const mockOrderBy = vi.fn().mockReturnValue({ limit: mockLimit });
      const mockInnerJoin = vi.fn().mockReturnValue({ orderBy: mockOrderBy });
      const mockFrom = vi.fn().mockReturnValue({ innerJoin: mockInnerJoin });
      vi.mocked(db.select).mockReturnValue({ from: mockFrom } as any);

      const result = await contentService.getOutreachTemplates();

      expect(result).toEqual(mockTemplates);
      expect(result).toHaveLength(2);
      expect(mockLimit).toHaveBeenCalledWith(50);
    });

    it('should return empty array when no templates exist', async () => {
      const mockLimit = vi.fn().mockResolvedValue([]);
      const mockOrderBy = vi.fn().mockReturnValue({ limit: mockLimit });
      const mockInnerJoin = vi.fn().mockReturnValue({ orderBy: mockOrderBy });
      const mockFrom = vi.fn().mockReturnValue({ innerJoin: mockInnerJoin });
      vi.mocked(db.select).mockReturnValue({ from: mockFrom } as any);

      const result = await contentService.getOutreachTemplates();

      expect(result).toEqual([]);
    });
  });

  describe('getGrantProposals', () => {
    it('should fetch grant proposals with grant data', async () => {
      const mockProposals = [
        {
          proposal: {
            id: '1',
            grantId: 'g1',
            title: 'Community Program Funding',
            narrative: 'Our community program serves...',
            askAmount: '100000',
            createdAt: new Date('2026-01-28'),
          },
          grant: {
            id: 'g1',
            grantName: 'Foundation Grant 2026',
            organization: 'Smith Foundation',
            deadline: new Date('2026-03-01'),
          },
        },
        {
          proposal: {
            id: '2',
            grantId: 'g2',
            title: 'Youth Services Expansion',
            narrative: 'Expanding services to underserved youth...',
            askAmount: '50000',
            createdAt: new Date('2026-01-27'),
          },
          grant: {
            id: 'g2',
            grantName: 'Community Foundation Grant',
            organization: 'Community Foundation',
            deadline: new Date('2026-04-15'),
          },
        },
      ];

      const mockOrderBy = vi.fn().mockResolvedValue(mockProposals);
      const mockInnerJoin = vi.fn().mockReturnValue({ orderBy: mockOrderBy });
      const mockFrom = vi.fn().mockReturnValue({ innerJoin: mockInnerJoin });
      vi.mocked(db.select).mockReturnValue({ from: mockFrom } as any);

      const result = await contentService.getGrantProposals();

      expect(result).toEqual(mockProposals);
      expect(result).toHaveLength(2);
      expect(result[0].proposal.title).toBe('Community Program Funding');
    });

    it('should return empty array when no proposals exist', async () => {
      const mockOrderBy = vi.fn().mockResolvedValue([]);
      const mockInnerJoin = vi.fn().mockReturnValue({ orderBy: mockOrderBy });
      const mockFrom = vi.fn().mockReturnValue({ innerJoin: mockInnerJoin });
      vi.mocked(db.select).mockReturnValue({ from: mockFrom } as any);

      const result = await contentService.getGrantProposals();

      expect(result).toEqual([]);
    });
  });

  describe('getImpactReports', () => {
    it('should fetch impact reports with person data', async () => {
      const mockReports = [
        {
          report: {
            id: '1',
            personId: 'p1',
            title: '2025 Annual Impact',
            summary: 'This year we served 5000 people...',
            metrics: { people_served: 5000, programs: 12 },
            createdAt: new Date('2026-01-28'),
          },
          person: {
            id: 'p1',
            firstName: 'Sarah',
            lastName: 'Johnson',
            primaryEmail: 'sarah@example.com',
          },
        },
        {
          report: {
            id: '2',
            personId: 'p2',
            title: 'Q4 2025 Report',
            summary: 'Quarter 4 highlights include...',
            metrics: { families: 250, volunteers: 45 },
            createdAt: new Date('2026-01-15'),
          },
          person: {
            id: 'p2',
            firstName: 'Michael',
            lastName: 'Brown',
            primaryEmail: 'michael@example.com',
          },
        },
      ];

      const mockOrderBy = vi.fn().mockResolvedValue(mockReports);
      const mockInnerJoin = vi.fn().mockReturnValue({ orderBy: mockOrderBy });
      const mockFrom = vi.fn().mockReturnValue({ innerJoin: mockInnerJoin });
      vi.mocked(db.select).mockReturnValue({ from: mockFrom } as any);

      const result = await contentService.getImpactReports();

      expect(result).toEqual(mockReports);
      expect(result).toHaveLength(2);
      expect(result[0].report.title).toBe('2025 Annual Impact');
    });

    it('should return empty array when no reports exist', async () => {
      const mockOrderBy = vi.fn().mockResolvedValue([]);
      const mockInnerJoin = vi.fn().mockReturnValue({ orderBy: mockOrderBy });
      const mockFrom = vi.fn().mockReturnValue({ innerJoin: mockInnerJoin });
      vi.mocked(db.select).mockReturnValue({ from: mockFrom } as any);

      const result = await contentService.getImpactReports();

      expect(result).toEqual([]);
    });
  });
});
