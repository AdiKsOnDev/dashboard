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
