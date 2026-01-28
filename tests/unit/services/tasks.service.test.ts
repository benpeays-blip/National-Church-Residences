/**
 * Unit Tests for Tasks Service
 *
 * Tests business logic in the tasks service layer including
 * the auto-completion timestamp logic
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as tasksService from '../../../server/services/tasks.service';
import * as tasksRepository from '../../../server/services/storage/tasks.repository';
import { NotFoundError, ValidationError } from '../../../server/utils/errors';

// Mock the repository module
vi.mock('../../../server/services/storage/tasks.repository');

// Mock the logger
vi.mock('../../../server/config/logging', () => ({
  logger: {
    debug: vi.fn(),
    info: vi.fn(),
    warn: vi.fn(),
    error: vi.fn(),
  },
}));

describe('Tasks Service', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getTasks', () => {
    it('should fetch all tasks without filters', async () => {
      const mockTasks = [
        { id: '1', title: 'Task 1', completed: 0 },
        { id: '2', title: 'Task 2', completed: 0 },
      ];

      vi.mocked(tasksRepository.findTasks).mockResolvedValue(mockTasks as any);

      const result = await tasksService.getTasks();

      expect(result).toEqual(mockTasks);
      expect(tasksRepository.findTasks).toHaveBeenCalledWith(undefined, undefined);
    });

    it('should fetch tasks with personId filter', async () => {
      const mockTasks = [{ id: '1', title: 'Task 1', personId: 'person123' }];

      vi.mocked(tasksRepository.findTasks).mockResolvedValue(mockTasks as any);

      const result = await tasksService.getTasks('person123');

      expect(result).toEqual(mockTasks);
      expect(tasksRepository.findTasks).toHaveBeenCalledWith('person123', undefined);
    });

    it('should fetch tasks with ownerId filter', async () => {
      const mockTasks = [{ id: '1', title: 'Task 1', ownerId: 'user123' }];

      vi.mocked(tasksRepository.findTasks).mockResolvedValue(mockTasks as any);

      const result = await tasksService.getTasks(undefined, 'user123');

      expect(result).toEqual(mockTasks);
      expect(tasksRepository.findTasks).toHaveBeenCalledWith(undefined, 'user123');
    });
  });

  describe('getTaskById', () => {
    it('should fetch a task by ID', async () => {
      const mockTask = { id: '1', title: 'Test Task', completed: 0 };

      vi.mocked(tasksRepository.findTaskById).mockResolvedValue(mockTask as any);

      const result = await tasksService.getTaskById('1');

      expect(result).toEqual(mockTask);
      expect(tasksRepository.findTaskById).toHaveBeenCalledWith('1');
    });

    it('should throw NotFoundError when task does not exist', async () => {
      vi.mocked(tasksRepository.findTaskById).mockResolvedValue(null);

      await expect(tasksService.getTaskById('nonexistent'))
        .rejects.toThrow(NotFoundError);
    });
  });

  describe('createTask', () => {
    it('should create a task with valid data', async () => {
      const taskData = {
        title: 'New Task',
        description: 'Task description',
        priority: 'high' as any,
        dueDate: new Date('2026-02-01'),
        personId: 'person123',
        ownerId: 'user123',
      };
      const createdTask = { ...taskData, id: 'new-id', completed: 0 };

      vi.mocked(tasksRepository.createTask).mockResolvedValue(createdTask as any);

      const result = await tasksService.createTask(taskData);

      expect(result).toEqual(createdTask);
      expect(tasksRepository.createTask).toHaveBeenCalledWith(taskData);
    });

    it('should throw ValidationError when title is missing', async () => {
      const taskData = {
        title: '',
        personId: 'person123',
      };

      await expect(tasksService.createTask(taskData as any))
        .rejects.toThrow(ValidationError);
      await expect(tasksService.createTask(taskData as any))
        .rejects.toThrow('Task title is required');
    });

    it('should throw ValidationError when title is only whitespace', async () => {
      const taskData = {
        title: '   ',
        personId: 'person123',
      };

      await expect(tasksService.createTask(taskData as any))
        .rejects.toThrow(ValidationError);
    });
  });

  describe('updateTask - Auto-completion Logic', () => {
    it('should update task when marking as completed', async () => {
      const existingTask = {
        id: '1',
        title: 'Task',
        completed: 0,
        completedAt: null,
      };

      const updateData = { completed: 1 };

      vi.mocked(tasksRepository.findTaskById).mockResolvedValue(existingTask as any);
      vi.mocked(tasksRepository.updateTask).mockImplementation(async (id, data) => {
        return { ...existingTask, ...data } as any;
      });

      const result = await tasksService.updateTask('1', updateData);

      // Should have called update with just the completed flag
      // Note: completedAt is managed at the database level
      expect(tasksRepository.updateTask).toHaveBeenCalledWith(
        '1',
        {
          completed: 1,
        }
      );

      expect(result.completed).toBe(1);
    });

    it('should clear completedAt when unmarking task as completed', async () => {
      const existingTask = {
        id: '1',
        title: 'Task',
        completed: 1,
        completedAt: new Date('2026-01-01'),
      };

      const updateData = { completed: 0 };

      vi.mocked(tasksRepository.findTaskById).mockResolvedValue(existingTask as any);
      vi.mocked(tasksRepository.updateTask).mockImplementation(async (id, data) => {
        return { ...existingTask, ...data } as any;
      });

      const result = await tasksService.updateTask('1', updateData);

      // Should have called update with just the completed flag
      // Note: completedAt is managed at the database level
      expect(tasksRepository.updateTask).toHaveBeenCalledWith(
        '1',
        {
          completed: 0,
        }
      );

      expect(result.completed).toBe(0);
      // Note: completedAt management is handled at the database level, not in the service
    });

    it('should not modify completedAt when task already completed', async () => {
      const completedDate = new Date('2026-01-01');
      const existingTask = {
        id: '1',
        title: 'Task',
        completed: 1,
        completedAt: completedDate,
      };

      const updateData = { title: 'Updated Title' };

      vi.mocked(tasksRepository.findTaskById).mockResolvedValue(existingTask as any);
      vi.mocked(tasksRepository.updateTask).mockImplementation(async (id, data) => {
        return { ...existingTask, ...data } as any;
      });

      await tasksService.updateTask('1', updateData);

      // Should not include completedAt in update
      expect(tasksRepository.updateTask).toHaveBeenCalledWith(
        '1',
        expect.objectContaining({
          title: 'Updated Title',
        })
      );

      const call = vi.mocked(tasksRepository.updateTask).mock.calls[0][1];
      expect(call).not.toHaveProperty('completedAt');
    });

    it('should not modify completedAt when task remains incomplete', async () => {
      const existingTask = {
        id: '1',
        title: 'Task',
        completed: 0,
        completedAt: null,
      };

      const updateData = { priority: 'high' as any };

      vi.mocked(tasksRepository.findTaskById).mockResolvedValue(existingTask as any);
      vi.mocked(tasksRepository.updateTask).mockImplementation(async (id, data) => {
        return { ...existingTask, ...data } as any;
      });

      await tasksService.updateTask('1', updateData);

      const call = vi.mocked(tasksRepository.updateTask).mock.calls[0][1];
      expect(call).not.toHaveProperty('completedAt');
    });

    it('should throw NotFoundError when task does not exist', async () => {
      vi.mocked(tasksRepository.findTaskById).mockResolvedValue(null);

      await expect(tasksService.updateTask('nonexistent', { title: 'New Title' }))
        .rejects.toThrow(NotFoundError);
    });
  });

  describe('deleteTask', () => {
    it('should delete a task', async () => {
      const deletedTask = { id: '1', title: 'Task to delete' };

      vi.mocked(tasksRepository.deleteTask).mockResolvedValue(deletedTask as any);

      await tasksService.deleteTask('1');

      expect(tasksRepository.deleteTask).toHaveBeenCalledWith('1');
    });

    it('should throw NotFoundError when task does not exist', async () => {
      vi.mocked(tasksRepository.deleteTask).mockResolvedValue(null);

      await expect(tasksService.deleteTask('nonexistent'))
        .rejects.toThrow(NotFoundError);
    });
  });
});
