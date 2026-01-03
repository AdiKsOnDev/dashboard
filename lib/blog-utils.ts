/**
 * Generates a URL-friendly slug from text
 * @param text - The text to convert to a slug
 * @returns URL-safe slug string
 */
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

/**
 * Estimates reading time based on word count
 * @param text - The text content to analyze
 * @param wordsPerMinute - Average reading speed (default: 200)
 * @returns Formatted read time string (e.g., "5 min read")
 */
export function estimateReadTime(text: string, wordsPerMinute: number = 200): string {
  const words = text.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
}

/**
 * Generates a unique ID based on current timestamp
 * @returns Unique ID string
 */
export function generateBlogId(): string {
  return Date.now().toString();
}

/**
 * Downloads a JSON object as a file
 * @param data - The data to download
 * @param filename - The filename for the download
 */
export function downloadJSON(data: object, filename: string): void {
  const json = JSON.stringify(data, null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename.endsWith('.json') ? filename : `${filename}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/**
 * Copies text to clipboard
 * @param text - The text to copy
 * @returns Promise that resolves when copy is complete
 */
export async function copyToClipboard(text: string): Promise<void> {
  await navigator.clipboard.writeText(text);
}

/**
 * Gets the base path for API routes
 */
function getBasePath(): string {
  return '/dashboard';
}

/**
 * Fetches all blog posts from the index
 * @returns Promise with array of blog metadata
 */
export async function fetchBlogPosts(): Promise<any[]> {
  try {
    const basePath = getBasePath();
    const response = await fetch(`${basePath}/api/blogs`, {
      cache: 'no-store'
    });
    if (!response.ok) {
      return [];
    }
    const data = await response.json();
    return data.posts || [];
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
}

/**
 * Fetches a single blog post by slug
 * @param slug - The blog post slug
 * @returns Promise with full blog post data
 */
export async function fetchBlogPost(slug: string): Promise<any> {
  const basePath = getBasePath();
  const response = await fetch(`${basePath}/api/blogs/${slug}`, {
    cache: 'no-store'
  });
  if (!response.ok) {
    throw new Error('Failed to fetch blog post');
  }
  return response.json();
}
