import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AuthUser } from "@/features/auth/types/auth.types";

export type AuthStatus = "loading" | "authenticated" | "guest";

interface AuthState {
  user: AuthUser | null;
  authStatus: AuthStatus;
}

const initialState: AuthState = {
  user: null,
  authStatus: "loading",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<AuthUser | null>) => {
      state.user = action.payload;
    },
    setAuthStatus: (state, action: PayloadAction<AuthStatus>) => {
      state.authStatus = action.payload;
    },
    setAuthenticated: (state, action: PayloadAction<AuthUser>) => {
      state.user = action.payload;
      state.authStatus = "authenticated";
    },
    clearAuth: (state) => {
      state.user = null;
      state.authStatus = "guest";
    },
  },
});

export const { setUser, setAuthStatus, setAuthenticated, clearAuth } =
  authSlice.actions;
export const authReducer = authSlice.reducer;
