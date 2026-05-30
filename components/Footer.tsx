import React from "react";
import Link from "next/link";
import { Sparkles, Heart } from "lucide-react";
import { CATEGORIES } from "@/lib/tools";

export default function Footer() {
  return (
    <footer className="border-t border-slate-100 bg-slate-50/50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-5">
          {/* Logo and Info */}
          <div className="col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-tr from-primary-600 to-accent-500 text-white shadow-sm">
                <Sparkles className="h-4.5 w-4.5" />
              </span>
              <span className="font-heading text-lg font-bold text-slate-900">
                ToolVerse<span className="text-primary-600">.AI</span>
              </span>
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-slate-500">
              100+ premium utility and AI-powered tools built for creators, students, developers, and businesses. Unlimited non-AI usage, no login required.
            </p>
          </div>

          {/* Categories 1 */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">Popular Tools</h3>
            <ul className="mt-4 space-y-2">
              {CATEGORIES.slice(0, 3).map((cat) => (
                <li key={cat.id}>
                  <Link href={`/#${cat.id}`} className="text-sm text-slate-600 hover:text-slate-900 transition-colors">
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories 2 */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">Utility Suites</h3>
            <ul className="mt-4 space-y-2">
              {CATEGORIES.slice(3, 7).map((cat) => (
                <li key={cat.id}>
                  <Link href={`/#${cat.id}`} className="text-sm text-slate-600 hover:text-slate-900 transition-colors">
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal / Site Links */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">Platform</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/#pricing" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">
                  Pro Pricing
                </Link>
              </li>
              <li>
                <Link href="/#faq" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">
                  FAQ Help
                </Link>
              </li>
              <li>
                <Link href="/" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="mt-12 border-t border-slate-100 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-center">
          <p className="text-xs text-slate-500">
            &copy; {new Date().getFullYear()} ToolVerse AI. All rights reserved.
          </p>
          <p className="inline-flex items-center gap-1 text-xs text-slate-500">
            Made with <Heart className="h-3 w-3 fill-red-500 text-red-500" /> for the internet.
          </p>
        </div>
      </div>
    </footer>
  );
}
