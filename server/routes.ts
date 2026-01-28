import type { Express } from "express";
import { createServer, type Server } from "http";
import { setupAuth } from "./replitAuth";

/**
 * Register Routes
 *
 * Registers all application routes using the modern modular architecture.
 * All routes are organized into domain-specific modules in the routes/ directory.
 *
 * Architecture:
 * - Routes → Controllers → Services → Repositories
 * - Each domain has its own router, controller, service, and repository
 * - Centralized error handling via asyncHandler wrapper
 * - Request logging via requestLogger middleware
 * - Validation via Zod schemas in controllers
 */
export async function registerRoutes(app: Express): Promise<Server> {
  // Setup authentication (Replit Auth)
  await setupAuth(app);

  // Import modern route modules
  const { calendarRouter } = await import('./routes/calendar.routes');
  const { personsRouter, donorsRouter } = await import('./routes/persons.routes');
  const { giftsRouter } = await import('./routes/gifts.routes');
  const { opportunitiesRouter } = await import('./routes/opportunities.routes');
  const { grantsRouter } = await import('./routes/grants.routes');
  const { campaignsRouter } = await import('./routes/campaigns.routes');
  const { tasksRouter } = await import('./routes/tasks.routes');
  const { interactionsRouter } = await import('./routes/interactions.routes');
  const { fundraisingEventsRouter } = await import('./routes/fundraising-events.routes');
  const { analyticsRouter } = await import('./routes/analytics.routes');
  const { contentRouter } = await import('./routes/content.routes');
  const { dataHealthRouter } = await import('./routes/data-health.routes');
  const { aiRouter } = await import('./routes/ai.routes');
  const { impactIntelligenceRouter } = await import('./routes/impact-intelligence.routes');
  const { organizationCanvasesRouter } = await import('./routes/organization-canvases.routes');
  const { meetingNotesRouter } = await import('./routes/meeting-notes.routes');
  const { workflowsRouter } = await import('./routes/workflows.routes');
  const { workflowUtilitiesRouter } = await import('./routes/workflow-utilities.routes');
  const { dashboardsRouter } = await import('./routes/dashboards.routes');
  const { requestLogger } = await import('./middleware/requestLogger');

  // Apply request logging middleware to all routes
  app.use(requestLogger);

  // Register all domain routes
  app.use('/api/calendar-events', calendarRouter);
  app.use('/api/persons', personsRouter);
  app.use('/api/donors', donorsRouter);
  app.use('/api/gifts', giftsRouter);
  app.use('/api/opportunities', opportunitiesRouter);
  app.use('/api/grants', grantsRouter);
  app.use('/api/campaigns', campaignsRouter);
  app.use('/api/tasks', tasksRouter);
  app.use('/api/interactions', interactionsRouter);
  app.use('/api/fundraising-events', fundraisingEventsRouter);
  app.use('/api/analytics', analyticsRouter);
  app.use('/api/content', contentRouter);
  app.use('/api/data-health', dataHealthRouter);
  app.use('/api/ai', aiRouter);
  app.use('/api/impact-intelligence', impactIntelligenceRouter);
  app.use('/api/organization-canvases', organizationCanvasesRouter);
  app.use('/api/meeting-notes', meetingNotesRouter);
  app.use('/api/workflows', workflowsRouter);
  app.use('/api/workflow', workflowUtilitiesRouter);
  app.use('/api/dashboard', dashboardsRouter);

  console.log('✅ Modern modular routes registered: 19 domains, 78+ endpoints');

  return createServer(app);
}
