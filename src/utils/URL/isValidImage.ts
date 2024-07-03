export async function isValidImageUrl(url: string): Promise<boolean> {
  try {
    new URL(url);
  } catch (_) {
    return false;
  }

  try {
    const response = await fetch(url, { method: "HEAD" });
    const contentType = response.headers.get("Content-Type");
    return response.ok && contentType !== null && contentType.startsWith("image/");
  } catch (error) {
    return false;
  }
}
