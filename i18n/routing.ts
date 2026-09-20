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
  },
});

export type AppLocale = (typeof routing.locales)[number];
