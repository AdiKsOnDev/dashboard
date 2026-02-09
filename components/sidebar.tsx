"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Rss } from "lucide-react";
import { getNavigation, socialIcons, getSupportedSocialPlatforms } from "@/lib/navigation";
import { Profile } from "@/types";

interface SidebarProps {
  profile: Profile;
}

const navigation = getNavigation();

export function Sidebar({ profile }: SidebarProps) {
  const pathname = usePathname();

  return (
    <div className="flex h-full flex-col border-r bg-muted/40">
      <div className="flex-1 overflow-auto py-6">
        <div className="px-6 pb-6">
          <div className="flex flex-col items-center text-center">
            <Avatar className="h-24 w-24 opacity-70 saturate-50">
              <AvatarImage src={profile.avatar} alt={profile.name} />
              <AvatarFallback>{profile.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <h2 className="mt-4 text-xl font-semibold font-sans">{profile.name}</h2>
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
          {getSupportedSocialPlatforms(profile.social).map(([platform, url]) => {
            const Icon = socialIcons[platform];
            return (
              <Button
                key={platform}
                variant="ghost"
                size="icon"
                className="h-9 w-9"
                asChild
              >
                <a href={url} target="_blank" rel="noopener noreferrer">
                  <Icon className="h-4 w-4 text-primary" />
                  <span className="sr-only">{platform}</span>
                </a>
              </Button>
            );
          })}
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9"
            asChild
          >
            <a href="/feed.xml" target="_blank" rel="noopener noreferrer">
              <Rss className="h-4 w-4 text-primary" />
              <span className="sr-only">RSS Feed</span>
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}
