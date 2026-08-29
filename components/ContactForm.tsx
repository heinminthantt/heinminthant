"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { motion, useReducedMotion } from "framer-motion";
import { CheckCircle, EnvelopeSimple } from "@phosphor-icons/react/dist/ssr";
import { sendMessage, type ContactState } from "@/app/actions/contact";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-[6px] bg-text px-5 py-2.5 text-[14px] font-medium text-white shadow-[0_1px_2px_rgba(0,0,0,0.06)] hover:bg-accent-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-text disabled:opacity-50 disabled:cursor-not-allowed"
      aria-busy={pending}
    >
      {pending ? (
        <>
          <span className="h-3 w-3 animate-spin rounded-full border-2 border-white/30 border-t-white" aria-hidden />
          Sending…
        </>
      ) : (
        <>Send message →</>
      )}
    </button>
  );
}

export default function ContactForm() {
  const [state, formAction] = useActionState<ContactState, FormData>(sendMessage, {});
  const reduce = useReducedMotion();

  if (state.ok) {
    return (
      <div role="status" className="notion-callout flex min-h-[240px] flex-col items-start justify-center gap-3 p-6">
        <motion.p
          initial={reduce ? false : { opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-1.5 rounded-full border border-[#d3e5ef] bg-blue-bg px-2.5 py-1 text-[11px] font-medium tracking-wide text-blue"
        >
          <CheckCircle size={14} weight="fill" className="text-blue" aria-hidden />
          Message received — queued
        </motion.p>
        <p className="text-[18px] font-semibold tracking-[-0.015em] text-text">Your message is on its way.</p>
        <p className="max-w-[42ch] text-[14px] leading-[1.6] text-text-secondary">
          Thanks for reaching out — usually by tomorrow morning. If it’s urgent, email directly and the same queue holds it.
        </p>
        <a
          href="mailto:hello@heinminthant.com"
          className="mt-1 inline-flex items-center gap-1.5 text-[13px] font-medium text-text underline decoration-border underline-offset-4 hover:decoration-text"
        >
          <EnvelopeSimple size={14} weight="regular" aria-hidden /> hello@heinminthant.com
        </a>
        <span className="mt-1 text-[11px] tracking-wide text-text-tertiary">Notion-style queue: no spam, no auto-reply — a human reads it.</span>
      </div>
    );
  }

  return (
    <form action={formAction} className="flex flex-col gap-4" noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="contact-name" className="text-[13px] font-medium text-text">
            Name <span className="font-normal text-text-tertiary">*</span>
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder="Ada Lovelace"
            aria-describedby={state.error ? "contact-error" : undefined}
            aria-invalid={state.error ? true : undefined}
            className="field-input"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="contact-email" className="text-[13px] font-medium text-text">
            Email <span className="font-normal text-text-tertiary">*</span>
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="ada@studio.dev"
            aria-describedby={state.error ? "contact-error" : undefined}
            aria-invalid={state.error ? true : undefined}
            className="field-input"
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="contact-message" className="text-[13px] font-medium text-text">
          Message <span className="font-normal text-text-tertiary">*</span>
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={5}
          maxLength={5000}
          placeholder="Tell me about your project or idea."
          aria-describedby={state.error ? "contact-error" : "contact-hint"}
          aria-invalid={state.error ? true : undefined}
          className="field-input resize-y"
        />
        <span id="contact-hint" className="text-[12px] text-text-tertiary">
          Be brief — goal, timeline, and scope are enough.
        </span>
      </div>

      {state.error && (
        <p id="contact-error" role="alert" className="rounded-[6px] border border-[#f5c6c6] bg-[#fdf2f2] px-3 py-2 text-[13px] leading-[1.5] text-[#8a1f1f]">
          {state.error}
        </p>
      )}

      <div className="flex items-center gap-3 pt-1">
        <SubmitButton />
        <span className="text-[12px] text-text-tertiary">Reply within 24h · No spam</span>
      </div>
    </form>
  );
}
