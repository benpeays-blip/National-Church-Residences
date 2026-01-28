import { Router } from 'express';
import * as workflowsController from '../controllers/workflows.controller';

/**
 * Workflows Routes
 *
 * Defines routes for workflow automation:
 * - GET    /api/workflows                                - List all workflows (optional filters)
 * - GET    /api/workflows/:id                            - Get workflow with blocks and connections
 * - POST   /api/workflows                                - Create workflow
 * - PUT    /api/workflows/:id                            - Update workflow
 * - DELETE /api/workflows/:id                            - Delete workflow
 * - POST   /api/workflows/:id/clone                      - Clone workflow
 * - GET    /api/workflows/:workflowId/blocks             - Get workflow blocks
 * - POST   /api/workflows/:workflowId/blocks             - Create workflow block
 * - PATCH  /api/workflows/:workflowId/blocks/positions   - Update block positions
 * - PUT    /api/workflows/:workflowId/blocks/:id         - Update workflow block
 * - DELETE /api/workflows/:workflowId/blocks/:id         - Delete workflow block
 * - GET    /api/workflows/:workflowId/connections        - Get workflow connections
 * - POST   /api/workflows/:workflowId/connections        - Create workflow connection
 * - DELETE /api/workflows/:workflowId/connections/:id    - Delete workflow connection
 */

export const workflowsRouter = Router();

// Workflows
workflowsRouter.get('/', workflowsController.getWorkflows);
workflowsRouter.get('/:id', workflowsController.getWorkflowById);
workflowsRouter.post('/', workflowsController.createWorkflow);
workflowsRouter.put('/:id', workflowsController.updateWorkflow);
workflowsRouter.delete('/:id', workflowsController.deleteWorkflow);
workflowsRouter.post('/:id/clone', workflowsController.cloneWorkflow);

// Workflow Blocks
workflowsRouter.get('/:workflowId/blocks', workflowsController.getWorkflowBlocks);
workflowsRouter.post('/:workflowId/blocks', workflowsController.createWorkflowBlock);
workflowsRouter.patch(
  '/:workflowId/blocks/positions',
  workflowsController.updateWorkflowBlockPositions
);
workflowsRouter.put('/:workflowId/blocks/:id', workflowsController.updateWorkflowBlock);
workflowsRouter.delete(
  '/:workflowId/blocks/:id',
  workflowsController.deleteWorkflowBlock
);

// Workflow Connections
workflowsRouter.get(
  '/:workflowId/connections',
  workflowsController.getWorkflowConnections
);
workflowsRouter.post(
  '/:workflowId/connections',
  workflowsController.createWorkflowConnection
);
workflowsRouter.delete(
  '/:workflowId/connections/:id',
  workflowsController.deleteWorkflowConnection
);
