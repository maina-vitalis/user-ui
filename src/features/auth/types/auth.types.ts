export type AuthRole = "BUYER" | "VENDOR" | "ADMIN";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: AuthRole;
}
