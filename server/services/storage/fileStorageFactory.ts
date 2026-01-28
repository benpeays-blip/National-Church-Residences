import { FileStorageService } from './FileStorageService';
import { LocalFileStorage } from './LocalFileStorage';
import { S3FileStorage } from './S3FileStorage';
import { logger } from '../../config/logging';

/**
 * File Storage Factory
 *
 * Creates the appropriate file storage implementation based on environment configuration.
 *
 * Environment Variables:
 * - STORAGE_TYPE: 'local' | 's3' (default: 'local')
 * - LOCAL_STORAGE_DIR: Directory for local storage (default: './uploads')
 * - S3_BUCKET: S3 bucket name (required for s3 storage)
 * - S3_REGION: S3 region (default: 'us-east-1')
 * - S3_ENDPOINT: Custom S3 endpoint (optional, for MinIO/Spaces)
 * - S3_ACCESS_KEY_ID: S3 access key (optional, uses AWS credentials if not set)
 * - S3_SECRET_ACCESS_KEY: S3 secret key (optional, uses AWS credentials if not set)
 * - S3_PREFIX: Key prefix for all uploaded files (optional, default: '')
 */
export function createFileStorage(): FileStorageService {
  const storageType = process.env.STORAGE_TYPE || 'local';

  switch (storageType) {
    case 's3': {
      const bucket = process.env.S3_BUCKET;
      if (!bucket) {
        throw new Error('S3_BUCKET environment variable is required for S3 storage');
      }

      const config = {
        bucket,
        region: process.env.S3_REGION,
        endpoint: process.env.S3_ENDPOINT,
        accessKeyId: process.env.S3_ACCESS_KEY_ID,
        secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
        prefix: process.env.S3_PREFIX || '',
      };

      logger.info('Using S3 file storage', {
        bucket,
        region: config.region,
        hasCustomEndpoint: !!config.endpoint,
      });

      return new S3FileStorage(config);
    }

    case 'local':
    default: {
      const baseDir = process.env.LOCAL_STORAGE_DIR || './uploads';

      logger.info('Using local file storage', { baseDir });

      return new LocalFileStorage(baseDir);
    }
  }
}

/**
 * Singleton instance of file storage service
 */
let fileStorageInstance: FileStorageService | null = null;

/**
 * Get the file storage service instance (singleton)
 */
export function getFileStorage(): FileStorageService {
  if (!fileStorageInstance) {
    fileStorageInstance = createFileStorage();
  }
  return fileStorageInstance;
}

/**
 * Reset the file storage instance (useful for testing)
 */
export function resetFileStorage(): void {
  fileStorageInstance = null;
}
