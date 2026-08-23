"use client";

import { useActionState, useState } from "react";
import { saveSettings, type ActionState } from "@/app/actions/admin";
import { Field, StatusLine, SubmitButton } from "./ui";

interface SettingsValues {
  name: string;
  role_title: string;
  hero_headline: string;
  hero_subheadline: string;
  about_statement: string;
  about_body: string;
  philosophy: string;
  interests: string;
  currently_learning: string;
  email: string;
  location: string;
  resume_url: string;
  avatar_url: string;
  availability_label: string;
  available: boolean;
}

export default function SettingsForm({ values }: { values: SettingsValues }) {
  const [state, formAction] = useActionState<ActionState, FormData>(saveSettings, {});
  const [fileError, setFileError] = useState<string | null>(null);

  return (
    <form
      action={formAction}
      className="flex flex-col gap-12"
      onSubmit={(e) => {
        const input = e.currentTarget.elements.namedItem("avatar_file");
        const file =
          input instanceof HTMLInputElement && input.files
            ? input.files[0]
            : null;
        if (file && file.size > 4.5 * 1024 * 1024) {
          e.preventDefault();
          setFileError(
            "Image is over ~5 MB. Please choose a smaller file (the server rejects bigger uploads).",
          );
        } else {
          setFileError(null);
        }
      }}
    >
      <StatusLine state={state} />
      {fileError && (
        <p role="alert" className="text-sm text-rose-300">
          {fileError}
        </p>
      )}

      <section className="flex flex-col gap-5">
        <h2 className="text-lg font-semibold text-mist">Identity</h2>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field def={{ name: "name", label: "Full name", type: "text", half: true, required: true }} defaultValue={values.name} />
          <Field def={{ name: "role_title", label: "Role / title", type: "text", half: true }} defaultValue={values.role_title} />
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field def={{ name: "email", label: "Contact email", type: "text", half: true }} defaultValue={values.email} />
          <Field def={{ name: "location", label: "Location", type: "text", half: true }} defaultValue={values.location} />
        </div>
        <Field def={{ name: "resume_url", label: "Résumé link (PDF URL)", type: "url", placeholder: "https://..." }} defaultValue={values.resume_url} />
      </section>

      <section className="flex flex-col gap-5 border-t border-mist/[0.07] pt-10">
        <h2 className="text-lg font-semibold text-mist">Hero section</h2>
        <Field
          def={{
            name: "hero_headline",
            label: "Headline (keep it under two lines)",
            type: "textarea",
          }}
          defaultValue={values.hero_headline}
        />
        <Field
          def={{
            name: "hero_subheadline",
            label: "Subheadline (one short sentence)",
            type: "textarea",
          }}
          defaultValue={values.hero_subheadline}
        />
        <div className="grid gap-5 sm:grid-cols-2">
          <Field
            def={{ name: "availability_label", label: "Availability label", type: "text", half: true }}
            defaultValue={values.availability_label}
          />
          <div className="flex items-end pb-1.5">
            <Field
              def={{ name: "available", label: "Show as open to work", type: "checkbox" }}
              defaultValue={values.available}
            />
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-5 border-t border-mist/[0.07] pt-10">
        <h2 className="text-lg font-semibold text-mist">About</h2>
        <Field
          def={{ name: "about_statement", label: "Large statement", type: "textarea" }}
          defaultValue={values.about_statement}
        />
        <Field
          def={{ name: "about_body", label: "About paragraph", type: "textarea" }}
          defaultValue={values.about_body}
        />
        <Field
          def={{ name: "philosophy", label: "Philosophy", type: "textarea" }}
          defaultValue={values.philosophy}
        />
        <div className="grid gap-5 sm:grid-cols-2">
          <Field
            def={{
              name: "interests",
              label: "Interests (comma separated)",
              type: "textarea",
              half: true,
            }}
            defaultValue={values.interests}
          />
          <Field
            def={{
              name: "currently_learning",
              label: "Currently learning (comma separated)",
              type: "textarea",
              half: true,
            }}
            defaultValue={values.currently_learning}
          />
        </div>
        {values.avatar_url && (
          <div className="flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={values.avatar_url}
              alt="Current avatar"
              className="h-14 w-14 rounded-full border border-mist/15 object-cover"
            />
            <span className="text-xs text-faint">Current avatar</span>
          </div>
        )}
        <input type="hidden" name="avatar_url" value={values.avatar_url} />
        <Field
          def={{
            name: "avatar_file",
            label: "Upload avatar image (JPG/PNG/WebP, up to ~5 MB)",
            type: "file",
          }}
        />
      </section>

      <div>
        <SubmitButton label="Save all changes" />
      </div>
    </form>
  );
}
