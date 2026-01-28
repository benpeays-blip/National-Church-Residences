import { db } from '../../db';
import { organizationCanvases, type OrganizationCanvas, type InsertOrganizationCanvas } from '@shared/schema';
import { eq, desc } from 'drizzle-orm';

/**
 * Organization Canvases Repository
 *
 * Database operations for organization canvases.
 */

export async function findOrganizationCanvases(
  ownerId?: string
): Promise<OrganizationCanvas[]> {
  if (ownerId) {
    return await db
      .select()
      .from(organizationCanvases)
      .where(eq(organizationCanvases.ownerId, ownerId))
      .orderBy(desc(organizationCanvases.updatedAt));
  }
  return await db
    .select()
    .from(organizationCanvases)
    .orderBy(desc(organizationCanvases.updatedAt));
}

export async function findOrganizationCanvasById(
  id: string
): Promise<OrganizationCanvas | undefined> {
  const result = await db
    .select()
    .from(organizationCanvases)
    .where(eq(organizationCanvases.id, id));
  return result[0];
}

export async function insertOrganizationCanvas(
  canvas: InsertOrganizationCanvas
): Promise<OrganizationCanvas> {
  const result = await db.insert(organizationCanvases).values(canvas).returning();
  return result[0];
}

export async function updateOrganizationCanvasById(
  id: string,
  canvas: Partial<InsertOrganizationCanvas>
): Promise<OrganizationCanvas | undefined> {
  const result = await db
    .update(organizationCanvases)
    .set({ ...canvas, updatedAt: new Date() })
    .where(eq(organizationCanvases.id, id))
    .returning();
  return result[0];
}

export async function deleteOrganizationCanvasById(id: string): Promise<OrganizationCanvas | null> {
  const result = await db
    .delete(organizationCanvases)
    .where(eq(organizationCanvases.id, id))
    .returning();
  return result[0] || null;
}
