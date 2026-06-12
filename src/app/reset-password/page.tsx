"use client";

import { useActionState } from "react";
import Link from "next/link";
import { updatePassword, type AuthState } from "@/app/auth/actions";
import {
  AuthCard,
  TextField,
  FormButton,
  FormMessage,
} from "@/components/auth-forms";

export default function ResetPasswordPage() {
  const [state, action] = useActionState<AuthState, FormData>(updatePassword, {});

  return (
    <AuthCard title="Choose a new password">
      {state.success ? (
        <>
          <FormMessage kind="success">{state.success}</FormMessage>
          <p className="text-center text-sm text-muted">
            <Link
              href="/dashboard"
              className="text-fg underline decoration-line underline-offset-4 transition-colors hover:decoration-accent"
            >
              Continue to your dashboard →
            </Link>
          </p>
        </>
      ) : (
        <>
          {state.error && <FormMessage kind="error">{state.error}</FormMessage>}
          <form action={action}>
            <TextField
              label="New password"
              name="password"
              type="password"
              autoComplete="new-password"
              minLength={8}
            />
            <TextField
              label="Confirm new password"
              name="confirm"
              type="password"
              autoComplete="new-password"
              minLength={8}
            />
            <FormButton>Update password</FormButton>
          </form>
        </>
      )}
    </AuthCard>
  );
}
