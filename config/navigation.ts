import type { AppLocale } from "@/content/types";

export function homeHash(id: string, locale: AppLocale) {
  return locale === "en" ? `/en/#${id}` : `/#${id}`;
}

export const headerNavigation = [
  { id: "hammadde", navKey: "rawMaterial" },
  { id: "uretim", navKey: "production" },
  { id: "urun", navKey: "product" },
  { id: "kullanim", navKey: "applications" },
  { id: "sevkiyat", navKey: "logistics" },
  { id: "iletisim", navKey: "contact" },
] as const;

export const navigation = [
  { id: "hakkimizda", navKey: "about" },
  { id: "hammadde", navKey: "rawMaterial" },
  { id: "uretim", navKey: "production" },
  { id: "urun", navKey: "product" },
  { id: "kullanim", navKey: "applications" },
  { id: "kalite", navKey: "quality" },
  { id: "sevkiyat", navKey: "logistics" },
  { id: "tesis", navKey: "facility" },
  { id: "iletisim", navKey: "contact" },
] as const;

export type NavItem = (typeof navigation)[number];
