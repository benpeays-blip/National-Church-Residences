/**
 * Workflows API Client
 *
 * Typed methods for workflow automation operations
 */

import type { Workflow, InsertWorkflow, WorkflowBlock, InsertWorkflowBlock, WorkflowConnection, InsertWorkflowConnection } from '@shared/schema';
import { apiClient } from './client';

export const workflowsApi = {
  // ========== Workflows ==========

  /**
   * Get all workflows with optional filters
   */
  getAll: (filters?: { status?: string; type?: string }) => {
    return apiClient.get<Workflow[]>('/workflows', {
      params: filters,
    });
  },

  /**
   * Get a single workflow by ID with blocks and connections
   */
  getById: (id: string) => {
    return apiClient.get<Workflow>(`/workflows/${id}`);
  },

  /**
   * Create a new workflow
   */
  create: (data: InsertWorkflow) => {
    return apiClient.post<Workflow, InsertWorkflow>('/workflows', data);
  },

  /**
   * Update an existing workflow
   */
  update: (id: string, data: Partial<InsertWorkflow>) => {
    return apiClient.put<Workflow, Partial<InsertWorkflow>>(`/workflows/${id}`, data);
  },

  /**
   * Delete a workflow
   */
  delete: (id: string) => {
    return apiClient.delete<Workflow>(`/workflows/${id}`);
  },

  /**
   * Clone a workflow
   */
  clone: (id: string) => {
    return apiClient.post<Workflow>(`/workflows/${id}/clone`);
  },

  // ========== Workflow Blocks ==========

  /**
   * Get all blocks for a workflow
   */
  getBlocks: (workflowId: string) => {
    return apiClient.get<WorkflowBlock[]>(`/workflows/${workflowId}/blocks`);
  },

  /**
   * Create a new workflow block
   */
  createBlock: (workflowId: string, data: InsertWorkflowBlock) => {
    return apiClient.post<WorkflowBlock, InsertWorkflowBlock>(
      `/workflows/${workflowId}/blocks`,
      data
    );
  },

  /**
   * Update block positions (bulk update)
   */
  updateBlockPositions: (
    workflowId: string,
    positions: Array<{ id: string; positionX: number; positionY: number }>
  ) => {
    return apiClient.patch<void>(
      `/workflows/${workflowId}/blocks/positions`,
      { positions }
    );
  },

  /**
   * Update a workflow block
   */
  updateBlock: (workflowId: string, blockId: string, data: Partial<InsertWorkflowBlock>) => {
    return apiClient.put<WorkflowBlock, Partial<InsertWorkflowBlock>>(
      `/workflows/${workflowId}/blocks/${blockId}`,
      data
    );
  },

  /**
   * Delete a workflow block
   */
  deleteBlock: (workflowId: string, blockId: string) => {
    return apiClient.delete<void>(`/workflows/${workflowId}/blocks/${blockId}`);
  },

  // ========== Workflow Connections ==========

  /**
   * Get all connections for a workflow
   */
  getConnections: (workflowId: string) => {
    return apiClient.get<WorkflowConnection[]>(`/workflows/${workflowId}/connections`);
  },

  /**
   * Create a new workflow connection
   */
  createConnection: (workflowId: string, data: InsertWorkflowConnection) => {
    return apiClient.post<WorkflowConnection, InsertWorkflowConnection>(
      `/workflows/${workflowId}/connections`,
      data
    );
  },

  /**
   * Delete a workflow connection
   */
  deleteConnection: (workflowId: string, connectionId: string) => {
    return apiClient.delete<void>(`/workflows/${workflowId}/connections/${connectionId}`);
  },
};
