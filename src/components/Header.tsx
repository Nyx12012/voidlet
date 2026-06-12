"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { signOut } from "@/app/auth/actions";

const navLinks = [
  { href: "/#products", label: "Products" },
  { href: "/#why", label: "Why Voidlet" },
];

function SignOutButton({ className }: { className?: string }) {
  return (
    <form action={signOut} className={className}>
      <button
        type="submit"
        className="text-sm font-medium text-muted transition-colors duration-300 ease-smooth hover:text-fg"
      >
        Sign out
      </button>
    </form>
  );
}

export default function Header({ userEmail }: { userEmail: string | null }) {
  const [open, setOpen] = useState(false);

  const authedLinks = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/account", label: "Account" },
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-[rgba(12,13,17,0.82)] backdrop-blur-xl">
      <nav
        aria-label="Main"
        className="mx-auto flex h-[68px] w-full max-w-[1200px] items-center justify-between px-6 md:px-10"
      >
        <Link
          href="/"
          className="flex items-center gap-2.5 font-display text-xl font-extrabold tracking-tight text-fg"
        >
          <span
            aria-hidden
            className="h-2 w-2 rounded-full bg-accent shadow-[0_0_10px_var(--accent-glow)]"
          />
          Voidlet
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
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

          {userEmail ? (
            <>
              {authedLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm font-medium text-muted transition-colors duration-300 ease-smooth hover:text-fg"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <SignOutButton />
              </li>
            </>
          ) : (
            <>
              <li>
                <Link
                  href="/login"
                  className="text-sm font-medium text-muted transition-colors duration-300 ease-smooth hover:text-fg"
                >
                  Log in
                </Link>
              </li>
              <li>
                <Link
                  href="/signup"
                  className="inline-flex items-center justify-center rounded-card-sm bg-accent px-4 py-2 text-sm font-medium text-white transition-all duration-300 ease-smooth hover:shadow-[0_0_24px_var(--accent-glow)] hover:brightness-110"
                >
                  Sign up
                </Link>
              </li>
            </>
          )}
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

            {userEmail ? (
              <>
                {authedLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="block rounded-card-sm px-3 py-3 text-sm font-medium text-muted transition-colors duration-300 ease-smooth hover:bg-accent-soft hover:text-fg"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
                <li className="px-3 py-3">
                  <SignOutButton />
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link
                    href="/login"
                    onClick={() => setOpen(false)}
                    className="block rounded-card-sm px-3 py-3 text-sm font-medium text-muted transition-colors duration-300 ease-smooth hover:bg-accent-soft hover:text-fg"
                  >
                    Log in
                  </Link>
                </li>
                <li>
                  <Link
                    href="/signup"
                    onClick={() => setOpen(false)}
                    className="block rounded-card-sm px-3 py-3 text-sm font-medium text-accent transition-colors duration-300 ease-smooth hover:bg-accent-soft"
                  >
                    Sign up
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      )}
    </header>
  );
}
