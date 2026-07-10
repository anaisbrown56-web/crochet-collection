/** Cloudinary delivery URL with auto format — fixes HEIC/HEIF uploads from phones. */
export function cloudinaryDisplayUrl(url: string): string {
  if (!url || !url.includes("res.cloudinary.com")) {
    return url;
  }

  if (url.includes("/upload/f_auto") || url.includes("/upload/q_auto")) {
    return url;
  }

  return url.replace("/upload/", "/upload/f_auto,q_auto/");
}

export function normalizeImageUrls(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value
      .filter((item): item is string => typeof item === "string" && item.length > 0)
      .map(cloudinaryDisplayUrl);
  }

  if (typeof value === "string" && value.length > 0) {
    return [cloudinaryDisplayUrl(value)];
  }

  return [];
}
