import { cn } from "@/lib/utils";

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

export default function MarkdownRenderer({ content, className }: MarkdownRendererProps) {
  // Simple markdown parser for common elements
  const parseMarkdown = (text: string) => {
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
    text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-primary hover:text-primary/80 underline transition-colors" target="_blank" rel="noopener noreferrer">$1</a>');
    
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
      dangerouslySetInnerHTML={{ __html: parseMarkdown(content) }}
    />
  );
}