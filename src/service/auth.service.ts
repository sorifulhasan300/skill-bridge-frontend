import { env } from "@/env";
import { LoginPayload } from "@/types/login.types";

export const loginUser = async (payload: LoginPayload) => {
  const res = await fetch(`http://localhost:5000/api/auth/sign-in/email`, {
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

type RegisterPayload = {
  name: string;
  email: string;
  password: string;
  role: string;
};
export const registerUser = async (payload: RegisterPayload) => {
  const res = await fetch(`http://localhost:5000/api/auth/sign-up/email`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const error = await res.json();
    return { data: null, error: error.message || "Register failed" };
  }

  return { data: res.json, error: null };
};
