"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { AuthButton } from "./AuthButton";

const baseLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/bags-to-beds", label: "Bags to Beds" },
];

export function Navbar() {
  const pathname = usePathname();
  const { isAdmin } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const links = isAdmin
    ? [...baseLinks, { href: "/upload", label: "Upload" }]
    : baseLinks;

  const linkClass = (href: string) => {
    const active = pathname === href;
    return [
      "rounded-full px-4 py-2 text-sm font-medium transition-all",
      active
        ? "bg-primary text-white shadow-md"
        : "text-dark hover:bg-primary/10 hover:text-primary",
    ].join(" ");
  };

  return (
    <header className="sticky top-0 z-50 border-b border-primary/10 bg-offwhite/95 backdrop-blur-sm">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <Link
          href="/"
          className="font-heading text-lg font-normal text-primary sm:text-xl"
        >
          Anaïs&apos; Crochet
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={linkClass(link.href)}
            >
              {link.label}
            </Link>
          ))}
          <div className="ml-4">
            <AuthButton />
          </div>
        </div>

        <div className="flex items-center gap-3 md:hidden">
          <AuthButton />
          <button
            type="button"
            aria-label="Toggle menu"
            onClick={() => setMenuOpen(!menuOpen)}
            className="rounded-lg p-2 text-dark hover:bg-primary/10"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {menuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div className="border-t border-primary/10 px-4 py-3 md:hidden">
          <div className="flex flex-col gap-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={linkClass(link.href)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
