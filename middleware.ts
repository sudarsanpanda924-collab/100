import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Secure response headers
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set("X-XSS-Protection", "1; mode=block");

  // Custom Content-Security-Policy broad enough to allow Pollinations and HF connections
  response.headers.set(
    "Content-Security-Policy",
    "default-src 'self'; " +
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.googleapis.com; " +
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; " +
    "font-src 'self' https://fonts.gstatic.com; " +
    "img-src 'self' data: blob: https://image.pollinations.ai https://images.unsplash.com; " +
    "connect-src 'self' https://*.googleapis.com https://api.groq.com https://openrouter.ai https://api-inference.huggingface.co; " +
    "media-src 'self' data: blob:;"
  );

  return response;
}

// Target all application routes
export const config = {
  matcher: "/((?!_next/static|_next/image|favicon.ico).*)",
};
