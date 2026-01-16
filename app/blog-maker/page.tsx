"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MarkdownContent } from "@/components/markdown-content";
import { Download, Eye, FileText, X, Save, Edit, Plus } from "lucide-react";
import { generateSlug, estimateReadTime, generateBlogId, downloadJSON, copyToClipboard, fetchBlogPosts, fetchBlogPost } from "@/lib/blog-utils";

export default function BlogMaker() {
  // Redirect if not in development
  if (process.env.NODE_ENV !== 'development') {
    return (
      <div className="container max-w-4xl py-8 px-6">
        <Card>
          <CardHeader>
            <CardTitle>Access Denied</CardTitle>
            <CardDescription>This page is only available in development mode.</CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  const [blogPosts, setBlogPosts] = useState<any[]>([]);
  const [selectedBlogId, setSelectedBlogId] = useState<string>("");
  const [isEditMode, setIsEditMode] = useState(false);
  const [isLoadingBlogs, setIsLoadingBlogs] = useState(true);
  
  const [blogId, setBlogId] = useState("");
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [publishedAt, setPublishedAt] = useState(new Date().toISOString().split('T')[0]);
  const [readTime, setReadTime] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [featured, setFeatured] = useState(false);
  const [content, setContent] = useState("# Your Blog Title\n\nStart writing your blog post here...\n\n## Section 1\n\nAdd your content with markdown formatting.\n\n```javascript\n// Code example\nconst example = 'Hello World';\n```\n\n## Conclusion\n\nWrap up your post here.");
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");

  useEffect(() => {
    if (typeof window !== 'undefined') {
      loadBlogPosts();
    }
  }, []);

  const loadBlogPosts = async () => {
    try {
      const posts = await fetchBlogPosts();
      setBlogPosts(posts);
    } catch (error) {
      console.error('Failed to load blog posts:', error);
      setBlogPosts([]);
    } finally {
      setIsLoadingBlogs(false);
    }
  };

  const loadBlogForEdit = async (slug: string) => {
    try {
      const blog = await fetchBlogPost(slug);
      setBlogId(blog.id);
      setTitle(blog.title);
      setSlug(blog.slug);
      setExcerpt(blog.excerpt || "");
      setCoverImage(blog.coverImage || "");
      setPublishedAt(blog.publishedAt || new Date().toISOString().split('T')[0]);
      setReadTime(blog.readTime || "");
      setCategory(blog.category || "");
      setTags(blog.tags || []);
      setFeatured(blog.featured || false);
      setContent(blog.content || "");
      setIsEditMode(true);
      setSaveMessage("");
    } catch (error) {
      setSaveMessage(`❌ Failed to load blog: ${error}`);
    }
  };

  const resetForm = () => {
    setBlogId("");
    setTitle("");
    setSlug("");
    setExcerpt("");
    setCoverImage("");
    setPublishedAt(new Date().toISOString().split('T')[0]);
    setReadTime("");
    setCategory("");
    setTags([]);
    setFeatured(false);
    setContent("# Your Blog Title\n\nStart writing your blog post here...\n\n## Section 1\n\nAdd your content with markdown formatting.\n\n```javascript\n// Code example\nconst example = 'Hello World';\n```\n\n## Conclusion\n\nWrap up your post here.");
    setIsEditMode(false);
    setSelectedBlogId("");
    setSaveMessage("");
  };

  const handleTitleChange = (value: string) => {
    setTitle(value);
    if (!slug || !isEditMode) {
      setSlug(generateSlug(value));
    }
  };

  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleContentChange = (value: string) => {
    setContent(value);
    setReadTime(estimateReadTime(value));
  };

  const generateBlogPost = () => {
    return {
      id: blogId || generateBlogId(),
      title,
      slug: slug || generateSlug(title),
      excerpt,
      coverImage,
      publishedAt,
      readTime: readTime || estimateReadTime(content),
      category,
      tags,
      author: "Adil Alizada",
      featured,
      content
    };
  };

  const handleDownloadJSON = () => {
    const blogPost = generateBlogPost();
    downloadJSON(blogPost, slug || 'blog-post');
  };

  const handleCopyJSON = async () => {
    const blogPost = generateBlogPost();
    const json = JSON.stringify(blogPost, null, 2);
    await copyToClipboard(json);
    alert('JSON copied to clipboard!');
  };

  const saveBlog = async () => {
    if (!title.trim()) {
      setSaveMessage("❌ Title is required");
      return;
    }
    if (!slug.trim()) {
      setSaveMessage("❌ Slug is required");
      return;
    }
    if (!content.trim()) {
      setSaveMessage("❌ Content is required");
      return;
    }

    setIsSaving(true);
    setSaveMessage("");

    try {
      const blogPost = generateBlogPost();
      
      const response = await fetch('/api/save-blog', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(blogPost),
      });

      const data = await response.json();

      if (response.ok) {
        setSaveMessage(`✅ Blog ${data.isUpdate ? 'updated' : 'created'} successfully! View at /blog/${data.slug}`);
        await loadBlogPosts();
      } else {
        setSaveMessage(`❌ Error: ${data.error}`);
      }
    } catch (error) {
      setSaveMessage(`❌ Failed to save blog post: ${error}`);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="container max-w-7xl py-8 px-6">
      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight">Blog Maker</h1>
        <p className="text-muted-foreground mt-2">Create and preview your blog posts with markdown support</p>
        <Badge variant="destructive" className="mt-2">Development Only</Badge>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Mode Selection</CardTitle>
          <CardDescription>Choose to create a new blog or edit an existing one</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Button 
              onClick={resetForm} 
              variant={!isEditMode ? "default" : "outline"}
              className="flex-1"
            >
              <Plus className="h-4 w-4 mr-2" />
              New Blog Post
            </Button>
            <Button 
              onClick={() => setIsEditMode(true)} 
              variant={isEditMode ? "default" : "outline"}
              className="flex-1"
              disabled={blogPosts.length === 0}
            >
              <Edit className="h-4 w-4 mr-2" />
              Edit Existing
            </Button>
          </div>

          {isEditMode && (
            <div>
              <label className="text-sm font-medium mb-2 block">Select Blog to Edit</label>
              <select
                className="w-full p-2 border rounded-md bg-background"
                value={selectedBlogId}
                onChange={(e) => {
                  setSelectedBlogId(e.target.value);
                  if (e.target.value) {
                    const selected = blogPosts.find(p => p.id === e.target.value);
                    if (selected) {
                      loadBlogForEdit(selected.slug);
                    }
                  }
                }}
              >
                <option value="">-- Select a blog post --</option>
                {blogPosts.map((post) => (
                  <option key={post.id} value={post.id}>
                    {post.title} ({post.slug})
                  </option>
                ))}
              </select>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Editor Panel */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Metadata</CardTitle>
              <CardDescription>Blog post information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Title</label>
                <Input
                  placeholder="Your Blog Post Title"
                  value={title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Slug (URL)</label>
                <Input
                  placeholder="your-blog-post-slug"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Excerpt</label>
                <Textarea
                  placeholder="Brief summary of your blog post..."
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  rows={2}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Category</label>
                  <Input
                    placeholder="e.g., TypeScript"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Published Date</label>
                  <Input
                    type="date"
                    value={publishedAt}
                    onChange={(e) => setPublishedAt(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Cover Image URL</label>
                <Input
                  placeholder="https://images.unsplash.com/..."
                  value={coverImage}
                  onChange={(e) => setCoverImage(e.target.value)}
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Tags</label>
                <div className="flex gap-2 mb-2">
                  <Input
                    placeholder="Add a tag"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addTag()}
                  />
                  <Button onClick={addTag}>Add</Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="gap-1">
                      {tag}
                      <X className="h-3 w-3 cursor-pointer" onClick={() => removeTag(tag)} />
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="featured"
                  checked={featured}
                  onChange={(e) => setFeatured(e.target.checked)}
                  className="h-4 w-4"
                />
                <label htmlFor="featured" className="text-sm font-medium">Featured Post</label>
              </div>

              <div className="text-sm text-muted-foreground">
                Read Time: {readTime || estimateReadTime(content)}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Content (Markdown)</CardTitle>
              <CardDescription>Write your blog post in markdown</CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Write your blog content here..."
                value={content}
                onChange={(e) => handleContentChange(e.target.value)}
                rows={20}
                className="font-mono text-sm"
              />
            </CardContent>
          </Card>

          <div className="space-y-3">
            <Button 
              onClick={saveBlog} 
              className="w-full" 
              size="lg"
              disabled={isSaving}
            >
              <Save className="h-4 w-4 mr-2" />
              {isSaving ? "Saving..." : isEditMode ? "Update Blog Post" : "Save Blog Post"}
            </Button>
            
            {saveMessage && (
              <div className={`text-sm p-3 rounded-lg ${
                saveMessage.startsWith('✅') 
                  ? 'bg-green-500/10 text-green-500 border border-green-500/20' 
                  : 'bg-red-500/10 text-red-500 border border-red-500/20'
              }`}>
                {saveMessage}
              </div>
            )}

            <div className="flex gap-2">
              <Button onClick={handleDownloadJSON} variant="outline" className="flex-1">
                <Download className="h-4 w-4 mr-2" />
                Download JSON
              </Button>
              <Button onClick={handleCopyJSON} variant="outline" className="flex-1">
                <FileText className="h-4 w-4 mr-2" />
                Copy JSON
              </Button>
            </div>
          </div>
        </div>

        {/* Preview Panel */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Preview</CardTitle>
              <CardDescription>How your blog post will look</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="preview">
                <TabsList className="w-full">
                  <TabsTrigger value="preview" className="flex-1">
                    <Eye className="h-4 w-4 mr-2" />
                    Preview
                  </TabsTrigger>
                  <TabsTrigger value="json" className="flex-1">
                    <FileText className="h-4 w-4 mr-2" />
                    JSON
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="preview" className="space-y-4">
                  <div>
                    {coverImage && (
                      <img
                        src={coverImage}
                        alt={title}
                        className="w-full aspect-video object-cover rounded-lg mb-4"
                      />
                    )}
                    <h1 className="text-3xl font-bold">{title || "Your Blog Title"}</h1>
                    <p className="text-muted-foreground mt-2">{excerpt}</p>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {category && <Badge variant="secondary">{category}</Badge>}
                      {featured && <Badge>Featured</Badge>}
                    </div>
                    <div className="flex gap-2 text-sm text-muted-foreground mt-2">
                      <span>{publishedAt}</span>
                      <span>•</span>
                      <span>{readTime || estimateReadTime(content)}</span>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  <div className="prose prose-slate dark:prose-invert max-w-none">
                    <MarkdownContent content={content} />
                  </div>
                </TabsContent>

                <TabsContent value="json">
                  <pre className="bg-muted p-4 rounded-lg overflow-auto max-h-[600px] text-xs">
                    {JSON.stringify(generateBlogPost(), null, 2)}
                  </pre>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
