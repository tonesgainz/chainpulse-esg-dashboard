/**
 * Header Component
 *
 * The main application header with:
 * - Branding and current date display
 * - Refresh functionality
 * - Notification bell with indicator
 * - Search functionality (desktop only)
 *
 * Accessibility Features:
 * - Keyboard navigable
 * - ARIA labels for all interactive elements
 * - Screen reader friendly
 * - Focus management
 *
 * Performance:
 * - Memoized to prevent unnecessary re-renders
 * - Debounced search input (ready for implementation)
 *
 * @example
 * ```tsx
 * <Header
 *   onRefresh={handleRefresh}
 *   isLoading={loading}
 * />
 * ```
 */

import { useState, useCallback, memo } from "react";
import { Search, Bell, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

/**
 * Props for the Header component
 */
interface HeaderProps {
  /** Callback function when refresh button is clicked */
  onRefresh: () => void;

  /** Whether data is currently being refreshed */
  isLoading?: boolean;

  /** Optional notification count to display */
  notificationCount?: number;

  /** Optional search callback (for future implementation) */
  onSearch?: (query: string) => void;

  /** Optional CSS classes */
  className?: string;
}

/**
 * Header Component Implementation
 *
 * Memoized for performance
 */
function Header({
  onRefresh,
  isLoading = false,
  notificationCount = 3,
  onSearch,
  className
}: HeaderProps) {
  const [searchValue, setSearchValue] = useState("");
  const isMobile = useIsMobile();

  /**
   * Handle search input change
   * Memoized to prevent recreation on every render
   */
  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);

    // TODO: Implement debounced search
    // Call onSearch callback if provided
    if (onSearch) {
      onSearch(value);
    }
  }, [onSearch]);

  /**
   * Handle search form submission
   */
  const handleSearchSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch && searchValue.trim()) {
      onSearch(searchValue);
    }
  }, [onSearch, searchValue]);

  return (
    <header
      className={cn(
        "glass-panel py-4 px-6 md:px-8 border-b border-white/10 flex items-center justify-between animate-fade-in backdrop-blur-xl",
        className
      )}
      role="banner"
    >
      {/* Branding and Date */}
      <div className="flex-1">
        <h1 className="text-2xl font-bold font-display gradient-text">
          Sustainability Dashboard
        </h1>
        <p className="text-sm text-muted-foreground/80 mt-1">
          <span className="sr-only">Current date: </span>
          Your ESG & Carbon insights for{" "}
          <time
            dateTime={new Date().toISOString()}
            className="text-primary font-medium"
          >
            {new Date().toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric'
            })}
          </time>
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-4" role="toolbar" aria-label="Header actions">
        {/* Refresh Button */}
        <button
          onClick={onRefresh}
          className={cn(
            "h-10 w-10 rounded-xl button-gradient flex items-center justify-center transition-all duration-300",
            "hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-background",
            isLoading && "animate-spin-slow cursor-not-allowed"
          )}
          disabled={isLoading}
          aria-label={isLoading ? "Refreshing data" : "Refresh data"}
          title={isLoading ? "Refreshing..." : "Refresh data"}
        >
          <RefreshCw
            size={18}
            className={isLoading ? "animate-spin" : ""}
            aria-hidden="true"
          />
        </button>

        {/* Notifications Button */}
        <button
          className={cn(
            "h-10 w-10 rounded-xl stat-card flex items-center justify-center border border-white/10",
            "transition-all duration-300 hover:scale-105 relative group",
            "focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-background"
          )}
          aria-label={`Notifications, ${notificationCount} unread`}
          title={`${notificationCount} notifications`}
        >
          <Bell size={18} aria-hidden="true" />
          {notificationCount > 0 && (
            <>
              <span
                className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-accent animate-pulse shadow-lg"
                aria-hidden="true"
              />
              <span
                className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-accent animate-ping"
                aria-hidden="true"
              />
              <span className="sr-only">{notificationCount} unread notifications</span>
            </>
          )}
        </button>

        {/* Search Input (Desktop only) */}
        {!isMobile && (
          <form
            onSubmit={handleSearchSubmit}
            className="relative hidden sm:block"
            role="search"
            aria-label="Search projects"
          >
            <label htmlFor="header-search" className="sr-only">
              Search projects
            </label>
            <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
              <Search size={16} className="text-muted-foreground" aria-hidden="true" />
            </div>
            <input
              id="header-search"
              type="search"
              value={searchValue}
              onChange={handleSearchChange}
              placeholder="Search projects..."
              className={cn(
                "pl-12 pr-4 py-3 h-10 rounded-xl text-sm stat-card border border-white/10",
                "focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20",
                "transition-all duration-300 w-[240px] md:w-[320px] backdrop-blur-xl",
                "placeholder:text-muted-foreground/50"
              )}
              aria-describedby="search-description"
            />
            <span id="search-description" className="sr-only">
              Type to search through sustainability projects
            </span>
          </form>
        )}
      </div>
    </header>
  );
}

/**
 * Memoized export of Header
 *
 * Prevents re-renders when:
 * - Parent component updates but props haven't changed
 * - Other parts of the app update
 *
 * Performance Impact:
 * - Reduces renders significantly in large applications
 * - Especially important as header is always visible
 */
export default memo(Header);

/**
 * Display name for debugging
 */
Header.displayName = 'Header';
