"use client";

import { Suspense, useActionState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { login, signInWithProvider, type AuthState } from "@/app/auth/actions";
import {
  AuthCard,
  TextField,
  FormButton,
  OAuthButton,
  FormMessage,
  GitHubIcon,
  GoogleIcon,
} from "@/components/auth-forms";

const URL_ERRORS: Record<string, string> = {
  auth: "That sign-in link was invalid or has expired. Please try again.",
  confirm: "That confirmation link was invalid or has expired. Please try again.",
  oauth: "Something went wrong starting the social login. Please try again.",
  config: "Authentication isn't configured yet. Try again later.",
};

function LoginForm() {
  const params = useSearchParams();
  const next = params.get("next") ?? "/dashboard";
  const urlError = params.get("error");
  const [state, action] = useActionState<AuthState, FormData>(login, {});

  return (
    <AuthCard title="Log in" subtitle="Welcome back to the void.">
      {urlError && URL_ERRORS[urlError] && !state.error && (
        <FormMessage kind="error">{URL_ERRORS[urlError]}</FormMessage>
      )}
      {state.error && <FormMessage kind="error">{state.error}</FormMessage>}

      <form action={action}>
        <input type="hidden" name="next" value={next} />
        <TextField label="Email" name="email" type="email" autoComplete="email" />
        <TextField
          label="Password"
          name="password"
          type="password"
          autoComplete="current-password"
        />
        <FormButton>Log in</FormButton>
      </form>

      <div className="my-6 flex items-center gap-4" aria-hidden>
        <span className="h-px flex-1 bg-line" />
        <span className="text-xs uppercase tracking-[0.2em] text-muted">or</span>
        <span className="h-px flex-1 bg-line" />
      </div>

      <div className="flex flex-col gap-3">
        <form action={signInWithProvider}>
          <input type="hidden" name="provider" value="github" />
          <input type="hidden" name="next" value={next} />
          <OAuthButton>
            <GitHubIcon /> Continue with GitHub
          </OAuthButton>
        </form>
        <form action={signInWithProvider}>
          <input type="hidden" name="provider" value="google" />
          <input type="hidden" name="next" value={next} />
          <OAuthButton>
            <GoogleIcon /> Continue with Google
          </OAuthButton>
        </form>
      </div>

      <p className="mt-8 text-center text-sm text-muted">
        <Link
          href="/forgot-password"
          className="text-fg underline decoration-line underline-offset-4 transition-colors hover:decoration-accent"
        >
          Forgot password?
        </Link>
      </p>
      <p className="mt-3 text-center text-sm text-muted">
        New here?{" "}
        <Link
          href="/signup"
          className="text-fg underline decoration-line underline-offset-4 transition-colors hover:decoration-accent"
        >
          Create an account
        </Link>
      </p>
    </AuthCard>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
