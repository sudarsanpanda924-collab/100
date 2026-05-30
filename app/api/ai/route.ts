import { NextRequest, NextResponse } from "next/server";
import { getToolBySlug } from "@/lib/tools";
import { checkAndUpdateUsage, getDailyUsage } from "@/firebase";
import { hashString } from "@/lib/utils";
import { getPrompt } from "@/lib/ai/prompts";
import { generateGemini } from "@/lib/ai/providers/gemini";
import { generateGroq } from "@/lib/ai/providers/groq";
import { generateOpenRouter } from "@/lib/ai/providers/openrouter";
import { generatePollinationsImage } from "@/lib/ai/providers/pollinations";
import { runHuggingFace } from "@/lib/ai/providers/huggingface";

const LIMIT = 5;

// Helper to get client IP
function getClientIp(req: NextRequest): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  return (req as any).ip || "127.0.0.1";
}

// GET handler: check credits remaining
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const isCheck = searchParams.get("check") === "true";
  const fp = searchParams.get("fp") || "default";

  if (!isCheck) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const ip = getClientIp(req);
  const ipHash = hashString(`${ip}_${fp}`);

  try {
    const usage = await getDailyUsage(ipHash);
    const remaining = Math.max(0, LIMIT - usage.count);
    return NextResponse.json({ remaining });
  } catch (error) {
    console.error("GET usage check failed:", error);
    return NextResponse.json({ remaining: LIMIT });
  }
}

// POST handler: execute AI generations
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { toolSlug, input, fp = "default" } = body;

    if (!toolSlug) {
      return NextResponse.json({ error: "Missing toolSlug parameters." }, { status: 400 });
    }

    const tool = getToolBySlug(toolSlug);
    if (!tool || !tool.isAI) {
      return NextResponse.json({ error: "Tool not found or is not an AI tool." }, { status: 404 });
    }

    // Enforce limits
    const ip = getClientIp(req);
    const ipHash = hashString(`${ip}_${fp}`);

    const usageCheck = await checkAndUpdateUsage(ipHash, LIMIT);
    if (!usageCheck.allowed) {
      return NextResponse.json(
        { error: "Daily free AI limit reached. Please upgrade to Pro or Agency plans.", remaining: 0 },
        { status: 429 }
      );
    }

    // AI image prompt generation
    if (tool.provider === "pollinations") {
      const imgPrompt = getPrompt(tool.slug, input);
      const imageUrl = await generatePollinationsImage(imgPrompt);
      return NextResponse.json({
        success: true,
        output: imageUrl,
        remaining: usageCheck.remaining,
      });
    }

    // Hugging Face integrations (Speech-to-Text, Background Removal, etc.)
    if (tool.provider === "huggingface") {
      let task: "ocr" | "speech-to-text" | "text-to-speech" | "bg-removal" = "ocr";
      let fileData: any = "";

      if (tool.slug === "screenshot-to-text-extractor" || tool.slug === "receipt-scanner") {
        task = "ocr";
        const fileInput = input.file || "";
        fileData = fileInput.includes(",") ? Buffer.from(fileInput.split(",")[1], "base64") : Buffer.from(fileInput, "base64");
      } else if (tool.slug === "voice-note-to-blog-converter" || tool.slug === "speech-to-text" || tool.slug === "subtitle-generator" || tool.slug === "audio-noise-cleaner") {
        task = "speech-to-text";
        const fileInput = input.file || "";
        fileData = fileInput.includes(",") ? Buffer.from(fileInput.split(",")[1], "base64") : Buffer.from(fileInput, "base64");
      } else if (tool.slug === "text-to-speech" || tool.slug === "pdf-to-audiobook") {
        task = "text-to-speech";
        fileData = input.text || "Hello from ToolVerse.";
      } else if (tool.slug === "background-remover") {
        task = "bg-removal";
        const fileInput = input.file || "";
        fileData = fileInput.includes(",") ? Buffer.from(fileInput.split(",")[1], "base64") : Buffer.from(fileInput, "base64");
      }

      const hfResult = await runHuggingFace(task, fileData);

      let finalOutput = "";
      if (task === "ocr") {
        finalOutput = hfResult?.[0]?.generated_text || hfResult?.text || "OCR scanning completed. No text elements parsed.";
      } else if (task === "speech-to-text") {
        finalOutput = hfResult?.text || "Audio parsing completed. No vocal elements parsed.";
      } else if (task === "text-to-speech" || task === "bg-removal") {
        // Return base64 stream directly
        const mime = task === "text-to-speech" ? "audio/mp3" : "image/png";
        finalOutput = `data:${mime};base64,${hfResult}`;
      }

      return NextResponse.json({
        success: true,
        output: finalOutput,
        remaining: usageCheck.remaining,
      });
    }

    // Text tool execution: Route based on category guidelines
    const prompt = getPrompt(tool.slug, input);
    const primaryProvider = getPrimaryProvider(tool.slug);

    let finalOutput = "";
    let errorLog: string[] = [];

    // Fallback implementation chain: Primary -> Alternative -> OpenRouter
    if (primaryProvider === "gemini") {
      try {
        finalOutput = await generateGemini(prompt);
      } catch (geminiErr: any) {
        errorLog.push(`Gemini: ${geminiErr.message || geminiErr}`);
        try {
          console.warn("Gemini execution failed. Falling back to Groq.");
          finalOutput = await generateGroq(prompt);
        } catch (groqErr: any) {
          errorLog.push(`Groq: ${groqErr.message || groqErr}`);
          try {
            console.warn("Groq execution failed. Falling back to OpenRouter.");
            finalOutput = await generateOpenRouter(prompt);
          } catch (orErr: any) {
            errorLog.push(`OpenRouter: ${orErr.message || orErr}`);
            throw new Error(`All text AI models failed. Logs: ${errorLog.join(" | ")}`);
          }
        }
      }
    } else {
      // Groq is primary
      try {
        finalOutput = await generateGroq(prompt);
      } catch (groqErr: any) {
        errorLog.push(`Groq: ${groqErr.message || groqErr}`);
        try {
          console.warn("Groq execution failed. Falling back to Gemini.");
          finalOutput = await generateGemini(prompt);
        } catch (geminiErr: any) {
          errorLog.push(`Gemini: ${geminiErr.message || geminiErr}`);
          try {
            console.warn("Gemini execution failed. Falling back to OpenRouter.");
            finalOutput = await generateOpenRouter(prompt);
          } catch (orErr: any) {
            errorLog.push(`OpenRouter: ${orErr.message || orErr}`);
            throw new Error(`All text AI models failed. Logs: ${errorLog.join(" | ")}`);
          }
        }
      }
    }

    return NextResponse.json({
      success: true,
      output: finalOutput,
      remaining: usageCheck.remaining,
    });
  } catch (error: any) {
    console.error("API POST handler failed:", error);
    return NextResponse.json({ error: error.message || "An unexpected generation error occurred." }, { status: 500 });
  }
}

// Map slugs to primary providers based on category instructions
function getPrimaryProvider(slug: string): "gemini" | "groq" {
  const geminiSlugs = [
    "ai-cold-email-writer",
    "ai-product-description-generator",
    "ai-bio-generator",
    "linkedin-post-formatter",
    "freelancer-proposal-generator",
    "contract-simplifier",
    "ai-meeting-notes-summarizer",
    "ai-startup-idea-generator",
    "ai-ad-copy-generator",
    "blog-intro-generator",
    "blog-outline-generator",
    "resume-summary-generator",
    "cover-letter-generator",
    "business-proposal-generator",
    "product-review-generator",
    "social-media-post-generator",
    "youtube-description-generator",
    "youtube-script-outline-generator",
    "thumbnail-idea-generator",
    "youtube-channel-bio-generator",
    "youtube-video-summary-generator",
    "youtube-seo-score-checker",
    "youtube-shorts-script-generator",
    "youtube-community-post-generator",
    "youtube-video-idea-generator",
    "instagram-post-idea-generator",
    "instagram-content-calendar-generator",
    "instagram-story-idea-generator",
    "instagram-carousel-outline-generator",
    "pdf-invoice-data-extractor",
    "resume-ats-score-checker",
    "business-name-availability-checker",
    "thumbnail-ctr-analyzer",
    "thumbnail-roast-tool",
    "thumbnail-ab-tester",
    "thumbnail-text-checker",
    "thumbnail-color-analyzer",
    "youtube-title-ctr-analyzer",
    "title-ab-tester",
    "keyword-optimizer",
    "curiosity-gap-analyzer",
    "search-intent-checker",
    "title-thumbnail-match-checker",
    "video-packaging-score-checker",
    "viral-potential-checker",
    "audience-retention-predictor",
  ];

  return geminiSlugs.includes(slug) ? "gemini" : "groq";
}
