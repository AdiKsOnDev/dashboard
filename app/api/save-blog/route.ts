import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
  if (process.env.NODE_ENV !== 'development') {
    return NextResponse.json({ error: 'Not available in production' }, { status: 403 });
  }

  try {
    const blogPost = await request.json();

    if (!blogPost.title || !blogPost.slug || !blogPost.content) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const blogsDir = path.join(process.cwd(), 'data/content/blogs');
    const indexPath = path.join(blogsDir, 'index.json');
    const blogPath = path.join(blogsDir, `${blogPost.slug}.json`);

    const isUpdate = fs.existsSync(blogPath);
    const indexData = JSON.parse(fs.readFileSync(indexPath, 'utf-8'));

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

    if (isUpdate) {
      const existingIndex = indexData.posts.findIndex((p: any) => p.slug === blogPost.slug);
      if (existingIndex !== -1) {
        indexData.posts[existingIndex] = metadata;
      }
    } else {
      indexData.posts.unshift(metadata);
    }

    fs.writeFileSync(blogPath, JSON.stringify(blogPost, null, 2), 'utf-8');
    fs.writeFileSync(indexPath, JSON.stringify(indexData, null, 2), 'utf-8');

    return NextResponse.json({ 
      success: true, 
      message: isUpdate ? 'Blog post updated successfully' : 'Blog post created successfully',
      slug: blogPost.slug,
      isUpdate
    });

  } catch (error) {
    console.error('Error saving blog post:', error);
    return NextResponse.json(
      { error: 'Failed to save blog post' },
      { status: 500 }
    );
  }
}
