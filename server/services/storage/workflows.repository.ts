import { db } from '../../db';
import {
  workflows,
  workflowBlocks,
  workflowConnections,
  type Workflow,
  type InsertWorkflow,
  type WorkflowBlock,
  type InsertWorkflowBlock,
  type WorkflowConnection,
  type InsertWorkflowConnection,
} from '@shared/schema';
import { eq, desc, and } from 'drizzle-orm';

/**
 * Workflows Repository
 *
 * Database operations for workflows, blocks, and connections.
 */

// Workflows
export async function findWorkflows(
  ownerId?: string,
  isTemplate?: boolean
): Promise<Workflow[]> {
  let query = db.select().from(workflows);

  if (ownerId !== undefined || isTemplate !== undefined) {
    const conditions = [];
    if (ownerId) conditions.push(eq(workflows.ownerId, ownerId));
    if (isTemplate !== undefined) conditions.push(eq(workflows.isTemplate, isTemplate));
    query = query.where(and(...conditions)) as any;
  }

  return query.orderBy(desc(workflows.updatedAt));
}

export async function findWorkflowById(id: string): Promise<Workflow | undefined> {
  const result = await db.select().from(workflows).where(eq(workflows.id, id));
  return result[0];
}

export async function insertWorkflow(workflow: InsertWorkflow): Promise<Workflow> {
  const result = await db.insert(workflows).values(workflow).returning();
  return result[0];
}

export async function updateWorkflowById(
  id: string,
  workflow: Partial<InsertWorkflow>
): Promise<Workflow | undefined> {
  const result = await db
    .update(workflows)
    .set({ ...workflow, updatedAt: new Date() })
    .where(eq(workflows.id, id))
    .returning();
  return result[0];
}

export async function deleteWorkflowById(id: string): Promise<void> {
  await db.delete(workflows).where(eq(workflows.id, id));
}

// Workflow Blocks
export async function findWorkflowBlocks(workflowId: string): Promise<WorkflowBlock[]> {
  return db.select().from(workflowBlocks).where(eq(workflowBlocks.workflowId, workflowId));
}

export async function insertWorkflowBlock(
  block: InsertWorkflowBlock
): Promise<WorkflowBlock> {
  const result = await db.insert(workflowBlocks).values(block).returning();
  return result[0];
}

export async function updateWorkflowBlockById(
  id: string,
  block: Partial<InsertWorkflowBlock>
): Promise<WorkflowBlock | undefined> {
  const result = await db
    .update(workflowBlocks)
    .set({ ...block, updatedAt: new Date() })
    .where(eq(workflowBlocks.id, id))
    .returning();
  return result[0];
}

export async function deleteWorkflowBlockById(id: string): Promise<void> {
  await db.delete(workflowBlocks).where(eq(workflowBlocks.id, id));
}

// Workflow Connections
export async function findWorkflowConnections(
  workflowId: string
): Promise<WorkflowConnection[]> {
  return db
    .select()
    .from(workflowConnections)
    .where(eq(workflowConnections.workflowId, workflowId));
}

export async function insertWorkflowConnection(
  connection: InsertWorkflowConnection
): Promise<WorkflowConnection> {
  const result = await db.insert(workflowConnections).values(connection).returning();
  return result[0];
}

export async function updateWorkflowConnectionById(
  id: string,
  connection: Partial<InsertWorkflowConnection>
): Promise<WorkflowConnection | undefined> {
  const result = await db
    .update(workflowConnections)
    .set({ ...connection, updatedAt: new Date() })
    .where(eq(workflowConnections.id, id))
    .returning();
  return result[0];
}

export async function deleteWorkflowConnectionById(id: string): Promise<void> {
  await db.delete(workflowConnections).where(eq(workflowConnections.id, id));
}
