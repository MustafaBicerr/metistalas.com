import type { MetadataRoute } from "next";
import { site } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    {
      url: site.domain,
      lastModified: now,
      alternates: {
        languages: {
          tr: site.domain,
          en: `${site.domain}/en`,
        },
      },
    },
    {
      url: `${site.domain}/en`,
      lastModified: now,
      alternates: {
        languages: {
          tr: site.domain,
          en: `${site.domain}/en`,
        },
      },
    },
    {
      url: `${site.domain}/hizmet-bolgeleri`,
      lastModified: now,
      alternates: {
        languages: {
          tr: `${site.domain}/hizmet-bolgeleri`,
          en: `${site.domain}/en/service-areas`,
        },
      },
    },
    {
      url: `${site.domain}/en/service-areas`,
      lastModified: now,
      alternates: {
        languages: {
          tr: `${site.domain}/hizmet-bolgeleri`,
          en: `${site.domain}/en/service-areas`,
        },
      },
    },
  ];
}
