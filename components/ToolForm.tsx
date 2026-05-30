"use client";

import React, { useState } from "react";
import { Sparkles, Play, UploadCloud } from "lucide-react";
import { Tool } from "@/types";

interface ToolFormProps {
  tool: Tool;
  onSubmit: (values: Record<string, any>, files: Record<string, string>) => void;
  isLoading: boolean;
}

export default function ToolForm({ tool, onSubmit, isLoading }: ToolFormProps) {
  const [formValues, setFormValues] = useState<Record<string, any>>(() => {
    const defaults: Record<string, any> = {};
    tool.inputFields.forEach((field) => {
      if (field.defaultValue !== undefined) {
        defaults[field.name] = field.defaultValue;
      } else if (field.type === "select" && field.options && field.options.length > 0) {
        defaults[field.name] = field.options[0].value;
      } else {
        defaults[field.name] = "";
      }
    });
    return defaults;
  });

  const [fileValues, setFileValues] = useState<Record<string, string>>({});
  const [fileNames, setFileNames] = useState<Record<string, string>>({});
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (name: string, value: any) => {
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (name: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check size limit: 10MB
    if (file.size > 10 * 1024 * 1024) {
      setError("File size exceeds 10MB limit.");
      return;
    }
    setError(null);

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      setFileValues((prev) => ({ ...prev, [name]: base64String }));
      setFileNames((prev) => ({ ...prev, [name]: file.name }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formValues, fileValues);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="rounded-xl bg-red-50 p-4 text-xs font-medium text-red-800">
          {error}
        </div>
      )}

      <div className="space-y-5">
        {tool.inputFields.map((field) => (
          <div key={field.name} className="flex flex-col gap-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
              {field.label}
            </label>

            {field.type === "text" && (
              <input
                type="text"
                required
                value={formValues[field.name] || ""}
                onChange={(e) => handleInputChange(field.name, e.target.value)}
                placeholder={field.placeholder}
                className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
              />
            )}

            {field.type === "number" && (
              <input
                type="number"
                required
                value={formValues[field.name] ?? ""}
                onChange={(e) => handleInputChange(field.name, e.target.value)}
                placeholder={field.placeholder}
                className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
              />
            )}

            {field.type === "textarea" && (
              <textarea
                required
                rows={4}
                value={formValues[field.name] || ""}
                onChange={(e) => handleInputChange(field.name, e.target.value)}
                placeholder={field.placeholder}
                className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
              />
            )}

            {field.type === "select" && (
              <div className="relative">
                <select
                  value={formValues[field.name] || ""}
                  onChange={(e) => handleInputChange(field.name, e.target.value)}
                  className="w-full appearance-none rounded-xl border border-slate-200 bg-white px-4 py-2.5 pr-10 text-sm text-slate-900 outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
                >
                  {field.options?.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-400">
                  ▼
                </span>
              </div>
            )}

            {field.type === "file" && (
              <div className="relative flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50/50 p-6 text-center hover:bg-slate-50 transition-colors">
                <UploadCloud className="h-8 w-8 text-slate-400" />
                <span className="mt-2 text-xs font-semibold text-slate-700">
                  {fileNames[field.name] || "Upload your file here"}
                </span>
                <span className="mt-1 text-[10px] text-slate-400">
                  Max size: 10MB. File format: {field.accept || "*"}
                </span>
                <input
                  type="file"
                  required
                  accept={field.accept}
                  onChange={(e) => handleFileChange(field.name, e)}
                  className="absolute inset-0 cursor-pointer opacity-0"
                />
              </div>
            )}
          </div>
        ))}
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className={`flex w-full items-center justify-center gap-2 rounded-2xl py-3.5 text-sm font-bold shadow-md transition-all duration-200 ${
          tool.isAI
            ? "bg-gradient-to-r from-primary-600 to-accent-600 text-white hover:opacity-95 hover:shadow-glow"
            : "bg-slate-900 text-white hover:bg-slate-800"
        } disabled:opacity-50`}
      >
        {isLoading ? (
          <>
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
            <span>Processing...</span>
          </>
        ) : (
          <>
            {tool.isAI ? <Sparkles className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            <span>{tool.isAI ? "Generate with AI" : "Run Utility"}</span>
          </>
        )}
      </button>
    </form>
  );
}
