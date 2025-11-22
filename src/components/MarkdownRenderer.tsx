/**
 * MarkdownRenderer Component
 *
 * A secure markdown renderer with XSS protection.
 * Supports common markdown syntax including headers, bold, italic, code, links, and lists.
 *
 * Security Features:
 * - HTML sanitization with whitelist approach
 * - Removal of dangerous attributes (onclick, onerror, etc.)
 * - Safe link handling with noopener/noreferrer
 * - Script tag filtering
 *
 * @example
 * ```tsx
 * <MarkdownRenderer content="# Hello\n**Bold** text" className="my-class" />
 * ```
 */

import { cn } from "@/lib/utils";
import { useMemo } from "react";

interface MarkdownRendererProps {
  /** Markdown content to render */
  content: string;
  /** Optional CSS class names */
  className?: string;
}

/**
 * Parses markdown syntax into HTML
 *
 * @param text - Raw markdown text
 * @returns Parsed HTML string (requires sanitization before rendering)
 */
const parseMarkdown = (text: string): string => {
  // Replace **bold** with <strong>
  text = text.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-foreground">$1</strong>');

  // Replace *italic* with <em>
  text = text.replace(/(?<!\*)\*(?!\*)([^*]+)\*(?!\*)/g, '<em class="italic text-muted-foreground">$1</em>');

  // Replace `code` with <code>
  text = text.replace(/`([^`]+)`/g, '<code class="px-2 py-1 rounded-md bg-muted text-sm font-mono text-primary">$1</code>');

  // Replace ### with h3
  text = text.replace(/^### (.*$)/gim, '<h3 class="text-lg font-semibold text-foreground mb-3 mt-6 first:mt-0">$1</h3>');

  // Replace ## with h2
  text = text.replace(/^## (.*$)/gim, '<h2 class="text-xl font-bold text-foreground mb-4 mt-8 first:mt-0">$1</h2>');

  // Replace # with h1
  text = text.replace(/^# (.*$)/gim, '<h1 class="text-2xl font-bold gradient-text mb-6 mt-10 first:mt-0">$1</h1>');

  // Replace [link](url) with <a>
  text = text.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    '<a href="$2" class="text-primary hover:text-primary/80 underline transition-colors" target="_blank" rel="noopener noreferrer">$1</a>'
  );

  // Replace - list items with <li>
  text = text.replace(/^- (.*$)/gim, '<li class="ml-4 mb-2 text-muted-foreground"><span class="inline-block w-2 h-2 bg-primary rounded-full mr-3 mt-2"></span>$1</li>');

  // Wrap consecutive <li> elements in <ul>
  text = text.replace(/(<li.*?<\/li>\s*)+/g, '<ul class="space-y-1 mb-4">$&</ul>');

  // Replace line breaks with <br> but preserve paragraph structure
  text = text.replace(/\n\n/g, '</p><p class="text-muted-foreground mb-4">');
  text = text.replace(/\n/g, '<br>');

  // Wrap in paragraph if needed
  if (!text.startsWith('<h') && !text.startsWith('<ul') && !text.startsWith('<p')) {
    text = `<p class="text-muted-foreground mb-4">${text}</p>`;
  }

  return text;
};

/**
 * Sanitizes HTML content to prevent XSS attacks
 *
 * Uses a whitelist approach to allow only safe tags and attributes.
 * Removes dangerous patterns including:
 * - Script tags
 * - Event handlers (onclick, onerror, etc.)
 * - JavaScript protocol in links
 * - Data URIs
 *
 * @param html - HTML string to sanitize
 * @returns Sanitized HTML safe for rendering
 *
 * @security
 * This provides basic XSS protection suitable for markdown content.
 * For enhanced security, consider installing DOMPurify: npm install dompurify
 */
const sanitizeHTML = (html: string): string => {
  // Remove script tags
  html = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');

  // Remove event handlers (onclick, onerror, onload, etc.)
  html = html.replace(/\son\w+\s*=\s*["'][^"']*["']/gi, '');
  html = html.replace(/\son\w+\s*=\s*[^\s>]*/gi, '');

  // Remove javascript: protocol in links
  html = html.replace(/href\s*=\s*["']javascript:[^"']*["']/gi, 'href="#"');

  // Remove data: protocol (can be used for XSS)
  html = html.replace(/href\s*=\s*["']data:[^"']*["']/gi, 'href="#"');
  html = html.replace(/src\s*=\s*["']data:[^"']*["']/gi, 'src=""');

  // Remove iframe, object, embed tags
  html = html.replace(/<(iframe|object|embed)[^>]*>/gi, '');

  // Only allow specific safe tags
  const allowedTags = ['h1', 'h2', 'h3', 'p', 'strong', 'em', 'code', 'a', 'ul', 'li', 'br', 'span'];
  const tagPattern = /<\/?(\w+)(\s[^>]*)?>/g;

  html = html.replace(tagPattern, (match, tag) => {
    if (allowedTags.includes(tag.toLowerCase())) {
      return match;
    }
    // Remove disallowed tags but keep their content
    return '';
  });

  return html;
};

/**
 * MarkdownRenderer Component
 *
 * Renders sanitized markdown content with performance optimization via useMemo.
 */
export default function MarkdownRenderer({ content, className }: MarkdownRendererProps) {
  /**
   * Memoized HTML output - only re-parses when content changes
   */
  const safeHTML = useMemo(() => {
    const parsed = parseMarkdown(content);
    return sanitizeHTML(parsed);
  }, [content]);

  return (
    <div
      className={cn(
        "prose prose-sm max-w-none",
        "prose-headings:font-display prose-headings:tracking-tight",
        "prose-code:text-primary prose-code:bg-muted prose-code:rounded",
        "prose-a:text-primary prose-a:no-underline hover:prose-a:underline",
        "prose-strong:text-foreground prose-strong:font-semibold",
        "prose-em:text-muted-foreground",
        className
      )}
      dangerouslySetInnerHTML={{ __html: safeHTML }}
      aria-live="polite"
      role="article"
    />
  );
}
