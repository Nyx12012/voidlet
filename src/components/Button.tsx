import Link from "next/link";
import type { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  href: string;
  variant?: "primary" | "secondary";
  className?: string;
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-card-sm px-6 py-3 text-sm font-medium transition-all duration-300 ease-smooth";

const variants = {
  primary:
    "bg-accent text-white hover:shadow-[0_0_24px_var(--accent-glow)] hover:brightness-110",
  secondary:
    "border border-line bg-transparent text-fg hover:border-line-accent hover:bg-accent-soft",
};

export default function Button({
  children,
  href,
  variant = "primary",
  className = "",
}: ButtonProps) {
  const classes = `${base} ${variants[variant]} ${className}`;

  if (href.startsWith("#")) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
