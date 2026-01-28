import winston from 'winston';
import { env } from './environment';

/**
 * Winston Logger Configuration
 *
 * Provides structured logging with different transports based on environment:
 * - Development: Colorized console output
 * - Production: JSON formatted logs to console and files
 * - Test: Minimal logging
 */

// Define log format
const logFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.errors({ stack: true }),
  winston.format.splat(),
  winston.format.json()
);

// Development format (human-readable with colors)
const devFormat = winston.format.combine(
  winston.format.colorize(),
  winston.format.timestamp({ format: 'HH:mm:ss' }),
  winston.format.printf(({ level, message, timestamp, ...meta }) => {
    const metaStr = Object.keys(meta).length ? JSON.stringify(meta, null, 2) : '';
    return `${timestamp} [${level}]: ${message} ${metaStr}`;
  })
);

// Create transports based on environment
const transports: winston.transport[] = [];

if (env.NODE_ENV === 'development') {
  // Development: Colorized console
  transports.push(
    new winston.transports.Console({
      format: devFormat,
    })
  );
} else if (env.NODE_ENV === 'test') {
  // Test: Silent or minimal logging
  transports.push(
    new winston.transports.Console({
      level: 'error',
      format: winston.format.simple(),
      silent: process.env.SILENT_LOGS === 'true',
    })
  );
} else {
  // Production: JSON logs to console (for cloud logging services)
  transports.push(
    new winston.transports.Console({
      format: logFormat,
    })
  );

  // Production: Also write to files if LOG_FILE is set
  if (process.env.LOG_FILE) {
    const path = require('path');
    const fs = require('fs');

    // Ensure logs directory exists
    const logDir = path.dirname(process.env.LOG_FILE);
    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir, { recursive: true });
    }

    transports.push(
      new winston.transports.File({
        filename: process.env.LOG_FILE.replace('.log', '-error.log'),
        level: 'error',
        format: logFormat,
        maxsize: 5242880, // 5MB
        maxFiles: 5,
      }),
      new winston.transports.File({
        filename: process.env.LOG_FILE,
        format: logFormat,
        maxsize: 5242880, // 5MB
        maxFiles: 5,
      })
    );
  }
}

// Create the logger instance
export const logger = winston.createLogger({
  level: env.LOG_LEVEL,
  format: logFormat,
  defaultMeta: {
    service: 'fundrazor-api',
    environment: env.NODE_ENV,
  },
  transports,
  // Don't exit on uncaught exceptions (let error handler deal with it)
  exitOnError: false,
});

/**
 * Stream for Morgan HTTP logger integration (if needed)
 */
export const morganStream = {
  write: (message: string) => {
    logger.http(message.trim());
  },
};

// Log unhandled rejections and exceptions
if (env.NODE_ENV !== 'test') {
  process.on('unhandledRejection', (reason: any) => {
    logger.error('Unhandled Promise Rejection:', {
      reason: reason?.message || reason,
      stack: reason?.stack,
    });
  });

  process.on('uncaughtException', (error: Error) => {
    logger.error('Uncaught Exception:', {
      error: error.message,
      stack: error.stack,
    });
    // Give logger time to write, then exit
    setTimeout(() => process.exit(1), 1000);
  });
}

// Log startup
if (env.NODE_ENV !== 'test') {
  logger.info('Logger initialized', {
    level: env.LOG_LEVEL,
    environment: env.NODE_ENV,
  });
}
