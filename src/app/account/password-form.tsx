"use client";

import { useActionState } from "react";
import { updatePassword, type AuthState } from "@/app/auth/actions";
import { TextField, FormButton, FormMessage } from "@/components/auth-forms";

export default function PasswordForm() {
  const [state, action] = useActionState<AuthState, FormData>(updatePassword, {});

  return (
    <>
      {state.error && <FormMessage kind="error">{state.error}</FormMessage>}
      {state.success && <FormMessage kind="success">{state.success}</FormMessage>}
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
  );
}
