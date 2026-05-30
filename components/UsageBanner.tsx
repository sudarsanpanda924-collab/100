"use client";

import React from "react";
import { Sparkles, AlertCircle } from "lucide-react";
import Link from "next/link";

interface UsageBannerProps {
  remaining: number;
  limit?: number;
}

export default function UsageBanner({ remaining, limit = 5 }: UsageBannerProps) {
  const used = limit - remaining;
  const percentage = (remaining / limit) * 100;

  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-premium">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent-50 text-accent-600">
            <Sparkles className="h-5 w-5" />
          </span>
          <div>
            <h4 className="font-heading text-sm font-bold text-slate-900">
              Free Daily AI Credits
            </h4>
            <p className="text-xs text-slate-400">
              No login required. Tracked via IP & browser fingerprints.
            </p>
          </div>
        </div>

        {/* Counter UI */}
        <div className="flex flex-col gap-1.5 sm:items-end">
          <div className="flex items-baseline gap-1 text-sm font-semibold text-slate-700">
            <span className="text-base font-bold text-primary-600">{remaining}</span>
            <span className="text-slate-400">/ {limit} credits left today</span>
          </div>

          {/* Progress bar */}
          <div className="h-2 w-full min-w-[150px] rounded-full bg-slate-100 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-300 ${
                remaining === 0
                  ? "bg-red-500"
                  : remaining === 1
                  ? "bg-amber-500"
                  : "bg-gradient-to-r from-primary-500 to-accent-500"
              }`}
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>
      </div>

      {/* Upgrade Banner callout */}
      {remaining === 0 && (
        <div className="mt-4 flex flex-col gap-3 rounded-xl bg-red-50/50 p-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2 text-xs font-semibold text-red-700">
            <AlertCircle className="h-4.5 w-4.5 shrink-0" />
            Daily free AI limit reached. Unlock 250+ runs per day with Pro.
          </div>
          <Link
            href="/#pricing"
            className="inline-block rounded-lg bg-red-600 px-3.5 py-1.5 text-center text-xs font-bold text-white hover:bg-red-500 transition-colors shadow-sm"
          >
            Upgrade for ₹299
          </Link>
        </div>
      )}
    </div>
  );
}
