import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["tr", "en"],
  defaultLocale: "tr",
  localeDetection: false,
  localePrefix: "as-needed",
  pathnames: {
    "/": "/",
    "/hizmet-bolgeleri": {
      tr: "/hizmet-bolgeleri",
      en: "/service-areas",
    },
    "/blog": "/blog",
    "/blog/[slug]": "/blog/[slug]",
    "/talas/[slug]": "/talas/[slug]",
  },
});

export type AppLocale = (typeof routing.locales)[number];
