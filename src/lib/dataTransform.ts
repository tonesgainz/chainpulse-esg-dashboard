/**
 * Data Transformation Utilities
 *
 * Functions for transforming and manipulating data:
 * - Array utilities
 * - Object utilities
 * - Data aggregation
 * - Statistical functions
 * - Chart data transformation
 *
 * @module lib/dataTransform
 */

/**
 * Group array of objects by a key
 *
 * @param array - Array to group
 * @param key - Key to group by
 * @returns Grouped object
 *
 * @example
 * ```typescript
 * const data = [
 *   { category: 'A', value: 10 },
 *   { category: 'B', value: 20 },
 *   { category: 'A', value: 15 }
 * ];
 * groupBy(data, 'category')
 * // { A: [{ category: 'A', value: 10 }, { category: 'A', value: 15 }], B: [...] }
 * ```
 */
export function groupBy<T>(array: T[], key: keyof T): Record<string, T[]> {
  return array.reduce((result, item) => {
    const groupKey = String(item[key]);
    if (!result[groupKey]) {
      result[groupKey] = [];
    }
    result[groupKey].push(item);
    return result;
  }, {} as Record<string, T[]>);
}

/**
 * Calculate sum of values in array of objects
 *
 * @param array - Array of objects
 * @param key - Key to sum
 * @returns Sum of values
 *
 * @example
 * ```typescript
 * const data = [{ value: 10 }, { value: 20 }, { value: 30 }];
 * sumBy(data, 'value') // 60
 * ```
 */
export function sumBy<T>(array: T[], key: keyof T): number {
  return array.reduce((sum, item) => {
    const value = item[key];
    return sum + (typeof value === 'number' ? value : 0);
  }, 0);
}

/**
 * Calculate average of values in array of objects
 *
 * @param array - Array of objects
 * @param key - Key to average
 * @returns Average value
 *
 * @example
 * ```typescript
 * const data = [{ value: 10 }, { value: 20 }, { value: 30 }];
 * averageBy(data, 'value') // 20
 * ```
 */
export function averageBy<T>(array: T[], key: keyof T): number {
  if (array.length === 0) return 0;
  return sumBy(array, key) / array.length;
}

/**
 * Find minimum value in array of objects
 *
 * @param array - Array of objects
 * @param key - Key to find minimum
 * @returns Minimum value
 *
 * @example
 * ```typescript
 * const data = [{ value: 10 }, { value: 5 }, { value: 20 }];
 * minBy(data, 'value') // 5
 * ```
 */
export function minBy<T>(array: T[], key: keyof T): number {
  if (array.length === 0) return 0;
  return Math.min(...array.map(item => {
    const value = item[key];
    return typeof value === 'number' ? value : Infinity;
  }));
}

/**
 * Find maximum value in array of objects
 *
 * @param array - Array of objects
 * @param key - Key to find maximum
 * @returns Maximum value
 *
 * @example
 * ```typescript
 * const data = [{ value: 10 }, { value: 25 }, { value: 20 }];
 * maxBy(data, 'value') // 25
 * ```
 */
export function maxBy<T>(array: T[], key: keyof T): number {
  if (array.length === 0) return 0;
  return Math.max(...array.map(item => {
    const value = item[key];
    return typeof value === 'number' ? value : -Infinity;
  }));
}

/**
 * Sort array of objects by key
 *
 * @param array - Array to sort
 * @param key - Key to sort by
 * @param order - Sort order ('asc' or 'desc')
 * @returns Sorted array (new copy)
 *
 * @example
 * ```typescript
 * const data = [{ name: 'C' }, { name: 'A' }, { name: 'B' }];
 * sortBy(data, 'name') // [{ name: 'A' }, { name: 'B' }, { name: 'C' }]
 * sortBy(data, 'name', 'desc') // [{ name: 'C' }, { name: 'B' }, { name: 'A' }]
 * ```
 */
export function sortBy<T>(
  array: T[],
  key: keyof T,
  order: 'asc' | 'desc' = 'asc'
): T[] {
  return [...array].sort((a, b) => {
    const aVal = a[key];
    const bVal = b[key];

    if (aVal < bVal) return order === 'asc' ? -1 : 1;
    if (aVal > bVal) return order === 'asc' ? 1 : -1;
    return 0;
  });
}

/**
 * Remove duplicate objects from array based on key
 *
 * @param array - Array with potential duplicates
 * @param key - Key to check for uniqueness
 * @returns Array with unique items
 *
 * @example
 * ```typescript
 * const data = [
 *   { id: 1, name: 'A' },
 *   { id: 2, name: 'B' },
 *   { id: 1, name: 'A' }
 * ];
 * uniqueBy(data, 'id') // [{ id: 1, name: 'A' }, { id: 2, name: 'B' }]
 * ```
 */
export function uniqueBy<T>(array: T[], key: keyof T): T[] {
  const seen = new Set();
  return array.filter(item => {
    const value = item[key];
    if (seen.has(value)) {
      return false;
    }
    seen.add(value);
    return true;
  });
}

/**
 * Chunk array into smaller arrays of specified size
 *
 * @param array - Array to chunk
 * @param size - Size of each chunk
 * @returns Array of chunks
 *
 * @example
 * ```typescript
 * chunk([1, 2, 3, 4, 5], 2) // [[1, 2], [3, 4], [5]]
 * ```
 */
export function chunk<T>(array: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
}

/**
 * Calculate percentage change between two values
 *
 * @param oldValue - Previous value
 * @param newValue - Current value
 * @param decimals - Number of decimal places
 * @returns Percentage change
 *
 * @example
 * ```typescript
 * percentageChange(100, 150) // 50
 * percentageChange(200, 150) // -25
 * ```
 */
export function percentageChange(
  oldValue: number,
  newValue: number,
  decimals: number = 2
): number {
  if (oldValue === 0) return 0;
  const change = ((newValue - oldValue) / Math.abs(oldValue)) * 100;
  return Number(change.toFixed(decimals));
}

/**
 * Calculate moving average for time series data
 *
 * @param values - Array of numbers
 * @param window - Window size for moving average
 * @returns Array of moving averages
 *
 * @example
 * ```typescript
 * movingAverage([1, 2, 3, 4, 5], 3)
 * // [1, 1.5, 2, 3, 4] (first values padded)
 * ```
 */
export function movingAverage(values: number[], window: number): number[] {
  if (window < 1 || values.length === 0) return values;

  const result: number[] = [];
  for (let i = 0; i < values.length; i++) {
    const start = Math.max(0, i - window + 1);
    const windowValues = values.slice(start, i + 1);
    const avg = windowValues.reduce((sum, val) => sum + val, 0) / windowValues.length;
    result.push(avg);
  }
  return result;
}

/**
 * Normalize values to 0-1 range
 *
 * @param values - Array of numbers
 * @returns Normalized array
 *
 * @example
 * ```typescript
 * normalize([10, 20, 30, 40, 50])
 * // [0, 0.25, 0.5, 0.75, 1]
 * ```
 */
export function normalize(values: number[]): number[] {
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min;

  if (range === 0) return values.map(() => 0);

  return values.map(value => (value - min) / range);
}

/**
 * Calculate standard deviation
 *
 * @param values - Array of numbers
 * @returns Standard deviation
 *
 * @example
 * ```typescript
 * standardDeviation([2, 4, 4, 4, 5, 5, 7, 9]) // 2
 * ```
 */
export function standardDeviation(values: number[]): number {
  if (values.length === 0) return 0;

  const avg = values.reduce((sum, val) => sum + val, 0) / values.length;
  const squareDiffs = values.map(value => Math.pow(value - avg, 2));
  const avgSquareDiff = squareDiffs.reduce((sum, val) => sum + val, 0) / values.length;

  return Math.sqrt(avgSquareDiff);
}

/**
 * Transform data for chart display
 *
 * @param data - Raw data array
 * @param xKey - Key for x-axis
 * @param yKey - Key for y-axis
 * @returns Chart-ready data
 *
 * @example
 * ```typescript
 * const raw = [
 *   { date: '2024-01', emissions: 100 },
 *   { date: '2024-02', emissions: 120 }
 * ];
 * transformForChart(raw, 'date', 'emissions')
 * // [{ x: '2024-01', y: 100 }, { x: '2024-02', y: 120 }]
 * ```
 */
export function transformForChart<T>(
  data: T[],
  xKey: keyof T,
  yKey: keyof T
): Array<{ x: T[keyof T]; y: T[keyof T] }> {
  return data.map(item => ({
    x: item[xKey],
    y: item[yKey]
  }));
}

/**
 * Aggregate data by time period
 *
 * @param data - Time series data
 * @param dateKey - Key containing date
 * @param valueKey - Key containing value to aggregate
 * @param period - Aggregation period ('day', 'week', 'month', 'year')
 * @returns Aggregated data
 *
 * @example
 * ```typescript
 * const data = [
 *   { date: '2024-01-01', value: 10 },
 *   { date: '2024-01-02', value: 15 },
 *   { date: '2024-02-01', value: 20 }
 * ];
 * aggregateByPeriod(data, 'date', 'value', 'month')
 * // [{ period: '2024-01', total: 25 }, { period: '2024-02', total: 20 }]
 * ```
 */
export function aggregateByPeriod<T>(
  data: T[],
  dateKey: keyof T,
  valueKey: keyof T,
  period: 'day' | 'week' | 'month' | 'year' = 'month'
): Array<{ period: string; total: number; average: number; count: number }> {
  const grouped = data.reduce((acc, item) => {
    const date = new Date(item[dateKey] as unknown as string);
    const key = formatPeriodKey(date, period);

    if (!acc[key]) {
      acc[key] = { values: [], period: key };
    }

    const value = item[valueKey];
    if (typeof value === 'number') {
      acc[key].values.push(value);
    }

    return acc;
  }, {} as Record<string, { values: number[]; period: string }>);

  return Object.values(grouped).map(({ values, period }) => ({
    period,
    total: values.reduce((sum, val) => sum + val, 0),
    average: values.reduce((sum, val) => sum + val, 0) / values.length,
    count: values.length
  }));
}

/**
 * Format date to period key
 */
function formatPeriodKey(date: Date, period: string): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  switch (period) {
    case 'day':
      return `${year}-${month}-${day}`;
    case 'week':
      // ISO week number
      const weekNum = getWeekNumber(date);
      return `${year}-W${String(weekNum).padStart(2, '0')}`;
    case 'month':
      return `${year}-${month}`;
    case 'year':
      return String(year);
    default:
      return `${year}-${month}`;
  }
}

/**
 * Get ISO week number for date
 */
function getWeekNumber(date: Date): number {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() + 4 - (d.getDay() || 7));
  const yearStart = new Date(d.getFullYear(), 0, 1);
  return Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
}

/**
 * Deep clone an object
 *
 * @param obj - Object to clone
 * @returns Deep clone of object
 *
 * @example
 * ```typescript
 * const original = { a: { b: { c: 1 } } };
 * const cloned = deepClone(original);
 * cloned.a.b.c = 2; // Original remains unchanged
 * ```
 */
export function deepClone<T>(obj: T): T {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  if (obj instanceof Date) {
    return new Date(obj.getTime()) as unknown as T;
  }

  if (obj instanceof Array) {
    return obj.map(item => deepClone(item)) as unknown as T;
  }

  if (obj instanceof Object) {
    const cloned = {} as T;
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        cloned[key] = deepClone(obj[key]);
      }
    }
    return cloned;
  }

  return obj;
}
