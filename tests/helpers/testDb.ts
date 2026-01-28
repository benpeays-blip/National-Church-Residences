/**
 * Test Database Utilities
 *
 * Provides utilities for setting up and tearing down test databases
 * For unit tests: Mock database operations
 * For integration tests: Use actual database with transaction rollback
 */

import { db } from '../../server/db';
import {
  persons,
  gifts,
  opportunities,
  calendarEvents,
  users
} from '@shared/schema';

/**
 * Clear all test data from the database
 * Use this in beforeEach/afterEach for integration tests
 */
export async function clearDatabase() {
  try {
    // Delete in reverse order of dependencies to avoid foreign key violations
    await db.delete(calendarEvents);
    await db.delete(opportunities);
    await db.delete(gifts);
    await db.delete(persons);
    // Note: Not deleting users to preserve test user accounts
  } catch (error) {
    console.error('Error clearing database:', error);
    throw error;
  }
}

/**
 * Create a test user for authentication tests
 * Returns the user ID
 */
export async function createTestUser() {
  const [user] = await db.insert(users).values({
    username: 'testuser',
    email: 'test@example.com',
    role: 'admin',
    firstName: 'Test',
    lastName: 'User',
  }).returning();

  return user;
}

/**
 * Mock database operations for unit tests
 * Returns a mock db object with common operations
 */
export function createMockDb() {
  return {
    select: vi.fn().mockReturnThis(),
    from: vi.fn().mockReturnThis(),
    where: vi.fn().mockReturnThis(),
    orderBy: vi.fn().mockReturnThis(),
    leftJoin: vi.fn().mockReturnThis(),
    insert: vi.fn().mockReturnThis(),
    values: vi.fn().mockReturnThis(),
    returning: vi.fn().mockResolvedValue([]),
    update: vi.fn().mockReturnThis(),
    set: vi.fn().mockReturnThis(),
    delete: vi.fn().mockReturnThis(),
  };
}
