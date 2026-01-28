import { Router } from 'express';
import * as workflowUtilitiesController from '../controllers/workflow-utilities.controller';

/**
 * Workflow Utilities Routes
 *
 * Defines routes for workflow-related utility endpoints:
 * - GET /api/workflow/calendar         - Get calendar events
 * - GET /api/workflow/stewardship      - Get stewardship workflows
 * - GET /api/workflow/task-priorities  - Get task priority scores
 * - GET /api/workflow/gift-registries  - Get gift registries
 */

export const workflowUtilitiesRouter = Router();

workflowUtilitiesRouter.get(
  '/calendar',
  workflowUtilitiesController.getCalendarEvents
);
workflowUtilitiesRouter.get(
  '/stewardship',
  workflowUtilitiesController.getStewardshipWorkflows
);
workflowUtilitiesRouter.get(
  '/task-priorities',
  workflowUtilitiesController.getTaskPriorities
);
workflowUtilitiesRouter.get(
  '/gift-registries',
  workflowUtilitiesController.getGiftRegistries
);
