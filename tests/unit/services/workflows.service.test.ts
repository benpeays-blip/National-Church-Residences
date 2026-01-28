/**
 * Unit Tests for Workflows Service
 *
 * Tests business logic in the workflows service layer including
 * the complex workflow cloning logic
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as workflowsService from '../../../server/services/workflows.service';
import * as workflowsRepository from '../../../server/services/storage/workflows.repository';
import { NotFoundError, ValidationError } from '../../../server/utils/errors';

// Mock the repository module
vi.mock('../../../server/services/storage/workflows.repository');

// Mock the logger
vi.mock('../../../server/config/logging', () => ({
  logger: {
    debug: vi.fn(),
    info: vi.fn(),
    warn: vi.fn(),
    error: vi.fn(),
  },
}));

describe('Workflows Service', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getWorkflows', () => {
    it('should fetch all workflows without filters', async () => {
      const mockWorkflows = [
        { id: '1', name: 'Workflow 1', status: 'active' },
        { id: '2', name: 'Workflow 2', status: 'draft' },
      ];

      vi.mocked(workflowsRepository.findWorkflows).mockResolvedValue(mockWorkflows as any);

      const result = await workflowsService.getWorkflows();

      expect(result).toEqual(mockWorkflows);
      expect(workflowsRepository.findWorkflows).toHaveBeenCalledWith(undefined, undefined);
    });

    it('should fetch workflows with isTemplate filter', async () => {
      const mockWorkflows = [{ id: '1', name: 'Template Workflow', isTemplate: true }];

      vi.mocked(workflowsRepository.findWorkflows).mockResolvedValue(mockWorkflows as any);

      const result = await workflowsService.getWorkflows(undefined, true);

      expect(result).toEqual(mockWorkflows);
      expect(workflowsRepository.findWorkflows).toHaveBeenCalledWith(undefined, true);
    });
  });

  describe('getWorkflowById', () => {
    it('should fetch workflow with blocks and connections', async () => {
      const mockWorkflow = { id: '1', name: 'Test Workflow' };
      const mockBlocks = [
        { id: 'block1', workflowId: '1', type: 'trigger' },
        { id: 'block2', workflowId: '1', type: 'action' },
      ];
      const mockConnections = [
        { id: 'conn1', workflowId: '1', sourceBlockId: 'block1', targetBlockId: 'block2' },
      ];

      vi.mocked(workflowsRepository.findWorkflowById).mockResolvedValue(mockWorkflow as any);
      vi.mocked(workflowsRepository.findWorkflowBlocks).mockResolvedValue(mockBlocks as any);
      vi.mocked(workflowsRepository.findWorkflowConnections).mockResolvedValue(mockConnections as any);

      const result = await workflowsService.getWorkflowById('1');

      expect(result).toEqual({
        workflow: mockWorkflow,
        blocks: mockBlocks,
        connections: mockConnections,
      });
    });

    it('should throw NotFoundError when workflow does not exist', async () => {
      vi.mocked(workflowsRepository.findWorkflowById).mockResolvedValue(null);

      await expect(workflowsService.getWorkflowById('nonexistent'))
        .rejects.toThrow(NotFoundError);
    });
  });

  describe('createWorkflow', () => {
    it('should create a workflow with valid data', async () => {
      const workflowData = {
        name: 'New Workflow',
        description: 'Test workflow',
        ownerId: 'user123',
        status: 'draft' as any,
      };
      const createdWorkflow = { ...workflowData, id: 'new-id' };

      vi.mocked(workflowsRepository.insertWorkflow).mockResolvedValue(createdWorkflow as any);

      const result = await workflowsService.createWorkflow(workflowData);

      expect(result).toEqual(createdWorkflow);
      expect(workflowsRepository.insertWorkflow).toHaveBeenCalledWith(workflowData);
    });

    it('should throw ValidationError when name is missing', async () => {
      const workflowData = {
        name: '',
        ownerId: 'user123',
      };

      await expect(workflowsService.createWorkflow(workflowData as any))
        .rejects.toThrow(ValidationError);
      await expect(workflowsService.createWorkflow(workflowData as any))
        .rejects.toThrow('Workflow name is required');
    });
  });

  describe('cloneWorkflow - Complex Cloning Logic', () => {
    it('should clone a workflow with all blocks and connections', async () => {
      const originalWorkflow = {
        id: 'original-id',
        name: 'Original Workflow',
        description: 'Original description',
        ownerId: 'user123',
        status: 'active',
        isTemplate: true,
      };

      const originalBlocks = [
        { id: 'block1', workflowId: 'original-id', type: 'trigger', displayName: 'Start' },
        { id: 'block2', workflowId: 'original-id', type: 'action', displayName: 'Send Email' },
        { id: 'block3', workflowId: 'original-id', type: 'action', displayName: 'Create Task' },
      ];

      const originalConnections = [
        {
          id: 'conn1',
          workflowId: 'original-id',
          sourceBlockId: 'block1',
          targetBlockId: 'block2',
        },
        {
          id: 'conn2',
          workflowId: 'original-id',
          sourceBlockId: 'block2',
          targetBlockId: 'block3',
        },
      ];

      const newWorkflow = {
        id: 'cloned-id',
        name: 'Original Workflow (Copy)',
        description: 'Original description',
        ownerId: 'user123',
        status: 'draft',
        isTemplate: false,
      };

      const newBlocks = [
        { id: 'new-block1', workflowId: 'cloned-id', type: 'trigger' },
        { id: 'new-block2', workflowId: 'cloned-id', type: 'action' },
        { id: 'new-block3', workflowId: 'cloned-id', type: 'action' },
      ];

      // Setup mocks
      vi.mocked(workflowsRepository.findWorkflowById).mockResolvedValue(originalWorkflow as any);
      vi.mocked(workflowsRepository.findWorkflowBlocks).mockResolvedValue(originalBlocks as any);
      vi.mocked(workflowsRepository.findWorkflowConnections).mockResolvedValue(originalConnections as any);
      vi.mocked(workflowsRepository.insertWorkflow).mockResolvedValue(newWorkflow as any);

      // Mock block insertions
      let blockCallCount = 0;
      vi.mocked(workflowsRepository.insertWorkflowBlock).mockImplementation(async () => {
        return newBlocks[blockCallCount++] as any;
      });

      // Mock connection insertions
      vi.mocked(workflowsRepository.insertWorkflowConnection).mockResolvedValue({} as any);

      const result = await workflowsService.cloneWorkflow('original-id');

      // Verify workflow was cloned with correct name and defaults
      expect(workflowsRepository.insertWorkflow).toHaveBeenCalledWith({
        name: 'Original Workflow (Copy)',
        description: 'Original description',
        ownerId: 'user123',
        status: 'draft',
        isTemplate: false,
        tags: originalWorkflow.tags,
        templateCategory: originalWorkflow.templateCategory,
      });

      // Verify all blocks were cloned
      expect(workflowsRepository.insertWorkflowBlock).toHaveBeenCalledTimes(3);

      // Verify connections were cloned with new block IDs
      expect(workflowsRepository.insertWorkflowConnection).toHaveBeenCalledTimes(2);

      // Check that connections use new block IDs
      const connectionCalls = vi.mocked(workflowsRepository.insertWorkflowConnection).mock.calls;
      expect(connectionCalls[0][0].workflowId).toBe('cloned-id');
      expect(connectionCalls[0][0].sourceBlockId).toBe('new-block1');
      expect(connectionCalls[0][0].targetBlockId).toBe('new-block2');

      expect(result).toEqual(newWorkflow);
    });

    it('should throw NotFoundError when original workflow does not exist', async () => {
      vi.mocked(workflowsRepository.findWorkflowById).mockResolvedValue(null);

      await expect(workflowsService.cloneWorkflow('nonexistent'))
        .rejects.toThrow(NotFoundError);
    });

    it('should use custom ownerId when provided', async () => {
      const originalWorkflow = {
        id: 'original-id',
        name: 'Original Workflow',
        ownerId: 'user123',
      };

      const newWorkflow = {
        id: 'cloned-id',
        name: 'Original Workflow (Copy)',
        ownerId: 'user456',
      };

      vi.mocked(workflowsRepository.findWorkflowById).mockResolvedValue(originalWorkflow as any);
      vi.mocked(workflowsRepository.findWorkflowBlocks).mockResolvedValue([]);
      vi.mocked(workflowsRepository.findWorkflowConnections).mockResolvedValue([]);
      vi.mocked(workflowsRepository.insertWorkflow).mockResolvedValue(newWorkflow as any);

      await workflowsService.cloneWorkflow('original-id', 'user456');

      expect(workflowsRepository.insertWorkflow).toHaveBeenCalledWith(
        expect.objectContaining({
          ownerId: 'user456',
        })
      );
    });
  });

  describe('updateWorkflowBlockPositions', () => {
    it('should update multiple block positions', async () => {
      const positions = [
        { id: 'block1', positionX: 100, positionY: 200 },
        { id: 'block2', positionX: 300, positionY: 400 },
      ];

      vi.mocked(workflowsRepository.updateWorkflowBlockById).mockResolvedValue({} as any);

      await workflowsService.updateWorkflowBlockPositions(positions);

      expect(workflowsRepository.updateWorkflowBlockById).toHaveBeenCalledTimes(2);
      expect(workflowsRepository.updateWorkflowBlockById).toHaveBeenCalledWith('block1', {
        positionX: '100',
        positionY: '200',
      });
      expect(workflowsRepository.updateWorkflowBlockById).toHaveBeenCalledWith('block2', {
        positionX: '300',
        positionY: '400',
      });
    });
  });

  describe('createWorkflowBlock', () => {
    it('should create a workflow block with valid data', async () => {
      const blockData = {
        workflowId: 'workflow123',
        type: 'action' as any,
        displayName: 'Send Email',
      };
      const createdBlock = { ...blockData, id: 'new-block-id' };

      vi.mocked(workflowsRepository.insertWorkflowBlock).mockResolvedValue(createdBlock as any);

      const result = await workflowsService.createWorkflowBlock(blockData);

      expect(result).toEqual(createdBlock);
      expect(workflowsRepository.insertWorkflowBlock).toHaveBeenCalledWith(blockData);
    });

    it('should throw ValidationError when workflowId is missing', async () => {
      const blockData = {
        type: 'action' as any,
        displayName: 'Send Email',
      };

      await expect(workflowsService.createWorkflowBlock(blockData as any))
        .rejects.toThrow(ValidationError);
      await expect(workflowsService.createWorkflowBlock(blockData as any))
        .rejects.toThrow('Workflow ID is required');
    });

    it('should throw ValidationError when type is missing', async () => {
      const blockData = {
        workflowId: 'workflow123',
        displayName: 'Send Email',
      };

      await expect(workflowsService.createWorkflowBlock(blockData as any))
        .rejects.toThrow(ValidationError);
      await expect(workflowsService.createWorkflowBlock(blockData as any))
        .rejects.toThrow('Block type is required');
    });
  });

  describe('createWorkflowConnection', () => {
    it('should create a workflow connection with valid data', async () => {
      const connectionData = {
        workflowId: 'workflow123',
        sourceBlockId: 'block1',
        targetBlockId: 'block2',
      };
      const createdConnection = { ...connectionData, id: 'new-conn-id' };

      vi.mocked(workflowsRepository.insertWorkflowConnection).mockResolvedValue(createdConnection as any);

      const result = await workflowsService.createWorkflowConnection(connectionData);

      expect(result).toEqual(createdConnection);
      expect(workflowsRepository.insertWorkflowConnection).toHaveBeenCalledWith(connectionData);
    });

    it('should throw ValidationError when workflowId is missing', async () => {
      const connectionData = {
        sourceBlockId: 'block1',
        targetBlockId: 'block2',
      };

      await expect(workflowsService.createWorkflowConnection(connectionData as any))
        .rejects.toThrow(ValidationError);
      await expect(workflowsService.createWorkflowConnection(connectionData as any))
        .rejects.toThrow('Workflow ID is required');
    });

    it('should throw ValidationError when source or target block ID is missing', async () => {
      const connectionData = {
        workflowId: 'workflow123',
        sourceBlockId: 'block1',
      };

      await expect(workflowsService.createWorkflowConnection(connectionData as any))
        .rejects.toThrow(ValidationError);
      await expect(workflowsService.createWorkflowConnection(connectionData as any))
        .rejects.toThrow('Source and target block IDs are required');
    });
  });
});
