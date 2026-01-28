/**
 * Express Type Augmentation
 *
 * Extends Express Request type with custom properties
 */

import { users } from '@shared/schema';

declare global {
  namespace Express {
    /**
     * User object attached to request after authentication
     * Includes both database user data and session data
     */
    interface User {
      id?: string;
      email?: string | null;
      firstName?: string | null;
      lastName?: string | null;
      profileImageUrl?: string | null;
      role?: 'ADMIN' | 'CEO' | 'DEV_DIRECTOR' | 'MGO' | 'DATA_OPS';
      createdAt?: Date | null;
      updatedAt?: Date | null;
      // Session-specific properties (from OIDC)
      claims?: Record<string, unknown>;
      access_token?: string;
      refresh_token?: string;
      expires_at?: number;
    }

    /**
     * Extended Request interface with user property
     */
    interface Request {
      user?: User;
      rawBody?: unknown;
    }
  }
}

export {};
