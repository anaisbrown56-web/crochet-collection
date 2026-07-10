import { ProjectsGallery } from "@/components/ProjectsGallery";

export default function ProjectsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <div className="mb-8">
        <h1 className="font-heading text-4xl font-bold text-dark">Projects</h1>
        <p className="mt-2 text-dark/60">
          Browse the full collection — filter by length, difficulty, or type.
        </p>
      </div>
      <ProjectsGallery />
    </div>
  );
}
