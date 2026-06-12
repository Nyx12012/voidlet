import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { PackageOpen } from "lucide-react";
import { createClient, hasSupabaseEnv } from "@/lib/supabase/server";
import Container from "@/components/Container";
import Card from "@/components/Card";
import Button from "@/components/Button";

export const metadata: Metadata = { title: "Dashboard" };

export default async function DashboardPage() {
  if (!hasSupabaseEnv()) redirect("/login?error=config");

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login?next=/dashboard");

  return (
    <Container className="py-16 md:py-24">
      <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-accent">
        Dashboard
      </p>
      <h1 className="font-display text-3xl font-bold tracking-tight text-fg">
        Welcome back, {user.email}
      </h1>

      <h2 className="mt-12 mb-6 font-display text-lg font-bold text-fg">
        Your products
      </h2>
      <Card className="flex flex-col items-center py-14 text-center">
        <span className="mb-4 inline-flex rounded-card-sm bg-accent-soft p-3 text-accent">
          <PackageOpen size={24} aria-hidden />
        </span>
        <p className="font-display text-base font-bold text-fg">Nothing here yet</p>
        <p className="mt-2 max-w-sm text-sm text-muted">
          When you buy a Voidlet product, it shows up here with its downloads
          and updates. The store opens at launch.
        </p>
        <Button href="/#products" variant="secondary" className="mt-6">
          See what&apos;s coming
        </Button>
      </Card>
    </Container>
  );
}
