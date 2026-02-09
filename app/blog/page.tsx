"use client";

import { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Star, Rss } from "lucide-react";
import { BlogCard } from "@/components/blog-card";
import blogData from "@/data/content/blogs/index.json";

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = ["all", ...new Set(blogData.posts.map(p => p.category))];
  const pinnedPosts = blogData.posts.filter(p => p.featured);
  
  const filteredPosts = selectedCategory === "all" 
    ? blogData.posts 
    : blogData.posts.filter(p => p.category === selectedCategory);

  return (
    <div className="container max-w-7xl py-8 px-6">
      <div className="mb-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold tracking-tight font-sans">My Public Rants</h1>
            <p className="text-muted-foreground mt-2">Have fun reading these. Some are insightful, some are delusional, all are honest</p>
          </div>
          <Button variant="outline" size="sm" asChild>
            <a href="/feed.xml" target="_blank" rel="noopener noreferrer">
              <Rss className="h-4 w-4 mr-2" />
              RSS Feed
            </a>
          </Button>
        </div>
      </div>

      {pinnedPosts.length > 0 && (
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Star className="h-5 w-5 text-primary fill-primary" />
            <h2 className="text-2xl font-semibold font-sans">Pinned Posts</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {pinnedPosts.map((post) => (
              <BlogCard key={post.id} post={post} variant="pinned" />
            ))}
          </div>
        </div>
      )}

      <div className="mb-6">
        <h2 className="text-2xl font-semibold font-sans mb-4">All Posts</h2>
        <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
          <TabsList>
            {categories.map((category) => (
              <TabsTrigger key={category} value={category} className="capitalize">
                {category}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredPosts.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
