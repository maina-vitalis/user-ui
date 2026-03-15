import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  roles?: string[];
}

interface AuthState {
  user: User | null;
  authStatus: "loading" | "authenticated" | "guest";
  setUser: (user: User | null) => void;
  setAuthStatus: (status: "loading" | "authenticated" | "guest") => void;
}

export const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        authStatus: "loading",
        setUser: (user) => set({ user }),
        setAuthStatus: (authStatus) => set({ authStatus }),
      }),
      {
        name: "auth-storage",
        partialize: () => ({}), // persist nothing sensitive
      },
    ),
  ),
);
