import { BookOpen, Boxes, Sparkles, Eye, BadgeCheck, Layers } from "lucide-react";
import Button from "@/components/Button";
import Card from "@/components/Card";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";

const products = [
  {
    icon: BookOpen,
    name: "The Solo Dev's Stripe Field Guide",
    pitch:
      "Checkout, webhooks, and subscription state for indie SaaS — condensed into one dark-themed guide with copy-paste code.",
    price: "$15 · one-time",
    status: "Available at launch",
    available: true,
  },
  {
    icon: Boxes,
    name: "Voidlet Launch Kit",
    pitch:
      "A production-ready Next.js + Supabase + Stripe boilerplate — auth, payments, and gated downloads already wired.",
    price: "$79 · one-time",
    status: "Coming soon",
    available: false,
  },
  {
    icon: Sparkles,
    name: "DevPrompt Vault",
    pitch:
      "A curated, continuously updated library of battle-tested AI coding prompts and agent workflows for shipping real features.",
    price: "$7/mo · subscription",
    status: "Coming soon",
    available: false,
  },
];

const reasons = [
  {
    icon: Eye,
    title: "Built in the open",
    body: "Every product here runs on the same stack that powers this site. You can inspect the result before you buy the method.",
  },
  {
    icon: BadgeCheck,
    title: "Own what you buy",
    body: "One-time products are yours forever, including updates. Subscriptions only exist where the content genuinely keeps growing.",
  },
  {
    icon: Layers,
    title: "One stack, no bloat",
    body: "No bundles of fifty tools you'll never open. Small, sharp products that solve one expensive problem each.",
  },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_-10%,rgba(133,102,255,0.14),transparent)]"
        />
        <Container className="relative flex flex-col items-center py-24 text-center md:py-36">
          <p className="rise-in mb-6 rounded-full border border-line bg-card px-4 py-1.5 text-xs font-medium text-muted">
            Independent developer tools & digital products
          </p>
          <h1 className="rise-in rise-in-delay-1 max-w-3xl font-display text-[clamp(2.5rem,6vw,4.5rem)] font-extrabold leading-[1.05] tracking-tight text-fg">
            Tools built in the void.
            <br />
            <span className="text-accent">Shipped to you.</span>
          </h1>
          <p className="rise-in rise-in-delay-2 mt-6 max-w-xl text-lg text-muted">
            Voidlet is one developer selling small, sharp products: field
            guides, starter kits, and AI workflow libraries — no fluff, no
            filler.
          </p>
          <div className="rise-in rise-in-delay-3 mt-10 flex flex-wrap items-center justify-center gap-4">
            <Button href="#products">See the lineup</Button>
            <Button href="#why" variant="secondary">
              Why Voidlet
            </Button>
          </div>
        </Container>
      </section>

      {/* Products */}
      <section id="products" className="scroll-mt-[68px] py-16 md:py-24">
        <Container>
          <SectionHeading
            eyebrow="The lineup"
            title="What's coming"
            lede="Three products at launch, built on the exact stack that runs this site. The Field Guide ships first."
          />
          <div className="grid gap-6 md:grid-cols-3">
            {products.map((product) => (
              <Card key={product.name} className="flex flex-col">
                <div className="mb-6 flex items-start justify-between gap-4">
                  <span className="rounded-card-sm bg-accent-soft p-3 text-accent">
                    <product.icon size={22} aria-hidden />
                  </span>
                  <span
                    className={
                      product.available
                        ? "rounded-full border border-line-accent bg-accent-soft px-3 py-1 text-xs font-medium text-fg"
                        : "rounded-full bg-teal-soft px-3 py-1 text-xs font-medium text-teal-bright"
                    }
                  >
                    {product.status}
                  </span>
                </div>
                <h3 className="font-display text-lg font-bold leading-snug text-fg">
                  {product.name}
                </h3>
                <p className="mt-3 flex-1 text-sm text-muted">{product.pitch}</p>
                <p className="mt-6 text-sm font-medium text-muted">{product.price}</p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Why Voidlet */}
      <section id="why" className="scroll-mt-[68px] border-y border-line bg-surface py-16 md:py-24">
        <Container>
          <SectionHeading
            eyebrow="The point"
            title="Why Voidlet"
            lede="Most digital product sites sell volume. Voidlet sells focus."
          />
          <div className="grid gap-10 md:grid-cols-3">
            {reasons.map((reason) => (
              <div key={reason.title}>
                <span className="mb-4 inline-flex rounded-card-sm bg-teal-soft p-3 text-teal-bright">
                  <reason.icon size={22} aria-hidden />
                </span>
                <h3 className="font-display text-base font-bold text-fg">
                  {reason.title}
                </h3>
                <p className="mt-2 text-sm text-muted">{reason.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28">
        <Container className="flex flex-col items-center text-center">
          <h2 className="max-w-2xl font-display text-[2rem] font-bold leading-tight tracking-tight text-fg">
            The Field Guide ships first.
          </h2>
          <p className="mt-4 max-w-md text-base text-muted">
            Accounts, pricing, and checkout arrive at launch. Until then, the
            lineup above is the roadmap.
          </p>
          <Button href="#products" className="mt-8">
            See the lineup
          </Button>
        </Container>
      </section>
    </>
  );
}
