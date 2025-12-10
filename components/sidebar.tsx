"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Home,
  Briefcase,
  FolderGit2,
  BookOpen,
  Mail,
  Github,
  Linkedin,
  PenTool,
} from "lucide-react";
import { KaggleIcon } from "@/components/icons/kaggle-icon";
import { Profile } from "@/types";

interface SidebarProps {
  profile: Profile;
}

const baseNavigation = [
  { name: "Overview", href: "/", icon: Home },
  { name: "Projects", href: "/projects", icon: FolderGit2 },
  { name: "Experience", href: "/experience", icon: Briefcase },
  { name: "Blog", href: "/blog", icon: BookOpen },
  { name: "Contact", href: "/contact", icon: Mail },
];

// Add blog maker in development only
const navigation = process.env.NODE_ENV === 'development'
  ? [...baseNavigation, { name: "Blog Maker", href: "/blog-maker", icon: PenTool }]
  : baseNavigation;

const socialIcons = {
  github: Github,
  linkedin: Linkedin,
  kaggle: KaggleIcon,
};

export function Sidebar({ profile }: SidebarProps) {
  const pathname = usePathname();

  return (
    <div className="flex h-full flex-col border-r bg-muted/40">
      <div className="flex-1 overflow-auto py-6">
        <div className="px-6 pb-6">
          <div className="flex flex-col items-center text-center">
            <Avatar className="h-24 w-24 grayscale">
              <AvatarImage src={profile.avatar} alt={profile.name} />
              <AvatarFallback>{profile.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <h2 className="mt-4 text-xl font-semibold">{profile.name}</h2>
            <p className="text-sm text-muted-foreground">{profile.title}</p>
            <p className="mt-1 text-xs text-muted-foreground">
              {profile.location}
            </p>
          </div>
        </div>

        <Separator className="mb-4" />

        <nav className="space-y-1 px-3">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link key={item.name} href={item.href}>
                <Button
                  variant={isActive ? "default" : "ghost"}
                  className={cn(
                    "w-full justify-start gap-3"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {item.name}
                </Button>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="border-t p-6">
        <div className="flex justify-center gap-2">
          {Object.entries(profile.social)
            .filter(([key]) => key === 'github' || key === 'linkedin' || key === 'kaggle')
            .map(([key, url]) => {
              const Icon = socialIcons[key as keyof typeof socialIcons];
              return (
                <Button
                  key={key}
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9"
                  asChild
                >
                  <a href={url} target="_blank" rel="noopener noreferrer">
                    <Icon className="h-4 w-4 text-primary" />
                    <span className="sr-only">{key}</span>
                  </a>
                </Button>
              );
            })}
        </div>
      </div>
    </div>
  );
}
