"use client";

import React from "react";
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
  Sparkles
} from "lucide-react";
import { Category } from "@/types";

interface CategoryCardProps {
  category: Category;
  isActive: boolean;
  onClick: () => void;
}

export default function CategoryCard({ category, isActive, onClick }: CategoryCardProps) {
  const getIcon = () => {
    switch (category.id) {
      case "ai-writing":
        return <PenTool className={`h-5 w-5 ${isActive ? "text-white" : "text-blue-600"}`} />;
      case "youtube-creator":
        return <Youtube className={`h-5 w-5 ${isActive ? "text-white" : "text-red-600"}`} />;
      case "instagram":
        return <Instagram className={`h-5 w-5 ${isActive ? "text-white" : "text-pink-600"}`} />;
      case "ai-image":
        return <ImageIcon className={`h-5 w-5 ${isActive ? "text-white" : "text-purple-600"}`} />;
      case "pdf-ocr":
        return <FileText className={`h-5 w-5 ${isActive ? "text-white" : "text-indigo-600"}`} />;
      case "business-finance":
        return <Briefcase className={`h-5 w-5 ${isActive ? "text-white" : "text-teal-600"}`} />;
      case "image-converter":
        return <RefreshCw className={`h-5 w-5 ${isActive ? "text-white" : "text-emerald-600"}`} />;
      case "document-converter":
        return <FileCode className={`h-5 w-5 ${isActive ? "text-white" : "text-violet-600"}`} />;
      case "audio-video":
        return <Video className={`h-5 w-5 ${isActive ? "text-white" : "text-amber-600"}`} />;
      case "youtube-optimization":
        return <TrendingUp className={`h-5 w-5 ${isActive ? "text-white" : "text-sky-600"}`} />;
      default:
        return <Sparkles className={`h-5 w-5 ${isActive ? "text-white" : "text-primary-600"}`} />;
    }
  };

  const getActiveBg = () => {
    switch (category.id) {
      case "ai-writing": return "bg-blue-600 border-blue-600 text-white";
      case "youtube-creator": return "bg-red-600 border-red-600 text-white";
      case "instagram": return "bg-pink-600 border-pink-600 text-white";
      case "ai-image": return "bg-purple-600 border-purple-600 text-white";
      case "pdf-ocr": return "bg-indigo-600 border-indigo-600 text-white";
      case "business-finance": return "bg-teal-600 border-teal-600 text-white";
      case "image-converter": return "bg-emerald-600 border-emerald-600 text-white";
      case "document-converter": return "bg-violet-600 border-violet-600 text-white";
      case "audio-video": return "bg-amber-600 border-amber-600 text-white";
      case "youtube-optimization": return "bg-sky-600 border-sky-600 text-white";
      default: return "bg-primary-600 border-primary-600 text-white";
    }
  };

  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-3 rounded-2xl border px-4 py-3 text-left transition-all duration-200 ${
        isActive
          ? `${getActiveBg()} shadow-md scale-[1.01]`
          : "border-slate-100 bg-white text-slate-700 hover:border-slate-200 hover:bg-slate-50/50 shadow-premium"
      }`}
    >
      <span className={`inline-flex h-9 w-9 items-center justify-center rounded-xl ${isActive ? "bg-white/10" : "bg-slate-50"}`}>
        {getIcon()}
      </span>
      <div>
        <div className="text-sm font-semibold tracking-tight leading-none">{category.name}</div>
        <div className={`mt-0.5 text-[10px] ${isActive ? "text-white/80" : "text-slate-400"} line-clamp-1`}>
          {category.description}
        </div>
      </div>
    </button>
  );
}
