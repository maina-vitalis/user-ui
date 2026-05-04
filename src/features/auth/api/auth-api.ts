import type { LoginFormValues } from "@/features/auth/components/login-form";
import type { SignupFormValues } from "@/features/auth/components/signup-form";
import type { AuthUser } from "@/features/auth/types/auth.types";
import api from "@/lib/api";

export type VerifyOtpPayload = {
  email: string;
  OTP: string;
};

interface AuthResponse {
  user: AuthUser;
  message: string;
  status: string;
}

export type MeResponse = AuthUser;

export const getMe = async () => {
  return api.get<MeResponse>("/api/users/me");
};

export const login = async (loginData: LoginFormValues) => {
  const response: AuthResponse = await api.post("/api/auth/login", loginData);
  return response;
};

export const register = async (registerData: SignupFormValues) => {
  return await api.post("/api/auth/register", registerData);
};

export const verifyOtp = async (payload: VerifyOtpPayload) => {
  return await api.post("/api/auth/verify-otp", payload);
};

export const refreshToken = async () => {
  const response: AuthResponse = await api.post("/api/auth/refresh-token");
  return response;
};
