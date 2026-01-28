/**
 * Integration Tests for Tasks Routes
 *
 * Tests the full request/response cycle for task management endpoints
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import request from 'supertest';
import express from 'express';
import { tasksRouter } from '../../../server/routes/tasks.routes';
import * as tasksRepo from '../../../server/services/storage/tasks.repository';
import { errorHandler, notFoundHandler } from '../../../server/middleware/errorHandler';

// Mock the repository
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

// Mock authentication middleware
vi.mock('../../../server/middleware/auth', () => ({
  isAuthenticated: (req: any, res: any, next: any) => next(),
}));

describe('Tasks Routes Integration Tests', () => {
  let app: express.Express;

  beforeEach(() => {
    vi.clearAllMocks();

    // Create a fresh Express app for each test
    app = express();
    app.use(express.json());
    app.use('/api/tasks', tasksRouter);
    app.use(notFoundHandler);
    app.use(errorHandler);
  });

  describe('GET /api/tasks', () => {
    it('should return all tasks without filters', async () => {
      const mockTasks = [
        {
          id: '1',
          title: 'Follow up with donor',
          ownerId: 'user1',
          priority: 'high',
          completed: 0,
          dueDate: new Date('2026-01-20'),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: '2',
          title: 'Prepare grant proposal',
          ownerId: 'user2',
          priority: 'urgent',
          completed: 0,
          dueDate: new Date('2026-01-15'),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      vi.mocked(tasksRepo.findTasks).mockResolvedValue(mockTasks as any);

      const response = await request(app)
        .get('/api/tasks')
        .expect(200);

      expect(response.body).toHaveLength(2);
      expect(response.body[0].title).toBe('Follow up with donor');
      expect(tasksRepo.findTasks).toHaveBeenCalledWith(undefined, undefined);
    });

    it('should return filtered tasks by ownerId', async () => {
      const mockTasks = [
        {
          id: '1',
          title: 'My Task',
          ownerId: 'user1',
          priority: 'medium',
          completed: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      vi.mocked(tasksRepo.findTasks).mockResolvedValue(mockTasks as any);

      const response = await request(app)
        .get('/api/tasks?ownerId=user1')
        .expect(200);

      expect(response.body).toHaveLength(1);
      expect(response.body[0].ownerId).toBe('user1');
      expect(tasksRepo.findTasks).toHaveBeenCalledWith('user1', undefined);
    });

    it('should return filtered tasks by completed status (true)', async () => {
      const mockTasks = [
        {
          id: '1',
          title: 'Completed Task',
          ownerId: 'user1',
          priority: 'low',
          completed: 1,
          completedAt: new Date('2026-01-10'),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      vi.mocked(tasksRepo.findTasks).mockResolvedValue(mockTasks as any);

      const response = await request(app)
        .get('/api/tasks?completed=true')
        .expect(200);

      expect(response.body).toHaveLength(1);
      expect(response.body[0].completed).toBe(1);
      expect(tasksRepo.findTasks).toHaveBeenCalledWith(undefined, true);
    });

    it('should return filtered tasks by completed status (false)', async () => {
      const mockTasks = [
        {
          id: '1',
          title: 'Pending Task',
          ownerId: 'user1',
          priority: 'high',
          completed: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      vi.mocked(tasksRepo.findTasks).mockResolvedValue(mockTasks as any);

      const response = await request(app)
        .get('/api/tasks?completed=false')
        .expect(200);

      expect(response.body).toHaveLength(1);
      expect(response.body[0].completed).toBe(0);
      expect(tasksRepo.findTasks).toHaveBeenCalledWith(undefined, false);
    });

    it('should return filtered tasks by both ownerId and completed', async () => {
      const mockTasks = [
        {
          id: '1',
          title: 'My Completed Task',
          ownerId: 'user1',
          priority: 'medium',
          completed: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      vi.mocked(tasksRepo.findTasks).mockResolvedValue(mockTasks as any);

      const response = await request(app)
        .get('/api/tasks?ownerId=user1&completed=true')
        .expect(200);

      expect(response.body).toHaveLength(1);
      expect(response.body[0].ownerId).toBe('user1');
      expect(response.body[0].completed).toBe(1);
      expect(tasksRepo.findTasks).toHaveBeenCalledWith('user1', true);
    });
  });

  describe('GET /api/tasks/:id', () => {
    it('should return a single task', async () => {
      const mockTask = {
        id: '1',
        title: 'Review annual report',
        ownerId: 'user1',
        personId: 'p1',
        description: 'Review and approve the annual financial report',
        reason: 'Annual compliance',
        priority: 'high',
        completed: 0,
        dueDate: new Date('2026-01-31'),
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      vi.mocked(tasksRepo.findTaskById).mockResolvedValue(mockTask as any);

      const response = await request(app)
        .get('/api/tasks/1')
        .expect(200);

      expect(response.body.id).toBe('1');
      expect(response.body.title).toBe('Review annual report');
      expect(response.body.priority).toBe('high');
      expect(tasksRepo.findTaskById).toHaveBeenCalledWith('1');
    });

    it('should return 404 when task not found', async () => {
      vi.mocked(tasksRepo.findTaskById).mockResolvedValue(null);

      const response = await request(app)
        .get('/api/tasks/nonexistent')
        .expect(404);

      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toContain('not found');
    });
  });

  describe('POST /api/tasks', () => {
    it('should create a new task', async () => {
      const newTaskData = {
        title: 'Call major donor',
        ownerId: 'user1',
        personId: 'p1',
        description: 'Discuss upcoming capital campaign',
        priority: 'urgent',
        dueDate: '2026-01-18',
      };

      const createdTask = {
        ...newTaskData,
        id: 'new-id',
        completed: 0,
        dueDate: new Date('2026-01-18'),
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      vi.mocked(tasksRepo.createTask).mockResolvedValue(createdTask as any);

      const response = await request(app)
        .post('/api/tasks')
        .send(newTaskData)
        .expect(201);

      expect(response.body.id).toBe('new-id');
      expect(response.body.title).toBe('Call major donor');
      expect(response.body.priority).toBe('urgent');
      expect(tasksRepo.createTask).toHaveBeenCalled();
    });

    it('should create a task with minimum required fields', async () => {
      const newTaskData = {
        title: 'Simple task',
        ownerId: 'user1',
      };

      const createdTask = {
        ...newTaskData,
        id: 'new-id',
        priority: 'medium',
        completed: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      vi.mocked(tasksRepo.createTask).mockResolvedValue(createdTask as any);

      const response = await request(app)
        .post('/api/tasks')
        .send(newTaskData)
        .expect(201);

      expect(response.body.id).toBe('new-id');
      expect(response.body.title).toBe('Simple task');
      expect(response.body.priority).toBe('medium'); // default value
      expect(tasksRepo.createTask).toHaveBeenCalled();
    });

    it('should return 400 when title is missing', async () => {
      const invalidData = {
        ownerId: 'user1',
        priority: 'high',
        // title is missing
      };

      const response = await request(app)
        .post('/api/tasks')
        .send(invalidData)
        .expect(400);

      expect(response.body).toHaveProperty('message');
    });

    it('should return 400 when ownerId is missing', async () => {
      const invalidData = {
        title: 'Test Task',
        priority: 'high',
        // ownerId is missing
      };

      const response = await request(app)
        .post('/api/tasks')
        .send(invalidData)
        .expect(400);

      expect(response.body).toHaveProperty('message');
    });

    it('should return 400 when priority is invalid', async () => {
      const invalidData = {
        title: 'Test Task',
        ownerId: 'user1',
        priority: 'invalid_priority',
      };

      const response = await request(app)
        .post('/api/tasks')
        .send(invalidData)
        .expect(400);

      expect(response.body).toHaveProperty('message');
    });
  });

  describe('PATCH /api/tasks/:id', () => {
    it('should update an existing task', async () => {
      const updateData = {
        completed: 1,
        completedAt: '2026-01-14',
        priority: 'low',
      };

      const existingTask = {
        id: '1',
        title: 'Follow up task',
        ownerId: 'user1',
        priority: 'high',
        completed: 0,
      };

      const updatedTask = {
        id: '1',
        title: 'Follow up task',
        ownerId: 'user1',
        priority: 'low',
        completed: 1,
        completedAt: new Date('2026-01-14'),
        updatedAt: new Date(),
      };

      vi.mocked(tasksRepo.findTaskById).mockResolvedValue(existingTask as any);
      vi.mocked(tasksRepo.updateTask).mockResolvedValue(updatedTask as any);

      const response = await request(app)
        .patch('/api/tasks/1')
        .send(updateData)
        .expect(200);

      expect(response.body.completed).toBe(1);
      expect(response.body.priority).toBe('low');
      expect(tasksRepo.updateTask).toHaveBeenCalled();
    });

    it('should return 404 when updating non-existent task', async () => {
      vi.mocked(tasksRepo.updateTask).mockResolvedValue(null);

      const response = await request(app)
        .patch('/api/tasks/nonexistent')
        .send({ completed: 1 })
        .expect(404);

      expect(response.body).toHaveProperty('message');
    });

    it('should return 400 when updating with invalid priority', async () => {
      const response = await request(app)
        .patch('/api/tasks/1')
        .send({ priority: 'super_urgent' })
        .expect(400);

      expect(response.body).toHaveProperty('message');
    });

    it('should return 400 when updating with invalid completed value', async () => {
      const response = await request(app)
        .patch('/api/tasks/1')
        .send({ completed: 5 }) // Must be 0 or 1
        .expect(400);

      expect(response.body).toHaveProperty('message');
    });
  });

  describe('DELETE /api/tasks/:id', () => {
    it('should delete a task', async () => {
      const existingTask = {
        id: '1',
        title: 'Task to Delete',
        ownerId: 'user1',
        priority: 'low',
        completed: 1,
      };

      vi.mocked(tasksRepo.deleteTask).mockResolvedValue(existingTask as any);

      const response = await request(app)
        .delete('/api/tasks/1')
        .expect(200);

      expect(response.body.id).toBe('1');
      expect(tasksRepo.deleteTask).toHaveBeenCalledWith('1');
    });

    it('should return 404 when deleting non-existent task', async () => {
      vi.mocked(tasksRepo.deleteTask).mockResolvedValue(null);

      const response = await request(app)
        .delete('/api/tasks/nonexistent')
        .expect(404);

      expect(response.body).toHaveProperty('message');
    });
  });
});
