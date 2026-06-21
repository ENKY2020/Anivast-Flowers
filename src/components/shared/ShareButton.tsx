"use client";

import { Share2 } from "lucide-react";

interface ShareButtonProps {
  title: string;
  text?: string;
  url?: string;
}

export default function ShareButton({
  title,
  text,
  url,
}: ShareButtonProps) {
  const handleShare = async () => {
    const shareUrl = url || window.location.href;

    try {
      if (navigator.share) {
        await navigator.share({
          title,
          text: text || title,
          url: shareUrl,
        });
      } else {
        await navigator.clipboard.writeText(shareUrl);
        alert("Link copied to clipboard");
      }
    } catch {
      console.log("Share cancelled");
    }
  };

  return (
    <button
      onClick={handleShare}
      className="share-button"
      aria-label="Share"
    >
      <Share2 size={18} />
    </button>
  );
}