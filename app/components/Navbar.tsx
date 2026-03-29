"use client";

import React, { useState } from "react";
import Link from "next/link";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { label: "Features", href: "#features" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "Pricing", href: "#pricing" },
    { label: "Creators", href: "#creators" },
  ];

  return (
    <header className="absolute top-0 left-0 right-0 z-50">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex items-center justify-between h-[72px]">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-xl font-black text-[#1a1a1a] tracking-tight">
              Trigger<span className="text-[#f05a28]">flow</span>
              <span className="text-[#f05a28]">.</span>
            </span>
          </Link>

          {/* Desktop Nav — pill container */}
          <nav className="hidden md:flex items-center bg-white/70 backdrop-blur-md border border-black/[0.06] rounded-full px-2 py-1.5 gap-1 shadow-sm">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="px-4 py-1.5 text-sm font-medium text-[#3d3d3d] hover:text-[#1a1a1a] hover:bg-black/[0.04] rounded-full transition-all"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="#"
              className="px-4 py-2 text-sm font-medium text-[#3d3d3d] hover:text-[#1a1a1a] transition-colors"
            >
              Log In
            </Link>
            <Link
              href="#"
              className="px-5 py-2.5 text-sm font-semibold text-white rounded-full bg-[#1a1a1a] hover:bg-[#333] active:scale-95 transition-all shadow-sm"
            >
              Try free demo
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-full text-[#3d3d3d] hover:bg-black/5 transition-colors"
            aria-label="Toggle menu"
          >
            <div className="w-5 flex flex-col gap-1.5">
              <span className={`block h-0.5 w-full bg-current rounded-full transition-transform duration-300 ${mobileOpen ? "rotate-45 translate-y-2" : ""}`} />
              <span className={`block h-0.5 w-full bg-current rounded-full transition-opacity duration-300 ${mobileOpen ? "opacity-0" : ""}`} />
              <span className={`block h-0.5 w-full bg-current rounded-full transition-transform duration-300 ${mobileOpen ? "-rotate-45 -translate-y-2" : ""}`} />
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ${mobileOpen ? "max-h-80 pb-4" : "max-h-0"}`}>
          <div className="bg-white/80 backdrop-blur-md border border-black/[0.06] rounded-2xl p-3 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="px-4 py-2.5 text-sm font-medium text-[#3d3d3d] hover:bg-black/[0.04] rounded-xl transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-2 pt-2 border-t border-black/[0.06]">
              <Link href="#" className="block w-full text-center px-4 py-2.5 text-sm font-semibold text-white rounded-xl bg-[#f05a28]">
                Try free demo
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
