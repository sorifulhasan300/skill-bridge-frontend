import { env } from "@/env";

export async function getSessionClient() {
  const res = await fetch("http://localhost:5000/api/auth/get-session", {
    credentials: "include",
    cache: "no-store",
  });

  if (!res.ok) return null;
  return res.json();
}
