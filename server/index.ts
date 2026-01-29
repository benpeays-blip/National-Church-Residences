import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import { initializeSentry, setupSentryErrorHandler } from "./config/sentry";
import { setupSecurity } from "./middleware/security";
import { apiLimiter } from "./middleware/rateLimiter";
import { setupPeriodicMemoryMonitoring } from "./utils/performance";

const app = express();

// Initialize Sentry (must be first)
initializeSentry(app);

// Setup security headers and request limits
setupSecurity(app);

// Apply rate limiting to all API routes
app.use('/api', apiLimiter);

declare module 'http' {
  interface IncomingMessage {
    rawBody: unknown
  }
}

// Preserve rawBody for webhook verification
app.use((req, _res, next) => {
  if (req.body) {
    req.rawBody = req.body;
  }
  next();
});

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  // Register health check routes (before other routes for quick response)
  const { healthRouter } = await import('./routes/health.routes');
  app.use('/health', healthRouter);

  const server = await registerRoutes(app);

  // Run database migrations on startup (production only)
  if (app.get("env") === "production") {
    console.log('Running database migrations...');
    const { execSync } = await import('child_process');
    try {
      execSync('npm run db:push', { stdio: 'inherit' });
      console.log('✅ Database migrations completed');
    } catch (err) {
      console.error('⚠️  Database migration failed:', err);
      // Don't crash the app - tables might already exist
    }
  }

  // Seed workflow templates on startup
  const { storage } = await import('./storage');
  await storage.seedWorkflowTemplates().catch(err => {
    console.error('Error seeding workflow templates:', err);
  });

  // Setup Sentry error handler (must be before other error handlers)
  setupSentryErrorHandler(app);

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
    throw err;
  });

  // importantly only setup vite in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  // ALWAYS serve the app on the port specified in the environment variable PORT
  // Other ports are firewalled. Default to 5000 if not specified.
  // this serves both the API and the client.
  // It is the only port that is not firewalled.
  const port = parseInt(process.env.PORT || '5000', 10);
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true,
  }, () => {
    log(`serving on port ${port}`);

    // Start periodic memory monitoring in production
    setupPeriodicMemoryMonitoring();
  });
})();
