"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { PaperPlaneRight } from "@phosphor-icons/react/dist/ssr";
import { sendMessage, type ContactState } from "@/app/actions/contact";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex items-center gap-2 rounded-[10px] bg-starlight px-6 py-3 text-sm font-medium text-space transition-all hover:bg-starbright active:-translate-y-px active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
    >
      {pending ? "Transmitting" : "Send message"}
      <PaperPlaneRight size={15} weight="bold" aria-hidden="true" />
    </button>
  );
}

export default function ContactForm() {
  const [state, formAction] = useActionState<ContactState, FormData>(sendMessage, {});

  if (state.ok) {
    return (
      <div
        role="status"
        className="flex h-full min-h-[320px] flex-col items-start justify-center gap-3 rounded-2xl border border-starlight/30 bg-starlight/[0.05] p-8"
      >
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-starlight">
          Signal received
        </p>
        <p className="text-lg font-medium text-mist">
          Your message is on its way across the void.
        </p>
        <p className="text-sm leading-relaxed text-dust">
          Thanks for reaching out. I will get back to you soon.
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="flex flex-col gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="contact-name" className="text-sm text-dust">
            Name
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder="Ada Lovelace"
            className="field-input"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="contact-email" className="text-sm text-dust">
            Email
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="ada@observatory.dev"
            className="field-input"
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="contact-message" className="text-sm text-dust">
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={6}
          maxLength={5000}
          placeholder="Tell me about your project or idea."
          className="field-input resize-y"
        />
      </div>

      {state.error && (
        <p role="alert" className="text-sm text-rose-300">
          {state.error}
        </p>
      )}

      <SubmitButton />
    </form>
  );
}
