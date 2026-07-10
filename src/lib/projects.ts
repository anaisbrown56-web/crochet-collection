import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  Timestamp,
  type DocumentData,
} from "firebase/firestore";
import { getFirebaseDb } from "./firebase";
import type { Project, Difficulty, ProjectType } from "./types";
import { normalizeImageUrls } from "./cloudinary-url";

const COLLECTION = "projects";

function docToProject(id: string, data: DocumentData): Project {
  const createdAt =
    data.createdAt instanceof Timestamp
      ? data.createdAt.toDate()
      : new Date(data.createdAt ?? Date.now());

  return {
    id,
    title: data.title ?? "Untitled",
    imageUrls: normalizeImageUrls(data.imageUrls),
    description: data.description ?? "",
    lengthOfTime: data.lengthOfTime ?? "",
    difficulty: data.difficulty as Difficulty,
    type: data.type as ProjectType,
    notes: data.notes,
    finishedAt: data.finishedAt,
    patternUrl: data.patternUrl,
    createdAt,
  };
}

export async function fetchProjects(): Promise<Project[]> {
  const q = query(collection(getFirebaseDb(), COLLECTION), orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => docToProject(doc.id, doc.data()));
}

export interface CreateProjectInput {
  title: string;
  imageUrls: string[];
  description: string;
  lengthOfTime: string;
  difficulty: Difficulty;
  type: ProjectType;
  notes?: string;
  finishedAt?: string;
  patternUrl?: string;
}

export async function createProject(input: CreateProjectInput): Promise<string> {
  const payload: Record<string, unknown> = {
    title: input.title,
    imageUrls: input.imageUrls,
    description: input.description,
    lengthOfTime: input.lengthOfTime,
    difficulty: input.difficulty,
    type: input.type,
    createdAt: Timestamp.now(),
  };

  if (input.notes) payload.notes = input.notes;
  if (input.finishedAt) payload.finishedAt = input.finishedAt;
  if (input.patternUrl) payload.patternUrl = input.patternUrl;

  const docRef = await addDoc(collection(getFirebaseDb(), COLLECTION), payload);
  return docRef.id;
}
