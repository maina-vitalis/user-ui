import type {LoginFormValues} from "@/features/auth/components/login-form";
import type {SignupFormValues} from "@/features/auth/components/signup-form";
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

export interface MeResponse {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  roles?: string[];
}

export const getMe = async () => {
  return api.get<MeResponse>("/api/users/me");
};

export const login = async (loginData: LoginFormValues) => {
  const response: AuthResponse = await api.post("/api/auth/login", loginData);
  console.log(response, "login");
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
