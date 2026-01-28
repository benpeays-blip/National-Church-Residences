/**
 * Custom Error Classes for FundRazor API
 *
 * These error classes extend the base Error class and include HTTP status codes
 * for proper error handling in Express middleware.
 */

/**
 * Base application error class
 * All custom errors should extend this class
 */
export class AppError extends Error {
  public readonly statusCode: number;
  public readonly isOperational: boolean;

  constructor(
    statusCode: number,
    message: string,
    isOperational = true
  ) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    Object.setPrototypeOf(this, AppError.prototype);
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * 400 Bad Request - Validation errors
 */
export class ValidationError extends AppError {
  public readonly errors?: any;

  constructor(message: string, errors?: any) {
    super(400, message);
    this.errors = errors;
    Object.setPrototypeOf(this, ValidationError.prototype);
  }
}

/**
 * 404 Not Found - Resource not found
 */
export class NotFoundError extends AppError {
  constructor(resource: string) {
    super(404, `${resource} not found`);
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
}

/**
 * 401 Unauthorized - Authentication required
 */
export class UnauthorizedError extends AppError {
  constructor(message = 'Unauthorized - Authentication required') {
    super(401, message);
    Object.setPrototypeOf(this, UnauthorizedError.prototype);
  }
}

/**
 * 403 Forbidden - Insufficient permissions
 */
export class ForbiddenError extends AppError {
  constructor(message = 'Forbidden - Insufficient permissions') {
    super(403, message);
    Object.setPrototypeOf(this, ForbiddenError.prototype);
  }
}

/**
 * 409 Conflict - Resource conflict (e.g., duplicate entry)
 */
export class ConflictError extends AppError {
  constructor(message: string) {
    super(409, message);
    Object.setPrototypeOf(this, ConflictError.prototype);
  }
}

/**
 * 500 Internal Server Error - Unexpected server errors
 */
export class InternalServerError extends AppError {
  constructor(message = 'Internal server error') {
    super(500, message, false); // Not operational
    Object.setPrototypeOf(this, InternalServerError.prototype);
  }
}

/**
 * 503 Service Unavailable - External service is down
 */
export class ServiceUnavailableError extends AppError {
  constructor(service: string) {
    super(503, `${service} is currently unavailable`);
    Object.setPrototypeOf(this, ServiceUnavailableError.prototype);
  }
}
