/**
 * Local Storage Utilities
 *
 * Type-safe localStorage wrapper with:
 * - Automatic JSON serialization/deserialization
 * - Error handling
 * - Expiration support
 * - Fallback for SSR/browsers without localStorage
 * - Type safety with TypeScript generics
 *
 * @module lib/storage
 */

/**
 * Storage item with metadata
 */
interface StorageItem<T> {
  value: T;
  expiresAt?: number;
  createdAt: number;
}

/**
 * Storage options
 */
interface StorageOptions {
  /** Time-to-live in milliseconds */
  ttl?: number;
}

/**
 * Check if localStorage is available
 *
 * @returns True if localStorage is available
 */
function isLocalStorageAvailable(): boolean {
  try {
    const test = '__storage_test__';
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch {
    return false;
  }
}

/**
 * Get an item from localStorage
 *
 * @param key - The key to retrieve
 * @param defaultValue - Default value if key doesn't exist
 * @returns The stored value or default value
 *
 * @example
 * ```typescript
 * const theme = getItem<string>('theme', 'light');
 * const user = getItem<User>('user');
 * ```
 */
export function getItem<T>(key: string, defaultValue?: T): T | null {
  if (!isLocalStorageAvailable()) {
    console.warn('localStorage is not available');
    return defaultValue ?? null;
  }

  try {
    const item = localStorage.getItem(key);
    if (!item) {
      return defaultValue ?? null;
    }

    const parsed: StorageItem<T> = JSON.parse(item);

    // Check if item has expired
    if (parsed.expiresAt && Date.now() > parsed.expiresAt) {
      localStorage.removeItem(key);
      return defaultValue ?? null;
    }

    return parsed.value;
  } catch (error) {
    console.error(`Error reading from localStorage (key: ${key}):`, error);
    return defaultValue ?? null;
  }
}

/**
 * Set an item in localStorage
 *
 * @param key - The key to store
 * @param value - The value to store
 * @param options - Storage options (e.g., TTL)
 * @returns True if successful
 *
 * @example
 * ```typescript
 * setItem('theme', 'dark');
 * setItem('user', { name: 'John' }, { ttl: 3600000 }); // 1 hour TTL
 * ```
 */
export function setItem<T>(
  key: string,
  value: T,
  options: StorageOptions = {}
): boolean {
  if (!isLocalStorageAvailable()) {
    console.warn('localStorage is not available');
    return false;
  }

  try {
    const item: StorageItem<T> = {
      value,
      createdAt: Date.now(),
      ...(options.ttl && { expiresAt: Date.now() + options.ttl })
    };

    localStorage.setItem(key, JSON.stringify(item));
    return true;
  } catch (error) {
    console.error(`Error writing to localStorage (key: ${key}):`, error);
    return false;
  }
}

/**
 * Remove an item from localStorage
 *
 * @param key - The key to remove
 * @returns True if successful
 *
 * @example
 * ```typescript
 * removeItem('theme');
 * ```
 */
export function removeItem(key: string): boolean {
  if (!isLocalStorageAvailable()) {
    return false;
  }

  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error(`Error removing from localStorage (key: ${key}):`, error);
    return false;
  }
}

/**
 * Clear all items from localStorage
 *
 * @returns True if successful
 *
 * @example
 * ```typescript
 * clear();
 * ```
 */
export function clear(): boolean {
  if (!isLocalStorageAvailable()) {
    return false;
  }

  try {
    localStorage.clear();
    return true;
  } catch (error) {
    console.error('Error clearing localStorage:', error);
    return false;
  }
}

/**
 * Get all keys in localStorage with a specific prefix
 *
 * @param prefix - The prefix to filter by
 * @returns Array of matching keys
 *
 * @example
 * ```typescript
 * const appKeys = getKeys('app_'); // ['app_theme', 'app_user', ...]
 * ```
 */
export function getKeys(prefix?: string): string[] {
  if (!isLocalStorageAvailable()) {
    return [];
  }

  try {
    const keys: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && (!prefix || key.startsWith(prefix))) {
        keys.push(key);
      }
    }
    return keys;
  } catch (error) {
    console.error('Error getting keys from localStorage:', error);
    return [];
  }
}

/**
 * Remove all items with a specific prefix
 *
 * @param prefix - The prefix to filter by
 * @returns Number of items removed
 *
 * @example
 * ```typescript
 * removeByPrefix('cache_'); // Removes all cache items
 * ```
 */
export function removeByPrefix(prefix: string): number {
  const keys = getKeys(prefix);
  let removed = 0;

  for (const key of keys) {
    if (removeItem(key)) {
      removed++;
    }
  }

  return removed;
}

/**
 * Check if a key exists in localStorage
 *
 * @param key - The key to check
 * @returns True if key exists and hasn't expired
 *
 * @example
 * ```typescript
 * if (hasItem('user')) {
 *   // User is logged in
 * }
 * ```
 */
export function hasItem(key: string): boolean {
  if (!isLocalStorageAvailable()) {
    return false;
  }

  try {
    const item = localStorage.getItem(key);
    if (!item) {
      return false;
    }

    const parsed: StorageItem<unknown> = JSON.parse(item);

    // Check if expired
    if (parsed.expiresAt && Date.now() > parsed.expiresAt) {
      localStorage.removeItem(key);
      return false;
    }

    return true;
  } catch {
    return false;
  }
}

/**
 * Get the size of localStorage in bytes
 *
 * @returns Size in bytes
 *
 * @example
 * ```typescript
 * const size = getSize();
 * console.log(`Storage used: ${(size / 1024).toFixed(2)} KB`);
 * ```
 */
export function getSize(): number {
  if (!isLocalStorageAvailable()) {
    return 0;
  }

  try {
    let total = 0;
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key) {
        const value = localStorage.getItem(key);
        if (value) {
          total += key.length + value.length;
        }
      }
    }
    // Multiply by 2 for UTF-16 encoding
    return total * 2;
  } catch {
    return 0;
  }
}

/**
 * Clean up expired items from localStorage
 *
 * @returns Number of items removed
 *
 * @example
 * ```typescript
 * // Run periodically to clean up expired items
 * setInterval(() => {
 *   const removed = cleanupExpired();
 *   console.log(`Cleaned up ${removed} expired items`);
 * }, 3600000); // Every hour
 * ```
 */
export function cleanupExpired(): number {
  if (!isLocalStorageAvailable()) {
    return 0;
  }

  let removed = 0;
  const now = Date.now();

  try {
    for (let i = localStorage.length - 1; i >= 0; i--) {
      const key = localStorage.key(i);
      if (!key) continue;

      const item = localStorage.getItem(key);
      if (!item) continue;

      try {
        const parsed: StorageItem<unknown> = JSON.parse(item);
        if (parsed.expiresAt && now > parsed.expiresAt) {
          localStorage.removeItem(key);
          removed++;
        }
      } catch {
        // Skip invalid items
      }
    }
  } catch (error) {
    console.error('Error cleaning up expired items:', error);
  }

  return removed;
}

/**
 * Create a namespaced storage instance
 *
 * @param namespace - The namespace prefix
 * @returns Namespaced storage interface
 *
 * @example
 * ```typescript
 * const appStorage = createNamespace('app');
 * appStorage.set('theme', 'dark');
 * const theme = appStorage.get('theme'); // Stored as 'app_theme'
 * ```
 */
export function createNamespace(namespace: string) {
  const prefix = `${namespace}_`;

  return {
    get: <T>(key: string, defaultValue?: T) =>
      getItem<T>(`${prefix}${key}`, defaultValue),

    set: <T>(key: string, value: T, options?: StorageOptions) =>
      setItem(`${prefix}${key}`, value, options),

    remove: (key: string) =>
      removeItem(`${prefix}${key}`),

    has: (key: string) =>
      hasItem(`${prefix}${key}`),

    clear: () =>
      removeByPrefix(prefix),

    keys: () =>
      getKeys(prefix).map(k => k.replace(prefix, ''))
  };
}

/**
 * Storage constants
 */
export const STORAGE_KEYS = {
  // User preferences
  THEME: 'theme',
  LANGUAGE: 'language',
  SIDEBAR_COLLAPSED: 'sidebar_collapsed',

  // App state
  LAST_REFRESH: 'last_refresh',
  SELECTED_FILTERS: 'selected_filters',
  DASHBOARD_LAYOUT: 'dashboard_layout',

  // Cache
  ESG_DATA_CACHE: 'cache_esg_data',
  CARBON_DATA_CACHE: 'cache_carbon_data',
  SUPPLIERS_CACHE: 'cache_suppliers',

  // User data
  USER_PREFERENCES: 'user_preferences',
  RECENT_SEARCHES: 'recent_searches'
} as const;

/**
 * Default storage instance
 */
export const storage = {
  get: getItem,
  set: setItem,
  remove: removeItem,
  has: hasItem,
  clear,
  getKeys,
  removeByPrefix,
  getSize,
  cleanupExpired,
  createNamespace,
  keys: STORAGE_KEYS
};
