import Container from "@/components/Container";

const siteLinks = [
  { href: "#products", label: "Products" },
  { href: "#why", label: "Why Voidlet" },
];

// Routes that ship in later phases (auth, payments, roadmap). Listed as
// plain text until they exist — no dead links allowed on this site.
const atLaunch = ["Pricing", "Dashboard", "Roadmap"];

export default function Footer() {
  return (
    <footer className="border-t border-line bg-surface">
      <Container className="grid gap-12 py-16 sm:grid-cols-2 md:grid-cols-3">
        <div>
          <p className="flex items-center gap-2.5 font-display text-lg font-extrabold tracking-tight text-fg">
            <span
              aria-hidden
              className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_10px_var(--accent-glow)]"
            />
            Voidlet
          </p>
          <p className="mt-3 max-w-xs text-sm text-muted">
            Developer tools and digital products, built in the open by one
            developer.
          </p>
          <p className="mt-6 text-xs text-faint">
            © {new Date().getFullYear()} Voidlet. All rights reserved.
          </p>
        </div>

        <nav aria-label="Footer">
          <h2 className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-faint">
            Site
          </h2>
          <ul className="flex flex-col gap-2.5">
            {siteLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-sm text-muted transition-colors duration-300 ease-smooth hover:text-fg"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-faint">
            At launch
          </h2>
          <ul className="flex flex-col gap-2.5">
            {atLaunch.map((label) => (
              <li key={label} className="flex items-center gap-2 text-sm text-faint">
                {label}
                <span className="rounded-full bg-teal-soft px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-teal">
                  soon
                </span>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  );
}
