import { env } from "@/env";
import { LoginPayload } from "@/types/login.types";

export const loginUser = async (payload: LoginPayload) => {
  console.log("in the function login user", payload);
  const res = await fetch(`${env.DATABASE_URL}/api/auth/sign-in/email`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const error = await res.json();
    return { data: null, error: error.message || "Login failed" };
  }

  return { data: res.json, error: null };
};
