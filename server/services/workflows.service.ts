import * as workflowsRepo from './storage/workflows.repository';
import type {
  Workflow,
  InsertWorkflow,
  WorkflowBlock,
  InsertWorkflowBlock,
  WorkflowConnection,
  InsertWorkflowConnection,
} from '@shared/schema';
import { logger } from '../config/logging';
import { NotFoundError, ValidationError } from '../utils/errors';

/**
 * Workflows Service
 *
 * Business logic for workflow automation including:
 * - Workflow management (CRUD)
 * - Workflow cloning
 * - Block management
 * - Connection management
 */

// Workflows
export async function getWorkflows(
  ownerId?: string,
  isTemplate?: boolean
): Promise<Workflow[]> {
  logger.debug('Fetching workflows', { ownerId, isTemplate });

  const workflows = await workflowsRepo.findWorkflows(ownerId, isTemplate);

  logger.info('Workflows fetched', { count: workflows.length });
  return workflows;
}

export async function getWorkflowById(id: string): Promise<{
  workflow: Workflow;
  blocks: WorkflowBlock[];
  connections: WorkflowConnection[];
}> {
  logger.debug('Fetching workflow with blocks and connections', { id });

  const workflow = await workflowsRepo.findWorkflowById(id);

  if (!workflow) {
    logger.warn('Workflow not found', { id });
    throw new NotFoundError('Workflow not found');
  }

  const [blocks, connections] = await Promise.all([
    workflowsRepo.findWorkflowBlocks(id),
    workflowsRepo.findWorkflowConnections(id),
  ]);

  logger.info('Workflow fetched with related data', {
    id,
    blocksCount: blocks.length,
    connectionsCount: connections.length,
  });

  return { workflow, blocks, connections };
}

export async function createWorkflow(data: InsertWorkflow): Promise<Workflow> {
  logger.debug('Creating workflow', { name: data.name });

  // Validate required fields
  if (!data.name || data.name.trim() === '') {
    throw new ValidationError('Workflow name is required');
  }

  const workflow = await workflowsRepo.insertWorkflow(data);

  logger.info('Workflow created', { id: workflow.id, name: workflow.name });
  return workflow;
}

export async function updateWorkflow(
  id: string,
  data: Partial<InsertWorkflow>
): Promise<Workflow> {
  logger.debug('Updating workflow', { id });

  // Validate name if provided
  if (data.name !== undefined && data.name.trim() === '') {
    throw new ValidationError('Workflow name cannot be empty');
  }

  const workflow = await workflowsRepo.updateWorkflowById(id, data);

  if (!workflow) {
    logger.warn('Workflow not found for update', { id });
    throw new NotFoundError('Workflow not found');
  }

  logger.info('Workflow updated', { id });
  return workflow;
}

export async function deleteWorkflow(id: string): Promise<void> {
  logger.debug('Deleting workflow', { id });

  // Check if workflow exists
  const existing = await workflowsRepo.findWorkflowById(id);
  if (!existing) {
    logger.warn('Workflow not found for deletion', { id });
    throw new NotFoundError('Workflow not found');
  }

  await workflowsRepo.deleteWorkflowById(id);

  logger.info('Workflow deleted', { id });
}

export async function cloneWorkflow(
  id: string,
  ownerId?: string
): Promise<Workflow> {
  logger.debug('Cloning workflow', { id, ownerId });

  // Get the original workflow
  const original = await workflowsRepo.findWorkflowById(id);
  if (!original) {
    logger.warn('Workflow not found for cloning', { id });
    throw new NotFoundError('Workflow not found');
  }

  // Get all blocks and connections
  const blocks = await workflowsRepo.findWorkflowBlocks(id);
  const connections = await workflowsRepo.findWorkflowConnections(id);

  // Create new workflow
  const newWorkflow = await workflowsRepo.insertWorkflow({
    name: `${original.name} (Copy)`,
    description: original.description,
    ownerId: ownerId || original.ownerId,
    status: 'draft',
    isTemplate: false,
    tags: original.tags as any,
    templateCategory: original.templateCategory,
  });

  // Clone blocks with ID mapping
  const blockIdMap = new Map<string, string>();
  for (const block of blocks) {
    const newBlock = await workflowsRepo.insertWorkflowBlock({
      workflowId: newWorkflow.id,
      type: block.type,
      subtype: block.subtype,
      displayName: block.displayName,
      positionX: block.positionX,
      positionY: block.positionY,
      width: block.width,
      height: block.height,
      metadata: block.metadata as any,
      colorToken: block.colorToken,
    });
    blockIdMap.set(block.id, newBlock.id);
  }

  // Clone connections with updated block IDs
  for (const connection of connections) {
    await workflowsRepo.insertWorkflowConnection({
      workflowId: newWorkflow.id,
      sourceBlockId: blockIdMap.get(connection.sourceBlockId)!,
      targetBlockId: blockIdMap.get(connection.targetBlockId)!,
      label: connection.label,
      connectionType: connection.connectionType,
      metadata: connection.metadata as any,
    });
  }

  logger.info('Workflow cloned', {
    originalId: id,
    newId: newWorkflow.id,
    blocksCloned: blocks.length,
    connectionsCloned: connections.length,
  });

  return newWorkflow;
}

// Workflow Blocks
export async function getWorkflowBlocks(workflowId: string): Promise<WorkflowBlock[]> {
  logger.debug('Fetching workflow blocks', { workflowId });

  const blocks = await workflowsRepo.findWorkflowBlocks(workflowId);

  logger.info('Workflow blocks fetched', {
    workflowId,
    count: blocks.length,
  });

  return blocks;
}

export async function createWorkflowBlock(
  data: InsertWorkflowBlock
): Promise<WorkflowBlock> {
  logger.debug('Creating workflow block', {
    workflowId: data.workflowId,
    type: data.type,
  });

  // Validate required fields
  if (!data.workflowId) {
    throw new ValidationError('Workflow ID is required');
  }

  if (!data.type) {
    throw new ValidationError('Block type is required');
  }

  const block = await workflowsRepo.insertWorkflowBlock(data);

  logger.info('Workflow block created', {
    id: block.id,
    workflowId: block.workflowId,
  });

  return block;
}

export async function updateWorkflowBlock(
  id: string,
  data: Partial<InsertWorkflowBlock>
): Promise<WorkflowBlock> {
  logger.debug('Updating workflow block', { id });

  const block = await workflowsRepo.updateWorkflowBlockById(id, data);

  if (!block) {
    logger.warn('Workflow block not found for update', { id });
    throw new NotFoundError('Workflow block not found');
  }

  logger.info('Workflow block updated', { id });
  return block;
}

export async function updateWorkflowBlockPositions(
  positions: Array<{ id: string; positionX: number; positionY: number }>
): Promise<void> {
  logger.debug('Updating workflow block positions', { count: positions.length });

  // Update all positions
  await Promise.all(
    positions.map((pos) =>
      workflowsRepo.updateWorkflowBlockById(pos.id, {
        positionX: pos.positionX.toString(),
        positionY: pos.positionY.toString(),
      })
    )
  );

  logger.info('Workflow block positions updated', { count: positions.length });
}

export async function deleteWorkflowBlock(id: string): Promise<void> {
  logger.debug('Deleting workflow block', { id });

  await workflowsRepo.deleteWorkflowBlockById(id);

  logger.info('Workflow block deleted', { id });
}

// Workflow Connections
export async function getWorkflowConnections(
  workflowId: string
): Promise<WorkflowConnection[]> {
  logger.debug('Fetching workflow connections', { workflowId });

  const connections = await workflowsRepo.findWorkflowConnections(workflowId);

  logger.info('Workflow connections fetched', {
    workflowId,
    count: connections.length,
  });

  return connections;
}

export async function createWorkflowConnection(
  data: InsertWorkflowConnection
): Promise<WorkflowConnection> {
  logger.debug('Creating workflow connection', {
    workflowId: data.workflowId,
    sourceBlockId: data.sourceBlockId,
    targetBlockId: data.targetBlockId,
  });

  // Validate required fields
  if (!data.workflowId) {
    throw new ValidationError('Workflow ID is required');
  }

  if (!data.sourceBlockId || !data.targetBlockId) {
    throw new ValidationError('Source and target block IDs are required');
  }

  const connection = await workflowsRepo.insertWorkflowConnection(data);

  logger.info('Workflow connection created', {
    id: connection.id,
    workflowId: connection.workflowId,
  });

  return connection;
}

export async function deleteWorkflowConnection(id: string): Promise<void> {
  logger.debug('Deleting workflow connection', { id });

  await workflowsRepo.deleteWorkflowConnectionById(id);

  logger.info('Workflow connection deleted', { id });
}
