"use server";

import { rest } from "@/lib/rest";
import { revalidatePath } from "next/cache";

export interface ContactState {
  ok?: boolean;
  error?: string;
}

export async function sendMessage(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (!name || !email || !message) {
    return { error: "All fields are required." };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { error: "Enter a valid email address." };
  }
  if (message.length > 5000) {
    return { error: "Message is too long (max 5000 characters)." };
  }

  try {
    const { error } = await rest()
      .from("messages")
      .insert({ name, email, message });
    if (error) return { error: "Transmission failed. Please try again." };
    revalidatePath("/admin/messages");
    return { ok: true };
  } catch {
    return { error: "Transmission failed. Please try again." };
  }
}
