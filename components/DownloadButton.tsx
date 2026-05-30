"use client";

import React from "react";
import { Download } from "lucide-react";

interface DownloadButtonProps {
  data: string; // Base64 (data:...) or plain text
  fileName: string;
}

export default function DownloadButton({ data, fileName }: DownloadButtonProps) {
  const handleDownload = () => {
    if (!data) return;

    try {
      const element = document.createElement("a");

      if (data.startsWith("data:")) {
        // Base64 file download
        element.href = data;
      } else {
        // Text file download
        const file = new Blob([data], { type: "text/plain;charset=utf-8" });
        element.href = URL.createObjectURL(file);
      }

      element.download = fileName || "toolverse_output.txt";
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    } catch (error) {
      console.error("Download failed:", error);
    }
  };

  return (
    <button
      onClick={handleDownload}
      disabled={!data}
      className="inline-flex items-center gap-1.5 rounded-xl bg-primary-600 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-primary-500 transition-colors disabled:opacity-50"
    >
      <Download className="h-3.5 w-3.5" />
      <span>Download File</span>
    </button>
  );
}
