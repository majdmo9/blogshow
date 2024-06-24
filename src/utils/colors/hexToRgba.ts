export const hexToRgba = (hex: string, alpha: number): string => {
  if (!/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(hex)) {
    throw new Error("Invalid hex color format");
  }

  // Normalize short form (#RGB) to long form (#RRGGBB)
  let normalizedHex = hex;
  if (hex.length === 4) {
    normalizedHex = `#${hex[1]}${hex[1]}${hex[2]}${hex[2]}${hex[3]}${hex[3]}`;
  }

  // Parse hex string to get red, green, and blue values
  const r = parseInt(normalizedHex.slice(1, 3), 16);
  const g = parseInt(normalizedHex.slice(3, 5), 16);
  const b = parseInt(normalizedHex.slice(5, 7), 16);

  if (alpha < 0 || alpha > 1) {
    throw new Error("Alpha value must be between 0 and 1");
  }

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};
