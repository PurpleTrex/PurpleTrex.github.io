import { marked } from 'marked';
import DOMPurify from 'dompurify';
import matter from 'gray-matter';
import type { ReadmeData } from '../types';

/**
 * Parse README markdown with front matter
 */
export function parseReadme(content: string): ReadmeData {
  try {
    const { data, content: markdown } = matter(content);
    
    return {
      content: markdown,
      metadata: data as ReadmeData['metadata'],
    };
  } catch {
    return {
      content,
      metadata: {},
    };
  }
}

/**
 * Convert markdown to safe HTML
 */
export async function markdownToHtml(markdown: string): Promise<string> {
  try {
    const html = await marked(markdown);
    return DOMPurify.sanitize(html);
  } catch {
    return '';
  }
}

/**
 * Extract images from markdown
 */
export function extractImages(markdown: string): string[] {
  const imageRegex = /!\[.*?\]\((.*?)\)/g;
  const images: string[] = [];
  let match;

  while ((match = imageRegex.exec(markdown)) !== null) {
    if (match[1]) {
      images.push(match[1]);
    }
  }

  return images;
}

/**
 * Extract links from markdown
 */
export function extractLinks(markdown: string): Array<{ text: string; url: string }> {
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  const links: Array<{ text: string; url: string }> = [];
  let match;

  while ((match = linkRegex.exec(markdown)) !== null) {
    if (match[1] && match[2]) {
      links.push({ text: match[1], url: match[2] });
    }
  }

  return links;
}

/**
 * Get first paragraph from markdown
 */
export function getFirstParagraph(markdown: string): string {
  const paragraphs = markdown.split('\n\n');
  for (const para of paragraphs) {
    const trimmed = para.trim();
    if (trimmed && !trimmed.startsWith('#') && !trimmed.startsWith('!')) {
      return trimmed;
    }
  }
  return '';
}

/**
 * Extract demo URL from README
 */
export function extractDemoUrl(markdown: string, metadata?: ReadmeData['metadata']): string | undefined {
  // Check metadata first
  if (metadata?.demo) {
    return metadata.demo;
  }

  // Look for common demo patterns in markdown
  const demoPatterns = [
    /\[.*?demo.*?\]\((https?:\/\/[^)]+)\)/i,
    /\[.*?live.*?\]\((https?:\/\/[^)]+)\)/i,
    /demo:?\s*(https?:\/\/\S+)/i,
    /live:?\s*(https?:\/\/\S+)/i,
  ];

  for (const pattern of demoPatterns) {
    const match = markdown.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }

  return undefined;
}
