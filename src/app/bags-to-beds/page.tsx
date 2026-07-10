import Link from "next/link";
import { BagsToBedsStats } from "@/components/BagsToBedsStats";

export default function BagsToBedsPage() {
  return (
    <div className="mx-auto flex max-w-5xl flex-col items-center px-4 py-16 text-center sm:px-6 sm:py-24">
      <div className="relative">
        <span className="text-8xl">🛏️</span>
        <span className="absolute -right-4 -top-2 text-4xl">🧶</span>
        <span className="absolute -bottom-2 -left-4 text-3xl">♻️</span>
      </div>

      <h1 className="mt-8 font-heading text-4xl font-bold text-dark sm:text-5xl">
        Bags to Beds
      </h1>
      <p className="mt-4 text-xl font-medium text-primary">Making a difference</p>

      <p className="mt-6 max-w-md leading-relaxed text-dark/70">
        A special initiative turning crocheted plastic bag mats into comfort for
        those who need it most.
      </p>

      <div className="mt-12 w-full">
        <BagsToBedsStats />
      </div>

      <Link
        href="/projects"
        className="mt-12 rounded-full bg-accent-teal px-8 py-3 font-semibold text-white shadow-md transition-all hover:-translate-y-0.5 hover:shadow-lg"
      >
        Browse Projects
      </Link>
    </div>
  );
}
