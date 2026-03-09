import type { LoginFormValues } from "@/features/auth/components/login-form";
import type { SignupFormValues } from "@/features/auth/components/signup-form";
import api from "@/lib/api";
import { useAuthStore } from "@/lib/store/useAuthStore";

export type VerifyOtpPayload = {
  email: string;
  OTP: string;
};

interface AuthResponse {
  accessToken: string | null;
  message: string;
  status: string;
}

export const login = async (loginData: LoginFormValues) => {
  const response: AuthResponse = await api.post("/api/auth/login", loginData);
  useAuthStore.getState().setAccessToken(response.accessToken);
  return response;
};

export const register = async (registerData: SignupFormValues) => {
  console.log(registerData, "register data");
  const response = await api.post("/api/auth/register", registerData);
  console.log("debugging response");
  console.log(response, "hello maina");
  return response;
};

export const verifyOtp = async (payload: VerifyOtpPayload) => {
  const response = await api.post("/api/auth/verify-otp", payload);
  console.log(response);
  return response;
};

export const refreshToken = async () => {
  const response: AuthResponse = await api.post("/api/auth/refresh-token");
  useAuthStore.getState().setAccessToken(response.accessToken);
  return response;
};
