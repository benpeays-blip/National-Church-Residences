/**
 * API Client Tests
 *
 * Unit tests for the centralized API client
 *
 * @vitest-environment jsdom
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { apiClient, ApiError, api } from '@/lib/api';

// Mock fetch globally
const mockFetch = vi.fn();
global.fetch = mockFetch;

describe('ApiError', () => {
  it('should create an ApiError with correct properties', () => {
    const error = new ApiError(404, 'Not Found', 'Resource not found');

    expect(error).toBeInstanceOf(Error);
    expect(error.name).toBe('ApiError');
    expect(error.status).toBe(404);
    expect(error.statusText).toBe('Not Found');
    expect(error.message).toBe('Resource not found');
  });
});

describe('BaseClient - HTTP Methods', () => {
  beforeEach(() => {
    mockFetch.mockReset();
  });

  describe('GET requests', () => {
    it('should make a GET request with correct URL', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => ({ data: 'test' }),
      });

      await apiClient.get('/test');

      expect(mockFetch).toHaveBeenCalledWith(
        '/api/test',
        expect.objectContaining({
          method: 'GET',
          credentials: 'include',
        })
      );
    });

    it('should append query parameters to URL', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => [{ id: '1' }],
      });

      await apiClient.get('/persons', { params: { search: 'john' } });

      expect(mockFetch).toHaveBeenCalledWith(
        '/api/persons?search=john',
        expect.any(Object)
      );
    });

    it('should return parsed JSON response', async () => {
      const mockData = { id: '1', name: 'Test' };
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => mockData,
      });

      const result = await apiClient.get('/test');

      expect(result).toEqual(mockData);
    });
  });

  describe('POST requests', () => {
    it('should make a POST request with JSON body', async () => {
      const testData = { name: 'John', email: 'john@test.com' };
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 201,
        json: async () => ({ id: '1', ...testData }),
      });

      await apiClient.post('/persons', testData);

      expect(mockFetch).toHaveBeenCalledWith(
        '/api/persons',
        expect.objectContaining({
          method: 'POST',
          headers: expect.objectContaining({
            'Content-Type': 'application/json',
          }),
          body: JSON.stringify(testData),
          credentials: 'include',
        })
      );
    });

    it('should handle POST without body', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => ({ success: true }),
      });

      await apiClient.post('/action');

      expect(mockFetch).toHaveBeenCalledWith(
        '/api/action',
        expect.objectContaining({
          method: 'POST',
          body: undefined,
        })
      );
    });
  });

  describe('PATCH requests', () => {
    it('should make a PATCH request with JSON body', async () => {
      const updateData = { email: 'newemail@test.com' };
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => ({ id: '1', ...updateData }),
      });

      await apiClient.patch('/persons/1', updateData);

      expect(mockFetch).toHaveBeenCalledWith(
        '/api/persons/1',
        expect.objectContaining({
          method: 'PATCH',
          headers: expect.objectContaining({
            'Content-Type': 'application/json',
          }),
          body: JSON.stringify(updateData),
        })
      );
    });
  });

  describe('PUT requests', () => {
    it('should make a PUT request with JSON body', async () => {
      const replaceData = { name: 'Complete Replace', email: 'new@test.com' };
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => replaceData,
      });

      await apiClient.put('/persons/1', replaceData);

      expect(mockFetch).toHaveBeenCalledWith(
        '/api/persons/1',
        expect.objectContaining({
          method: 'PUT',
          body: JSON.stringify(replaceData),
        })
      );
    });
  });

  describe('DELETE requests', () => {
    it('should make a DELETE request', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 204,
      });

      await apiClient.delete('/persons/1');

      expect(mockFetch).toHaveBeenCalledWith(
        '/api/persons/1',
        expect.objectContaining({
          method: 'DELETE',
        })
      );
    });
  });

  describe('Error Handling', () => {
    it('should throw ApiError on 404 response', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 404,
        statusText: 'Not Found',
        text: async () => 'Person not found',
      });

      try {
        await apiClient.get('/persons/999');
        expect.fail('Should have thrown ApiError');
      } catch (error) {
        expect(error).toBeInstanceOf(ApiError);
        expect(error).toMatchObject({
          status: 404,
          statusText: 'Not Found',
          message: 'Person not found',
        });
      }
    });

    it('should throw ApiError on 400 validation error', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 400,
        statusText: 'Bad Request',
        text: async () => 'Validation failed',
      });

      await expect(apiClient.post('/persons', {})).rejects.toThrow(ApiError);
    });

    it('should throw ApiError on 500 server error', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
        statusText: 'Internal Server Error',
        text: async () => 'Server error',
      });

      await expect(apiClient.get('/persons')).rejects.toThrow(ApiError);
    });

    it('should handle 204 No Content response', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 204,
      });

      const result = await apiClient.delete('/persons/1');

      expect(result).toBeUndefined();
    });
  });

  describe('Custom Headers', () => {
    it('should include custom headers in request', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => ({ data: 'test' }),
      });

      await apiClient.get('/test', {
        headers: { 'X-Custom-Header': 'custom-value' },
      });

      expect(mockFetch).toHaveBeenCalledWith(
        '/api/test',
        expect.objectContaining({
          headers: expect.objectContaining({
            'X-Custom-Header': 'custom-value',
          }),
        })
      );
    });
  });
});

describe('Domain-Specific APIs', () => {
  beforeEach(() => {
    mockFetch.mockReset();
  });

  describe('api.persons', () => {
    it('should call getAll with search parameter', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => [{ id: '1', firstName: 'John' }],
      });

      await api.persons.getAll('John');

      expect(mockFetch).toHaveBeenCalledWith(
        '/api/persons?search=John',
        expect.any(Object)
      );
    });

    it('should call getById with person ID', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => ({ id: '123', firstName: 'John' }),
      });

      await api.persons.getById('123');

      expect(mockFetch).toHaveBeenCalledWith(
        '/api/persons/123',
        expect.any(Object)
      );
    });

    it('should call create with person data', async () => {
      const newPerson = {
        firstName: 'Jane',
        lastName: 'Doe',
        primaryEmail: 'jane@test.com',
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 201,
        json: async () => ({ id: '456', ...newPerson }),
      });

      await api.persons.create(newPerson);

      expect(mockFetch).toHaveBeenCalledWith(
        '/api/persons',
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify(newPerson),
        })
      );
    });

    it('should call update with person ID and data', async () => {
      const updateData = { primaryEmail: 'newemail@test.com' };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => ({ id: '123', ...updateData }),
      });

      await api.persons.update('123', updateData);

      expect(mockFetch).toHaveBeenCalledWith(
        '/api/persons/123',
        expect.objectContaining({
          method: 'PATCH',
          body: JSON.stringify(updateData),
        })
      );
    });

    it('should call delete with person ID', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 204,
      });

      await api.persons.delete('123');

      expect(mockFetch).toHaveBeenCalledWith(
        '/api/persons/123',
        expect.objectContaining({
          method: 'DELETE',
        })
      );
    });

    it('should call getDonors', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => [{ id: '1', isDonor: true }],
      });

      await api.persons.getDonors();

      expect(mockFetch).toHaveBeenCalledWith(
        '/api/donors',
        expect.any(Object)
      );
    });

    it('should call updateEnergyScore with ID and score', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => ({ id: '123', energyScore: 85 }),
      });

      await api.persons.updateEnergyScore('123', 85);

      expect(mockFetch).toHaveBeenCalledWith(
        '/api/donors/123/energy',
        expect.objectContaining({
          method: 'PATCH',
          body: JSON.stringify({ energyScore: 85 }),
        })
      );
    });
  });

  describe('api.gifts', () => {
    it('should call getAll without filter', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => [{ id: '1', amount: '100.00' }],
      });

      await api.gifts.getAll();

      expect(mockFetch).toHaveBeenCalledWith(
        '/api/gifts',
        expect.any(Object)
      );
    });

    it('should call getAll with personId filter', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => [{ id: '1', personId: '123' }],
      });

      await api.gifts.getAll('123');

      expect(mockFetch).toHaveBeenCalledWith(
        '/api/gifts?personId=123',
        expect.any(Object)
      );
    });

    it('should call create with gift data', async () => {
      const newGift = {
        personId: '123',
        amount: '500.00',
        giftType: 'oneTime' as const,
        receivedDate: '2026-01-28',
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 201,
        json: async () => ({ id: '789', ...newGift }),
      });

      await api.gifts.create(newGift);

      expect(mockFetch).toHaveBeenCalledWith(
        '/api/gifts',
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify(newGift),
        })
      );
    });
  });

  describe('api.opportunities', () => {
    it('should call getAll with ownerId filter', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => [{ id: '1', ownerId: 'user-123' }],
      });

      await api.opportunities.getAll('user-123');

      expect(mockFetch).toHaveBeenCalledWith(
        '/api/opportunities?ownerId=user-123',
        expect.any(Object)
      );
    });

    it('should call update with opportunity data', async () => {
      const updateData = {
        stage: 'stewardship' as const,
        probability: 75,
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => ({ id: '456', ...updateData }),
      });

      await api.opportunities.update('456', updateData);

      expect(mockFetch).toHaveBeenCalledWith(
        '/api/opportunities/456',
        expect.objectContaining({
          method: 'PATCH',
          body: JSON.stringify(updateData),
        })
      );
    });
  });

  describe('api.calendar', () => {
    it('should call getAll with userId filter', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => [{ id: '1', userId: 'user-123' }],
      });

      await api.calendar.getAll('user-123');

      expect(mockFetch).toHaveBeenCalledWith(
        '/api/calendar-events?userId=user-123',
        expect.any(Object)
      );
    });

    it('should call getAll with date range filters', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => [{ id: '1', startDate: '2026-01-28' }],
      });

      const startDate = new Date('2026-01-01');
      const endDate = new Date('2026-01-31');

      await api.calendar.getAll(undefined, startDate, endDate);

      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('/api/calendar-events?'),
        expect.any(Object)
      );
      expect(mockFetch.mock.calls[0][0]).toContain('startDate=');
      expect(mockFetch.mock.calls[0][0]).toContain('endDate=');
    });

    it('should call create with calendar event data', async () => {
      const newEvent = {
        title: 'Donor Meeting',
        startDate: '2026-02-01',
        endDate: '2026-02-01',
        userId: 'user-123',
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 201,
        json: async () => ({ id: '999', ...newEvent }),
      });

      await api.calendar.create(newEvent);

      expect(mockFetch).toHaveBeenCalledWith(
        '/api/calendar-events',
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify(newEvent),
        })
      );
    });
  });
});
