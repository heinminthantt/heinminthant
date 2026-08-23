"use client";

import { useActionState, useEffect, useState } from "react";
import { PencilSimple, Plus } from "@phosphor-icons/react/dist/ssr";
import type { FieldDef } from "./ui";
import { DangerButton, Field, StatusLine, SubmitButton } from "./ui";
import type { ActionState } from "@/app/actions/admin";

type Item = Record<string, unknown>;

function fieldValue(value: unknown): string | number | boolean {
  if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
    return value;
  }
  return "";
}

interface EntityManagerProps {
  entityLabel: string;
  fields: FieldDef[];
  items: Item[];
  summaryPrimary: string;
  summarySecondary?: string;
  imageKey?: string;
  saveAction: (state: ActionState, fd: FormData) => Promise<ActionState>;
  deleteAction?: (fd: FormData) => Promise<void>;
}

function EntityForm({
  fields,
  item,
  imageKey,
  saveAction,
  onDone,
  onCancel,
}: {
  fields: FieldDef[];
  item: Item | null;
  imageKey?: string;
  saveAction: (state: ActionState, fd: FormData) => Promise<ActionState>;
  onDone: () => void;
  onCancel: () => void;
}) {
  const [state, formAction] = useActionState<ActionState, FormData>(saveAction, {});

  useEffect(() => {
    if (state.ok) onDone();
  }, [state.ok, onDone]);

  return (
    <form
      action={formAction}
      className="flex flex-col gap-5 rounded-2xl border border-starlight/20 bg-deep p-6"
    >
      {item && item.id != null && (
        <input type="hidden" name="id" value={String(item.id)} />
      )}
      {imageKey && (
        <input
          type="hidden"
          name={imageKey}
          value={String(item?.[imageKey] ?? "")}
        />
      )}
      <div className="grid gap-5 sm:grid-cols-2">
        {fields.map((def) =>
          def.type === "checkbox" ? (
            <div key={def.name} className="flex items-end pb-1">
              <Field def={def} defaultValue={item ? Boolean(item[def.name]) : true} />
            </div>
          ) : (
            <div key={def.name} className={def.half ? "" : "sm:col-span-2"}>
              <Field
                def={{ ...def, half: false }}
                defaultValue={
                  item ? fieldValue(item[def.name]) : undefined
                }
              />
            </div>
          ),
        )}
      </div>
      <StatusLine state={state} />
      <div className="flex items-center gap-3">
        <SubmitButton />
        <button
          type="button"
          onClick={onCancel}
          className="rounded-[10px] px-4 py-2.5 text-sm text-dust transition-colors hover:text-mist"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

export default function EntityManager({
  entityLabel,
  fields,
  items,
  summaryPrimary,
  summarySecondary,
  imageKey,
  saveAction,
  deleteAction,
}: EntityManagerProps) {
  const [editing, setEditing] = useState<number | "new" | null>(null);

  return (
    <div>
      <div className="mb-8 flex items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold tracking-tight text-mist">
          {entityLabel}
        </h1>
        {editing !== "new" && (
          <button
            type="button"
            onClick={() => setEditing("new")}
            className="inline-flex items-center gap-2 rounded-[10px] bg-starlight px-4 py-2.5 text-sm font-medium text-space transition-all hover:bg-starbright active:-translate-y-px active:scale-[0.98]"
          >
            <Plus size={15} weight="bold" aria-hidden="true" />
            Add new
          </button>
        )}
      </div>

      {editing === "new" && (
        <div className="mb-8">
          <EntityForm
            fields={fields}
            item={null}
            saveAction={saveAction}
            onDone={() => setEditing(null)}
            onCancel={() => setEditing(null)}
          />
        </div>
      )}

      {items.length === 0 && editing === null && (
        <p className="rounded-2xl border border-dashed border-mist/15 p-10 text-center text-sm text-faint">
          Nothing here yet. Use &quot;Add new&quot; to create your first entry.
        </p>
      )}

      <ul className="flex flex-col gap-3">
        {items.map((item) => {
          const itemId = item.id != null ? Number(item.id) : 0;
          if (editing === itemId) {
            return (
              <li key={String(item.id)}>
                <EntityForm
                  fields={fields}
                  item={item}
                  imageKey={imageKey}
                  saveAction={saveAction}
                  onDone={() => setEditing(null)}
                  onCancel={() => setEditing(null)}
                />
              </li>
            );
          }
          const image = imageKey ? String(item[imageKey] ?? "") : "";
          return (
            <li
              key={String(item.id)}
              className="flex items-center gap-4 rounded-2xl border border-mist/[0.07] bg-deep/60 p-4"
            >
              {imageKey && (
                <div
                  className="hidden h-12 w-16 shrink-0 rounded-lg bg-cover bg-center sm:block"
                  style={
                    image
                      ? { backgroundImage: `url(${image})` }
                      : undefined
                  }
                />
              )}
              <div className="min-w-0 flex-1">
                <p className="truncate font-medium text-mist">
                  {String(item[summaryPrimary] ?? "")}
                  {item.visible === false && (
                    <span className="ml-2 rounded-full border border-mist/15 px-2 py-0.5 align-middle font-mono text-[10px] uppercase tracking-wide text-faint">
                      Hidden
                    </span>
                  )}
                </p>
                {summarySecondary && (
                  <p className="mt-0.5 truncate text-sm text-faint">
                    {String(item[summarySecondary] ?? "")}
                  </p>
                )}
              </div>
              <button
                type="button"
                onClick={() => setEditing(itemId)}
                aria-label={`Edit ${entityLabel} entry`}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] text-dust transition-colors hover:bg-mist/5 hover:text-mist"
              >
                <PencilSimple size={16} />
              </button>
              {deleteAction && (
                <form action={deleteAction}>
                  <input type="hidden" name="id" value={String(item.id)} />
                  <DangerButton formAction={deleteAction}>Delete</DangerButton>
                </form>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
