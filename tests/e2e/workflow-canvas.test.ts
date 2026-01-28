/**
 * E2E Tests: Workflow Canvas
 *
 * Tests the complete workflow builder lifecycle:
 * 1. Create a workflow
 * 2. Add blocks (nodes) to the canvas
 * 3. Create connections between blocks
 * 4. Update block positions (drag & drop)
 * 5. Update workflow metadata
 * 6. Clone workflow
 * 7. Delete connections, blocks, and workflows
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import request from 'supertest';
import express from 'express';
import { workflowsRouter } from '../../server/routes/workflows.routes';
import * as workflowsService from '../../server/services/workflows.service';
import { errorHandler, notFoundHandler } from '../../server/middleware/errorHandler';

// Mock service
vi.mock('../../server/services/workflows.service');

// Mock logger
vi.mock('../../server/config/logging', () => ({
  logger: {
    debug: vi.fn(),
    info: vi.fn(),
    warn: vi.fn(),
    error: vi.fn(),
  },
}));

// Mock auth middleware - no auth required for workflow routes
vi.mock('../../server/middleware/auth', () => ({
  isAuthenticated: (req: any, res: any, next: any) => next(),
}));

describe('E2E: Workflow Canvas', () => {
  let app: express.Express;
  const workflowId = 'workflow-123';
  const blockId1 = 'block-1';
  const blockId2 = 'block-2';
  const blockId3 = 'block-3';
  const connectionId = 'connection-1';

  beforeEach(() => {
    vi.clearAllMocks();

    // Create a fresh Express app for each test
    app = express();
    app.use(express.json());
    app.use('/api/workflows', workflowsRouter);
    app.use(notFoundHandler);
    app.use(errorHandler);
  });

  describe('Complete Workflow Lifecycle', () => {
    it('should create a workflow and build a complete canvas', async () => {
      // Step 1: Create a new workflow
      const newWorkflow = {
        name: 'Major Gift Cultivation Process',
        description: 'End-to-end process for cultivating major gift prospects',
        status: 'draft',
        isTemplate: false,
        tags: ['fundraising', 'major-gifts'],
      };

      const createdWorkflow = {
        id: workflowId,
        ...newWorkflow,
        ownerId: 'user-123',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      vi.mocked(workflowsService.createWorkflow).mockResolvedValue(createdWorkflow as any);

      const createResponse = await request(app)
        .post('/api/workflows')
        .send(newWorkflow)
        .expect(200);

      expect(createResponse.body).toMatchObject({
        id: workflowId,
        name: 'Major Gift Cultivation Process',
        status: 'draft',
      });

      // Step 2: Add first block (Partner - MGO)
      const block1 = {
        workflowId,
        type: 'partner',
        subtype: 'MGO',
        displayName: 'Major Gifts Officer',
        positionX: '100.00',
        positionY: '200.00',
        width: 200,
        height: 80,
        metadata: { role: 'lead' },
        colorToken: 'blues-8',
      };

      const createdBlock1 = {
        id: blockId1,
        ...block1,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      vi.mocked(workflowsService.createWorkflowBlock).mockResolvedValue(
        createdBlock1 as any
      );

      const createBlock1Response = await request(app)
        .post(`/api/workflows/${workflowId}/blocks`)
        .send(block1)
        .expect(200);

      expect(createBlock1Response.body.id).toBe(blockId1);
      expect(createBlock1Response.body.displayName).toBe('Major Gifts Officer');

      // Step 3: Add second block (Tool - Salesforce)
      const block2 = {
        workflowId,
        type: 'tool',
        subtype: 'Salesforce',
        displayName: 'Sync to Salesforce',
        positionX: '400.00',
        positionY: '200.00',
        width: 200,
        height: 80,
        metadata: { integration: 'salesforce-prod' },
        colorToken: 'blues-6',
      };

      const createdBlock2 = {
        id: blockId2,
        ...block2,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      vi.mocked(workflowsService.createWorkflowBlock).mockResolvedValue(
        createdBlock2 as any
      );

      const createBlock2Response = await request(app)
        .post(`/api/workflows/${workflowId}/blocks`)
        .send(block2)
        .expect(200);

      expect(createBlock2Response.body.id).toBe(blockId2);

      // Step 4: Add third block (Action - Email)
      const block3 = {
        workflowId,
        type: 'action',
        subtype: 'Email',
        displayName: 'Send Cultivation Email',
        positionX: '700.00',
        positionY: '200.00',
        width: 200,
        height: 80,
        metadata: { templateId: 'cultivation-intro' },
        colorToken: 'blues-4',
      };

      const createdBlock3 = {
        id: blockId3,
        ...block3,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      vi.mocked(workflowsService.createWorkflowBlock).mockResolvedValue(
        createdBlock3 as any
      );

      await request(app)
        .post(`/api/workflows/${workflowId}/blocks`)
        .send(block3)
        .expect(200);

      // Step 5: Create connection from Block 1 to Block 2
      const connection1 = {
        workflowId,
        sourceBlockId: blockId1,
        targetBlockId: blockId2,
        label: 'Qualify Prospect',
        connectionType: 'dataFlow',
        metadata: {},
      };

      const createdConnection1 = {
        id: connectionId,
        ...connection1,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      vi.mocked(workflowsService.createWorkflowConnection).mockResolvedValue(
        createdConnection1 as any
      );

      const createConnectionResponse = await request(app)
        .post(`/api/workflows/${workflowId}/connections`)
        .send(connection1)
        .expect(200);

      expect(createConnectionResponse.body.sourceBlockId).toBe(blockId1);
      expect(createConnectionResponse.body.targetBlockId).toBe(blockId2);

      // Step 6: Create connection from Block 2 to Block 3
      const connection2 = {
        workflowId,
        sourceBlockId: blockId2,
        targetBlockId: blockId3,
        connectionType: 'dataFlow',
      };

      vi.mocked(workflowsService.createWorkflowConnection).mockResolvedValue({
        id: 'connection-2',
        ...connection2,
        createdAt: new Date(),
        updatedAt: new Date(),
      } as any);

      await request(app)
        .post(`/api/workflows/${workflowId}/connections`)
        .send(connection2)
        .expect(200);

      // Step 7: Update block positions (simulate drag & drop)
      const updatedPositions = [
        { id: blockId1, positionX: '120.00', positionY: '220.00' },
        { id: blockId2, positionX: '420.00', positionY: '220.00' },
        { id: blockId3, positionX: '720.00', positionY: '220.00' },
      ];

      vi.mocked(workflowsService.updateWorkflowBlockPositions).mockResolvedValue(
        undefined
      );

      await request(app)
        .patch(`/api/workflows/${workflowId}/blocks/positions`)
        .send({ positions: updatedPositions })
        .expect(200);

      // Step 8: Get complete workflow with blocks and connections
      const completeWorkflow = {
        workflow: createdWorkflow,
        blocks: [createdBlock1, createdBlock2, createdBlock3],
        connections: [createdConnection1],
      };

      vi.mocked(workflowsService.getWorkflowById).mockResolvedValue(
        completeWorkflow as any
      );

      const getWorkflowResponse = await request(app)
        .get(`/api/workflows/${workflowId}`)
        .expect(200);

      expect(getWorkflowResponse.body.workflow.id).toBe(workflowId);
      expect(getWorkflowResponse.body.blocks).toHaveLength(3);
      expect(getWorkflowResponse.body.connections).toHaveLength(1);

      // Verify all operations were called
      expect(workflowsService.createWorkflow).toHaveBeenCalled();
      expect(workflowsService.createWorkflowBlock).toHaveBeenCalledTimes(3);
      expect(workflowsService.createWorkflowConnection).toHaveBeenCalledTimes(2);
      expect(workflowsService.updateWorkflowBlockPositions).toHaveBeenCalled();
      expect(workflowsService.getWorkflowById).toHaveBeenCalled();
    });

    it('should clone a workflow with all blocks and connections', async () => {
      // Original workflow
      const originalWorkflow = {
        id: workflowId,
        name: 'Original Workflow',
        description: 'Template workflow',
        status: 'active' as const,
        isTemplate: true,
        ownerId: 'user-123',
        blocks: [
          {
            id: blockId1,
            workflowId,
            type: 'partner' as const,
            subtype: 'MGO',
            displayName: 'Partner Block',
            positionX: '100.00',
            positionY: '100.00',
          },
          {
            id: blockId2,
            workflowId,
            type: 'action' as const,
            subtype: 'Task',
            displayName: 'Action Block',
            positionX: '300.00',
            positionY: '100.00',
          },
        ],
        connections: [
          {
            id: connectionId,
            workflowId,
            sourceBlockId: blockId1,
            targetBlockId: blockId2,
          },
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      vi.mocked(workflowsService.getWorkflowById).mockResolvedValue(
        originalWorkflow as any
      );

      // Cloned workflow
      const clonedWorkflow = {
        id: 'workflow-clone-123',
        name: 'Original Workflow (Copy)',
        description: 'Template workflow',
        status: 'draft' as const,
        isTemplate: false,
        ownerId: 'user-123',
        blocks: originalWorkflow.blocks.map((b) => ({ ...b, id: `${b.id}-clone` })),
        connections: originalWorkflow.connections.map((c) => ({
          ...c,
          id: `${c.id}-clone`,
        })),
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      vi.mocked(workflowsService.cloneWorkflow).mockResolvedValue(
        clonedWorkflow as any
      );

      const cloneResponse = await request(app)
        .post(`/api/workflows/${workflowId}/clone`)
        .expect(200);

      expect(cloneResponse.body.id).toBe('workflow-clone-123');
      expect(cloneResponse.body.name).toBe('Original Workflow (Copy)');
      expect(cloneResponse.body.status).toBe('draft');
      expect(cloneResponse.body.blocks).toHaveLength(2);
      expect(workflowsService.cloneWorkflow).toHaveBeenCalledWith(workflowId, undefined);
    });

    it('should update workflow metadata', async () => {
      const existingWorkflow = {
        id: workflowId,
        name: 'Old Name',
        description: 'Old description',
        status: 'draft' as const,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const updates = {
        name: 'Updated Workflow Name',
        description: 'Updated description with more details',
        status: 'active' as const,
        tags: ['updated', 'fundraising'],
      };

      const updatedWorkflow = {
        ...existingWorkflow,
        ...updates,
        updatedAt: new Date(),
      };

      vi.mocked(workflowsService.getWorkflowById).mockResolvedValue(
        existingWorkflow as any
      );
      vi.mocked(workflowsService.updateWorkflow).mockResolvedValue(
        updatedWorkflow as any
      );

      const response = await request(app)
        .put(`/api/workflows/${workflowId}`)
        .send(updates)
        .expect(200);

      expect(response.body.name).toBe('Updated Workflow Name');
      expect(response.body.status).toBe('active');
      expect(workflowsService.updateWorkflow).toHaveBeenCalledWith(
        workflowId,
        expect.any(Object)
      );
    });

    it('should delete connections, blocks, and workflows in correct order', async () => {
      // Step 1: Delete a connection
      vi.mocked(workflowsService.deleteWorkflowConnection).mockResolvedValue(
        undefined
      );

      await request(app)
        .delete(`/api/workflows/${workflowId}/connections/${connectionId}`)
        .expect(200);

      expect(workflowsService.deleteWorkflowConnection).toHaveBeenCalledWith(
        connectionId
      );

      // Step 2: Delete a block
      vi.mocked(workflowsService.deleteWorkflowBlock).mockResolvedValue(undefined);

      await request(app)
        .delete(`/api/workflows/${workflowId}/blocks/${blockId1}`)
        .expect(200);

      expect(workflowsService.deleteWorkflowBlock).toHaveBeenCalledWith(
        blockId1
      );

      // Step 3: Delete the workflow
      vi.mocked(workflowsService.deleteWorkflow).mockResolvedValue(undefined);

      await request(app).delete(`/api/workflows/${workflowId}`).expect(200);

      expect(workflowsService.deleteWorkflow).toHaveBeenCalledWith(workflowId);
    });
  });

  describe('Workflow Block Operations', () => {
    it('should handle different block types correctly', async () => {
      const blockTypes = [
        { type: 'partner', subtype: 'MGO', displayName: 'Major Gifts Officer' },
        { type: 'partner', subtype: 'PGO', displayName: 'Planned Giving Officer' },
        { type: 'tool', subtype: 'Salesforce', displayName: 'Salesforce CRM' },
        { type: 'tool', subtype: 'WealthEngine', displayName: 'Wealth Screening' },
        { type: 'action', subtype: 'Email', displayName: 'Send Email' },
        { type: 'action', subtype: 'Task', displayName: 'Create Task' },
        { type: 'trigger', subtype: 'Gift', displayName: 'Gift Received' },
        { type: 'trigger', subtype: 'Schedule', displayName: 'Scheduled Trigger' },
        { type: 'decision', subtype: 'Amount', displayName: 'Check Gift Amount' },
        { type: 'wait', subtype: 'Days', displayName: 'Wait 7 Days' },
      ];

      let yPosition = 100;

      for (const blockType of blockTypes) {
        const block = {
          workflowId,
          ...blockType,
          positionX: '200.00',
          positionY: `${yPosition}.00`,
          width: 200,
          height: 80,
        };

        const createdBlock = {
          id: `block-${blockType.subtype}`,
          ...block,
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        vi.mocked(workflowsService.createWorkflowBlock).mockResolvedValue(
          createdBlock as any
        );

        const response = await request(app)
          .post(`/api/workflows/${workflowId}/blocks`)
          .send(block)
          .expect(200);

        expect(response.body.type).toBe(blockType.type);
        expect(response.body.subtype).toBe(blockType.subtype);

        yPosition += 120; // Space blocks vertically
      }

      expect(workflowsService.createWorkflowBlock).toHaveBeenCalledTimes(
        blockTypes.length
      );
    });

    it('should update individual block properties', async () => {
      const existingBlock = {
        id: blockId1,
        workflowId,
        type: 'action' as const,
        subtype: 'Task',
        displayName: 'Old Task',
        positionX: '100.00',
        positionY: '100.00',
        metadata: {},
      };

      const updates = {
        displayName: 'Updated Task Name',
        metadata: { dueInDays: 7, priority: 'high' },
        colorToken: 'blues-5',
      };

      const updatedBlock = {
        ...existingBlock,
        ...updates,
        updatedAt: new Date(),
      };

      vi.mocked(workflowsService.updateWorkflowBlock).mockResolvedValue(
        updatedBlock as any
      );

      const response = await request(app)
        .put(`/api/workflows/${workflowId}/blocks/${blockId1}`)
        .send(updates)
        .expect(200);

      expect(response.body.displayName).toBe('Updated Task Name');
      expect(response.body.metadata.priority).toBe('high');
    });

    it('should retrieve all blocks for a workflow', async () => {
      const mockBlocks = [
        {
          id: blockId1,
          workflowId,
          type: 'partner',
          subtype: 'MGO',
          displayName: 'Block 1',
        },
        {
          id: blockId2,
          workflowId,
          type: 'tool',
          subtype: 'Salesforce',
          displayName: 'Block 2',
        },
        {
          id: blockId3,
          workflowId,
          type: 'action',
          subtype: 'Email',
          displayName: 'Block 3',
        },
      ];

      vi.mocked(workflowsService.getWorkflowBlocks).mockResolvedValue(
        mockBlocks as any
      );

      const response = await request(app)
        .get(`/api/workflows/${workflowId}/blocks`)
        .expect(200);

      expect(response.body).toHaveLength(3);
      expect(response.body[0].id).toBe(blockId1);
    });
  });

  describe('Workflow Connection Operations', () => {
    it('should handle different connection types', async () => {
      const connectionTypes = [
        { sourceBlockId: blockId1, targetBlockId: blockId2, connectionType: 'dataFlow' },
        { sourceBlockId: blockId2, targetBlockId: blockId3, connectionType: 'approval' },
      ];

      for (const connType of connectionTypes) {
        const connection = {
          workflowId,
          ...connType,
          label: `${connType.connectionType} connection`,
        };

        const createdConnection = {
          id: `connection-${connType.connectionType}`,
          ...connection,
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        vi.mocked(workflowsService.createWorkflowConnection).mockResolvedValue(
          createdConnection as any
        );

        const response = await request(app)
          .post(`/api/workflows/${workflowId}/connections`)
          .send(connection)
          .expect(200);

        expect(response.body.connectionType).toBe(connType.connectionType);
      }
    });

    it('should retrieve all connections for a workflow', async () => {
      const mockConnections = [
        {
          id: 'conn-1',
          workflowId,
          sourceBlockId: blockId1,
          targetBlockId: blockId2,
          connectionType: 'dataFlow',
        },
        {
          id: 'conn-2',
          workflowId,
          sourceBlockId: blockId2,
          targetBlockId: blockId3,
          connectionType: 'dataFlow',
        },
      ];

      vi.mocked(workflowsService.getWorkflowConnections).mockResolvedValue(
        mockConnections as any
      );

      const response = await request(app)
        .get(`/api/workflows/${workflowId}/connections`)
        .expect(200);

      expect(response.body).toHaveLength(2);
      expect(response.body[0].sourceBlockId).toBe(blockId1);
      expect(response.body[1].sourceBlockId).toBe(blockId2);
    });
  });

  describe('Workflow Listing and Filtering', () => {
    it('should list all workflows', async () => {
      const mockWorkflows = [
        {
          id: 'workflow-1',
          name: 'Workflow 1',
          status: 'active',
          isTemplate: false,
        },
        {
          id: 'workflow-2',
          name: 'Workflow 2',
          status: 'draft',
          isTemplate: false,
        },
        {
          id: 'workflow-3',
          name: 'Template Workflow',
          status: 'active',
          isTemplate: true,
        },
      ];

      vi.mocked(workflowsService.getWorkflows).mockResolvedValue(
        mockWorkflows as any
      );

      const response = await request(app).get('/api/workflows').expect(200);

      expect(response.body).toHaveLength(3);
    });

    it('should filter workflows by status', async () => {
      const activeWorkflows = [
        {
          id: 'workflow-1',
          name: 'Active Workflow',
          status: 'active',
        },
      ];

      vi.mocked(workflowsService.getWorkflows).mockResolvedValue(
        activeWorkflows as any
      );

      const response = await request(app)
        .get('/api/workflows?status=active')
        .expect(200);

      expect(response.body).toHaveLength(1);
      expect(response.body[0].status).toBe('active');
    });

    it('should filter workflows by template status', async () => {
      const templates = [
        {
          id: 'template-1',
          name: 'Template 1',
          isTemplate: true,
        },
      ];

      vi.mocked(workflowsService.getWorkflows).mockResolvedValue(templates as any);

      const response = await request(app)
        .get('/api/workflows?isTemplate=true')
        .expect(200);

      expect(response.body).toHaveLength(1);
      expect(response.body[0].isTemplate).toBe(true);
    });
  });

  describe('Error Handling', () => {
    it('should return 404 when workflow not found', async () => {
      const { NotFoundError } = await import('../../server/utils/errors');
      vi.mocked(workflowsService.getWorkflowById).mockRejectedValue(
        new NotFoundError('Workflow not found')
      );

      await request(app).get('/api/workflows/nonexistent-id').expect(404);
    });

    it('should return 400 for invalid block type', async () => {
      const { ValidationError } = await import('../../server/utils/errors');
      const invalidBlock = {
        workflowId,
        type: 'invalid_type',
        subtype: 'Something',
        displayName: 'Invalid Block',
        positionX: '100.00',
        positionY: '100.00',
      };

      vi.mocked(workflowsService.createWorkflowBlock).mockRejectedValue(
        new ValidationError('Invalid block type')
      );

      await request(app)
        .post(`/api/workflows/${workflowId}/blocks`)
        .send(invalidBlock)
        .expect(400);
    });

    it('should return 400 for missing required fields', async () => {
      const { ValidationError } = await import('../../server/utils/errors');
      const incompleteWorkflow = {
        description: 'Missing name field',
      };

      vi.mocked(workflowsService.createWorkflow).mockRejectedValue(
        new ValidationError('Workflow name is required')
      );

      await request(app)
        .post('/api/workflows')
        .send(incompleteWorkflow)
        .expect(400);
    });

    it('should return 404 when deleting nonexistent connection', async () => {
      const { NotFoundError } = await import('../../server/utils/errors');
      vi.mocked(workflowsService.deleteWorkflowConnection).mockRejectedValue(
        new NotFoundError('Connection not found')
      );

      await request(app)
        .delete(`/api/workflows/${workflowId}/connections/nonexistent-id`)
        .expect(404);
    });
  });
});
