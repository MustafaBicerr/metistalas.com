import type { AppLocale } from "@/content/types";
import { site } from "@/config/site";

const englishPaths: Record<string, string> = {
  "/": "/en",
  "/hizmet-bolgeleri": "/en/service-areas",
};

export function publicPath(locale: AppLocale, path: string) {
  if (locale === "tr") return path;
  return englishPaths[path] ?? `/en${path}`;
}

export function absoluteUrl(locale: AppLocale, path: string) {
  const localized = publicPath(locale, path);
  return localized === "/" ? site.domain : `${site.domain}${localized}`;
}
