/**
 * Base API Client
 *
 * Provides typed HTTP methods with error handling and response parsing
 */

export class ApiError extends Error {
  constructor(
    public status: number,
    public statusText: string,
    message: string
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

interface RequestOptions {
  headers?: Record<string, string>;
  params?: Record<string, string | number | boolean>;
}

/**
 * Base HTTP client with typed responses
 */
class BaseClient {
  private baseUrl: string;

  constructor(baseUrl: string = '/api') {
    this.baseUrl = baseUrl;
  }

  /**
   * Build URL with query parameters
   */
  private buildUrl(path: string, params?: Record<string, string | number | boolean>): string {
    const url = `${this.baseUrl}${path}`;

    if (!params || Object.keys(params).length === 0) {
      return url;
    }

    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      searchParams.append(key, String(value));
    });

    return `${url}?${searchParams.toString()}`;
  }

  /**
   * Handle response errors
   */
  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      const text = await response.text().catch(() => response.statusText);
      throw new ApiError(response.status, response.statusText, text);
    }

    // Handle 204 No Content
    if (response.status === 204) {
      return undefined as T;
    }

    return response.json();
  }

  /**
   * GET request
   */
  async get<T>(path: string, options?: RequestOptions): Promise<T> {
    const url = this.buildUrl(path, options?.params);

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        ...options?.headers,
      },
      credentials: 'include',
    });

    return this.handleResponse<T>(response);
  }

  /**
   * POST request
   */
  async post<T, D = unknown>(path: string, data?: D, options?: RequestOptions): Promise<T> {
    const url = this.buildUrl(path, options?.params);

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      body: data ? JSON.stringify(data) : undefined,
      credentials: 'include',
    });

    return this.handleResponse<T>(response);
  }

  /**
   * PATCH request
   */
  async patch<T, D = unknown>(path: string, data?: D, options?: RequestOptions): Promise<T> {
    const url = this.buildUrl(path, options?.params);

    const response = await fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      body: data ? JSON.stringify(data) : undefined,
      credentials: 'include',
    });

    return this.handleResponse<T>(response);
  }

  /**
   * PUT request
   */
  async put<T, D = unknown>(path: string, data?: D, options?: RequestOptions): Promise<T> {
    const url = this.buildUrl(path, options?.params);

    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      body: data ? JSON.stringify(data) : undefined,
      credentials: 'include',
    });

    return this.handleResponse<T>(response);
  }

  /**
   * DELETE request
   */
  async delete<T>(path: string, options?: RequestOptions): Promise<T> {
    const url = this.buildUrl(path, options?.params);

    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        ...options?.headers,
      },
      credentials: 'include',
    });

    return this.handleResponse<T>(response);
  }
}

export const apiClient = new BaseClient();
