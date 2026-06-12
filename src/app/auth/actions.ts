"use server";

import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { createClient, hasSupabaseEnv } from "@/lib/supabase/server";

export type AuthState = {
  error?: string;
  success?: string;
};

const NOT_CONFIGURED =
  "Authentication isn't configured yet. Add the Supabase keys to the environment and try again.";

/** Only allow same-site relative redirect targets. */
function safeNext(value: FormDataEntryValue | null, fallback = "/dashboard") {
  const next = typeof value === "string" ? value : "";
  return next.startsWith("/") && !next.startsWith("//") ? next : fallback;
}

async function siteOrigin() {
  const headerList = await headers();
  return (
    headerList.get("origin") ??
    process.env.NEXT_PUBLIC_SITE_URL ??
    "http://localhost:3000"
  );
}

export async function login(
  _prev: AuthState,
  formData: FormData,
): Promise<AuthState> {
  if (!hasSupabaseEnv()) return { error: NOT_CONFIGURED };

  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  if (!email || !password) return { error: "Email and password are required." };

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return { error: error.message };

  redirect(safeNext(formData.get("next")));
}

export async function signup(
  _prev: AuthState,
  formData: FormData,
): Promise<AuthState> {
  if (!hasSupabaseEnv()) return { error: NOT_CONFIGURED };

  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const confirm = String(formData.get("confirm") ?? "");

  if (!email) return { error: "Email is required." };
  if (password.length < 8)
    return { error: "Password must be at least 8 characters." };
  if (password !== confirm) return { error: "Passwords don't match." };

  const supabase = await createClient();
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: { emailRedirectTo: `${await siteOrigin()}/auth/callback` },
  });
  if (error) return { error: error.message };

  return {
    success:
      "Check your inbox — we sent a confirmation link. Click it to activate your account.",
  };
}

export async function forgotPassword(
  _prev: AuthState,
  formData: FormData,
): Promise<AuthState> {
  if (!hasSupabaseEnv()) return { error: NOT_CONFIGURED };

  const email = String(formData.get("email") ?? "").trim();
  if (!email) return { error: "Enter the email you signed up with." };

  const supabase = await createClient();
  await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${await siteOrigin()}/auth/callback?next=/reset-password`,
  });

  // Always report success so the form can't be used to probe for accounts.
  return {
    success: "If an account exists for that email, a reset link is on its way.",
  };
}

export async function updatePassword(
  _prev: AuthState,
  formData: FormData,
): Promise<AuthState> {
  if (!hasSupabaseEnv()) return { error: NOT_CONFIGURED };

  const password = String(formData.get("password") ?? "");
  const confirm = String(formData.get("confirm") ?? "");

  if (password.length < 8)
    return { error: "Password must be at least 8 characters." };
  if (password !== confirm) return { error: "Passwords don't match." };

  const supabase = await createClient();
  const { error } = await supabase.auth.updateUser({ password });
  if (error) {
    return {
      error:
        error.message === "Auth session missing!"
          ? "Your reset link has expired. Request a new one from the login page."
          : error.message,
    };
  }

  return { success: "Password updated." };
}

export async function signOut(): Promise<void> {
  if (hasSupabaseEnv()) {
    const supabase = await createClient();
    await supabase.auth.signOut();
  }
  redirect("/");
}

export async function signInWithProvider(formData: FormData): Promise<void> {
  if (!hasSupabaseEnv()) redirect("/login?error=config");

  const provider = formData.get("provider") === "google" ? "google" : "github";
  const next = safeNext(formData.get("next"));

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: `${await siteOrigin()}/auth/callback?next=${encodeURIComponent(next)}`,
    },
  });

  if (error || !data.url) redirect("/login?error=oauth");
  redirect(data.url);
}
