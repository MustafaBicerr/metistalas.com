import type { MetadataRoute } from "next";
import { articles, CONTENT_UPDATED } from "@/content/seo/articles";
import { isPriorityProvince, provinces } from "@/content/seo/provinces";
import { absoluteUrl } from "@/lib/seo/paths";

const updated = new Date(CONTENT_UPDATED);

function entry(
  path: string,
  priority: number,
): MetadataRoute.Sitemap[number] {
  const tr = absoluteUrl("tr", path);
  const en = absoluteUrl("en", path);
  return {
    url: tr,
    lastModified: updated,
    changeFrequency: "monthly",
    priority,
    alternates: {
      languages: {
        tr,
        en,
        "x-default": tr,
      },
    },
  };
}

function englishEntry(path: string, priority: number): MetadataRoute.Sitemap[number] {
  const tr = absoluteUrl("tr", path);
  const en = absoluteUrl("en", path);
  return {
    url: en,
    lastModified: updated,
    changeFrequency: "monthly",
    priority,
    alternates: {
      languages: {
        tr,
        en,
        "x-default": tr,
      },
    },
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const paths: { path: string; priority: number }[] = [
    { path: "/", priority: 1 },
    { path: "/hizmet-bolgeleri", priority: 0.8 },
    { path: "/blog", priority: 0.7 },
    ...articles.map((article) => ({
      path: `/blog/${article.slug}`,
      priority: article.slug === "metis-talas" || article.province === "elazig" ? 0.8 : 0.7,
    })),
    ...provinces.map((province) => ({
      path: `/talas/${province.slug}`,
      priority: province.slug === "elazig" ? 0.9 : isPriorityProvince(province.slug) ? 0.8 : 0.6,
    })),
  ];

  return paths.flatMap((item) => [
    entry(item.path, item.priority),
    englishEntry(item.path, Math.max(0.4, item.priority - 0.1)),
  ]);
}
