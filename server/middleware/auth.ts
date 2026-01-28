/**
 * Authentication Middleware
 *
 * Re-exports authentication middleware from replitAuth.ts and provides
 * additional auth-related middleware functions.
 */

import { isAuthenticated as replitIsAuthenticated } from '../replitAuth';

/**
 * Checks if user is authenticated
 * Re-exported from replitAuth for cleaner imports
 */
export const isAuthenticated = replitIsAuthenticated;

/**
 * Optional authentication - doesn't block if not authenticated
 * Useful for routes that work for both authenticated and anonymous users
 */
export const optionalAuth: typeof replitIsAuthenticated = (req, _res, next) => {
  // If authenticated, continue
  if (req.isAuthenticated && req.isAuthenticated()) {
    return next();
  }
  // If not authenticated, still continue (don't block)
  next();
};

/**
 * Role-based authorization middleware (placeholder for future use)
 *
 * @example
 * router.post('/admin/settings', isAuthenticated, requireRole('admin'), handler);
 */
export function requireRole(..._roles: string[]) {
  return replitIsAuthenticated; // TODO: Implement role checking when role system is added
}
