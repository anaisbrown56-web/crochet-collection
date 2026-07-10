import type { DIFFICULTIES, PROJECT_TYPES } from "./constants";

export type Difficulty = (typeof DIFFICULTIES)[number];
export type ProjectType = (typeof PROJECT_TYPES)[number];

export interface Project {
  id: string;
  title: string;
  imageUrls: string[];
  description: string;
  lengthOfTime: string;
  difficulty: Difficulty;
  type: ProjectType;
  notes?: string;
  finishedAt?: string;
  patternUrl?: string;
  createdAt: Date;
}

export interface ProjectFilters {
  lengthOfTime: string;
  difficulty: string;
  type: string;
}
