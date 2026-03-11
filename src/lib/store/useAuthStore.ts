import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface AuthState {
  accessToken: string | null;
  isInitialized: boolean;
  setAccessToken: (token: string | null) => void;
  setIsInitialized: (value: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set) => ({
        accessToken: null,
        isInitialized: false,
        setAccessToken: (token) => set({ accessToken: token }),
        setIsInitialized: (value) => set({ isInitialized: value }),
      }),
      {
        name: "auth-storage",
        partialize: (state) => ({}),
      },
    ),
    {
      name: "Auth store",
    },
  ),
);
