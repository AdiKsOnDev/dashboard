import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Star } from "lucide-react";
import { BlogPost } from "@/types";

interface BlogCardProps {
  post: BlogPost;
  variant?: "default" | "pinned";
  showTags?: boolean;
}

/**
 * Reusable blog card component for displaying blog post previews
 * @param post - The blog post data to display
 * @param variant - Visual variant: "default" or "pinned" (shows pin badge)
 * @param showTags - Whether to display post tags (default: true for default variant, false for pinned)
 */
export function BlogCard({ post, variant = "default", showTags }: BlogCardProps) {
  const isPinned = variant === "pinned";
  const displayTags = showTags ?? (variant === "default");
  
  // Format date based on variant
  const dateOptions: Intl.DateTimeFormatOptions = isPinned
    ? { month: "short", day: "numeric", year: "numeric" }
    : { month: "short", day: "numeric" };

  return (
    <Link href={`/blog/${post.slug}`}>
      <Card className="overflow-hidden group cursor-pointer hover:shadow-lg transition-shadow h-full pt-0">
        <div className="aspect-video overflow-hidden bg-muted">
          <img
            src={post.coverImage}
            alt={post.title}
            className="h-full w-full object-cover opacity-60 saturate-50 transition-all group-hover:opacity-100 group-hover:saturate-100 group-hover:scale-105"
          />
        </div>
        <CardHeader>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="secondary">{post.category}</Badge>
            {isPinned && (
              <Badge variant="outline" className="text-xs">
                <Star className="h-3 w-3 mr-1 fill-primary text-primary" />
                Pinned
              </Badge>
            )}
          </div>
          <CardTitle className={`${isPinned ? "text-xl" : "text-lg"} group-hover:text-primary transition-colors`}>
            {post.title}
          </CardTitle>
          <CardDescription className="line-clamp-2">{post.excerpt}</CardDescription>
        </CardHeader>
        <CardContent>
          {displayTags && (
            <div className="flex flex-wrap gap-1 mb-3">
              {post.tags.slice(0, 3).map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4 text-primary" />
              <span>{new Date(post.publishedAt).toLocaleDateString("en-US", dateOptions)}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4 text-primary" />
              <span>{post.readTime}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
