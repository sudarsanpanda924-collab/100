"use client";

import React, { useState, useEffect } from "react";
import { Sparkles, HelpCircle } from "lucide-react";
import { Tool } from "@/types";
import { getFingerprint } from "@/lib/utils";
import ToolForm from "@/components/ToolForm";
import OutputBox from "@/components/OutputBox";
import UsageBanner from "@/components/UsageBanner";
import FAQ from "@/components/FAQ";

interface ClientToolPageProps {
  tool: Tool;
}

export default function ClientToolPage({ tool }: ClientToolPageProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [output, setOutput] = useState<any>(null);
  const [remainingCredits, setRemainingCredits] = useState(5);
  const [fingerprint, setFingerprint] = useState("");

  // Load initial daily credits for the client
  useEffect(() => {
    const fp = getFingerprint();
    setFingerprint(fp);

    async function checkCredits() {
      try {
        const res = await fetch(`/api/ai?check=true&fp=${fp}`);
        if (res.ok) {
          const data = await res.json();
          if (data.remaining !== undefined) {
            setRemainingCredits(data.remaining);
          }
        }
      } catch (err) {
        console.error("Failed to check credits:", err);
      }
    }

    if (tool.isAI) {
      checkCredits();
    }
  }, [tool.isAI]);

  const handleSubmit = async (inputs: Record<string, any>, files: Record<string, string>) => {
    setIsLoading(true);
    setOutput(null);

    try {
      if (tool.isAI) {
        // AI tool path
        const response = await fetch("/api/ai", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            toolSlug: tool.slug,
            input: inputs,
            fp: fingerprint,
          }),
        });

        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error || "Generation failed.");
        }

        setOutput(data.output);
        if (data.remaining !== undefined) {
          setRemainingCredits(data.remaining);
        }
      } else {
        // Local tool path
        const response = await fetch(`/api/tools/${tool.slug}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            input: inputs,
            files: files,
          }),
        });

        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error || "Execution failed.");
        }

        if (tool.outputType === "json") {
          setOutput(data.result);
        } else {
          setOutput(data.fileData || data.result);
        }
      }
    } catch (err: any) {
      console.error("Submission failed:", err);
      alert(err.message || "Failed to process request. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-8 grid gap-8 lg:grid-cols-12">
      {/* Input Form Column */}
      <div className="lg:col-span-5 space-y-6">
        {tool.isAI && (
          <UsageBanner remaining={remainingCredits} limit={5} />
        )}

        <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-premium">
          <h3 className="font-heading text-sm font-bold text-slate-900 mb-4 uppercase tracking-wider">
            Tool Inputs
          </h3>
          <ToolForm tool={tool} onSubmit={handleSubmit} isLoading={isLoading} />
        </div>
      </div>

      {/* Output Display Column */}
      <div className="lg:col-span-7 space-y-6">
        <OutputBox
          output={output}
          outputType={tool.outputType}
          fileName={`${tool.slug}_output`}
          isAI={tool.isAI}
        />

        {/* FAQs list */}
        {tool.faq && tool.faq.length > 0 && (
          <div className="mt-12">
            <h3 className="flex items-center gap-2 font-heading text-base font-bold text-slate-900 mb-4">
              <HelpCircle className="h-4.5 w-4.5 text-slate-400" />
              Frequently Asked Questions
            </h3>
            <FAQ items={tool.faq} />
          </div>
        )}
      </div>
    </div>
  );
}
