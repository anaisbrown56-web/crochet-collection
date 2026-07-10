"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { UploadForm } from "@/components/UploadForm";

export function UploadPageContent() {
  const { user, loading, isAdmin } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) {
      router.replace("/");
    }
  }, [user, loading, isAdmin, router]);

  if (loading) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary/30 border-t-primary" />
      </div>
    );
  }

  if (!user || !isAdmin) return null;

  return (
    <div className="mx-auto max-w-2xl rounded-3xl bg-white p-6 shadow-lg sm:p-10">
      <h1 className="font-heading text-3xl font-bold text-dark">
        Upload a Project
      </h1>
      <p className="mt-2 text-dark/60">
        Add photos and details for a new crochet creation.
      </p>
      <div className="mt-8">
        <UploadForm />
      </div>
    </div>
  );
}
