import { en } from "./en";
import { tr } from "./tr";
import type { AppLocale, SiteContent } from "./types";

export function getContent(locale: string): SiteContent {
  return locale === "en" ? en : tr;
}

export function isLocale(value: string): value is AppLocale {
  return value === "tr" || value === "en";
}
