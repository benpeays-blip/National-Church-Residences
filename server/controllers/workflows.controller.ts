import { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import * as workflowsService from '../services/workflows.service';

/**
 * Workflows Controller
 *
 * Handles HTTP requests for workflow automation.
 */

// Workflows
export const getWorkflows = asyncHandler(async (req: Request, res: Response) => {
  const ownerId = req.query.ownerId as string | undefined;
  const isTemplate =
    req.query.isTemplate === 'true'
      ? true
      : req.query.isTemplate === 'false'
        ? false
        : undefined;

  const workflows = await workflowsService.getWorkflows(ownerId, isTemplate);
  res.json(workflows);
});

export const getWorkflowById = asyncHandler(async (req: Request, res: Response) => {
  const data = await workflowsService.getWorkflowById(req.params.id);
  res.json(data);
});

export const createWorkflow = asyncHandler(async (req: Request, res: Response) => {
  const workflow = await workflowsService.createWorkflow(req.body);
  res.json(workflow);
});

export const updateWorkflow = asyncHandler(async (req: Request, res: Response) => {
  const workflow = await workflowsService.updateWorkflow(req.params.id, req.body);
  res.json(workflow);
});

export const deleteWorkflow = asyncHandler(async (req: Request, res: Response) => {
  await workflowsService.deleteWorkflow(req.params.id);
  res.json({ success: true });
});

export const cloneWorkflow = asyncHandler(async (req: Request, res: Response) => {
  const ownerId = req.body.ownerId as string | undefined;
  const clonedWorkflow = await workflowsService.cloneWorkflow(req.params.id, ownerId);
  res.json(clonedWorkflow);
});

// Workflow Blocks
export const getWorkflowBlocks = asyncHandler(async (req: Request, res: Response) => {
  const blocks = await workflowsService.getWorkflowBlocks(req.params.workflowId);
  res.json(blocks);
});

export const createWorkflowBlock = asyncHandler(async (req: Request, res: Response) => {
  const block = await workflowsService.createWorkflowBlock({
    ...req.body,
    workflowId: req.params.workflowId,
  });
  res.json(block);
});

export const updateWorkflowBlockPositions = asyncHandler(
  async (req: Request, res: Response) => {
    const positions = req.body.positions as Array<{
      id: string;
      positionX: number;
      positionY: number;
    }>;

    await workflowsService.updateWorkflowBlockPositions(positions);
    res.json({ success: true });
  }
);

export const updateWorkflowBlock = asyncHandler(async (req: Request, res: Response) => {
  const block = await workflowsService.updateWorkflowBlock(req.params.id, req.body);
  res.json(block);
});

export const deleteWorkflowBlock = asyncHandler(async (req: Request, res: Response) => {
  await workflowsService.deleteWorkflowBlock(req.params.id);
  res.json({ success: true });
});

// Workflow Connections
export const getWorkflowConnections = asyncHandler(
  async (req: Request, res: Response) => {
    const connections = await workflowsService.getWorkflowConnections(
      req.params.workflowId
    );
    res.json(connections);
  }
);

export const createWorkflowConnection = asyncHandler(
  async (req: Request, res: Response) => {
    const connection = await workflowsService.createWorkflowConnection({
      ...req.body,
      workflowId: req.params.workflowId,
    });
    res.json(connection);
  }
);

export const deleteWorkflowConnection = asyncHandler(
  async (req: Request, res: Response) => {
    await workflowsService.deleteWorkflowConnection(req.params.id);
    res.json({ success: true });
  }
);
