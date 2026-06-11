import type { Metadata } from "next";
import { Syne, DM_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["700", "800"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://voidlet.com"),
  title: {
    default: "Voidlet — Developer tools, shipped from the void",
    template: "%s — Voidlet",
  },
  description:
    "Digital products and developer tools built in the open by one developer. Field guides, starter kits, and AI workflow libraries — launching 2026.",
  openGraph: {
    title: "Voidlet",
    description: "Digital products and developer tools built in the open.",
    url: "https://voidlet.com",
    siteName: "Voidlet",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${syne.variable} ${dmSans.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <Header />
        <main id="top" className="flex-1 pt-[68px]">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
