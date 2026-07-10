"use client";

import { useEffect } from "react";
import type { Project } from "@/lib/types";
import { formatFinishedDate } from "@/lib/format-date";
import { ProjectImage } from "./ProjectImage";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  useEffect(() => {
    if (!project) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
    >
      <button
        type="button"
        aria-label="Close modal"
        className="absolute inset-0 bg-dark/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-t-3xl bg-offwhite shadow-2xl sm:rounded-3xl">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 z-10 rounded-full bg-white/90 p-2 shadow-md transition hover:bg-white"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {project.imageUrls.length > 0 && (
          <div className="flex gap-2 overflow-x-auto p-4 pb-0">
            {project.imageUrls.map((url, i) => (
              <ProjectImage
                key={`${url}-${i}`}
                src={url}
                alt={`${project.title} — image ${i + 1}`}
                className="h-64 w-auto shrink-0 rounded-2xl object-cover sm:h-80"
              />
            ))}
          </div>
        )}

        <div className="p-6 sm:p-8">
          <h2
            id="project-modal-title"
            className="font-heading text-2xl font-bold text-dark sm:text-3xl"
          >
            {project.title}
          </h2>
          <div className="mt-3 flex flex-wrap gap-2">
            <span className="rounded-full bg-primary/15 px-3 py-1 text-sm font-medium text-primary">
              {project.type}
            </span>
            <span className="rounded-full bg-accent-teal/15 px-3 py-1 text-sm font-medium text-accent-teal">
              {project.difficulty}
            </span>
            <span className="rounded-full bg-accent-yellow/30 px-3 py-1 text-sm font-medium text-dark">
              {project.lengthOfTime}
            </span>
            {project.finishedAt && (
              <span className="rounded-full bg-accent-purple/15 px-3 py-1 text-sm font-medium text-accent-purple">
                Finished {formatFinishedDate(project.finishedAt)}
              </span>
            )}
          </div>
          {project.description && (
            <p className="mt-4 leading-relaxed text-dark/80">
              {project.description}
            </p>
          )}
          {project.patternUrl && (
            <a
              href={project.patternUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary/20"
            >
              View pattern / video
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          )}
          {project.notes && (
            <div className="mt-4 rounded-xl bg-accent-purple/10 p-4">
              <p className="text-sm font-semibold text-accent-purple">Notes</p>
              <p className="mt-1 text-sm leading-relaxed text-dark/70">
                {project.notes}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
