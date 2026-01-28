import { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import * as tasksService from '../services/tasks.service';
import { z } from 'zod';
import { ValidationError } from '../utils/errors';

/**
 * Tasks Controller
 *
 * Handles HTTP requests for task management operations.
 */

export const getTasks = asyncHandler(async (req: Request, res: Response) => {
  const ownerId = req.query.ownerId as string | undefined;
  const completed = req.query.completed === 'true' ? true : req.query.completed === 'false' ? false : undefined;

  const tasksList = await tasksService.getTasks(ownerId, completed);
  res.json(tasksList);
});

export const getTaskById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const task = await tasksService.getTaskById(id);
  res.json(task);
});

const taskInputSchema = z.object({
  personId: z.string().optional().nullable(),
  ownerId: z.string().min(1, 'Owner ID is required'),
  title: z.string().min(1, 'Task title is required').max(255),
  description: z.string().optional().nullable(),
  reason: z.string().optional().nullable(),
  priority: z.enum(['low', 'medium', 'high', 'urgent']).default('medium'),
  dueDate: z.coerce.date().optional().nullable(),
  completed: z.number().int().min(0).max(1).default(0),
  completedAt: z.coerce.date().optional().nullable(),
});

export const createTask = asyncHandler(async (req: Request, res: Response) => {
  const parsed = taskInputSchema.safeParse(req.body);
  if (!parsed.success) {
    throw new ValidationError('Invalid task data', parsed.error.errors);
  }

  const task = await tasksService.createTask(parsed.data);
  res.status(201).json(task);
});

export const updateTask = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const updateSchema = taskInputSchema.partial();
  const parsed = updateSchema.safeParse(req.body);
  if (!parsed.success) {
    throw new ValidationError('Invalid task data', parsed.error.errors);
  }

  const task = await tasksService.updateTask(id, parsed.data);
  res.json(task);
});

export const deleteTask = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const task = await tasksService.deleteTask(id);
  res.json(task);
});
