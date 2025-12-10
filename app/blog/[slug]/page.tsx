import { notFound } from 'next/navigation';
import fs from 'fs';
import path from 'path';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Calendar, Clock, ArrowLeft, Share2 } from 'lucide-react';
import { BlogPost } from '@/types';
import { MarkdownContent } from '@/components/markdown-content';
import Link from 'next/link';
import blogIndex from '@/data/blogs/index.json';

export async function generateStaticParams() {
  return blogIndex.posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const blogPath = path.join(process.cwd(), 'data/blogs', `${slug}.json`);
  
  if (!fs.existsSync(blogPath)) {
    return {
      title: 'Blog Post Not Found',
    };
  }
  
  const blogData: BlogPost = JSON.parse(fs.readFileSync(blogPath, 'utf-8'));
  
  return {
    title: `${blogData.title} | Blog`,
    description: blogData.excerpt,
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const blogPath = path.join(process.cwd(), 'data/blogs', `${slug}.json`);
  
  if (!fs.existsSync(blogPath)) {
    notFound();
  }
  
  const post: BlogPost = JSON.parse(fs.readFileSync(blogPath, 'utf-8'));
  
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="border-b bg-muted/30">
        <div className="container max-w-4xl py-8 px-6">
          <Link href="/blog">
            <Button variant="ghost" size="sm" className="mb-6">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Blog
            </Button>
          </Link>
          
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">{post.category}</Badge>
              {post.featured && (
                <Badge variant="default">Featured</Badge>
              )}
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              {post.title}
            </h1>
            
            <p className="text-xl text-muted-foreground">
              {post.excerpt}
            </p>
            
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-primary" />
                <span>
                  {new Date(post.publishedAt).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-primary" />
                <span>{post.readTime}</span>
              </div>
              <Separator orientation="vertical" className="h-4" />
              <span>By {post.author}</span>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Cover Image */}
      <div className="container max-w-4xl px-6 -mt-8">
        <div className="aspect-video overflow-hidden rounded-lg border bg-muted shadow-lg">
          <img
            src={post.coverImage}
            alt={post.title}
            className="h-full w-full object-cover"
          />
        </div>
      </div>
      
      {/* Article Content */}
      <article className="container max-w-4xl py-12 px-6">
        <MarkdownContent content={post.content} />
      </article>
      
      {/* Footer Actions */}
      <div className="border-t">
        <div className="container max-w-4xl py-8 px-6">
          <div className="flex items-center justify-between">
            <Link href="/blog">
              <Button variant="outline">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Blog
              </Button>
            </Link>
            
            <Button variant="outline" size="sm">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
