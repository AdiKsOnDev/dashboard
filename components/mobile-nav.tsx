"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Menu } from "lucide-react";
import { getNavigation, socialIcons, getSupportedSocialPlatforms } from "@/lib/navigation";
import { Profile } from "@/types";
import { useState } from "react";

interface MobileNavProps {
  profile: Profile;
}

const navigation = getNavigation();

export function MobileNav({ profile }: MobileNavProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-72 p-0">
        <SheetHeader className="border-b p-6">
          <SheetTitle className="text-left">Menu</SheetTitle>
        </SheetHeader>

        <div className="flex flex-col gap-6 p-6">
          <div className="flex flex-col items-center text-center">
            <Avatar className="h-20 w-20 grayscale">
              <AvatarImage src={profile.avatar} alt={profile.name} />
              <AvatarFallback>{profile.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <h2 className="mt-4 text-lg font-semibold">{profile.name}</h2>
            <p className="text-sm text-muted-foreground">{profile.title}</p>
          </div>

          <Separator />

          <nav className="space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link key={item.name} href={item.href} onClick={() => setOpen(false)}>
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

          <Separator />

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
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
