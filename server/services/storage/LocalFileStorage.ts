import fs from 'fs/promises';
import path from 'path';
import { existsSync } from 'fs';
import {
  FileStorageService,
  UploadOptions,
  DownloadResult,
} from './FileStorageService';
import { logger } from '../../config/logging';

/**
 * Local File Storage Implementation
 *
 * Stores files on the local filesystem.
 * Use for development only - not suitable for production with multiple servers.
 */
export class LocalFileStorage implements FileStorageService {
  private baseDir: string;

  constructor(baseDir: string = './uploads') {
    this.baseDir = path.resolve(baseDir);
    this.ensureBaseDir();
  }

  private async ensureBaseDir(): Promise<void> {
    try {
      if (!existsSync(this.baseDir)) {
        await fs.mkdir(this.baseDir, { recursive: true });
        logger.info(`Created local storage directory: ${this.baseDir}`);
      }
    } catch (error) {
      logger.error('Failed to create storage directory', { error });
      throw error;
    }
  }

  private getFilePath(key: string): string {
    // Sanitize key to prevent directory traversal
    const sanitized = key.replace(/\.\./g, '').replace(/^\//, '');
    return path.join(this.baseDir, sanitized);
  }

  async upload(options: UploadOptions): Promise<string> {
    const { filename, buffer, contentType, metadata } = options;

    // Generate unique key with timestamp
    const timestamp = Date.now();
    const key = `${timestamp}-${filename}`;
    const filePath = this.getFilePath(key);

    try {
      // Ensure parent directory exists
      await fs.mkdir(path.dirname(filePath), { recursive: true });

      // Write file
      await fs.writeFile(filePath, buffer);

      // Store metadata in companion file
      if (metadata || contentType) {
        const metaPath = `${filePath}.meta.json`;
        await fs.writeFile(
          metaPath,
          JSON.stringify({ contentType, metadata }, null, 2)
        );
      }

      logger.info('File uploaded to local storage', { key, size: buffer.length });
      return key;
    } catch (error) {
      logger.error('Failed to upload file to local storage', { key, error });
      throw error;
    }
  }

  async download(key: string): Promise<DownloadResult> {
    const filePath = this.getFilePath(key);

    try {
      const buffer = await fs.readFile(filePath);

      // Try to read metadata
      let contentType = 'application/octet-stream';
      let metadata: Record<string, string> | undefined;

      try {
        const metaPath = `${filePath}.meta.json`;
        const metaContent = await fs.readFile(metaPath, 'utf-8');
        const meta = JSON.parse(metaContent);
        contentType = meta.contentType || contentType;
        metadata = meta.metadata;
      } catch {
        // Metadata file doesn't exist or is invalid, use defaults
      }

      logger.debug('File downloaded from local storage', { key, size: buffer.length });
      return { buffer, contentType, metadata };
    } catch (error) {
      logger.error('Failed to download file from local storage', { key, error });
      throw error;
    }
  }

  async delete(key: string): Promise<void> {
    const filePath = this.getFilePath(key);
    const metaPath = `${filePath}.meta.json`;

    try {
      // Delete file
      await fs.unlink(filePath);

      // Delete metadata if exists
      try {
        await fs.unlink(metaPath);
      } catch {
        // Metadata file doesn't exist, ignore
      }

      logger.info('File deleted from local storage', { key });
    } catch (error) {
      logger.error('Failed to delete file from local storage', { key, error });
      throw error;
    }
  }

  async getSignedUrl(key: string, expiresIn: number = 3600): Promise<string> {
    // For local storage, return a simple file:// URL or API endpoint
    // In practice, this would be served by an API endpoint
    const filePath = this.getFilePath(key);

    // Check if file exists
    if (!existsSync(filePath)) {
      throw new Error(`File not found: ${key}`);
    }

    // Return a URL that would be handled by an API endpoint
    // Note: expires parameter is informational only for local storage
    return `/api/files/${encodeURIComponent(key)}?expires=${Date.now() + expiresIn * 1000}`;
  }

  async exists(key: string): Promise<boolean> {
    const filePath = this.getFilePath(key);
    try {
      await fs.access(filePath);
      return true;
    } catch {
      return false;
    }
  }

  async list(prefix: string = ''): Promise<string[]> {
    try {
      const searchDir = prefix
        ? this.getFilePath(prefix)
        : this.baseDir;

      const files = await fs.readdir(searchDir, { recursive: true });

      // Filter out metadata files and return only actual files
      return files
        .filter(file => typeof file === 'string' && !file.endsWith('.meta.json'))
        .map(file => prefix ? path.join(prefix, file as string) : file as string);
    } catch (error) {
      logger.error('Failed to list files in local storage', { prefix, error });
      return [];
    }
  }
}
