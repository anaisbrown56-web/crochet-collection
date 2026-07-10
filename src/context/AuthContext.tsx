"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import {
  onAuthStateChanged,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  signOut,
  type User,
} from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { getFirebaseAuth, googleProvider } from "@/lib/firebase";
import { ADMIN_EMAIL } from "@/lib/constants";

interface AuthContextValue {
  user: User | null;
  loading: boolean;
  isAdmin: boolean;
  authError: string | null;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
  clearAuthError: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

function authErrorMessage(error: unknown): string {
  if (!(error instanceof FirebaseError)) {
    return "Sign in failed. Please try again.";
  }

  switch (error.code) {
    case "auth/popup-blocked":
      return "Your browser blocked the sign-in popup. Allow popups for localhost, or try again — we'll use a redirect instead.";
    case "auth/popup-closed-by-user":
      return "Sign in was cancelled.";
    case "auth/invalid-api-key":
    case "auth/api-key-not-valid.-please-pass-a-valid-api-key.":
      return "Firebase API key is missing or invalid. Check your .env.local file.";
    case "auth/unauthorized-domain":
      return "This domain isn't authorized in Firebase. Add localhost to Authorized domains.";
    case "auth/operation-not-allowed":
      return "Google sign-in isn't enabled yet. Enable it in Firebase Console → Authentication → Sign-in method.";
    default:
      return error.message;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState<string | null>(null);

  useEffect(() => {
    const auth = getFirebaseAuth();

    getRedirectResult(auth).catch((error) => {
      setAuthError(authErrorMessage(error));
    });

    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const isAdmin = user?.email === ADMIN_EMAIL;

  async function signIn() {
    setAuthError(null);
    const auth = getFirebaseAuth();

    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      if (
        error instanceof FirebaseError &&
        (error.code === "auth/popup-blocked" ||
          error.code === "auth/popup-closed-by-user")
      ) {
        await signInWithRedirect(auth, googleProvider);
        return;
      }
      setAuthError(authErrorMessage(error));
    }
  }

  async function handleSignOut() {
    await signOut(getFirebaseAuth());
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAdmin,
        authError,
        signIn,
        signOut: handleSignOut,
        clearAuthError: () => setAuthError(null),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
