const VALID_MIME_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/svg+xml"];

// Client-side: convert a File to a base64 data URL
export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error("Failed to read file"));
  });
}

// Server-side: strip the data URL prefix and return raw base64
export function stripDataPrefix(base64: string): string {
  return base64.replace(/^data:[^;]+;base64,/, "");
}

// Server-side: convert base64 data URL to a Buffer
export function base64ToBuffer(base64: string): Buffer {
  return Buffer.from(stripDataPrefix(base64), "base64");
}

// Extract MIME type from a base64 data URL
export function getMimeType(base64: string): string {
  const match = base64.match(/^data:([^;]+);base64,/);
  return match ? match[1] : "application/octet-stream";
}

// Validate that a string is a supported image data URL
export function isValidBase64Image(base64: string): boolean {
  const mime = getMimeType(base64);
  return VALID_MIME_TYPES.includes(mime);
}

// Return approximate file size in KB from a base64 string
export function base64SizeKB(base64: string): number {
  const raw = stripDataPrefix(base64);
  return Math.round((raw.length * 3) / 4 / 1024);
}
