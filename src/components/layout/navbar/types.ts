export interface NavbarLink {
  label: string;
  href: string;
}

export interface NavbarUser {
  email: string;
}

export type AuthStatus = "loading" | "authenticated" | "guest";
