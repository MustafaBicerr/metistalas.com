"use client";

import { useEffect, useMemo } from "react";
import type { KeyboardEvent } from "react";
import { useParams } from "next/navigation";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing, type AppLocale } from "@/i18n/routing";
import { cn } from "@/lib/utils/cn";

const HASH_KEY = "metis-section-hash";

const localeNames: Record<AppLocale, string> = {
  tr: "Türkçe",
  en: "English",
};

type LanguageSwitcherProps = {
  label: string;
  onDark?: boolean;
};

export function LanguageSwitcher({
  label,
  onDark = false,
}: LanguageSwitcherProps) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const inactive = onDark
    ? "text-on-dark/55 hover:text-gold"
    : "text-muted hover:text-gold";
  const active = onDark ? "text-on-dark" : "text-dark";
  const slug = typeof params.slug === "string" ? params.slug : undefined;
  const href = useMemo(
    () =>
      pathname === "/talas/[slug]" && slug
        ? ({ pathname, params: { slug } } as const)
        : pathname === "/blog/[slug]" && slug
          ? ({ pathname, params: { slug } } as const)
          : pathname === "/talas/[slug]" || pathname === "/blog/[slug]"
            ? ("/" as const)
            : pathname,
    [pathname, slug],
  );

  useEffect(() => {
    const hash = sessionStorage.getItem(HASH_KEY);
    if (!hash) return;
    sessionStorage.removeItem(HASH_KEY);
    window.location.hash = hash;
  }, [locale]);

  useEffect(() => {
    for (const code of routing.locales) {
      if (code !== locale) {
        router.prefetch(href, { locale: code });
      }
    }
  }, [href, locale, router]);

  function switchTo(next: AppLocale) {
    if (next === locale) return;
    if (window.location.hash) {
      sessionStorage.setItem(HASH_KEY, window.location.hash);
    }
    router.replace(href, { locale: next });
  }

  function onKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
    event.preventDefault();
    const current = routing.locales.indexOf(locale as AppLocale);
    const delta = event.key === "ArrowRight" ? 1 : -1;
    const next =
      routing.locales[
        (current + delta + routing.locales.length) % routing.locales.length
      ];
    switchTo(next);
  }

  return (
    <div
      role="group"
      aria-label={label}
      className="flex items-center gap-1.5 font-accent text-xs font-semibold uppercase tracking-[0.2em]"
    >
      {routing.locales.map((code, index) => (
        <span key={code} className="flex items-center gap-1.5">
          {index > 0 ? (
            <span className="text-gold/70" aria-hidden="true">
              |
            </span>
          ) : null}
          <button
            type="button"
            onClick={() => switchTo(code)}
            onKeyDown={onKeyDown}
            lang={code}
            className={cn("min-h-11 min-w-8 uppercase", locale === code ? active : inactive)}
            aria-label={localeNames[code]}
            aria-current={locale === code ? true : undefined}
          >
            {code}
          </button>
        </span>
      ))}
    </div>
  );
}
