import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { StateCreator } from "zustand";
import type { AuthUser } from "@/features/auth/types/auth.types";

type AuthStatus = "loading" | "authenticated" | "guest";

interface AuthState {
  user: AuthUser | null;
  authStatus: AuthStatus;
  setUser: (user: AuthUser | null) => void;
  setAuthStatus: (status: AuthStatus) => void;
  setAuthenticated: (user: AuthUser) => void;
  clearAuth: () => void;
}

const createAuthStore: StateCreator<AuthState> = (set) => ({
  user: null,
  authStatus: "loading",
  setUser: (user) => set({ user }),
  setAuthStatus: (authStatus) => set({ authStatus }),
  setAuthenticated: (user) => set({ user, authStatus: "authenticated" }),
  clearAuth: () => set({ user: null, authStatus: "guest" }),
});

export const useAuthStore = create<AuthState>()(
  devtools(createAuthStore, {
    name: "auth-store",
    enabled: process.env.NODE_ENV === "development",
  }),
);
