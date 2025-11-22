/**
 * ErrorBoundary Component
 *
 * A React error boundary that catches JavaScript errors anywhere in the child component tree,
 * logs those errors, and displays a fallback UI instead of crashing the entire application.
 *
 * Features:
 * - Catches errors in rendering, lifecycle methods, and constructors
 * - Displays user-friendly error UI
 * - Provides error details in development mode
 * - Allows manual error recovery
 * - Logs errors for monitoring (ready for Sentry integration)
 *
 * @see https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary
 *
 * @example
 * ```tsx
 * <ErrorBoundary>
 *   <MyComponent />
 * </ErrorBoundary>
 * ```
 *
 * @example With custom fallback
 * ```tsx
 * <ErrorBoundary fallback={<CustomErrorUI />}>
 *   <MyComponent />
 * </ErrorBoundary>
 * ```
 */

import { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface ErrorBoundaryProps {
  /** Child components to render */
  children: ReactNode;
  /** Optional custom fallback UI */
  fallback?: ReactNode;
  /** Optional callback when error occurs */
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface ErrorBoundaryState {
  /** Whether an error has been caught */
  hasError: boolean;
  /** The error that was caught */
  error: Error | null;
  /** Additional error information from React */
  errorInfo: ErrorInfo | null;
}

/**
 * Error Boundary Component Class
 *
 * Note: Error boundaries must be class components as of React 18.
 * Function components cannot catch errors yet.
 */
class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  /**
   * Static method called when an error is thrown
   *
   * @param error - The error that was thrown
   * @returns New state object
   */
  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    // Update state so the next render will show the fallback UI
    return {
      hasError: true,
      error,
    };
  }

  /**
   * Lifecycle method called after an error has been thrown
   *
   * @param error - The error that was thrown
   * @param errorInfo - Additional information about the error
   */
  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Log error to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('ErrorBoundary caught an error:', error);
      console.error('Error component stack:', errorInfo.componentStack);
    }

    // Update state with error info
    this.setState({
      errorInfo,
    });

    // Call optional error callback
    this.props.onError?.(error, errorInfo);

    // TODO: Send error to logging service (e.g., Sentry)
    // Example:
    // Sentry.captureException(error, {
    //   contexts: {
    //     react: {
    //       componentStack: errorInfo.componentStack,
    //     },
    //   },
    // });
  }

  /**
   * Reset error boundary state and attempt recovery
   */
  handleReset = (): void => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  /**
   * Navigate to home page
   */
  handleGoHome = (): void => {
    window.location.href = '/';
  };

  /**
   * Reload the page
   */
  handleReload = (): void => {
    window.location.reload();
  };

  render(): ReactNode {
    const { hasError, error, errorInfo } = this.state;
    const { children, fallback } = this.props;

    // If there's an error, render fallback UI
    if (hasError) {
      // Use custom fallback if provided
      if (fallback) {
        return fallback;
      }

      // Default error UI
      return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background to-muted">
          <Card className="max-w-2xl w-full p-8 space-y-6">
            {/* Error Icon */}
            <div className="flex items-center justify-center">
              <div className="h-20 w-20 rounded-full bg-destructive/10 flex items-center justify-center">
                <AlertTriangle className="h-10 w-10 text-destructive" />
              </div>
            </div>

            {/* Error Title */}
            <div className="text-center space-y-2">
              <h1 className="text-3xl font-bold text-foreground">
                Oops! Something went wrong
              </h1>
              <p className="text-muted-foreground">
                We apologize for the inconvenience. An unexpected error has occurred.
              </p>
            </div>

            {/* Error Details (Development Only) */}
            {process.env.NODE_ENV === 'development' && error && (
              <div className="space-y-4">
                <div className="border-l-4 border-destructive bg-destructive/5 p-4 rounded">
                  <h3 className="font-semibold text-destructive mb-2">Error Details:</h3>
                  <pre className="text-sm text-muted-foreground overflow-x-auto">
                    {error.toString()}
                  </pre>
                </div>

                {errorInfo && (
                  <details className="border border-border rounded p-4">
                    <summary className="font-semibold cursor-pointer text-muted-foreground hover:text-foreground transition-colors">
                      Component Stack Trace
                    </summary>
                    <pre className="mt-4 text-xs text-muted-foreground overflow-x-auto whitespace-pre-wrap">
                      {errorInfo.componentStack}
                    </pre>
                  </details>
                )}
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                onClick={this.handleReset}
                variant="default"
                className="gap-2"
              >
                <RefreshCw className="h-4 w-4" />
                Try Again
              </Button>

              <Button
                onClick={this.handleGoHome}
                variant="outline"
                className="gap-2"
              >
                <Home className="h-4 w-4" />
                Go to Homepage
              </Button>

              <Button
                onClick={this.handleReload}
                variant="secondary"
                className="gap-2"
              >
                <RefreshCw className="h-4 w-4" />
                Reload Page
              </Button>
            </div>

            {/* Additional Help */}
            <div className="text-center pt-4 border-t border-border">
              <p className="text-sm text-muted-foreground">
                If this problem persists, please{' '}
                <a
                  href="mailto:support@chainpulse.example.com"
                  className="text-primary hover:underline font-medium"
                >
                  contact support
                </a>
                {' '}or{' '}
                <a
                  href="https://github.com/tonesgainz/chainpulse-esg-dashboard/issues"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline font-medium"
                >
                  report an issue
                </a>
                .
              </p>
            </div>
          </Card>
        </div>
      );
    }

    // No error, render children normally
    return children;
  }
}

export default ErrorBoundary;

/**
 * Hook-based Error Boundary Alternative (for future React versions)
 *
 * Note: As of React 18, error boundaries must be class components.
 * This is here as a reference for when React supports error boundaries in hooks.
 *
 * Usage:
 * ```tsx
 * function MyComponent() {
 *   const { ErrorBoundary, resetError } = useErrorBoundary();
 *
 *   return (
 *     <ErrorBoundary>
 *       <MyChildComponent />
 *     </ErrorBoundary>
 *   );
 * }
 * ```
 */

// TODO: Implement when React supports error boundaries in hooks
// export function useErrorBoundary() { ... }
