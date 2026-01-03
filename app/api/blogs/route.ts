import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-static';

export async function GET() {
  if (process.env.NODE_ENV !== 'development') {
    return NextResponse.json({ error: 'Not available in production' }, { status: 403 });
  }

  try {
    const blogsDir = path.join(process.cwd(), 'data/content/blogs');
    const indexPath = path.join(blogsDir, 'index.json');

    console.log('Blogs directory:', blogsDir);
    console.log('Index path:', indexPath);
    console.log('Index exists:', fs.existsSync(indexPath));

    if (!fs.existsSync(indexPath)) {
      console.log('Index file not found, returning empty posts array');
      return NextResponse.json({ posts: [] });
    }

    const indexData = JSON.parse(fs.readFileSync(indexPath, 'utf-8'));
    console.log('Successfully loaded blog index with', indexData.posts?.length || 0, 'posts');
    return NextResponse.json(indexData);
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return NextResponse.json({ error: 'Failed to fetch blogs' }, { status: 500 });
  }
}
