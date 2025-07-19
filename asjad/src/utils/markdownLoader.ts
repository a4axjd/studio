
import { marked } from 'marked';

interface MarkdownFile {
  slug: string;
  frontmatter: Record<string, any>;
  content: string;
}

export const loadMarkdownFiles = async (type: 'articles' | 'projects'): Promise<MarkdownFile[]> => {
  try {
    // Get list of markdown files from the public folder
    const response = await fetch(`/${type}/index.json`);
    if (!response.ok) return [];
    
    const fileList: string[] = await response.json();
    
    const files = await Promise.all(
      fileList.map(async (filename) => {
        const fileResponse = await fetch(`/${type}/${filename}`);
        const content = await fileResponse.text();
        
        console.log(`Loading ${filename}, content preview:`, content.substring(0, 200));
        
        // Parse frontmatter and content
        const { frontmatter, content: markdownContent } = parseFrontmatter(content);
        
        console.log(`Parsed frontmatter for ${filename}:`, frontmatter);
        
        return {
          slug: filename.replace('.md', ''),
          frontmatter,
          content: markdownContent
        };
      })
    );
    
    return files;
  } catch (error) {
    console.error(`Error loading ${type}:`, error);
    return [];
  }
};

const parseFrontmatter = (content: string) => {
  console.log('Raw content being parsed:', content.substring(0, 300));
  
  // More flexible regex that handles different line endings and spacing
  const frontmatterRegex = /^---\s*[\r\n]+([\s\S]*?)[\r\n]+---\s*[\r\n]+([\s\S]*)$/;
  const match = content.trim().match(frontmatterRegex);
  
  if (!match) {
    console.log('No frontmatter match found, trying alternative patterns');
    // Try alternative pattern without newlines after ---
    const altRegex = /^---([\s\S]*?)---\s*([\s\S]*)$/;
    const altMatch = content.trim().match(altRegex);
    
    if (!altMatch) {
      console.log('No frontmatter found with any pattern');
      return { frontmatter: {}, content };
    }
    
    console.log('Alternative pattern matched');
    const frontmatterText = altMatch[1];
    const markdownContent = altMatch[2];
    
    return { 
      frontmatter: parseYamlLikeFrontmatter(frontmatterText), 
      content: markdownContent.trim() 
    };
  }
  
  const frontmatterText = match[1];
  const markdownContent = match[2];
  
  console.log('Extracted frontmatter text:', frontmatterText);
  
  return { 
    frontmatter: parseYamlLikeFrontmatter(frontmatterText), 
    content: markdownContent.trim() 
  };
};

const parseYamlLikeFrontmatter = (frontmatterText: string) => {
  const frontmatter: Record<string, any> = {};
  const lines = frontmatterText.split(/[\r\n]+/);
  
  for (const line of lines) {
    const trimmedLine = line.trim();
    if (!trimmedLine || trimmedLine.startsWith('#')) continue;
    
    const colonIndex = trimmedLine.indexOf(':');
    if (colonIndex === -1) continue;
    
    const key = trimmedLine.substring(0, colonIndex).trim();
    let value = trimmedLine.substring(colonIndex + 1).trim();
    
    if (!key) continue;
    
    // Remove surrounding quotes if present
    if ((value.startsWith('"') && value.endsWith('"')) || 
        (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    
    // Store the value (even if empty)
    frontmatter[key] = value || '';
  }
  
  console.log('Final parsed frontmatter:', frontmatter);
  return frontmatter;
};

// Configure marked for GitHub Flavored Markdown
marked.setOptions({
  gfm: true,
  breaks: true
});

export const parseMarkdown = (markdown: string): string => {
  const html = marked.parse(markdown) as string;
  
  // Add custom classes to elements for styling
  return html
    .replace(/<h1>/g, '<h1 class="text-4xl font-bold mb-6 font-electric">')
    .replace(/<h2>/g, '<h2 class="text-3xl font-bold mb-4 font-electric">')
    .replace(/<h3>/g, '<h3 class="text-2xl font-bold mb-3 font-electric">')
    .replace(/<h4>/g, '<h4 class="text-xl font-bold mb-2 font-electric">')
    .replace(/<h5>/g, '<h5 class="text-lg font-bold mb-2 font-electric">')
    .replace(/<h6>/g, '<h6 class="text-base font-bold mb-2 font-electric">')
    .replace(/<p>/g, '<p class="mb-4 leading-relaxed font-electrolize">')
    .replace(/<ul>/g, '<ul class="list-disc list-inside mb-4 space-y-2 font-electrolize">')
    .replace(/<ol>/g, '<ol class="list-decimal list-inside mb-4 space-y-2 font-electrolize">')
    .replace(/<li>/g, '<li class="leading-relaxed">')
    .replace(/<blockquote>/g, '<blockquote class="border-l-4 border-accent pl-4 mb-4 italic text-muted-foreground font-electrolize">')
    .replace(/<table>/g, '<table class="w-full border-collapse border border-border mb-4">')
    .replace(/<th>/g, '<th class="border border-border px-4 py-2 bg-muted font-bold text-left font-electrolize">')
    .replace(/<td>/g, '<td class="border border-border px-4 py-2 font-electrolize">')
    .replace(/<code>/g, '<code class="bg-muted px-1 py-0.5 rounded text-sm font-mono">')
    .replace(/<pre>/g, '<pre class="bg-muted p-4 rounded mb-4 overflow-x-auto">')
    .replace(/<pre class="bg-muted p-4 rounded mb-4 overflow-x-auto"><code/g, '<pre class="bg-muted p-4 rounded mb-4 overflow-x-auto"><code class="font-mono text-sm"');
};