"use client";

import { Button } from "@/components/ui/button";
import { Share2, Copy } from "lucide-react";
import { useState, useEffect } from "react";

const MOBILE_BREAKPOINT = 768;
const COPIED_FEEDBACK_DURATION = 2000;

interface ShareButtonProps {
  title: string;
  url: string;
}

/**
 * Share button component with progressive enhancement
 * 
 * Uses native share API on mobile devices (iOS/Android) when available,
 * falls back to clipboard copy on desktop or when share API is unavailable.
 * 
 * @param title - Title to share (used in native share sheet)
 * @param url - URL to share or copy
 */
export function ShareButton({ title, url }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  /**
   * Handles share/copy action with progressive fallback strategy:
   * 1. Try native share API (mobile)
   * 2. Fall back to modern clipboard API
   * 3. Fall back to legacy execCommand method
   */
  const handleShare = async () => {
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: title,
          url: url,
        });
        return;
      } catch (err) {
        if (err instanceof Error && err.name === 'AbortError') {
          return; // User cancelled share sheet
        }
        alert(`Share failed: ${err instanceof Error ? err.message : 'Unknown error'}. Copying instead...`);
      }
    }

    if (navigator.clipboard && navigator.clipboard.writeText) {
      try {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), COPIED_FEEDBACK_DURATION);
      } catch (err) {
        console.error('Clipboard failed:', err);
        fallbackCopy();
      }
    } else {
      fallbackCopy();
    }
  };

  /**
   * Legacy clipboard copy using deprecated execCommand
   * Used as final fallback for older browsers or non-HTTPS contexts
   */
  const fallbackCopy = () => {
    try {
      const input = document.createElement('input');
      input.value = url;
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      document.body.removeChild(input);
      setCopied(true);
      setTimeout(() => setCopied(false), COPIED_FEEDBACK_DURATION);
    } catch (err) {
      console.error('Fallback copy failed:', err);
    }
  };

  const Icon = isMobile ? Share2 : Copy;
  const label = copied ? "Copied!" : (isMobile ? "Share" : "Copy URL");

  return (
    <Button variant="outline" size="sm" onClick={handleShare}>
      <Icon className="h-4 w-4 mr-2" />
      {label}
    </Button>
  );
}
