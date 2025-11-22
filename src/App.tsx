/**
 * App Component - Root Application Component
 *
 * This is the main entry point for the ChainPulse ESG Dashboard application.
 * It sets up:
 * - React Query for server state management
 * - Error boundaries for graceful error handling
 * - Routing with React Router
 * - Global UI providers (Toaster, Tooltip)
 *
 * @see {@link https://tanstack.com/query/latest/docs/react/overview}
 * @see {@link https://reactrouter.com/en/main}
 */

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ErrorBoundary from "./components/ErrorBoundary";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

/**
 * React Query Client Configuration
 *
 * Configured with sensible defaults for:
 * - Automatic retries on failure
 * - Stale time for cache optimization
 * - Error handling and logging
 */
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Data considered fresh for 5 minutes
      staleTime: 5 * 60 * 1000,

      // Cache data for 10 minutes
      gcTime: 10 * 60 * 1000,

      // Retry failed requests up to 3 times
      retry: 3,

      // Exponential backoff for retries
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),

      // Don't refetch on window focus by default (can be overridden per query)
      refetchOnWindowFocus: false,

      // Don't refetch on reconnect by default
      refetchOnReconnect: false,
    },
    mutations: {
      // Retry mutations once on failure
      retry: 1,

      // Log mutation errors
      onError: (error) => {
        console.error('Mutation error:', error);
        // TODO: Send to error tracking service (Sentry)
      },
    },
  },
});

/**
 * Global error handler for Error Boundary
 *
 * @param error - The error that was caught
 * @param errorInfo - Additional React error information
 */
const handleError = (error: Error, errorInfo: React.ErrorInfo): void => {
  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.error('Application Error:', error);
    console.error('Error Info:', errorInfo);
  }

  // TODO: Send to error tracking service (Sentry, LogRocket, etc.)
  // Example with Sentry:
  // Sentry.captureException(error, {
  //   contexts: {
  //     react: {
  //       componentStack: errorInfo.componentStack,
  //     },
  //   },
  //   level: 'error',
  //   tags: {
  //     errorBoundary: true,
  //   },
  // });
};

/**
 * Root App Component
 *
 * Wraps the entire application with:
 * 1. Error Boundary - Catches and handles runtime errors
 * 2. React Query Provider - Server state management
 * 3. Tooltip Provider - Global tooltip context
 * 4. Toast Notifications - User feedback system
 * 5. Router - Client-side routing
 */
const App = () => (
  <ErrorBoundary onError={handleError}>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider delayDuration={300}>
        <Toaster />
        <Sonner
          position="top-right"
          expand={true}
          richColors
          closeButton
        />
        <BrowserRouter>
          <Routes>
            {/* Main Dashboard */}
            <Route path="/" element={<Index />} />

            {/* 404 Not Found - Catch-all route */}
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;

/**
 * Future Enhancements:
 *
 * 1. React Query Devtools (Development only):
 *    import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
 *    Add <ReactQueryDevtools initialIsOpen={false} /> inside QueryClientProvider
 *
 * 2. Performance Monitoring:
 *    - Add Web Vitals tracking
 *    - Implement analytics integration
 *    - Add route-based code splitting
 *
 * 3. Authentication:
 *    - Add auth context provider
 *    - Protected routes
 *    - Session management
 *
 * 4. Theme Management:
 *    - Add theme provider for dark/light mode
 *    - Persist theme preference
 *
 * 5. Internationalization (i18n):
 *    - Add i18n provider
 *    - Language switching
 *    - Locale-based formatting
 */
