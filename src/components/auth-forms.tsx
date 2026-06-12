"use client";

import { useFormStatus } from "react-dom";
import type { ReactNode } from "react";

export function AuthCard({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
}) {
  return (
    <div className="flex justify-center px-6 py-20 md:py-28">
      <div className="w-full max-w-md rounded-card border border-line bg-card p-8 md:p-10">
        <h1 className="font-display text-2xl font-bold tracking-tight text-fg">
          {title}
        </h1>
        {subtitle && <p className="mt-2 text-sm text-muted">{subtitle}</p>}
        <div className="mt-8">{children}</div>
      </div>
    </div>
  );
}

export function TextField({
  label,
  name,
  type = "text",
  autoComplete,
  minLength,
  required = true,
}: {
  label: string;
  name: string;
  type?: string;
  autoComplete?: string;
  minLength?: number;
  required?: boolean;
}) {
  const id = `field-${name}`;
  return (
    <div className="mb-5">
      <label
        htmlFor={id}
        className="mb-2 block text-xs font-medium uppercase tracking-[0.15em] text-muted"
      >
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        autoComplete={autoComplete}
        minLength={minLength}
        required={required}
        className="w-full rounded-card-sm border border-line bg-surface px-4 py-3 text-sm text-fg outline-none transition-colors duration-300 ease-smooth placeholder:text-faint focus:border-line-accent"
      />
    </div>
  );
}

export function FormButton({ children }: { children: ReactNode }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="mt-2 inline-flex w-full items-center justify-center rounded-card-sm bg-accent px-6 py-3 text-sm font-medium text-white transition-all duration-300 ease-smooth hover:shadow-[0_0_24px_var(--accent-glow)] hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {pending ? "One moment…" : children}
    </button>
  );
}

export function OAuthButton({ children }: { children: ReactNode }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex w-full items-center justify-center gap-2.5 rounded-card-sm border border-line bg-transparent px-4 py-3 text-sm font-medium text-fg transition-all duration-300 ease-smooth hover:border-line-accent hover:bg-accent-soft disabled:cursor-not-allowed disabled:opacity-60"
    >
      {children}
    </button>
  );
}

export function FormMessage({
  kind,
  children,
}: {
  kind: "error" | "success";
  children: ReactNode;
}) {
  return (
    <p
      role={kind === "error" ? "alert" : "status"}
      className={
        kind === "error"
          ? "mb-4 rounded-card-sm border border-[rgba(255,99,99,0.3)] bg-[rgba(255,99,99,0.08)] px-4 py-3 text-sm text-[#ff9d9d]"
          : "mb-4 rounded-card-sm border border-line-accent bg-accent-soft px-4 py-3 text-sm text-fg"
      }
    >
      {children}
    </p>
  );
}

export function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden>
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.55v-2.17c-3.2.7-3.87-1.36-3.87-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.76 2.69 1.25 3.34.96.1-.74.4-1.25.73-1.54-2.55-.29-5.23-1.28-5.23-5.68 0-1.26.45-2.28 1.18-3.09-.12-.29-.51-1.46.11-3.05 0 0 .96-.31 3.15 1.18a10.9 10.9 0 0 1 5.74 0c2.19-1.49 3.15-1.18 3.15-1.18.62 1.59.23 2.76.11 3.05.74.81 1.18 1.83 1.18 3.09 0 4.41-2.69 5.38-5.25 5.67.41.36.78 1.05.78 2.13v3.16c0 .3.21.67.8.55A11.52 11.52 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
    </svg>
  );
}

export function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden>
      <path
        fill="#4285F4"
        d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.47a5.57 5.57 0 0 1-2.4 3.58v3h3.86c2.26-2.09 3.56-5.17 3.56-8.82Z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96H1.29v3.09A11.99 11.99 0 0 0 12 24Z"
      />
      <path
        fill="#FBBC05"
        d="M5.27 14.29A7.2 7.2 0 0 1 4.89 12c0-.8.14-1.57.38-2.29V6.62H1.29a11.99 11.99 0 0 0 0 10.76l3.98-3.09Z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0A11.99 11.99 0 0 0 1.29 6.62l3.98 3.09C6.22 6.86 8.87 4.75 12 4.75Z"
      />
    </svg>
  );
}
