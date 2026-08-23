"use client";

import { useFormStatus } from "react-dom";
import type { ReactNode } from "react";

export interface FieldDef {
  name: string;
  label: string;
  type: "text" | "textarea" | "number" | "checkbox" | "file" | "url";
  placeholder?: string;
  required?: boolean;
  half?: boolean;
}

export function Field({
  def,
  defaultValue,
}: {
  def: FieldDef;
  defaultValue?: string | number | boolean;
}) {
  const id = `f-${def.name}`;

  if (def.type === "checkbox") {
    return (
      <label
        htmlFor={id}
        className="flex cursor-pointer items-center gap-3 text-sm text-dust"
      >
        <input
          id={id}
          name={def.name}
          type="checkbox"
          defaultChecked={Boolean(defaultValue)}
          className="h-4 w-4 accent-[#e6b95f]"
        />
        {def.label}
      </label>
    );
  }

  return (
    <div className={`flex flex-col gap-2 ${def.half ? "" : "sm:col-span-2"}`}>
      <label htmlFor={id} className="text-sm text-dust">
        {def.label}
      </label>
      {def.type === "textarea" ? (
        <textarea
          id={id}
          name={def.name}
          rows={4}
          placeholder={def.placeholder}
          defaultValue={
            typeof defaultValue === "string" || typeof defaultValue === "number"
              ? String(defaultValue)
              : ""
          }
          className="field-input resize-y"
        />
      ) : (
        <input
          id={id}
          name={def.name}
          type={def.type === "file" ? "file" : def.type === "number" ? "number" : "text"}
          accept={def.type === "file" ? "image/*" : undefined}
          placeholder={def.placeholder}
          defaultValue={
            typeof defaultValue === "string" || typeof defaultValue === "number"
              ? String(defaultValue)
              : ""
          }
          className="field-input file:mr-3 file:rounded-md file:border-0 file:bg-mist/10 file:px-3 file:py-1.5 file:text-xs file:text-mist"
        />
      )}
    </div>
  );
}

export function SubmitButton({ label = "Save" }: { label?: string }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex items-center rounded-[10px] bg-starlight px-5 py-2.5 text-sm font-medium text-space transition-all hover:bg-starbright active:-translate-y-px active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
    >
      {pending ? "Saving..." : label}
    </button>
  );
}

export function DangerButton({
  children,
  formAction,
}: {
  children: ReactNode;
  formAction: (formData: FormData) => void | Promise<void>;
}) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      formAction={formAction}
      disabled={pending}
      onClick={(e) => {
        if (!window.confirm("Delete this entry? This cannot be undone.")) {
          e.preventDefault();
        }
      }}
      className="inline-flex items-center rounded-[10px] border border-rose-400/30 px-4 py-2 text-sm text-rose-300 transition-colors hover:border-rose-400/60 hover:text-rose-200 disabled:opacity-50"
    >
      {pending ? "Deleting..." : children}
    </button>
  );
}

export function StatusLine({ state }: { state: { ok?: boolean; error?: string } }) {
  if (state.error) {
    return (
      <p role="alert" className="text-sm text-rose-300">
        {state.error}
      </p>
    );
  }
  if (state.ok) {
    return (
      <p role="status" className="text-sm text-emerald-300">
        Saved.
      </p>
    );
  }
  return null;
}
