// Simple class name joiner
export function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(" ");
}

// Pure JS hashing function for IP hashing (server-safe, edge-safe)
export function hashString(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0; // Convert to 32bit integer
  }
  return Math.abs(hash).toString(16);
}

// Simple browser fingerprint generator (for client usage tracking)
export function getFingerprint(): string {
  if (typeof window === "undefined") return "server";
  
  const navigator_info = window.navigator;
  const screen_info = window.screen;
  
  const rawFingerprint = [
    navigator_info.userAgent,
    navigator_info.language,
    screen_info.colorDepth,
    screen_info.width + "x" + screen_info.height,
    new Date().getTimezoneOffset(),
  ].join("||");

  return hashString(rawFingerprint);
}

// File validator for uploads
export function validateFile(fileName: string, fileSize: number, allowedExtensions: string[]): { valid: boolean; error?: string } {
  const extension = fileName.split(".").pop()?.toLowerCase();
  
  if (!extension || !allowedExtensions.includes("." + extension) && !allowedExtensions.includes(extension)) {
    return {
      valid: false,
      error: `Invalid file format. Allowed formats: ${allowedExtensions.join(", ")}`
    };
  }

  // 10MB file size limit
  const MAX_SIZE = 10 * 1024 * 1024;
  if (fileSize > MAX_SIZE) {
    return {
      valid: false,
      error: "File size exceeds 10MB limit."
    };
  }

  return { valid: true };
}
