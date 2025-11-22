/**
 * Formatting Utilities
 *
 * Comprehensive formatting functions for:
 * - Numbers (currency, percentages, large numbers)
 * - Dates and times
 * - File sizes
 * - Durations
 *
 * All functions are pure and tree-shakeable
 *
 * @module lib/formatters
 */

/**
 * Format Options Types
 */
export interface CurrencyFormatOptions {
  currency?: string;
  locale?: string;
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
  notation?: 'standard' | 'compact' | 'scientific' | 'engineering';
}

export interface NumberFormatOptions {
  locale?: string;
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
  notation?: 'standard' | 'compact' | 'scientific' | 'engineering';
  useGrouping?: boolean;
}

export interface DateFormatOptions {
  format?: 'full' | 'long' | 'medium' | 'short' | 'custom';
  locale?: string;
  includeTime?: boolean;
  timeZone?: string;
}

/**
 * Format a number as currency
 *
 * @param value - The numeric value to format
 * @param options - Formatting options
 * @returns Formatted currency string
 *
 * @example
 * ```typescript
 * formatCurrency(1234.56) // "$1,234.56"
 * formatCurrency(1234.56, { currency: 'EUR' }) // "€1,234.56"
 * formatCurrency(1234567, { notation: 'compact' }) // "$1.2M"
 * ```
 */
export function formatCurrency(
  value: number,
  options: CurrencyFormatOptions = {}
): string {
  const {
    currency = 'USD',
    locale = 'en-US',
    minimumFractionDigits = 2,
    maximumFractionDigits = 2,
    notation = 'standard'
  } = options;

  try {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
      minimumFractionDigits,
      maximumFractionDigits,
      notation
    }).format(value);
  } catch (error) {
    console.error('Currency formatting error:', error);
    return `$${value.toFixed(2)}`;
  }
}

/**
 * Format large numbers with abbreviations (K, M, B, T)
 *
 * @param value - The number to format
 * @param decimals - Number of decimal places (default: 1)
 * @returns Formatted string with abbreviation
 *
 * @example
 * ```typescript
 * formatLargeNumber(1234) // "1.2K"
 * formatLargeNumber(1234567) // "1.2M"
 * formatLargeNumber(1234567890) // "1.2B"
 * formatLargeNumber(1234, 2) // "1.23K"
 * ```
 */
export function formatLargeNumber(value: number, decimals: number = 1): string {
  if (value === 0) return '0';

  const absValue = Math.abs(value);
  const sign = value < 0 ? '-' : '';

  const abbreviations = [
    { value: 1e12, symbol: 'T' },
    { value: 1e9, symbol: 'B' },
    { value: 1e6, symbol: 'M' },
    { value: 1e3, symbol: 'K' }
  ];

  for (const { value: threshold, symbol } of abbreviations) {
    if (absValue >= threshold) {
      const formatted = (absValue / threshold).toFixed(decimals);
      return `${sign}${formatted}${symbol}`;
    }
  }

  return `${sign}${absValue.toFixed(decimals)}`;
}

/**
 * Format a number as a percentage
 *
 * @param value - The number to format (0.15 = 15%)
 * @param decimals - Number of decimal places (default: 1)
 * @param options - Additional formatting options
 * @returns Formatted percentage string
 *
 * @example
 * ```typescript
 * formatPercentage(0.156) // "15.6%"
 * formatPercentage(0.156, 0) // "16%"
 * formatPercentage(-0.05) // "-5.0%"
 * ```
 */
export function formatPercentage(
  value: number,
  decimals: number = 1,
  options: Partial<NumberFormatOptions> = {}
): string {
  const {
    locale = 'en-US',
    minimumFractionDigits = decimals,
    maximumFractionDigits = decimals
  } = options;

  try {
    return new Intl.NumberFormat(locale, {
      style: 'percent',
      minimumFractionDigits,
      maximumFractionDigits
    }).format(value);
  } catch (error) {
    console.error('Percentage formatting error:', error);
    return `${(value * 100).toFixed(decimals)}%`;
  }
}

/**
 * Format a number with thousand separators
 *
 * @param value - The number to format
 * @param options - Formatting options
 * @returns Formatted number string
 *
 * @example
 * ```typescript
 * formatNumber(1234567.89) // "1,234,567.89"
 * formatNumber(1234567.89, { maximumFractionDigits: 0 }) // "1,234,568"
 * formatNumber(1234567.89, { locale: 'de-DE' }) // "1.234.567,89"
 * ```
 */
export function formatNumber(
  value: number,
  options: NumberFormatOptions = {}
): string {
  const {
    locale = 'en-US',
    minimumFractionDigits = 0,
    maximumFractionDigits = 2,
    notation = 'standard',
    useGrouping = true
  } = options;

  try {
    return new Intl.NumberFormat(locale, {
      minimumFractionDigits,
      maximumFractionDigits,
      notation,
      useGrouping
    }).format(value);
  } catch (error) {
    console.error('Number formatting error:', error);
    return value.toString();
  }
}

/**
 * Format bytes to human-readable file size
 *
 * @param bytes - The number of bytes
 * @param decimals - Number of decimal places (default: 2)
 * @returns Formatted file size string
 *
 * @example
 * ```typescript
 * formatFileSize(1024) // "1.00 KB"
 * formatFileSize(1234567) // "1.18 MB"
 * formatFileSize(1234567890) // "1.15 GB"
 * ```
 */
export function formatFileSize(bytes: number, decimals: number = 2): string {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${(bytes / Math.pow(k, i)).toFixed(decimals)} ${sizes[i]}`;
}

/**
 * Format a date to a human-readable string
 *
 * @param date - The date to format (Date object, string, or timestamp)
 * @param options - Formatting options
 * @returns Formatted date string
 *
 * @example
 * ```typescript
 * formatDate(new Date()) // "November 22, 2025"
 * formatDate(new Date(), { format: 'short' }) // "11/22/25"
 * formatDate(new Date(), { includeTime: true }) // "November 22, 2025, 3:45 PM"
 * ```
 */
export function formatDate(
  date: Date | string | number,
  options: DateFormatOptions = {}
): string {
  const {
    format = 'medium',
    locale = 'en-US',
    includeTime = false,
    timeZone = undefined
  } = options;

  const dateObj = typeof date === 'string' || typeof date === 'number'
    ? new Date(date)
    : date;

  if (!(dateObj instanceof Date) || isNaN(dateObj.getTime())) {
    console.error('Invalid date:', date);
    return 'Invalid Date';
  }

  try {
    const formatOptions: Intl.DateTimeFormatOptions = {
      timeZone,
      ...getDateFormatOptions(format, includeTime)
    };

    return new Intl.DateTimeFormat(locale, formatOptions).format(dateObj);
  } catch (error) {
    console.error('Date formatting error:', error);
    return dateObj.toLocaleDateString();
  }
}

/**
 * Get Intl.DateTimeFormatOptions based on format string
 */
function getDateFormatOptions(
  format: DateFormatOptions['format'],
  includeTime: boolean
): Intl.DateTimeFormatOptions {
  const timeOptions: Intl.DateTimeFormatOptions = includeTime
    ? { hour: 'numeric', minute: '2-digit' }
    : {};

  switch (format) {
    case 'full':
      return {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        ...timeOptions
      };
    case 'long':
      return {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        ...timeOptions
      };
    case 'medium':
      return {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        ...timeOptions
      };
    case 'short':
      return {
        year: '2-digit',
        month: 'numeric',
        day: 'numeric',
        ...timeOptions
      };
    default:
      return {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        ...timeOptions
      };
  }
}

/**
 * Format a relative time (e.g., "2 hours ago", "in 3 days")
 *
 * @param date - The date to compare against now
 * @param locale - The locale to use (default: 'en-US')
 * @returns Formatted relative time string
 *
 * @example
 * ```typescript
 * formatRelativeTime(new Date(Date.now() - 3600000)) // "1 hour ago"
 * formatRelativeTime(new Date(Date.now() + 86400000)) // "in 1 day"
 * ```
 */
export function formatRelativeTime(
  date: Date | string | number,
  locale: string = 'en-US'
): string {
  const dateObj = typeof date === 'string' || typeof date === 'number'
    ? new Date(date)
    : date;

  if (!(dateObj instanceof Date) || isNaN(dateObj.getTime())) {
    return 'Invalid Date';
  }

  const now = new Date();
  const diffInSeconds = Math.floor((dateObj.getTime() - now.getTime()) / 1000);

  const intervals: Array<[number, Intl.RelativeTimeFormatUnit]> = [
    [31536000, 'year'],
    [2592000, 'month'],
    [86400, 'day'],
    [3600, 'hour'],
    [60, 'minute'],
    [1, 'second']
  ];

  for (const [seconds, unit] of intervals) {
    const interval = Math.floor(Math.abs(diffInSeconds) / seconds);
    if (interval >= 1) {
      try {
        const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' });
        return rtf.format(diffInSeconds > 0 ? interval : -interval, unit);
      } catch (error) {
        console.error('Relative time formatting error:', error);
        return formatDate(dateObj);
      }
    }
  }

  return 'just now';
}

/**
 * Format duration in milliseconds to human-readable string
 *
 * @param ms - Duration in milliseconds
 * @param format - Format type ('long' or 'short')
 * @returns Formatted duration string
 *
 * @example
 * ```typescript
 * formatDuration(3661000) // "1 hour 1 minute 1 second"
 * formatDuration(3661000, 'short') // "1h 1m 1s"
 * ```
 */
export function formatDuration(
  ms: number,
  format: 'long' | 'short' = 'long'
): string {
  if (ms < 0) return '0 seconds';

  const seconds = Math.floor((ms / 1000) % 60);
  const minutes = Math.floor((ms / (1000 * 60)) % 60);
  const hours = Math.floor((ms / (1000 * 60 * 60)) % 24);
  const days = Math.floor(ms / (1000 * 60 * 60 * 24));

  const parts: string[] = [];

  if (days > 0) {
    parts.push(format === 'long' ? `${days} day${days !== 1 ? 's' : ''}` : `${days}d`);
  }
  if (hours > 0) {
    parts.push(format === 'long' ? `${hours} hour${hours !== 1 ? 's' : ''}` : `${hours}h`);
  }
  if (minutes > 0) {
    parts.push(format === 'long' ? `${minutes} minute${minutes !== 1 ? 's' : ''}` : `${minutes}m`);
  }
  if (seconds > 0 || parts.length === 0) {
    parts.push(format === 'long' ? `${seconds} second${seconds !== 1 ? 's' : ''}` : `${seconds}s`);
  }

  return parts.join(' ');
}

/**
 * Format carbon footprint with proper units
 *
 * @param kgCO2e - Carbon footprint in kg CO2 equivalent
 * @param decimals - Number of decimal places
 * @returns Formatted carbon footprint string
 *
 * @example
 * ```typescript
 * formatCarbonFootprint(1234.56) // "1.23 tons CO2e"
 * formatCarbonFootprint(123.45) // "123.45 kg CO2e"
 * ```
 */
export function formatCarbonFootprint(kgCO2e: number, decimals: number = 2): string {
  if (kgCO2e >= 1000) {
    const tons = kgCO2e / 1000;
    return `${tons.toFixed(decimals)} tons CO2e`;
  }
  return `${kgCO2e.toFixed(decimals)} kg CO2e`;
}
