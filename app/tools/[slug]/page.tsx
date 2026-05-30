import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getToolBySlug, TOOLS } from "@/lib/tools";
import { Sparkles, ArrowLeft, ChevronRight } from "lucide-react";
import ClientToolPage from "./ClientToolPage";
import { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Generate dynamic SEO metadata
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const tool = getToolBySlug(slug);

  if (!tool) return {};

  return {
    title: `${tool.title} – Free Online Tool | ToolVerse AI`,
    description: tool.seoDescription || `Use ${tool.title} online for free. Fast, simple, AI-powered tool for creators, students, freelancers and businesses.`,
    openGraph: {
      title: `${tool.title} – Free Online Tool`,
      description: tool.description,
      type: "article",
    },
  };
}

export default async function ToolPage({ params }: PageProps) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);

  if (!tool) {
    notFound();
  }

  // Get 3 related tools in the same category
  const relatedTools = TOOLS.filter(
    (t) => t.category === tool.category && t.slug !== tool.slug
  ).slice(0, 3);

  // Generate structured JSON-LD data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": tool.title,
    "url": `https://toolverse-ai.vercel.app/tools/${tool.slug}`,
    "description": tool.description,
    "applicationCategory": tool.category,
    "operatingSystem": "All",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "INR"
    },
    "browserRequirements": "Requires JavaScript. Requires HTML5."
  };

  return (
    <div className="min-h-screen bg-slate-50/30 pb-16 pt-8">
      {/* JSON-LD Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-xs font-semibold text-slate-400">
          <Link href="/" className="hover:text-slate-600 transition-colors">Home</Link>
          <ChevronRight className="h-3 w-3" />
          <Link href={`/#${tool.category}`} className="hover:text-slate-600 capitalize transition-colors">
            {tool.category.replace("-", " ")}
          </Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-slate-600 line-clamp-1">{tool.title}</span>
        </nav>

        {/* Back link */}
        <div className="mt-4">
          <Link href="/" className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors">
            <ArrowLeft className="h-4 w-4" /> Back to Dashboard
          </Link>
        </div>

        {/* Header Title */}
        <div className="mt-6 border-b border-slate-100 pb-6">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="font-heading text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              {tool.title}
            </h1>
            <span className="capitalize rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-500">
              {tool.category.replace("-", " ")}
            </span>
            {tool.isAI && (
              <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-accent-500/10 to-primary-500/10 px-3 py-1 text-xs font-bold text-accent-600">
                <Sparkles className="h-3.5 w-3.5 animate-pulse" /> AI Engine
              </span>
            )}
          </div>
          <p className="mt-3 text-sm leading-relaxed text-slate-400 max-w-3xl">
            {tool.description}
          </p>
        </div>

        {/* Client Interactive Area */}
        <ClientToolPage tool={tool} />

        {/* Related Tools Section */}
        {relatedTools.length > 0 && (
          <div className="mt-16 border-t border-slate-100 pt-10">
            <h3 className="font-heading text-lg font-bold text-slate-900 mb-6">
              Related Tools
            </h3>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedTools.map((t) => (
                <div
                  key={t.slug}
                  className="rounded-2xl border border-slate-100 bg-white p-5 shadow-premium hover:shadow-md transition-shadow"
                >
                  <h4 className="font-heading text-sm font-bold text-slate-900">{t.title}</h4>
                  <p className="mt-1.5 text-xs text-slate-400 line-clamp-2">{t.description}</p>
                  <Link
                    href={`/tools/${t.slug}`}
                    className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-primary-600 hover:text-primary-700"
                  >
                    Open Tool <ChevronRight className="h-3 w-3" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
