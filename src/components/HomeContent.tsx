"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ImageCarousel } from "@/components/ImageCarousel";
import { fetchProjects } from "@/lib/projects";
import type { Project } from "@/lib/types";

export function HomeContent() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects()
      .then(setProjects)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-16">
        <div className="mb-8 text-center">
          <h1 className="font-heading text-4xl font-bold text-dark sm:text-5xl lg:text-6xl">
            Anaïs&apos; Crochet Collection
          </h1>
          <p className="mt-3 font-heading text-xl text-primary sm:text-2xl">
            Handmade with love, one stitch at a time
          </p>
        </div>

        <div className="mx-auto max-w-md sm:max-w-lg">
          {loading ? (
            <div className="aspect-[4/3] animate-pulse rounded-3xl bg-primary/10" />
          ) : (
            <ImageCarousel projects={projects.slice(0, 8)} />
          )}
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 pb-16 text-center sm:px-6 sm:pb-24">
        <p className="text-lg leading-relaxed text-dark/80">
          I built this website as a way to keep track and showcase my crochet creations. Each piece is made by
          hand with care and a whole lot of yarn. Enjoy! 
        </p>
        <Link
          href="/projects"
          className="mt-8 inline-block rounded-full bg-primary px-8 py-3 font-semibold text-white shadow-md transition-all hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-lg"
        >
          Browse All Projects
        </Link>
      </section>
    </>
  );
}
