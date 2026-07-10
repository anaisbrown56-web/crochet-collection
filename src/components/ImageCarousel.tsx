"use client";

import { useCallback, useEffect, useState } from "react";
import type { Project } from "@/lib/types";
import { ProjectImage } from "./ProjectImage";

interface ImageCarouselProps {
  projects: Project[];
  autoAdvanceMs?: number;
}

export function ImageCarousel({
  projects,
  autoAdvanceMs = 4500,
}: ImageCarouselProps) {
  const slides = projects.filter((p) => p.imageUrls.length > 0);
  const [index, setIndex] = useState(0);

  const goTo = useCallback(
    (next: number) => {
      if (slides.length === 0) return;
      setIndex((next + slides.length) % slides.length);
    },
    [slides.length],
  );

  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(() => goTo(index + 1), autoAdvanceMs);
    return () => clearInterval(timer);
  }, [index, slides.length, autoAdvanceMs, goTo]);

  if (slides.length === 0) {
    return (
      <div className="flex aspect-[4/3] w-full items-center justify-center rounded-3xl bg-gradient-to-br from-primary/20 via-accent-yellow/20 to-accent-teal/20 shadow-lg">
        <div className="text-center">
          <span className="text-5xl">🧶</span>
          <p className="mt-3 font-heading text-lg text-dark/70">
            Projects coming soon!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="group relative aspect-[4/3] w-full overflow-hidden rounded-3xl shadow-xl">
      {slides.map((slide, i) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-700 ${
            i === index ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
        >
          <ProjectImage
            src={slide.imageUrls[0]}
            alt={slide.title}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark/60 via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
            <h3 className="font-heading text-xl font-bold text-white sm:text-2xl">
              {slide.title}
            </h3>
            <p className="mt-1 text-sm text-white/80">
              {slide.type} · {slide.difficulty}
            </p>
          </div>
        </div>
      ))}

      {slides.length > 1 && (
        <>
          <button
            type="button"
            aria-label="Previous slide"
            onClick={() => goTo(index - 1)}
            className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 text-dark opacity-0 shadow-md transition-all hover:bg-white group-hover:opacity-100 sm:left-4"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            type="button"
            aria-label="Next slide"
            onClick={() => goTo(index + 1)}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 text-dark opacity-0 shadow-md transition-all hover:bg-white group-hover:opacity-100 sm:right-4"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
            {slides.map((slide, i) => (
              <button
                key={slide.id}
                type="button"
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => setIndex(i)}
                className={`h-2.5 rounded-full transition-all ${
                  i === index
                    ? "w-8 bg-white"
                    : "w-2.5 bg-white/50 hover:bg-white/80"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
