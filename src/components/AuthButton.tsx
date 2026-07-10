"use client";

import { useAuth } from "@/context/AuthContext";

export function AuthButton() {
  const { user, loading, authError, signIn, signOut, clearAuthError } =
    useAuth();

  if (loading) {
    return (
      <div className="h-10 w-24 animate-pulse rounded-full bg-primary/20" />
    );
  }

  if (user) {
    return (
      <div className="flex items-center gap-3">
        {user.photoURL && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={user.photoURL}
            alt=""
            className="h-8 w-8 rounded-full ring-2 ring-primary/30"
          />
        )}
        <button
          type="button"
          onClick={() => signOut()}
          className="rounded-full border-2 border-primary/30 px-4 py-2 text-sm font-medium text-dark transition-all hover:border-primary hover:bg-primary/10 hover:scale-105"
        >
          Sign Out
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-end gap-2">
      <button
        type="button"
        onClick={() => signIn()}
        className="rounded-full bg-primary px-5 py-2 text-sm font-semibold text-white shadow-md transition-all hover:bg-primary/90 hover:scale-105 hover:shadow-lg"
      >
        Sign In
      </button>
      {authError && (
        <p
          role="alert"
          className="max-w-xs rounded-lg bg-red-50 px-3 py-2 text-right text-xs text-red-600"
        >
          {authError}{" "}
          <button
            type="button"
            onClick={clearAuthError}
            className="underline hover:no-underline"
          >
            Dismiss
          </button>
        </p>
      )}
    </div>
  );
}
