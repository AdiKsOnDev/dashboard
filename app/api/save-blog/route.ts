import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
  // Only allow in development
  if (process.env.NODE_ENV !== 'development') {
    return NextResponse.json({ error: 'Not available in production' }, { status: 403 });
  }

  try {
    const blogPost = await request.json();

    // Validate required fields
    if (!blogPost.title || !blogPost.slug || !blogPost.content) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const blogsDir = path.join(process.cwd(), 'data/blogs');
    const indexPath = path.join(blogsDir, 'index.json');
    const blogPath = path.join(blogsDir, `${blogPost.slug}.json`);

    // Check if blog with same slug already exists
    if (fs.existsSync(blogPath)) {
      return NextResponse.json({ error: 'Blog with this slug already exists' }, { status: 409 });
    }

    // Read current index
    const indexData = JSON.parse(fs.readFileSync(indexPath, 'utf-8'));

    // Create metadata entry (without content)
    const metadata = {
      id: blogPost.id,
      slug: blogPost.slug,
      title: blogPost.title,
      excerpt: blogPost.excerpt,
      coverImage: blogPost.coverImage,
      publishedAt: blogPost.publishedAt,
      readTime: blogPost.readTime,
      category: blogPost.category,
      tags: blogPost.tags,
      author: blogPost.author,
      featured: blogPost.featured
    };

    // Add to index (at the beginning for newest first)
    indexData.posts.unshift(metadata);

    // Write blog post file
    fs.writeFileSync(blogPath, JSON.stringify(blogPost, null, 2), 'utf-8');

    // Update index file
    fs.writeFileSync(indexPath, JSON.stringify(indexData, null, 2), 'utf-8');

    return NextResponse.json({ 
      success: true, 
      message: 'Blog post saved successfully',
      slug: blogPost.slug 
    });

  } catch (error) {
    console.error('Error saving blog post:', error);
    return NextResponse.json(
      { error: 'Failed to save blog post' },
      { status: 500 }
    );
  }
}
