import type { LoginFormValues } from "@/features/auth/components/login-form";
import type { SignupFormValues } from "@/features/auth/components/signup-form";
import api from "@/lib/api";

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
  console.log(response, "login");
  return response;
};

export const register = async (registerData: SignupFormValues) => {
  const response = await api.post("/api/auth/register", registerData);
  return response;
};

export const verifyOtp = async (payload: VerifyOtpPayload) => {
  const response = await api.post("/api/auth/verify-otp", payload);
  return response;
};

export const refreshToken = async () => {
  const response: AuthResponse = await api.post("/api/auth/refresh-token");
  return response;
};
