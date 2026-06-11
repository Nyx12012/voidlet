"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "#products", label: "Products" },
  { href: "#why", label: "Why Voidlet" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-[rgba(12,13,17,0.82)] backdrop-blur-xl">
      <nav
        aria-label="Main"
        className="mx-auto flex h-[68px] w-full max-w-[1200px] items-center justify-between px-6 md:px-10"
      >
        <a
          href="#top"
          className="flex items-center gap-2.5 font-display text-xl font-extrabold tracking-tight text-fg"
        >
          <span
            aria-hidden
            className="h-2 w-2 rounded-full bg-accent shadow-[0_0_10px_var(--accent-glow)]"
          />
          Voidlet
        </a>

        <ul className="hidden items-center gap-9 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm font-medium text-muted transition-colors duration-300 ease-smooth hover:text-fg"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <span className="rounded-full border border-line-accent bg-accent-soft px-3 py-1 text-xs font-medium text-fg">
              Launching 2026
            </span>
          </li>
        </ul>

        <button
          type="button"
          className="rounded-card-sm p-2 text-muted transition-colors duration-300 ease-smooth hover:bg-accent-soft hover:text-fg md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {open && (
        <div
          id="mobile-menu"
          className="border-t border-line bg-surface px-6 py-4 md:hidden"
        >
          <ul className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-card-sm px-3 py-3 text-sm font-medium text-muted transition-colors duration-300 ease-smooth hover:bg-accent-soft hover:text-fg"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
