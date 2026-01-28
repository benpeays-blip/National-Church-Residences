import helmet from 'helmet';
import { Express, json, urlencoded } from 'express';
import { logger } from '../config/logging';

/**
 * Security Middleware
 *
 * Configures security headers and request size limits.
 */

/**
 * Setup Helmet security headers
 */
export function setupSecurityHeaders(app: Express): void {
  app.use(
    helmet({
      // Content Security Policy
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          styleSrc: ["'self'", "'unsafe-inline'"], // Allow inline styles for UI libraries
          scriptSrc: ["'self'", "'unsafe-inline'"], // Allow inline scripts for Vite
          imgSrc: ["'self'", 'data:', 'https:'],
          connectSrc: ["'self'"],
          fontSrc: ["'self'", 'data:'],
          objectSrc: ["'none'"],
          mediaSrc: ["'self'"],
          frameSrc: ["'none'"],
        },
      },
      // X-Content-Type-Options: nosniff
      crossOriginEmbedderPolicy: false, // Disable for development
      // X-DNS-Prefetch-Control: off
      // X-Download-Options: noopen
      // X-Frame-Options: SAMEORIGIN
      // X-Permitted-Cross-Domain-Policies: none
      // Referrer-Policy: no-referrer
      // X-XSS-Protection: 0 (disabled as CSP is better)
      // Strict-Transport-Security (HSTS)
      hsts: {
        maxAge: 31536000, // 1 year
        includeSubDomains: true,
        preload: true,
      },
    })
  );

  logger.info('Security headers configured');
}

/**
 * Setup request size limits
 * Prevents large payload attacks
 */
export function setupRequestLimits(app: Express): void {
  // Limit JSON request body size to 10MB
  app.use(
    json({
      limit: '10mb',
      verify: (req, _res, buf, _encoding) => {
        // Log large requests
        if (buf.length > 1024 * 1024) {
          // > 1MB
          logger.warn('Large JSON request received', {
            size: buf.length,
            url: req.url,
            method: req.method,
          });
        }
      },
    })
  );

  // Limit URL-encoded request body size to 10MB
  app.use(
    urlencoded({
      extended: true,
      limit: '10mb',
      verify: (req, _res, buf, _encoding) => {
        // Log large requests
        if (buf.length > 1024 * 1024) {
          // > 1MB
          logger.warn('Large URL-encoded request received', {
            size: buf.length,
            url: req.url,
            method: req.method,
          });
        }
      },
    })
  );

  logger.info('Request size limits configured (10MB)');
}

/**
 * Setup all security middleware
 */
export function setupSecurity(app: Express): void {
  setupSecurityHeaders(app);
  setupRequestLimits(app);
}
