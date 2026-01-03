import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-static';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  if (process.env.NODE_ENV !== 'development') {
    return NextResponse.json({ error: 'Not available in production' }, { status: 403 });
  }

  try {
    const { slug } = await params;
    const blogsDir = path.join(process.cwd(), 'data/content/blogs');
    const blogPath = path.join(blogsDir, `${slug}.json`);

    if (!fs.existsSync(blogPath)) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    }

    const blogData = JSON.parse(fs.readFileSync(blogPath, 'utf-8'));
    return NextResponse.json(blogData);
  } catch (error) {
    console.error('Error fetching blog:', error);
    return NextResponse.json({ error: 'Failed to fetch blog' }, { status: 500 });
  }
}
