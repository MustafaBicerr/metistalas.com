"use client";

import { useEffect } from "react";
import { Link } from "@/i18n/navigation";
import { navigation, homeHash } from "@/config/navigation";
import type { AppLocale, SiteContent } from "@/content/types";
import { site } from "@/config/site";
import { InstagramLink } from "@/components/brand/InstagramLink";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { getPhoneHref } from "@/lib/utils/phone";

type MobileNavProps = {
  content: SiteContent;
  locale: AppLocale;
  open: boolean;
  onClose: () => void;
};

export function MobileNav({ content, locale, open, onClose }: MobileNavProps) {
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div
      id="mobile-nav"
      className={`border-t border-border-light bg-white lg:hidden ${
        open ? "block min-h-[calc(100svh-4rem)]" : "hidden"
      }`}
      aria-hidden={!open}
    >
      <nav className="flex flex-col gap-1 px-5 py-6" aria-label={content.nav.menu}>
        {navigation.map((item) => (
          <a
            key={item.id}
            href={homeHash(item.id, locale)}
            className="min-h-11 font-display text-2xl font-light tracking-tight text-dark"
            onClick={onClose}
          >
            {content.nav[item.navKey]}
          </a>
        ))}
        <Link
          href="/hizmet-bolgeleri"
          className="min-h-11 font-display text-2xl font-light tracking-tight text-dark"
          onClick={onClose}
        >
          {content.nav.regions}
        </Link>
        <Link
          href="/blog"
          className="min-h-11 font-display text-2xl font-light tracking-tight text-dark"
          onClick={onClose}
        >
          {content.nav.guide}
        </Link>
      </nav>
      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-border-light px-5 py-4">
        <LanguageSwitcher label={content.a11y.language} />
        <InstagramLink label={content.a11y.instagram} showHandle />
      </div>
      <div className="border-t border-border-light px-5 py-4">
        <a
          href={getPhoneHref(site.phones[0])}
          className="inline-flex min-h-11 font-accent text-xs font-semibold uppercase tracking-[0.2em] text-gold"
        >
          {content.a11y.call} {site.phones[0].display}
        </a>
      </div>
    </div>
  );
}
