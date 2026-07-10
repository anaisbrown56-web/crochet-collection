"use client";

import {
  DIFFICULTIES,
  LENGTH_OPTIONS,
  PROJECT_TYPES,
} from "@/lib/constants";
import type { ProjectFilters } from "@/lib/types";

interface FilterBarProps {
  filters: ProjectFilters;
  onChange: (filters: ProjectFilters) => void;
}

export function FilterBar({ filters, onChange }: FilterBarProps) {
  const hasFilters =
    filters.lengthOfTime || filters.difficulty || filters.type;

  return (
    <div className="rounded-2xl bg-white p-4 shadow-md sm:p-6">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="font-heading text-lg font-bold text-dark">Filters</h2>
        {hasFilters && (
          <button
            type="button"
            onClick={() =>
              onChange({ lengthOfTime: "", difficulty: "", type: "" })
            }
            className="text-sm font-medium text-primary hover:underline"
          >
            Clear all
          </button>
        )}
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        <label className="flex flex-col gap-1.5">
          <span className="text-sm font-medium text-dark/70">Length</span>
          <select
            value={filters.lengthOfTime}
            onChange={(e) =>
              onChange({ ...filters, lengthOfTime: e.target.value })
            }
            className="rounded-xl border-2 border-primary/20 bg-offwhite px-3 py-2 text-sm text-dark focus:border-primary focus:outline-none"
          >
            <option value="">All lengths</option>
            {LENGTH_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="text-sm font-medium text-dark/70">Difficulty</span>
          <select
            value={filters.difficulty}
            onChange={(e) =>
              onChange({ ...filters, difficulty: e.target.value })
            }
            className="rounded-xl border-2 border-primary/20 bg-offwhite px-3 py-2 text-sm text-dark focus:border-primary focus:outline-none"
          >
            <option value="">All levels</option>
            {DIFFICULTIES.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="text-sm font-medium text-dark/70">Type</span>
          <select
            value={filters.type}
            onChange={(e) => onChange({ ...filters, type: e.target.value })}
            className="rounded-xl border-2 border-primary/20 bg-offwhite px-3 py-2 text-sm text-dark focus:border-primary focus:outline-none"
          >
            <option value="">All types</option>
            {PROJECT_TYPES.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </label>
      </div>
    </div>
  );
}
