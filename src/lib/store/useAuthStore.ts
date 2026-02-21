import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface AuthState {
  accessToken: string | null;
  isInitialized: boolean;
  setAccessToken: (token: string | null) => void;
  setIsInitialized: (value: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  devtools(
    (set) => ({
      accessToken: null,
      isInitialized: false,
      setAccessToken: (token) => set({ accessToken: token }),
      setIsInitialized: (value) => set({ isInitialized: value }),
    }),
    {
      name: 'Auth store',
    }
  )
);
