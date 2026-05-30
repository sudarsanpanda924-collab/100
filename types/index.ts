export interface InputField {
  name: string;
  label: string;
  type: "text" | "textarea" | "select" | "file" | "number";
  placeholder?: string;
  defaultValue?: string;
  options?: { label: string; value: string }[];
  accept?: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface Tool {
  slug: string;
  title: string;
  category: string;
  description: string;
  isAI: boolean;
  inputFields: InputField[];
  outputType: "text" | "markdown" | "image" | "file" | "json";
  provider: "gemini" | "groq" | "openrouter" | "pollinations" | "huggingface" | "local";
  faq: FAQItem[];
  seoDescription?: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export interface AIRequest {
  toolSlug: string;
  input: Record<string, string>;
  providerPreference?: string;
}

export interface UsageData {
  ipHash: string;
  date: string;
  count: number;
}
