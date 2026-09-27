import type { Metadata } from "next";
import type { AppLocale } from "@/content/types";
import { site } from "@/config/site";
import { absoluteUrl, publicPath } from "@/lib/seo/paths";

type GeoMeta = {
  region?: string;
  placename?: string;
  position?: string;
};

type PageMetadataArgs = {
  locale: AppLocale;
  title: string;
  description: string;
  path: string;
  keywords?: string;
  type?: "website" | "article";
  publishedTime?: string;
  geo?: GeoMeta;
};

export function pageMetadata({
  locale,
  title,
  description,
  path,
  keywords,
  type = "website",
  publishedTime,
  geo,
}: PageMetadataArgs): Metadata {
  const tr = path;
  const en = publicPath("en", path);
  const canonical = publicPath(locale, path);

  return {
    title: { absolute: title },
    description,
    keywords,
    robots: { index: true, follow: true },
    alternates: {
      canonical,
      languages: {
        tr,
        en,
        "x-default": tr,
      },
    },
    openGraph: {
      title,
      description,
      locale: locale === "tr" ? "tr_TR" : "en_US",
      alternateLocale: locale === "tr" ? ["en_US"] : ["tr_TR"],
      type,
      url: absoluteUrl(locale, path),
      siteName: site.name,
      images: [{ url: "/og.jpg", width: 1200, height: 630, alt: site.name }],
      ...(type === "article" && publishedTime
        ? { publishedTime, modifiedTime: publishedTime, authors: [site.name] }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og.jpg"],
    },
    other: geo
      ? {
          ...(geo.region ? { "geo.region": geo.region } : {}),
          ...(geo.placename ? { "geo.placename": geo.placename } : {}),
          ...(geo.position
            ? { "geo.position": geo.position, ICBM: geo.position.replace(";", ", ") }
            : {}),
        }
      : undefined,
  };
}
