import { Router } from 'express';
import * as tasksController from '../controllers/tasks.controller';
import { isAuthenticated } from '../middleware/auth';

/**
 * Tasks Routes
 *
 * Defines all routes for task management operations:
 * - GET    /api/tasks         - Get all tasks (with optional ownerId and completed filters)
 * - GET    /api/tasks/:id     - Get a single task
 * - POST   /api/tasks         - Create a new task (auth required)
 * - PATCH  /api/tasks/:id     - Update a task (auth required)
 * - DELETE /api/tasks/:id     - Delete a task (auth required)
 */

export const tasksRouter = Router();

tasksRouter.get('/', tasksController.getTasks);
tasksRouter.get('/:id', tasksController.getTaskById);
tasksRouter.post('/', isAuthenticated, tasksController.createTask);
tasksRouter.patch('/:id', isAuthenticated, tasksController.updateTask);
tasksRouter.delete('/:id', isAuthenticated, tasksController.deleteTask);
