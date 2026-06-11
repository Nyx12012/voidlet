import type { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
  className?: string;
};

export default function Card({ children, className = "" }: CardProps) {
  return (
    <div
      className={`rounded-card border border-line bg-card p-8 transition-all duration-300 ease-smooth hover:border-line-accent hover:bg-card-hover ${className}`}
    >
      {children}
    </div>
  );
}
