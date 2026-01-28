import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
  HeadObjectCommand,
  ListObjectsV2Command,
} from '@aws-sdk/client-s3';
import { getSignedUrl as getS3SignedUrl } from '@aws-sdk/s3-request-presigner';
import {
  FileStorageService,
  UploadOptions,
  DownloadResult,
} from './FileStorageService';
import { logger } from '../../config/logging';

/**
 * S3 File Storage Implementation
 *
 * Stores files in AWS S3 or S3-compatible storage (MinIO, DigitalOcean Spaces, etc.)
 * Use for production environments.
 */
export class S3FileStorage implements FileStorageService {
  private client: S3Client;
  private bucket: string;
  private prefix: string;

  constructor(config: {
    bucket: string;
    region?: string;
    endpoint?: string;
    accessKeyId?: string;
    secretAccessKey?: string;
    prefix?: string;
  }) {
    this.bucket = config.bucket;
    this.prefix = config.prefix || '';

    this.client = new S3Client({
      region: config.region || process.env.AWS_REGION || 'us-east-1',
      endpoint: config.endpoint || process.env.S3_ENDPOINT,
      credentials: config.accessKeyId && config.secretAccessKey
        ? {
            accessKeyId: config.accessKeyId,
            secretAccessKey: config.secretAccessKey,
          }
        : undefined,
      forcePathStyle: !!config.endpoint, // Required for MinIO and other S3-compatible services
    });

    logger.info('S3 File Storage initialized', {
      bucket: this.bucket,
      region: config.region,
      prefix: this.prefix,
    });
  }

  private getKey(filename: string): string {
    // Generate unique key with prefix and timestamp
    const timestamp = Date.now();
    const key = `${this.prefix}${timestamp}-${filename}`;
    return key;
  }

  async upload(options: UploadOptions): Promise<string> {
    const { filename, buffer, contentType, metadata } = options;
    const key = this.getKey(filename);

    try {
      const command = new PutObjectCommand({
        Bucket: this.bucket,
        Key: key,
        Body: buffer,
        ContentType: contentType,
        Metadata: metadata,
      });

      await this.client.send(command);

      logger.info('File uploaded to S3', { bucket: this.bucket, key, size: buffer.length });
      return key;
    } catch (error) {
      logger.error('Failed to upload file to S3', { bucket: this.bucket, key, error });
      throw error;
    }
  }

  async download(key: string): Promise<DownloadResult> {
    try {
      const command = new GetObjectCommand({
        Bucket: this.bucket,
        Key: key,
      });

      const response = await this.client.send(command);

      if (!response.Body) {
        throw new Error('Empty response body from S3');
      }

      // Convert stream to buffer
      const buffer = await this.streamToBuffer(response.Body as any);

      logger.debug('File downloaded from S3', { bucket: this.bucket, key, size: buffer.length });

      return {
        buffer,
        contentType: response.ContentType || 'application/octet-stream',
        metadata: response.Metadata,
      };
    } catch (error) {
      logger.error('Failed to download file from S3', { bucket: this.bucket, key, error });
      throw error;
    }
  }

  async delete(key: string): Promise<void> {
    try {
      const command = new DeleteObjectCommand({
        Bucket: this.bucket,
        Key: key,
      });

      await this.client.send(command);

      logger.info('File deleted from S3', { bucket: this.bucket, key });
    } catch (error) {
      logger.error('Failed to delete file from S3', { bucket: this.bucket, key, error });
      throw error;
    }
  }

  async getSignedUrl(key: string, expiresIn: number = 3600): Promise<string> {
    try {
      const command = new GetObjectCommand({
        Bucket: this.bucket,
        Key: key,
      });

      const url = await getS3SignedUrl(this.client, command, { expiresIn });

      logger.debug('Generated signed URL for S3 file', { bucket: this.bucket, key, expiresIn });
      return url;
    } catch (error) {
      logger.error('Failed to generate signed URL for S3 file', { bucket: this.bucket, key, error });
      throw error;
    }
  }

  async exists(key: string): Promise<boolean> {
    try {
      const command = new HeadObjectCommand({
        Bucket: this.bucket,
        Key: key,
      });

      await this.client.send(command);
      return true;
    } catch (error: any) {
      if (error.name === 'NotFound' || error.$metadata?.httpStatusCode === 404) {
        return false;
      }
      logger.error('Error checking if S3 file exists', { bucket: this.bucket, key, error });
      throw error;
    }
  }

  async list(prefix: string = ''): Promise<string[]> {
    try {
      const fullPrefix = `${this.prefix}${prefix}`;

      const command = new ListObjectsV2Command({
        Bucket: this.bucket,
        Prefix: fullPrefix,
      });

      const response = await this.client.send(command);

      if (!response.Contents) {
        return [];
      }

      return response.Contents
        .map(obj => obj.Key)
        .filter((key): key is string => key !== undefined);
    } catch (error) {
      logger.error('Failed to list files in S3', { bucket: this.bucket, prefix, error });
      return [];
    }
  }

  private async streamToBuffer(stream: NodeJS.ReadableStream): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      const chunks: Buffer[] = [];
      stream.on('data', (chunk) => chunks.push(Buffer.from(chunk)));
      stream.on('end', () => resolve(Buffer.concat(chunks)));
      stream.on('error', reject);
    });
  }
}
