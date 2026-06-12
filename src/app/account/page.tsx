import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient, hasSupabaseEnv } from "@/lib/supabase/server";
import { signOut } from "@/app/auth/actions";
import Container from "@/components/Container";
import Card from "@/components/Card";
import PasswordForm from "./password-form";

export const metadata: Metadata = { title: "Account" };

export default async function AccountPage() {
  if (!hasSupabaseEnv()) redirect("/login?error=config");

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login?next=/account");

  const isOAuthUser = user.app_metadata.provider !== "email";

  return (
    <Container className="max-w-2xl py-16 md:py-24">
      <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-accent">
        Account
      </p>
      <h1 className="font-display text-3xl font-bold tracking-tight text-fg">
        Your account
      </h1>

      <Card className="mt-10">
        <h2 className="font-display text-base font-bold text-fg">Email</h2>
        <p className="mt-2 text-sm text-muted">{user.email}</p>
        {isOAuthUser && (
          <p className="mt-1 text-xs text-muted">
            Signed in with {user.app_metadata.provider}.
          </p>
        )}
      </Card>

      {!isOAuthUser && (
        <Card className="mt-6">
          <h2 className="mb-6 font-display text-base font-bold text-fg">
            Change password
          </h2>
          <PasswordForm />
        </Card>
      )}

      <Card className="mt-6">
        <h2 className="font-display text-base font-bold text-fg">Sign out</h2>
        <p className="mt-2 mb-5 text-sm text-muted">
          Signs you out on this device.
        </p>
        <form action={signOut}>
          <button
            type="submit"
            className="inline-flex items-center justify-center rounded-card-sm border border-line bg-transparent px-6 py-3 text-sm font-medium text-fg transition-all duration-300 ease-smooth hover:border-line-accent hover:bg-accent-soft"
          >
            Sign out
          </button>
        </form>
      </Card>
    </Container>
  );
}
