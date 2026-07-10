"use client";

import { useCallback, useState, type DragEvent, type FormEvent } from "react";
import { uploadImageToCloudinary } from "@/lib/cloudinary";
import { createProject } from "@/lib/projects";
import {
  DIFFICULTIES,
  LENGTH_OPTIONS,
  PROJECT_TYPES,
} from "@/lib/constants";
import type { Difficulty, ProjectType } from "@/lib/types";

type UploadStatus = "idle" | "uploading" | "success" | "error";

export function UploadForm() {
  const [files, setFiles] = useState<File[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [lengthOfTime, setLengthOfTime] = useState<string>(LENGTH_OPTIONS[0]);
  const [difficulty, setDifficulty] = useState<Difficulty>("Beginner");
  const [type, setType] = useState<ProjectType>("Accessory");
  const [notes, setNotes] = useState("");
  const [finishedAt, setFinishedAt] = useState("");
  const [patternUrl, setPatternUrl] = useState("");
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState<UploadStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [dragOver, setDragOver] = useState(false);

  const addFiles = useCallback((incoming: FileList | File[]) => {
    const imageFiles = Array.from(incoming).filter((f) =>
      f.type.startsWith("image/"),
    );
    setFiles((prev) => [...prev, ...imageFiles]);
  }, []);

  function handleDrop(e: DragEvent) {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files.length) addFiles(e.dataTransfer.files);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (files.length === 0) {
      setErrorMessage("Please add at least one image.");
      setStatus("error");
      return;
    }
    if (!title.trim()) {
      setErrorMessage("Please enter a title.");
      setStatus("error");
      return;
    }

    setStatus("uploading");
    setProgress(0);
    setErrorMessage("");

    try {
      const imageUrls: string[] = [];
      const total = files.length;

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const url = await uploadImageToCloudinary(file, (fileProgress) => {
          setProgress(((i + fileProgress / 100) / total) * 100);
        });
        imageUrls.push(url);
      }

      await createProject({
        title: title.trim(),
        imageUrls,
        description: description.trim(),
        lengthOfTime,
        difficulty,
        type,
        notes: notes.trim() || undefined,
        finishedAt: finishedAt || undefined,
        patternUrl: patternUrl.trim() || undefined,
      });

      setStatus("success");
      setFiles([]);
      setTitle("");
      setDescription("");
      setNotes("");
      setFinishedAt("");
      setPatternUrl("");
      setProgress(0);
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error ? err.message : "Upload failed. Please try again.",
      );
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        className={`rounded-2xl border-2 border-dashed p-8 text-center transition-colors ${
          dragOver
            ? "border-primary bg-primary/5"
            : "border-primary/30 bg-white"
        }`}
      >
        <span className="text-4xl">📸</span>
        <p className="mt-2 font-medium text-dark">
          Drag & drop images here, or{" "}
          <label className="cursor-pointer text-primary underline hover:no-underline">
            browse files
            <input
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={(e) => e.target.files && addFiles(e.target.files)}
            />
          </label>
        </p>
        {files.length > 0 && (
          <ul className="mt-4 space-y-1 text-sm text-dark/60">
            {files.map((f) => (
              <li key={`${f.name}-${f.size}`}>{f.name}</li>
            ))}
          </ul>
        )}
      </div>

      <label className="block">
        <span className="text-sm font-medium text-dark/70">Title *</span>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="mt-1.5 w-full rounded-xl border-2 border-primary/20 bg-white px-4 py-2.5 text-dark focus:border-primary focus:outline-none"
          placeholder="Cozy winter scarf"
        />
      </label>

      <label className="block">
        <span className="text-sm font-medium text-dark/70">Description</span>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          className="mt-1.5 w-full rounded-xl border-2 border-primary/20 bg-white px-4 py-2.5 text-dark focus:border-primary focus:outline-none"
          placeholder="Tell the story of this project..."
        />
      </label>

      <div className="grid gap-4 sm:grid-cols-3">
        <label className="block">
          <span className="text-sm font-medium text-dark/70">
            Length of time
          </span>
          <select
            value={lengthOfTime}
            onChange={(e) => setLengthOfTime(e.target.value)}
            className="mt-1.5 w-full rounded-xl border-2 border-primary/20 bg-white px-4 py-2.5 text-dark focus:border-primary focus:outline-none"
          >
            {LENGTH_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="text-sm font-medium text-dark/70">Difficulty</span>
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value as Difficulty)}
            className="mt-1.5 w-full rounded-xl border-2 border-primary/20 bg-white px-4 py-2.5 text-dark focus:border-primary focus:outline-none"
          >
            {DIFFICULTIES.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="text-sm font-medium text-dark/70">
            Type of project
          </span>
          <select
            value={type}
            onChange={(e) => setType(e.target.value as ProjectType)}
            className="mt-1.5 w-full rounded-xl border-2 border-primary/20 bg-white px-4 py-2.5 text-dark focus:border-primary focus:outline-none"
          >
            {PROJECT_TYPES.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="text-sm font-medium text-dark/70">
            Date finished (optional)
          </span>
          <input
            type="date"
            value={finishedAt}
            onChange={(e) => setFinishedAt(e.target.value)}
            className="mt-1.5 w-full rounded-xl border-2 border-primary/20 bg-white px-4 py-2.5 text-dark focus:border-primary focus:outline-none"
          />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-dark/70">
            Pattern or video link (optional)
          </span>
          <input
            type="url"
            value={patternUrl}
            onChange={(e) => setPatternUrl(e.target.value)}
            className="mt-1.5 w-full rounded-xl border-2 border-primary/20 bg-white px-4 py-2.5 text-dark focus:border-primary focus:outline-none"
            placeholder="https://youtube.com/... or pattern URL"
          />
        </label>
      </div>

      <label className="block">
        <span className="text-sm font-medium text-dark/70">
          Other notes (optional)
        </span>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={3}
          className="mt-1.5 w-full rounded-xl border-2 border-primary/20 bg-white px-4 py-2.5 text-dark focus:border-primary focus:outline-none"
          placeholder="Yarn brand, hook size, pattern source..."
        />
      </label>

      {status === "uploading" && (
        <div>
          <div className="h-3 overflow-hidden rounded-full bg-primary/20">
            <div
              className="h-full rounded-full bg-primary transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="mt-2 text-sm text-dark/60">
            Uploading… {Math.round(progress)}%
          </p>
        </div>
      )}

      {status === "success" && (
        <div className="rounded-xl bg-accent-teal/15 p-4 text-accent-teal">
          Project uploaded successfully!
        </div>
      )}

      {status === "error" && errorMessage && (
        <div className="rounded-xl bg-red-50 p-4 text-red-600">
          {errorMessage}
        </div>
      )}

      <button
        type="submit"
        disabled={status === "uploading"}
        className="w-full rounded-full bg-primary py-3 font-semibold text-white shadow-md transition-all hover:bg-primary/90 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:px-10"
      >
        {status === "uploading" ? "Uploading…" : "Upload Project"}
      </button>
    </form>
  );
}
