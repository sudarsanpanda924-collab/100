export async function generatePollinationsImage(prompt: string, options?: { width?: number; height?: number; logo?: boolean }): Promise<string> {
  const width = options?.width || 1024;
  const height = options?.height || 1024;
  const logo = options?.logo ?? false;

  const cleanPrompt = encodeURIComponent(prompt.trim());
  const seed = Math.floor(Math.random() * 1000000);

  // Pollinations AI image generator endpoint
  const url = `https://image.pollinations.ai/prompt/${cleanPrompt}?width=${width}&height=${height}&seed=${seed}&nologo=${!logo}&model=flux`;

  // Return the direct image rendering URL
  return url;
}
