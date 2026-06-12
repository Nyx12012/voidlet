"use client";

import { useActionState } from "react";
import Link from "next/link";
import { signup, signInWithProvider, type AuthState } from "@/app/auth/actions";
import {
  AuthCard,
  TextField,
  FormButton,
  OAuthButton,
  FormMessage,
  GitHubIcon,
  GoogleIcon,
} from "@/components/auth-forms";

export default function SignupPage() {
  const [state, action] = useActionState<AuthState, FormData>(signup, {});

  return (
    <AuthCard
      title="Create your account"
      subtitle="One account for every Voidlet product."
    >
      {state.success ? (
        <FormMessage kind="success">{state.success}</FormMessage>
      ) : (
        <>
          {state.error && <FormMessage kind="error">{state.error}</FormMessage>}

          <form action={action}>
            <TextField label="Email" name="email" type="email" autoComplete="email" />
            <TextField
              label="Password"
              name="password"
              type="password"
              autoComplete="new-password"
              minLength={8}
            />
            <TextField
              label="Confirm password"
              name="confirm"
              type="password"
              autoComplete="new-password"
              minLength={8}
            />
            <FormButton>Sign up</FormButton>
          </form>

          <div className="my-6 flex items-center gap-4" aria-hidden>
            <span className="h-px flex-1 bg-line" />
            <span className="text-xs uppercase tracking-[0.2em] text-muted">or</span>
            <span className="h-px flex-1 bg-line" />
          </div>

          <div className="flex flex-col gap-3">
            <form action={signInWithProvider}>
              <input type="hidden" name="provider" value="github" />
              <OAuthButton>
                <GitHubIcon /> Continue with GitHub
              </OAuthButton>
            </form>
            <form action={signInWithProvider}>
              <input type="hidden" name="provider" value="google" />
              <OAuthButton>
                <GoogleIcon /> Continue with Google
              </OAuthButton>
            </form>
          </div>
        </>
      )}

      <p className="mt-8 text-center text-sm text-muted">
        Already have an account?{" "}
        <Link
          href="/login"
          className="text-fg underline decoration-line underline-offset-4 transition-colors hover:decoration-accent"
        >
          Log in
        </Link>
      </p>
    </AuthCard>
  );
}
