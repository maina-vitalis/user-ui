import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const requireUser = async () => {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users`, {
    headers: { Cookie: cookieHeader },
    credentials: "include",
    cache: "no-store",
  });

  if (!res.ok) {
    return redirect("/auth/sign-in");
  }

  return res.json();
};
