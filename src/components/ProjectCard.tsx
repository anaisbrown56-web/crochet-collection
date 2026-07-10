"use client";

import type { Project } from "@/lib/types";
import { ProjectImage } from "./ProjectImage";

const difficultyColors: Record<string, string> = {
  Beginner: "bg-accent-teal/20 text-accent-teal",
  Intermediate: "bg-accent-yellow/30 text-dark",
  Advanced: "bg-accent-purple/20 text-accent-purple",
};

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
}

export function ProjectCard({ project, onClick }: ProjectCardProps) {
  const thumbnail = project.imageUrls[0];

  return (
    <button
      type="button"
      onClick={onClick}
      className="group w-full overflow-hidden rounded-2xl bg-white text-left shadow-md transition-all hover:-translate-y-1 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-primary/50"
    >
      <div className="relative aspect-square overflow-hidden bg-primary/5">
        {thumbnail ? (
          <ProjectImage
            src={thumbnail}
            alt={project.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-5xl">
            🧶
          </div>
        )}
        <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-primary">
          {project.type}
        </span>
      </div>
      <div className="p-4">
        <h3 className="font-heading text-lg font-bold text-dark group-hover:text-primary">
          {project.title}
        </h3>
        <div className="mt-2 flex flex-wrap gap-2">
          <span
            className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${difficultyColors[project.difficulty] ?? "bg-gray-100"}`}
          >
            {project.difficulty}
          </span>
          <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-dark/70">
            {project.lengthOfTime}
          </span>
        </div>
      </div>
    </button>
  );
}
