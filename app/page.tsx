"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Search, Sparkles, TrendingUp, Zap, HelpCircle, ArrowRight } from "lucide-react";
import { TOOLS, CATEGORIES } from "@/lib/tools";
import ToolCard from "@/components/ToolCard";
import CategoryCard from "@/components/CategoryCard";
import PricingCard from "@/components/PricingCard";
import FAQ from "@/components/FAQ";

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Filter tools based on search and category
  const filteredTools = useMemo(() => {
    return TOOLS.filter((tool) => {
      const matchesCategory = selectedCategory ? tool.category === selectedCategory : true;
      const matchesSearch = searchQuery
        ? tool.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          tool.description.toLowerCase().includes(searchQuery.toLowerCase())
        : true;
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  // General site FAQs
  const siteFAQs = [
    {
      question: "Is ToolVerse AI free to use?",
      answer: "Yes! Non-AI tools (such as document converters, image resizers, and calculators) are 100% free with unlimited usage. AI tools (like copy writers and analyzers) offer 5 free uses per day without requiring registration."
    },
    {
      question: "How does the daily credit system work without login?",
      answer: "We track usage securely using a combination of your anonymized IP address and a secure browser fingerprint. You get 5 free runs per day. Limits reset automatically every night at 12:00 AM UTC."
    },
    {
      question: "Are my uploaded files and images safe?",
      answer: "Your security is our priority. Files processed by local utilities run entirely client-side or are deleted immediately after conversion. We do not store your documents, PDFs, or private texts on our servers."
    },
    {
      question: "What are the benefits of the Pro and Agency plans?",
      answer: "Upgrading to Pro (₹299/month) increases your limits to 250 AI runs/day and speeds up processing. The Agency plan (₹999/month) offers unlimited AI generations, team member slots, and programmatic API access keys."
    }
  ];

  // Pick some popular tools for special highlights
  const popularTools = useMemo(() => {
    return TOOLS.filter((t) =>
      [
        "ai-cold-email-writer",
        "youtube-title-generator",
        "pdf-compressor",
        "screenshot-to-text-extractor",
        "gst-calculator",
        "ai-image-generator"
      ].includes(t.slug)
    );
  }, []);

  // Pick trending tools
  const trendingTools = useMemo(() => {
    return TOOLS.filter((t) =>
      [
        "thumbnail-roast-tool",
        "instagram-reel-hook-generator",
        "background-remover",
        "voice-note-to-blog-converter"
      ].includes(t.slug)
    ).slice(0, 4);
  }, []);

  return (
    <div className="relative min-h-screen bg-white">
      {/* Background decorations */}
      <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
        <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-primary-200 to-accent-300 opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72rem]" />
      </div>

      {/* HERO SECTION */}
      <section className="mx-auto max-w-7xl px-4 pt-16 pb-12 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center"
        >
          <span className="inline-flex items-center gap-1 rounded-full bg-primary-50 px-3.5 py-1 text-xs font-semibold text-primary-700 shadow-sm border border-primary-100">
            <Sparkles className="h-3.5 w-3.5 text-primary-500" />
            100% Free - No signup needed
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="mx-auto mt-6 max-w-4xl font-heading text-4xl font-extrabold tracking-tight text-slate-900 sm:text-6xl"
        >
          100+ Free AI Tools for{" "}
          <span className="bg-gradient-to-r from-primary-600 to-accent-500 bg-clip-text text-transparent">
            Creators, Students & Businesses
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mx-auto mt-6 max-w-2xl text-base sm:text-lg leading-relaxed text-slate-500"
        >
          Generate content, convert files, analyze YouTube titles, compress PDFs, create images, and more — all in one place.
        </motion.p>

        {/* Home Search bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mx-auto mt-8 max-w-lg"
        >
          <div className="relative rounded-full shadow-premium border border-slate-100 bg-white p-1.5 focus-within:ring-2 focus-within:ring-primary-100 focus-within:border-primary-400 transition-all flex items-center">
            <span className="pl-3 text-slate-400">
              <Search className="h-5 w-5" />
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by tool name or function..."
              className="w-full border-0 bg-transparent px-3 py-2 text-sm text-slate-900 outline-none placeholder:text-slate-400"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="mr-2 text-xs font-semibold text-slate-400 hover:text-slate-600"
              >
                Clear
              </button>
            )}
          </div>
        </motion.div>
      </section>

      {/* POPULAR / TRENDING CAROUSEL PREVIEW */}
      {!selectedCategory && !searchQuery && (
        <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="h-5 w-5 text-accent-600" />
            <h2 className="font-heading text-lg font-bold text-slate-900">Trending Tools</h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {trendingTools.map((tool) => (
              <ToolCard key={tool.slug} tool={tool} />
            ))}
          </div>
        </section>
      )}

      {/* CATEGORIES SECTION */}
      <section id="categories" className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-100 pb-5">
          <div>
            <h2 className="font-heading text-2xl font-bold tracking-tight text-slate-900">
              Browse by Suite
            </h2>
            <p className="text-slate-500 text-sm mt-1">Select a category to filter our tool collection.</p>
          </div>

          {selectedCategory && (
            <button
              onClick={() => setSelectedCategory(null)}
              className="text-xs font-semibold text-primary-600 hover:text-primary-700 bg-primary-50 px-3 py-1.5 rounded-full"
            >
              Reset Category Filter
            </button>
          )}
        </div>

        {/* Category filtering grid */}
        <div className="mt-8 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-5">
          {CATEGORIES.map((cat) => (
            <CategoryCard
              key={cat.id}
              category={cat}
              isActive={selectedCategory === cat.id}
              onClick={() => setSelectedCategory(selectedCategory === cat.id ? null : cat.id)}
            />
          ))}
        </div>
      </section>

      {/* TOOLS GRID */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 mb-6">
          <h3 className="font-heading text-lg font-bold text-slate-900">
            {selectedCategory
              ? CATEGORIES.find((c) => c.id === selectedCategory)?.name
              : "All Available Tools"}{" "}
            ({filteredTools.length})
          </h3>
        </div>

        {filteredTools.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {filteredTools.map((tool) => (
              <ToolCard key={tool.slug} tool={tool} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center border border-dashed rounded-3xl border-slate-200">
            <p className="text-sm font-semibold text-slate-600">No tools found matching your search criteria.</p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory(null);
              }}
              className="mt-4 text-xs font-bold text-primary-600 hover:underline"
            >
              Clear filters
            </button>
          </div>
        )}
      </section>

      {/* PRICING PLANS */}
      <section className="bg-slate-50/50 border-y border-slate-100 mt-16">
        <PricingCard />
      </section>

      {/* GENERAL FAQ SECTION */}
      <section id="faq" className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="font-heading text-3xl font-bold text-slate-900">Frequently Asked Questions</h2>
          <p className="text-slate-500 text-sm mt-2">Answers to common queries about limits, safety, and options.</p>
        </div>
        <FAQ items={siteFAQs} />
      </section>

      {/* FINAL CALL TO ACTION */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 mb-16">
        <div className="rounded-3xl bg-gradient-to-r from-primary-600 to-accent-600 p-8 md:p-12 text-center text-white shadow-xl relative overflow-hidden">
          <div className="relative z-10 space-y-6 max-w-2xl mx-auto">
            <h2 className="font-heading text-3xl font-extrabold tracking-tight sm:text-4xl">
              Ready to automate your workflow?
            </h2>
            <p className="text-white/80 text-sm leading-relaxed">
              Unlock the full power of ToolVerse AI. Upgrade to Pro for high-limit access to AI copywriters, title checkers, image generators, and priority support.
            </p>
            <div className="flex justify-center pt-2">
              <Link
                href="/#pricing"
                className="inline-flex items-center gap-1.5 rounded-full bg-white px-6 py-3 text-sm font-bold text-primary-600 hover:bg-slate-50 hover:shadow-md transition-all"
              >
                Go Pro Now <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
          {/* Decorative shapes */}
          <div className="absolute top-0 right-0 h-40 w-40 rounded-full bg-white/5 translate-x-10 -translate-y-10" />
          <div className="absolute bottom-0 left-0 h-40 w-40 rounded-full bg-white/5 -translate-x-10 translate-y-10" />
        </div>
      </section>
    </div>
  );
}
