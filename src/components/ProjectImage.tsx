"use client";

import { useState } from "react";
import { cloudinaryDisplayUrl } from "@/lib/cloudinary-url";

interface ProjectImageProps {
  src: string;
  alt: string;
  className?: string;
}

export function ProjectImage({ src, alt, className }: ProjectImageProps) {
  const [failed, setFailed] = useState(false);
  const displaySrc = cloudinaryDisplayUrl(src);

  if (failed || !displaySrc) {
    return (
      <div
        className={`flex items-center justify-center bg-primary/5 text-5xl ${className ?? ""}`}
      >
        🧶
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={displaySrc}
      alt={alt}
      className={className}
      onError={() => setFailed(true)}
    />
  );
}
