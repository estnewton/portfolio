"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { site } from "@/content/site";

// Sends messages through Formspree (free plan: 50 submissions/month, no server code).
// Setup: create a form at formspree.io, then put its ID in .env.local:
//   NEXT_PUBLIC_FORMSPREE_ID=abcdwxyz
const FORM_ID = process.env.NEXT_PUBLIC_FORMSPREE_ID;

type Status = "idle" | "sending" | "sent" | "error";
type Errors = Partial<Record<"name" | "email" | "message", string>>;

const field =
  "mt-1 w-full rounded-md border-[1.5px] border-ink bg-paper px-3 py-2 text-[16px] outline-none transition focus:shadow-[3px_3px_0_var(--pen)] aria-[invalid=true]:border-cherry";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    const next: Errors = {};
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    if (!name) next.name = "Add your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = "Add an email I can reply to.";
    if (message.length < 10) next.message = "Write a little more (10+ characters).";
    setErrors(next);
    if (Object.keys(next).length) {
      form.querySelector<HTMLElement>(`[name="${Object.keys(next)[0]}"]`)?.focus();
      return;
    }

    if (!FORM_ID) {
      setStatus("error");
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch(`https://formspree.io/f/${FORM_ID}`, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (!res.ok) throw new Error(String(res.status));
      form.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div role="status" className="rounded-[10px] border-[1.5px] border-ink bg-bubblegum-soft p-6">
        <p className="font-display text-2xl font-extrabold tracking-tight">Message sent!</p>
        <p className="mt-1 font-hand text-2xl text-pen">thanks for reaching out, I&apos;ll get back to you soon :)</p>
        <button type="button" onClick={() => setStatus("idle")} className="mt-4 text-sm underline underline-offset-4">
          Send another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-4">
      {/* Honeypot: real people never see or fill this, bots do. Formspree drops these. */}
      <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
      <input type="hidden" name="_subject" value="New message from your portfolio" />

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Name" name="name" error={errors.name}>
          <input id="name" name="name" autoComplete="name" className={field} aria-invalid={!!errors.name} aria-describedby={errors.name ? "name-error" : undefined} />
        </Field>
        <Field label="Email" name="email" error={errors.email}>
          <input id="email" name="email" type="email" autoComplete="email" className={field} aria-invalid={!!errors.email} aria-describedby={errors.email ? "email-error" : undefined} />
        </Field>
      </div>
      <Field label="Message" name="message" error={errors.message}>
        <textarea
          id="message"
          name="message"
          rows={5}
          className={`${field} resize-y`}
          placeholder="Hi Esther, I'm a recruiter at…"
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-error" : undefined}
        />
      </Field>

      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={status === "sending"}
          className="inline-flex items-center gap-2 rounded-full border-[1.5px] border-ink bg-ink px-5 py-2.5 font-medium text-paper shadow-[3px_3px_0_var(--bubblegum)] transition hover:-translate-y-0.5 disabled:opacity-60"
        >
          <Send aria-hidden className="size-4" />
          {status === "sending" ? "Sending…" : "Send message"}
        </button>
        {status === "error" && (
          <p role="alert" className="text-sm text-cherry">
            {FORM_ID ? "That didn't go through. " : "The form isn't connected yet. "}
            Email me at{" "}
            <a href={`mailto:${site.email}`} className="underline underline-offset-2">
              {site.email}
            </a>
            .
          </p>
        )}
      </div>
    </form>
  );
}

function Field({
  label,
  name,
  error,
  children,
}: {
  label: string;
  name: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={name} className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-soft">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${name}-error`} className="mt-1 text-sm text-cherry">
          {error}
        </p>
      )}
    </div>
  );
}
