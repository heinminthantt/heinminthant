"use client";

import { useActionState } from "react";
import { LockKey } from "@phosphor-icons/react/dist/ssr";
import { loginAction, type AuthState } from "@/app/actions/auth";

export default function AdminLoginPage() {
  const [state, formAction] = useActionState<AuthState, FormData>(loginAction, {});

  return (
    <div className="relative flex min-h-[100dvh] items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex flex-col items-center gap-3 text-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-full border border-accent/30 bg-accent/[0.06]">
            <LockKey size={20} className="text-accent" aria-hidden="true" />
          </span>
          <h1 className="text-xl font-semibold tracking-tight text-ink">
            Mission Control
          </h1>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-faint">
            Authorized access only
          </p>
        </div>

        <form action={formAction} className="flex flex-col gap-5 rounded-2xl border border-white/10 bg-surface/70 p-7 backdrop-blur">
          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="text-sm text-muted">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoFocus
              autoComplete="current-password"
              className="field-input"
            />
          </div>

          {state.error && (
            <p role="alert" className="text-sm text-rose-300">
              {state.error}
            </p>
          )}

          <button
            type="submit"
            className="rounded-[10px] bg-accent px-5 py-3 text-sm font-medium text-bg transition-all hover:bg-accent-strong active:-translate-y-px active:scale-[0.98]"
          >
            Enter
          </button>
        </form>
      </div>
    </div>
  );
}
