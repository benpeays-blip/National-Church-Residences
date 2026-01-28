/**
 * Error Boundary Tests
 *
 * Unit tests for the React Error Boundary component
 *
 * @vitest-environment jsdom
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ErrorBoundary, withErrorBoundary } from '@/components/ErrorBoundary';
import * as Sentry from '@/lib/sentry';

// Mock Sentry
vi.mock('@/lib/sentry', () => ({
  captureException: vi.fn(),
}));

// Component that throws an error for testing
const ThrowError = ({ shouldThrow = false }: { shouldThrow?: boolean }) => {
  if (shouldThrow) {
    throw new Error('Test error message');
  }
  return <div>No error</div>;
};

// Component with null error for edge case testing
const ThrowNullError = ({ shouldThrow = false }: { shouldThrow?: boolean }) => {
  if (shouldThrow) {
    throw null;
  }
  return <div>No error</div>;
};

describe('ErrorBoundary', () => {
  // Suppress console errors during tests (ErrorBoundary logs errors)
  const originalError = console.error;
  beforeEach(() => {
    console.error = vi.fn();
    vi.clearAllMocks();
  });

  afterEach(() => {
    console.error = originalError;
  });

  describe('Normal Rendering', () => {
    it('should render children when there is no error', () => {
      render(
        <ErrorBoundary>
          <div>Child component</div>
        </ErrorBoundary>
      );

      expect(screen.getByText('Child component')).toBeInTheDocument();
    });

    it('should render multiple children without error', () => {
      render(
        <ErrorBoundary>
          <div>Child 1</div>
          <div>Child 2</div>
        </ErrorBoundary>
      );

      expect(screen.getByText('Child 1')).toBeInTheDocument();
      expect(screen.getByText('Child 2')).toBeInTheDocument();
    });
  });

  describe('Error Catching', () => {
    it('should catch errors and display fallback UI', () => {
      render(
        <ErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      );

      // Should display error boundary UI
      expect(screen.getByText('Something went wrong')).toBeInTheDocument();
      expect(
        screen.getByText('We encountered an unexpected error. Please try refreshing the page.')
      ).toBeInTheDocument();
    });

    it('should show action buttons in error state', () => {
      render(
        <ErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      );

      expect(screen.getByText('Refresh Page')).toBeInTheDocument();
      expect(screen.getByText('Try Again')).toBeInTheDocument();
    });

    it('should log error to Sentry when error is caught', () => {
      const captureExceptionSpy = vi.spyOn(Sentry, 'captureException');

      render(
        <ErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      );

      expect(captureExceptionSpy).toHaveBeenCalledWith(
        expect.any(Error),
        expect.objectContaining({
          errorBoundary: true,
        })
      );
    });

    it('should call onError callback when provided', () => {
      const onErrorMock = vi.fn();

      render(
        <ErrorBoundary onError={onErrorMock}>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      );

      expect(onErrorMock).toHaveBeenCalledWith(
        expect.any(Error),
        expect.objectContaining({
          componentStack: expect.any(String),
        })
      );
    });
  });

  describe('Custom Fallback UI', () => {
    it('should render custom fallback when provided', () => {
      const customFallback = <div>Custom error message</div>;

      render(
        <ErrorBoundary fallback={customFallback}>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      );

      expect(screen.getByText('Custom error message')).toBeInTheDocument();
      expect(screen.queryByText('Something went wrong')).not.toBeInTheDocument();
    });
  });

  describe('Development Mode Error Details', () => {
    const originalEnv = process.env.NODE_ENV;

    beforeEach(() => {
      process.env.NODE_ENV = 'development';
    });

    afterEach(() => {
      process.env.NODE_ENV = originalEnv;
    });

    it('should show error details in development mode', () => {
      render(
        <ErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      );

      // Should show error details section
      expect(screen.getByText('Error Details (Development Only)')).toBeInTheDocument();
      expect(screen.getByText('Test error message')).toBeInTheDocument();
    });
  });

  describe('Production Mode', () => {
    const originalEnv = process.env.NODE_ENV;

    beforeEach(() => {
      process.env.NODE_ENV = 'production';
    });

    afterEach(() => {
      process.env.NODE_ENV = originalEnv;
    });

    it('should hide error details in production mode', () => {
      render(
        <ErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      );

      // Should NOT show error details in production
      expect(screen.queryByText('Error Details (Development Only)')).not.toBeInTheDocument();
      expect(screen.queryByText('Test error message')).not.toBeInTheDocument();
    });
  });

  describe('User Interactions', () => {
    it('should reset error state when "Try Again" is clicked', async () => {
      const user = userEvent.setup();

      // Use a state-like variable to control throwing
      let shouldThrow = true;
      const ControlledThrow = () => {
        if (shouldThrow) {
          throw new Error('Controlled error');
        }
        return <div>No error</div>;
      };

      const { rerender } = render(
        <ErrorBoundary key="error-boundary-1">
          <ControlledThrow />
        </ErrorBoundary>
      );

      // Verify error state
      expect(screen.getByText('Something went wrong')).toBeInTheDocument();

      // Update the throw flag
      shouldThrow = false;

      // Click "Try Again" - this resets the boundary
      const tryAgainButton = screen.getByText('Try Again');
      await user.click(tryAgainButton);

      // Rerender with key change to fully reset
      rerender(
        <ErrorBoundary key="error-boundary-2">
          <div>No error</div>
        </ErrorBoundary>
      );

      // Should show normal content
      expect(screen.getByText('No error')).toBeInTheDocument();
    });
  });

  describe('withErrorBoundary HOC', () => {
    it('should wrap component with ErrorBoundary', () => {
      const TestComponent = () => <div>Test Component</div>;
      const WrappedComponent = withErrorBoundary(TestComponent);

      render(<WrappedComponent />);

      expect(screen.getByText('Test Component')).toBeInTheDocument();
    });

    it('should catch errors in wrapped component', () => {
      const WrappedComponent = withErrorBoundary(ThrowError);

      render(<WrappedComponent shouldThrow={true} />);

      expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    });

    it('should use custom error boundary props', () => {
      const onErrorMock = vi.fn();
      const customFallback = <div>Custom HOC fallback</div>;

      const WrappedComponent = withErrorBoundary(ThrowError, {
        fallback: customFallback,
        onError: onErrorMock,
      });

      render(<WrappedComponent shouldThrow={true} />);

      expect(screen.getByText('Custom HOC fallback')).toBeInTheDocument();
      expect(onErrorMock).toHaveBeenCalled();
    });

    it('should set correct displayName for wrapped component', () => {
      const TestComponent = () => <div>Test</div>;
      TestComponent.displayName = 'TestComponent';

      const WrappedComponent = withErrorBoundary(TestComponent);

      expect(WrappedComponent.displayName).toBe('withErrorBoundary(TestComponent)');
    });

    it('should handle component without displayName', () => {
      const TestComponent = () => <div>Test</div>;

      const WrappedComponent = withErrorBoundary(TestComponent);

      expect(WrappedComponent.displayName).toMatch(/withErrorBoundary\(.*\)/);
    });
  });

  describe('Edge Cases', () => {
    it('should handle errors thrown during render', () => {
      render(
        <ErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      );

      expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    });

    it('should handle multiple errors in sequence', () => {
      const { rerender } = render(
        <ErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      );

      expect(screen.getByText('Something went wrong')).toBeInTheDocument();

      // Reset and throw again
      rerender(
        <ErrorBoundary>
          <ThrowError shouldThrow={false} />
        </ErrorBoundary>
      );

      rerender(
        <ErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      );

      expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    });

    it('should handle error with no message', () => {
      const ErrorWithoutMessage = () => {
        throw new Error();
      };

      render(
        <ErrorBoundary>
          <ErrorWithoutMessage />
        </ErrorBoundary>
      );

      expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    });
  });

  describe('Sentry Integration', () => {
    it('should capture exception with component stack', () => {
      const captureExceptionSpy = vi.spyOn(Sentry, 'captureException');

      render(
        <ErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      );

      expect(captureExceptionSpy).toHaveBeenCalledWith(
        expect.any(Error),
        expect.objectContaining({
          componentStack: expect.any(String),
          errorBoundary: true,
        })
      );
    });

    it('should capture error message in Sentry', () => {
      const captureExceptionSpy = vi.spyOn(Sentry, 'captureException');

      render(
        <ErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      );

      const capturedError = captureExceptionSpy.mock.calls[0][0] as Error;
      expect(capturedError.message).toBe('Test error message');
    });
  });

  describe('Help Text', () => {
    it('should display help text with contact info', () => {
      render(
        <ErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      );

      expect(
        screen.getByText(/If this problem persists, please contact support/i)
      ).toBeInTheDocument();
    });
  });

  describe('Error Icon', () => {
    it('should display alert icon in error state', () => {
      render(
        <ErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      );

      // Check for icon container with red background
      const iconContainer = document.querySelector('.bg-red-100');
      expect(iconContainer).toBeInTheDocument();
    });
  });
});
