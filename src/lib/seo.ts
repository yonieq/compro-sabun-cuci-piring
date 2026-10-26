import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { absoluteUrl } from "@/lib/utils";

interface PageMetadataOptions {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: "website" | "article" | "product";
  keywords?: string[];
  /** Set true only for pages that must never be indexed. */
  noIndex?: boolean;
  publishedTime?: string;
  modifiedTime?: string;
}

/**
 * Build consistent metadata for a page: canonical URL, Open Graph, Twitter
 * card and robots directives. Dynamic routes use this too.
 */
export function pageMetadata({
  title,
  description,
  path,
  image = "/images/hero/og-citrava.svg",
  type = "website",
  keywords = [],
  noIndex = false,
  publishedTime,
  modifiedTime,
}: PageMetadataOptions): Metadata {
  const url = absoluteUrl(path);
  const ogImage = image.startsWith("http") ? image : absoluteUrl(image);

  return {
    title,
    description,
    keywords: keywords.length > 0 ? keywords : undefined,
    alternates: { canonical: url },
    openGraph: {
      type: type === "article" ? "article" : "website",
      url,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      title,
      description,
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
      ...(publishedTime ? { publishedTime } : {}),
      ...(modifiedTime ? { modifiedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
    ...(noIndex
      ? { robots: { index: false, follow: false } }
      : { robots: { index: true, follow: true } }),
  };
}
