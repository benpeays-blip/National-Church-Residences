/**
 * Error Boundary Component
 *
 * Catches rendering errors in the React component tree and displays a fallback UI
 * Prevents the entire app from crashing due to a single component error
 */

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { captureException } from '@/lib/sentry';

interface Props {
  children: ReactNode;
  /**
   * Optional fallback UI to show when an error occurs
   * If not provided, uses the default error UI
   */
  fallback?: ReactNode;
  /**
   * Optional callback when an error is caught
   * Use this to log errors to Sentry or another service
   */
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    // Update state so the next render will show the fallback UI
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log the error to console
    console.error('Error Boundary caught an error:', error, errorInfo);

    // Send error to Sentry
    captureException(error, {
      componentStack: errorInfo.componentStack,
      errorBoundary: true,
    });

    // Call the onError callback if provided (for custom logging)
    this.props.onError?.(error, errorInfo);

    // Update state with error info
    this.setState({
      errorInfo,
    });
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  render() {
    if (this.state.hasError) {
      // If a custom fallback is provided, use it
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default fallback UI
      return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
          <Card className="max-w-2xl w-full">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <CardTitle>Something went wrong</CardTitle>
                  <CardDescription>
                    We encountered an unexpected error. Please try refreshing the page.
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Error details (only show in development) */}
              {process.env.NODE_ENV === 'development' && this.state.error && (
                <div className="space-y-2">
                  <details className="bg-gray-100 p-4 rounded-lg">
                    <summary className="font-semibold cursor-pointer text-sm">
                      Error Details (Development Only)
                    </summary>
                    <div className="mt-3 space-y-2">
                      <div>
                        <p className="text-xs font-semibold text-gray-600">Error Message:</p>
                        <p className="text-sm font-mono text-red-600 mt-1">
                          {this.state.error.message}
                        </p>
                      </div>
                      {this.state.error.stack && (
                        <div>
                          <p className="text-xs font-semibold text-gray-600 mt-2">Stack Trace:</p>
                          <pre className="text-xs font-mono text-gray-700 mt-1 overflow-x-auto whitespace-pre-wrap">
                            {this.state.error.stack}
                          </pre>
                        </div>
                      )}
                      {this.state.errorInfo && (
                        <div>
                          <p className="text-xs font-semibold text-gray-600 mt-2">Component Stack:</p>
                          <pre className="text-xs font-mono text-gray-700 mt-1 overflow-x-auto whitespace-pre-wrap">
                            {this.state.errorInfo.componentStack}
                          </pre>
                        </div>
                      )}
                    </div>
                  </details>
                </div>
              )}

              {/* Action buttons */}
              <div className="flex gap-3">
                <Button onClick={() => window.location.reload()} className="flex items-center gap-2">
                  <RefreshCw className="w-4 h-4" />
                  Refresh Page
                </Button>
                <Button onClick={this.handleReset} variant="outline">
                  Try Again
                </Button>
              </div>

              {/* Help text */}
              <p className="text-sm text-muted-foreground">
                If this problem persists, please contact support or try clearing your browser cache.
              </p>
            </CardContent>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}

/**
 * Convenience hook-like wrapper for ErrorBoundary
 * Use this when you need to wrap a specific component subtree
 */
export function withErrorBoundary<P extends object>(
  Component: React.ComponentType<P>,
  errorBoundaryProps?: Omit<Props, 'children'>
) {
  const WrappedComponent = (props: P) => (
    <ErrorBoundary {...errorBoundaryProps}>
      <Component {...props} />
    </ErrorBoundary>
  );

  WrappedComponent.displayName = `withErrorBoundary(${Component.displayName || Component.name || 'Component'})`;

  return WrappedComponent;
}
