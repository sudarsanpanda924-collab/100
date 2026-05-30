"use client";

import React, { useState } from "react";
import { Check, Copy, FileText, Image as ImageIcon, Sparkles } from "lucide-react";
import CopyButton from "./CopyButton";
import DownloadButton from "./DownloadButton";

interface OutputBoxProps {
  output: any; // Text string, JSON object, image URL, file base64 data
  outputType: "text" | "markdown" | "image" | "file" | "json";
  fileName?: string;
  isAI?: boolean;
}

// Simple regex-based Markdown-to-HTML parser to avoid importing large external libraries
function parseMarkdown(md: string): string {
  if (!md) return "";
  let html = md;
  // Headings
  html = html.replace(/^### (.*$)/gim, '<h4 class="text-sm font-bold mt-4 mb-2 text-slate-800">$1</h4>');
  html = html.replace(/^## (.*$)/gim, '<h3 class="text-base font-bold mt-6 mb-3 text-slate-900 border-b pb-1">$1</h3>');
  html = html.replace(/^# (.*$)/gim, '<h2 class="text-lg font-extrabold mt-8 mb-4 text-slate-900">$1</h2>');
  // Bold
  html = html.replace(/\*\*(.*?)\*\*/gim, '<strong class="font-bold text-slate-900">$1</strong>');
  // Italics
  html = html.replace(/\*(.*?)\*/gim, '<em class="italic">$1</em>');
  // Bullet lists
  html = html.replace(/^\s*-\s+(.*$)/gim, '<li class="ml-4 list-disc text-slate-600 mb-1">$1</li>');
  html = html.replace(/^\s*\*\s+(.*$)/gim, '<li class="ml-4 list-disc text-slate-600 mb-1">$1</li>');
  // Paragraphs / Linebreaks
  html = html.replace(/\n$/gim, "<br />");

  return html;
}

export default function OutputBox({ output, outputType, fileName = "output", isAI = false }: OutputBoxProps) {
  const [imageLoaded, setImageLoaded] = useState(false);

  if (!output) {
    return (
      <div className="flex h-64 flex-col items-center justify-center rounded-3xl border border-slate-100 bg-slate-50/20 p-8 text-center shadow-premium">
        <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-50 text-slate-400">
          <FileText className="h-6 w-6" />
        </span>
        <h4 className="mt-4 font-heading text-sm font-bold text-slate-700">Output Area</h4>
        <p className="mt-1 text-xs text-slate-400 max-w-xs">
          Your processed results will appear here once you hit generate.
        </p>
      </div>
    );
  }

  const isBase64Image = outputType === "image" && typeof output === "string" && output.startsWith("data:image");
  const isImageLink = outputType === "image" && typeof output === "string" && (output.startsWith("http") || output.startsWith("/"));
  const displayImage = isBase64Image || isImageLink;

  return (
    <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-premium space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 border-b border-slate-50 pb-4">
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary-50 text-primary-600">
            <FileText className="h-4 w-4" />
          </span>
          <h4 className="font-heading text-sm font-bold text-slate-900">Result Output</h4>
        </div>

        {/* Copy/Download actions */}
        <div className="flex items-center gap-2">
          {(outputType === "text" || outputType === "markdown") && (
            <CopyButton text={output} />
          )}

          {outputType === "json" && (
            <CopyButton text={JSON.stringify(output, null, 2)} />
          )}

          {(outputType === "file" || outputType === "image") && (
            <DownloadButton data={output} fileName={fileName} />
          )}
        </div>
      </div>

      {/* Renders output types */}
      <div className="overflow-x-auto">
        {outputType === "text" && (
          <textarea
            readOnly
            rows={10}
            value={output}
            className="w-full rounded-2xl border border-slate-100 bg-slate-50/30 p-4 text-sm leading-relaxed text-slate-700 outline-none"
          />
        )}

        {outputType === "markdown" && (
          <div
            className="prose prose-sm max-w-none text-sm leading-relaxed text-slate-600 space-y-4"
            dangerouslySetInnerHTML={{ __html: parseMarkdown(output) }}
          />
        )}

        {outputType === "image" && displayImage && (
          <div className="relative flex flex-col items-center justify-center rounded-2xl border border-slate-100 bg-slate-50/50 p-4 min-h-[300px]">
            {!imageLoaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-slate-50">
                <span className="h-8 w-8 animate-spin rounded-full border-3 border-primary-600 border-t-transparent" />
              </div>
            )}
            <img
              src={output}
              alt="AI Generated"
              onLoad={() => setImageLoaded(true)}
              className={`max-w-full rounded-xl shadow-md max-h-[500px] object-contain transition-opacity duration-300 ${
                imageLoaded ? "opacity-100" : "opacity-0"
              }`}
            />
          </div>
        )}

        {outputType === "json" && typeof output === "object" && (
          <div className="space-y-4">
            {output.summary && (
              <div className="rounded-2xl bg-primary-50/40 p-4 text-sm font-medium leading-relaxed text-primary-900 border border-primary-50">
                {output.summary}
              </div>
            )}
            <div className="grid gap-4 sm:grid-cols-2">
              {Object.entries(output)
                .filter(([key]) => key !== "summary")
                .map(([key, val]) => (
                  <div key={key} className="rounded-2xl border border-slate-100 bg-slate-50/10 p-4">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      {key.replace(/([A-Z])/g, " $1")}
                    </div>
                    <div className="mt-1 font-heading text-lg font-bold text-slate-900">
                      {String(val)}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {outputType === "file" && (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 shadow-sm mb-4">
              <ImageIcon className="h-7 w-7" />
            </span>
            <h5 className="font-heading text-sm font-bold text-slate-800">File is Ready</h5>
            <p className="text-xs text-slate-400 max-w-xs mt-1">
              Your file ({fileName}) has been successfully processed and compiled. Click the download button below to save it.
            </p>
            <div className="mt-6">
              <DownloadButton data={output} fileName={fileName} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
