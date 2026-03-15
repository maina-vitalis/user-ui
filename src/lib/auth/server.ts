import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const requireUser = async () => {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users/me`,
    {
      headers: { Cookie: cookieHeader },
      credentials: "include",
      cache: "no-store",
    },
  );
  console.log(res.ok);

  if (!res.ok) {
    return redirect("/auth/sign-in");
  }

  return res.json();
};
