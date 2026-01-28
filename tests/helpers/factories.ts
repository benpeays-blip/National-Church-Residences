/**
 * Test Data Factories
 *
 * Provides factory functions for generating test data
 * Makes it easy to create valid test objects with sensible defaults
 */

import { InsertPerson, InsertGift, InsertOpportunity, InsertCalendarEvent } from '@shared/schema';

/**
 * Generate a random ID for testing
 */
function generateId(): string {
  return `test_${Date.now()}_${Math.random().toString(36).substring(7)}`;
}

/**
 * Create a test person with optional overrides
 */
export function createTestPerson(overrides: Partial<InsertPerson> = {}): InsertPerson {
  const defaults: InsertPerson = {
    firstName: 'John',
    lastName: 'Doe',
    primaryEmail: 'john.doe@example.com',
    primaryPhone: '555-555-0100',
    preferredName: 'John',
    householdId: null,
    organizationName: 'Test Organization',
    wealthBand: 'P3',
    relationshipEnergy: 75,
    relationshipStructure: 60,
    sourceSystem: null,
    sourceRecordId: null,
    syncedAt: null,
    dataQualityScore: null,
  };

  return { ...defaults, ...overrides };
}

/**
 * Create a test gift with optional overrides
 */
export function createTestGift(overrides: Partial<InsertGift> = {}): InsertGift {
  const defaults: InsertGift = {
    personId: generateId(),
    amount: '1000.00',
    currency: 'USD',
    receivedAt: new Date(),
    giftType: 'one_time',
    paymentMethod: 'check',
    status: 'received',
    campaign: 'Annual Fund 2026',
    fund: 'General Fund',
    designation: 'Where Most Needed',
    acknowledgmentStatus: 'sent',
    notes: 'Test gift created by factory',
  };

  return { ...defaults, ...overrides };
}

/**
 * Create a test opportunity with optional overrides
 */
export function createTestOpportunity(overrides: Partial<InsertOpportunity> = {}): InsertOpportunity {
  const defaults: InsertOpportunity = {
    personId: generateId(),
    ownerId: null,
    stage: 'Cultivation',
    askAmount: '5000.00',
    probability: 50,
    closeDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000), // 90 days from now
    notes: 'Test opportunity created by factory',
    daysInStage: null,
    sourceSystem: null,
    sourceRecordId: null,
    syncedAt: null,
    dataQualityScore: null,
  };

  return { ...defaults, ...overrides };
}

/**
 * Create a test calendar event with optional overrides
 */
export function createTestCalendarEvent(overrides: Partial<InsertCalendarEvent> = {}): InsertCalendarEvent {
  const defaults: InsertCalendarEvent = {
    userId: generateId(),
    personId: null,
    title: 'Test Meeting',
    description: 'Test calendar event created by factory',
    type: 'meeting',
    scheduledAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // Tomorrow
    duration: 60, // 1 hour
    location: 'Conference Room A',
    status: 'scheduled',
    notes: 'Test event',
  };

  return { ...defaults, ...overrides };
}

/**
 * Create multiple test persons
 */
export function createTestPersons(count: number, overrides: Partial<InsertPerson> = {}): InsertPerson[] {
  return Array.from({ length: count }, (_, i) =>
    createTestPerson({
      ...overrides,
      firstName: `Person${i + 1}`,
      primaryEmail: `person${i + 1}@example.com`,
    })
  );
}

/**
 * Create multiple test gifts
 */
export function createTestGifts(count: number, personId: string, overrides: Partial<InsertGift> = {}): InsertGift[] {
  return Array.from({ length: count }, (_, i) =>
    createTestGift({
      ...overrides,
      personId,
      amount: `${(i + 1) * 100}.00`,
      receivedAt: new Date(Date.now() - i * 30 * 24 * 60 * 60 * 1000), // Spread over past months
    })
  );
}

/**
 * Create multiple test opportunities
 */
export function createTestOpportunities(count: number, personId: string, overrides: Partial<InsertOpportunity> = {}): InsertOpportunity[] {
  const stages = ['Prospect', 'Cultivation', 'Ask', 'Steward', 'Renewal'];

  return Array.from({ length: count }, (_, i) =>
    createTestOpportunity({
      ...overrides,
      personId,
      stage: stages[i % stages.length] as any,
      askAmount: `${(i + 1) * 1000}.00`,
    })
  );
}
