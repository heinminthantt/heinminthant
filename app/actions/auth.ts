"use server";

import { redirect } from "next/navigation";
import {
  clearSessionCookie,
  setSessionCookie,
  verifyPassword,
} from "@/lib/auth";

export interface AuthState {
  error?: string;
}

export async function loginAction(
  _prev: AuthState,
  formData: FormData,
): Promise<AuthState> {
  const password = String(formData.get("password") ?? "");
  if (!password) return { error: "Enter your password." };
  if (!verifyPassword(password)) {
    return { error: "Incorrect password. Access denied." };
  }
  await setSessionCookie();
  redirect("/admin");
}

export async function logoutAction(): Promise<void> {
  await clearSessionCookie();
  redirect("/admin/login");
}
