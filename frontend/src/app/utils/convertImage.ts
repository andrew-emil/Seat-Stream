export function convertImage(buffer: Buffer): string {
  const bytes = new Uint8Array(buffer);
  const binaryString = String.fromCharCode(...bytes);
  return `data:image/png;base64,${btoa(binaryString)}base64`;
}
