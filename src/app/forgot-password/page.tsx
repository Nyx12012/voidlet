"use client";

import { useActionState } from "react";
import Link from "next/link";
import { forgotPassword, type AuthState } from "@/app/auth/actions";
import {
  AuthCard,
  TextField,
  FormButton,
  FormMessage,
} from "@/components/auth-forms";

export default function ForgotPasswordPage() {
  const [state, action] = useActionState<AuthState, FormData>(forgotPassword, {});

  return (
    <AuthCard
      title="Reset your password"
      subtitle="We'll email you a link to set a new one."
    >
      {state.success ? (
        <FormMessage kind="success">{state.success}</FormMessage>
      ) : (
        <>
          {state.error && <FormMessage kind="error">{state.error}</FormMessage>}
          <form action={action}>
            <TextField label="Email" name="email" type="email" autoComplete="email" />
            <FormButton>Send reset link</FormButton>
          </form>
        </>
      )}

      <p className="mt-8 text-center text-sm text-muted">
        Remembered it?{" "}
        <Link
          href="/login"
          className="text-fg underline decoration-line underline-offset-4 transition-colors hover:decoration-accent"
        >
          Back to login
        </Link>
      </p>
    </AuthCard>
  );
}
