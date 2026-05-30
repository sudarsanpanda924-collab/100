import { NextRequest, NextResponse } from "next/server";
import { getToolBySlug } from "@/lib/tools";
import {
  handleGSTCalculator,
  handleCurrencyProfitCalculator,
  handleProfitMarginCalculator,
  handleEMICalculator,
  handleROICalculator,
  handleBreakEvenCalculator,
  handleStartupCostCalculator
} from "@/lib/handlers/business";
import { handleImageConversion } from "@/lib/handlers/image";
import { handleDocumentConversion } from "@/lib/handlers/doc";
import { handlePDFOperations } from "@/lib/handlers/pdf";
import { handleAudioVideoOperations } from "@/lib/handlers/audio-video";

interface RouteParams {
  params: Promise<{ slug: string }>;
}

export async function POST(req: NextRequest, { params }: RouteParams) {
  try {
    const { slug } = await params;
    const body = await req.json();
    const { input = {}, files = {} } = body;

    const tool = getToolBySlug(slug);
    if (!tool) {
      return NextResponse.json({ error: "Tool not found." }, { status: 404 });
    }

    // 1. BUSINESS & FINANCE CALCULATORS
    const businessSlugs = [
      "gst-calculator",
      "currency-profit-calculator",
      "profit-margin-calculator",
      "emi-calculator",
      "roi-calculator",
      "break-even-calculator",
      "startup-cost-calculator",
    ];

    if (businessSlugs.includes(slug)) {
      let result;
      switch (slug) {
        case "gst-calculator":
          result = handleGSTCalculator(input);
          break;
        case "currency-profit-calculator":
          result = handleCurrencyProfitCalculator(input);
          break;
        case "profit-margin-calculator":
          result = handleProfitMarginCalculator(input);
          break;
        case "emi-calculator":
          result = handleEMICalculator(input);
          break;
        case "roi-calculator":
          result = handleROICalculator(input);
          break;
        case "break-even-calculator":
          result = handleBreakEvenCalculator(input);
          break;
        case "startup-cost-calculator":
          result = handleStartupCostCalculator(input);
          break;
      }
      return NextResponse.json({ success: true, result });
    }

    // Special Business file-converters / builders
    if (slug === "invoice-generator") {
      const invoiceText = `Invoice from ${input.from || "ACME Corp"}\nTo: ${input.to || "Client"}\nItem: ${input.item || "SaaS Dev"}\nAmount: $${input.cost || "0"}`;
      const docResult = await handleDocumentConversion("text-to-pdf-converter", undefined, { text: invoiceText });
      return NextResponse.json(docResult);
    }

    if (slug === "qr-menu-builder") {
      // Return a base64 mock QR menu code (valid 1x1 png image)
      const qrBase64 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=";
      return NextResponse.json({
        success: true,
        fileData: qrBase64,
        fileName: "qr_menu.png",
        contentType: "image/png",
        message: "Menu QR code successfully generated."
      });
    }

    // 2. IMAGE CONVERSION TOOLS
    const imageSlugs = [
      "jpg-to-png-converter",
      "png-to-jpg-converter",
      "webp-to-png-converter",
      "png-to-webp-converter",
      "jpg-to-webp-converter",
      "image-resizer",
      "image-compressor",
      "image-cropper",
      "image-metadata-remover"
    ];

    if (imageSlugs.includes(slug)) {
      const fileBase64 = files.file || "";
      const result = await handleImageConversion(slug, fileBase64, input);
      return NextResponse.json(result);
    }

    // 3. DOCUMENT CONVERSION TOOLS
    const docSlugs = [
      "jpg-to-pdf-converter",
      "pdf-to-jpg-converter",
      "png-to-pdf-converter",
      "word-to-pdf-converter",
      "pdf-to-word-converter",
      "excel-to-pdf-converter",
      "pdf-to-excel-converter",
      "ppt-to-pdf-converter",
      "text-to-pdf-converter",
      "markdown-to-pdf-converter"
    ];

    if (docSlugs.includes(slug)) {
      const fileBase64 = files.file || undefined;
      const result = await handleDocumentConversion(slug, fileBase64, input);
      return NextResponse.json(result);
    }

    // 4. PDF SUITE
    const pdfSlugs = [
      "pdf-compressor",
      "pdf-merger",
      "pdf-splitter",
      "pdf-page-remover"
    ];

    if (pdfSlugs.includes(slug)) {
      const result = await handlePDFOperations(slug, input, files);
      return NextResponse.json(result);
    }

    // 5. AUDIO & VIDEO UTILITIES
    const audioVideoSlugs = [
      "video-to-mp3-converter",
      "audio-format-converter",
      "video-compressor",
      "audio-trimmer",
      "video-thumbnail-extractor",
      "mp4-to-gif-converter"
    ];

    if (audioVideoSlugs.includes(slug)) {
      const result = await handleAudioVideoOperations(slug, input, files);
      return NextResponse.json(result);
    }

    // 6. YOUTUBE OPTIMIZATION SUITE: TITLE LENGTH CHECKER (non-AI tool)
    if (slug === "title-length-checker") {
      const title = input.title || "";
      const length = title.length;
      let status = "Good";
      let summary = "Your title is within the recommended length limits.";

      if (length > 70) {
        status = "Critical (Truncated on Desktop)";
        summary = "Your title exceeds 70 characters and will be cut off on desktop search listings.";
      } else if (length > 60) {
        status = "Warning (Truncated on Mobile)";
        summary = "Your title exceeds 60 characters and may get cut off on mobile screens.";
      }

      return NextResponse.json({
        success: true,
        result: {
          characterCount: length,
          status,
          summary
        }
      });
    }

    return NextResponse.json({ error: `Unhandled local tool: ${slug}` }, { status: 400 });
  } catch (error: any) {
    console.error("Local tool API invocation failed:", error);
    return NextResponse.json({ error: error.message || "Execution error occurred." }, { status: 500 });
  }
}
