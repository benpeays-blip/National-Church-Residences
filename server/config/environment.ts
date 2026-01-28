import { z } from 'zod';

/**
 * Environment Variable Schema
 *
 * Validates all required and optional environment variables on application startup.
 * Fails fast if configuration is invalid.
 */
const envSchema = z.object({
  // Application
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
  PORT: z.string().default('5000'),

  // Database
  DATABASE_URL: z.string().url('DATABASE_URL must be a valid PostgreSQL connection string'),

  // Session
  SESSION_SECRET: z
    .string()
    .min(32, 'SESSION_SECRET must be at least 32 characters for security'),

  // Replit Auth (OIDC)
  REPL_ID: z.string().optional(),
  ISSUER_URL: z.string().url().optional(),

  // OpenAI Integration
  AI_INTEGRATIONS_OPENAI_BASE_URL: z.string().url().optional(),
  AI_INTEGRATIONS_OPENAI_API_KEY: z.string().optional(),

  // File Storage
  STORAGE_TYPE: z
    .enum(['local', 's3', 'azure'])
    .default('local'),
  UPLOAD_DIR: z.string().default('./uploads'),

  // AWS S3 (optional, required if STORAGE_TYPE=s3)
  S3_BUCKET: z.string().optional(),
  S3_REGION: z.string().optional(),
  AWS_ACCESS_KEY_ID: z.string().optional(),
  AWS_SECRET_ACCESS_KEY: z.string().optional(),

  // Azure Blob Storage (optional, required if STORAGE_TYPE=azure)
  AZURE_STORAGE_ACCOUNT: z.string().optional(),
  AZURE_STORAGE_KEY: z.string().optional(),
  AZURE_STORAGE_CONTAINER: z.string().optional(),

  // Monitoring & Logging
  SENTRY_DSN: z.string().url().optional(),
  LOG_LEVEL: z
    .enum(['error', 'warn', 'info', 'http', 'debug'])
    .default('info'),

  // Feature Flags
  USE_MODERN_ROUTES: z
    .string()
    .transform((val) => val === 'true')
    .default('false'),
});

export type Environment = z.infer<typeof envSchema>;

/**
 * Validates environment variables and returns typed config object
 * Exits process if validation fails
 */
export function validateEnvironment(): Environment {
  try {
    const env = envSchema.parse(process.env);

    // Additional validations for conditional requirements
    if (env.STORAGE_TYPE === 's3') {
      if (!env.S3_BUCKET || !env.S3_REGION || !env.AWS_ACCESS_KEY_ID || !env.AWS_SECRET_ACCESS_KEY) {
        throw new Error(
          'S3_BUCKET, S3_REGION, AWS_ACCESS_KEY_ID, and AWS_SECRET_ACCESS_KEY are required when STORAGE_TYPE=s3'
        );
      }
    }

    if (env.STORAGE_TYPE === 'azure') {
      if (!env.AZURE_STORAGE_ACCOUNT || !env.AZURE_STORAGE_KEY || !env.AZURE_STORAGE_CONTAINER) {
        throw new Error(
          'AZURE_STORAGE_ACCOUNT, AZURE_STORAGE_KEY, and AZURE_STORAGE_CONTAINER are required when STORAGE_TYPE=azure'
        );
      }
    }

    return env;
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error('❌ Environment validation failed:');
      error.errors.forEach((err) => {
        console.error(`  - ${err.path.join('.')}: ${err.message}`);
      });
    } else if (error instanceof Error) {
      console.error('❌ Environment validation failed:', error.message);
    }
    process.exit(1);
  }
}

// Export validated environment
export const env = validateEnvironment();
