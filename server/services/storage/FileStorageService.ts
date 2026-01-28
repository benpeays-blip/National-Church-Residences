/**
 * File Storage Service Interface
 *
 * Abstraction layer for file storage operations.
 * Implementations: LocalFileStorage (dev), S3FileStorage (prod)
 */

export interface UploadOptions {
  filename: string;
  contentType: string;
  buffer: Buffer;
  metadata?: Record<string, string>;
}

export interface DownloadResult {
  buffer: Buffer;
  contentType: string;
  metadata?: Record<string, string>;
}

export interface FileStorageService {
  /**
   * Upload a file to storage
   * @returns The unique key/path of the uploaded file
   */
  upload(options: UploadOptions): Promise<string>;

  /**
   * Download a file from storage
   */
  download(key: string): Promise<DownloadResult>;

  /**
   * Delete a file from storage
   */
  delete(key: string): Promise<void>;

  /**
   * Get a signed URL for direct access (valid for limited time)
   * @param key - File key/path
   * @param expiresIn - Expiration time in seconds (default: 3600)
   */
  getSignedUrl(key: string, expiresIn?: number): Promise<string>;

  /**
   * Check if a file exists
   */
  exists(key: string): Promise<boolean>;

  /**
   * List all files with a given prefix
   */
  list(prefix?: string): Promise<string[]>;
}
