"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Sparkles, Menu, X, ArrowRight } from "lucide-react";
import { TOOLS } from "@/lib/tools";
import { Tool } from "@/types";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Tool[]>([]);
  const pathname = usePathname();

  useEffect(() => {
    if (searchQuery.trim().length > 1) {
      const filtered = TOOLS.filter(
        (t) =>
          t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          t.description.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5);
      setSearchResults(filtered);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  // Close search list on route change
  useEffect(() => {
    setSearchQuery("");
    setIsOpen(false);
  }, [pathname]);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-slate-100 bg-white/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-primary-600 to-accent-500 text-white shadow-md">
                <Sparkles className="h-5 w-5" />
              </span>
              <span className="font-heading text-xl font-bold tracking-tight text-slate-900">
                ToolVerse<span className="bg-gradient-to-r from-primary-600 to-accent-500 bg-clip-text text-transparent">.AI</span>
              </span>
            </Link>
          </div>

          {/* Search Bar - Center */}
          <div className="relative hidden max-w-md flex-1 md:block">
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                <Search className="h-4 w-4" />
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search 130+ free tools..."
                className="w-full rounded-full border border-slate-200 bg-slate-50/50 py-1.5 pl-9 pr-4 text-sm text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-primary-500 focus:bg-white focus:ring-2 focus:ring-primary-100"
              />
            </div>

            {/* Quick search dropdown */}
            {searchResults.length > 0 && (
              <div className="absolute left-0 right-0 mt-2 rounded-2xl border border-slate-100 bg-white p-2 shadow-xl ring-1 ring-black/5">
                <p className="px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-slate-400">Quick Results</p>
                {searchResults.map((tool) => (
                  <Link
                    key={tool.slug}
                    href={`/tools/${tool.slug}`}
                    className="flex items-center justify-between rounded-xl px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                  >
                    <div>
                      <div className="font-medium text-slate-900">{tool.title}</div>
                      <div className="text-xs text-slate-400 line-clamp-1">{tool.description}</div>
                    </div>
                    {tool.isAI && (
                      <span className="rounded bg-accent-50 px-1.5 py-0.5 text-[10px] font-medium text-accent-600">AI</span>
                    )}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Links and CTA */}
          <div className="hidden items-center gap-6 md:flex">
            <Link href="/#categories" className="text-sm font-medium text-slate-600 hover:text-slate-950 transition-colors">
              Tools
            </Link>
            <Link href="/#pricing" className="text-sm font-medium text-slate-600 hover:text-slate-950 transition-colors">
              Pricing
            </Link>
            <Link href="/#faq" className="text-sm font-medium text-slate-600 hover:text-slate-950 transition-colors">
              FAQ
            </Link>
            <Link
              href="/#pricing"
              className="inline-flex items-center gap-1.5 rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800 transition-all shadow-sm"
            >
              Go Pro <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* Mobile hamburger */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center rounded-xl p-2 text-slate-500 hover:bg-slate-50 hover:text-slate-800 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="border-t border-slate-100 bg-white py-4 md:hidden">
          <div className="space-y-1 px-4 pb-3 pt-2">
            <div className="mb-4 relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                <Search className="h-4 w-4" />
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search tools..."
                className="w-full rounded-xl border border-slate-200 py-2 pl-9 pr-4 text-sm text-slate-900 outline-none"
              />
              {searchResults.length > 0 && (
                <div className="mt-2 rounded-xl border border-slate-100 bg-white p-1 shadow-lg">
                  {searchResults.map((tool) => (
                    <Link
                      key={tool.slug}
                      href={`/tools/${tool.slug}`}
                      className="block rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
                    >
                      {tool.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="/#categories"
              className="block rounded-xl px-3 py-2 text-base font-medium text-slate-700 hover:bg-slate-50"
            >
              Browse Tools
            </Link>
            <Link
              href="/#pricing"
              className="block rounded-xl px-3 py-2 text-base font-medium text-slate-700 hover:bg-slate-50"
            >
              Pricing
            </Link>
            <Link
              href="/#faq"
              className="block rounded-xl px-3 py-2 text-base font-medium text-slate-700 hover:bg-slate-50"
            >
              FAQ
            </Link>
            <div className="pt-4">
              <Link
                href="/#pricing"
                className="flex items-center justify-center gap-1.5 rounded-xl bg-slate-900 py-2.5 text-center text-sm font-semibold text-white"
              >
                Go Pro <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
