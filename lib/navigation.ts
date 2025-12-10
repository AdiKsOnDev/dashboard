import {
  Home,
  Briefcase,
  FolderGit2,
  BookOpen,
  Mail,
  PenTool,
  Github,
  Linkedin,
} from "lucide-react";
import { KaggleIcon } from "@/components/icons/kaggle-icon";

/**
 * Navigation item configuration
 */
export interface NavigationItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

/**
 * Base navigation items available in all environments
 */
const baseNavigation: NavigationItem[] = [
  { name: "Overview", href: "/", icon: Home },
  { name: "Projects", href: "/projects", icon: FolderGit2 },
  { name: "Experience", href: "/experience", icon: Briefcase },
  { name: "Blog", href: "/blog", icon: BookOpen },
  { name: "Contact", href: "/contact", icon: Mail },
];

/**
 * Get navigation items based on environment
 * Adds Blog Maker in development mode only
 */
export function getNavigation(): NavigationItem[] {
  if (process.env.NODE_ENV === 'development') {
    return [...baseNavigation, { name: "Blog Maker", href: "/blog-maker", icon: PenTool }];
  }
  return baseNavigation;
}

/**
 * Social media icon mapping
 */
export const socialIcons = {
  github: Github,
  linkedin: Linkedin,
  kaggle: KaggleIcon,
} as const;

/**
 * Type for supported social media platforms
 */
export type SocialPlatform = keyof typeof socialIcons;

/**
 * Filter to get only supported social platforms from profile data
 */
export function getSupportedSocialPlatforms(social: Record<string, string>): Array<[SocialPlatform, string]> {
  return Object.entries(social)
    .filter(([key]) => key in socialIcons)
    .map(([key, url]) => [key as SocialPlatform, url]);
}
