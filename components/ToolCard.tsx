"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  PenTool,
  Youtube,
  Instagram,
  Image as ImageIcon,
  FileText,
  Briefcase,
  RefreshCw,
  FileCode,
  Video,
  TrendingUp,
  Sparkles,
  ArrowRight
} from "lucide-react";
import { Tool } from "@/types";

interface ToolCardProps {
  tool: Tool;
}

export default function ToolCard({ tool }: ToolCardProps) {
  // Resolve icons based on category slug
  const getIcon = () => {
    switch (tool.category) {
      case "ai-writing":
        return <PenTool className="h-5 w-5 text-blue-600" />;
      case "youtube-creator":
        return <Youtube className="h-5 w-5 text-red-600" />;
      case "instagram":
        return <Instagram className="h-5 w-5 text-pink-600" />;
      case "ai-image":
        return <ImageIcon className="h-5 w-5 text-purple-600" />;
      case "pdf-ocr":
        return <FileText className="h-5 w-5 text-indigo-600" />;
      case "business-finance":
        return <Briefcase className="h-5 w-5 text-teal-600" />;
      case "image-converter":
        return <RefreshCw className="h-5 w-5 text-emerald-600" />;
      case "document-converter":
        return <FileCode className="h-5 w-5 text-violet-600" />;
      case "audio-video":
        return <Video className="h-5 w-5 text-amber-600" />;
      case "youtube-optimization":
        return <TrendingUp className="h-5 w-5 text-sky-600" />;
      default:
        return <Sparkles className="h-5 w-5 text-primary-600" />;
    }
  };

  const getCategoryBg = () => {
    switch (tool.category) {
      case "ai-writing": return "bg-blue-50";
      case "youtube-creator": return "bg-red-50";
      case "instagram": return "bg-pink-50";
      case "ai-image": return "bg-purple-50";
      case "pdf-ocr": return "bg-indigo-50";
      case "business-finance": return "bg-teal-50";
      case "image-converter": return "bg-emerald-50";
      case "document-converter": return "bg-violet-50";
      case "audio-video": return "bg-amber-50";
      case "youtube-optimization": return "bg-sky-50";
      default: return "bg-primary-50";
    }
  };

  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ duration: 0.2 }}
      className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-100 bg-white p-5 shadow-premium hover:border-primary-100 hover:shadow-card"
    >
      <div>
        <div className="flex items-center justify-between gap-2">
          {/* Category Icon */}
          <span className={`inline-flex h-10 w-10 items-center justify-center rounded-xl ${getCategoryBg()} transition-colors`}>
            {getIcon()}
          </span>

          {/* AI vs Utility Badge */}
          {tool.isAI ? (
            <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-accent-500/10 to-primary-500/10 px-2.5 py-0.5 text-xs font-semibold text-accent-700">
              <Sparkles className="h-3 w-3 animate-pulse" /> AI
            </span>
          ) : (
            <span className="rounded-full bg-slate-50 px-2.5 py-0.5 text-xs font-medium text-slate-500">
              Free
            </span>
          )}
        </div>

        {/* Info */}
        <h3 className="mt-4 font-heading text-base font-bold text-slate-900 group-hover:text-primary-600 transition-colors">
          {tool.title}
        </h3>
        <p className="mt-2 text-xs leading-relaxed text-slate-400 line-clamp-2">
          {tool.description}
        </p>
      </div>

      {/* Button link */}
      <div className="mt-6 flex items-center justify-between">
        <span className="text-xs font-medium text-slate-400">Ready to use</span>
        <Link href={`/tools/${tool.slug}`} className="inline-flex items-center gap-1 text-xs font-semibold text-primary-600 group-hover:text-primary-700">
          Open Tool <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </motion.div>
  );
}
