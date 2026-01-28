import { db } from '../../db';
import { tasks, Task, InsertTask } from '@shared/schema';
import { eq, and } from 'drizzle-orm';

/**
 * Tasks Repository
 *
 * Handles database operations for task management
 */

export async function findTasks(ownerId?: string, completed?: boolean): Promise<Task[]> {
  const conditions = [];

  if (ownerId) {
    conditions.push(eq(tasks.ownerId, ownerId));
  }

  if (completed !== undefined) {
    conditions.push(eq(tasks.completed, completed ? 1 : 0));
  }

  if (conditions.length > 0) {
    return db.select().from(tasks).where(and(...conditions)).orderBy(tasks.dueDate);
  }

  return db.select().from(tasks).orderBy(tasks.dueDate);
}

export async function findTaskById(id: string): Promise<Task | null> {
  const result = await db.select().from(tasks).where(eq(tasks.id, id));
  return result[0] || null;
}

export async function createTask(data: InsertTask): Promise<Task> {
  const result = await db.insert(tasks).values(data).returning();
  return result[0];
}

export async function updateTask(id: string, data: Partial<InsertTask>): Promise<Task | null> {
  const result = await db
    .update(tasks)
    .set(data)
    .where(eq(tasks.id, id))
    .returning();

  return result[0] || null;
}

export async function deleteTask(id: string): Promise<Task | null> {
  const result = await db.delete(tasks).where(eq(tasks.id, id)).returning();
  return result[0] || null;
}

export async function findTasksByPersonId(personId: string): Promise<Task[]> {
  return db.select().from(tasks).where(eq(tasks.personId, personId)).orderBy(tasks.dueDate);
}
