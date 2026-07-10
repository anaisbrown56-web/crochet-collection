"use client";

import { useEffect, useMemo, useState } from "react";
import { FilterBar } from "@/components/FilterBar";
import { ProjectCard } from "@/components/ProjectCard";
import { ProjectModal } from "@/components/ProjectModal";
import { fetchProjects } from "@/lib/projects";
import type { Project, ProjectFilters } from "@/lib/types";

export function ProjectsGallery() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Project | null>(null);
  const [filters, setFilters] = useState<ProjectFilters>({
    lengthOfTime: "",
    difficulty: "",
    type: "",
  });

  useEffect(() => {
    fetchProjects()
      .then(setProjects)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      if (filters.lengthOfTime && p.lengthOfTime !== filters.lengthOfTime)
        return false;
      if (filters.difficulty && p.difficulty !== filters.difficulty)
        return false;
      if (filters.type && p.type !== filters.type) return false;
      return true;
    });
  }, [projects, filters]);

  return (
    <>
      <FilterBar filters={filters} onChange={setFilters} />

      {loading ? (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="aspect-square animate-pulse rounded-2xl bg-primary/10"
            />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="mt-12 text-center">
          <span className="text-5xl">🧶</span>
          <p className="mt-4 font-heading text-xl text-dark/60">
            {projects.length === 0
              ? "No projects yet — check back soon!"
              : "No projects match your filters."}
          </p>
        </div>
      ) : (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onClick={() => setSelected(project)}
            />
          ))}
        </div>
      )}

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </>
  );
}
