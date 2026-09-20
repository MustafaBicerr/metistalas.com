"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { useLocale } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { headerNavigation, homeHash } from "@/config/navigation";
import type { SiteContent } from "@/content/types";
import type { AppLocale } from "@/content/types";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { InstagramLink } from "@/components/brand/InstagramLink";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { MobileNav } from "@/components/layout/MobileNav";
import { cn } from "@/lib/utils/cn";

type SiteHeaderProps = {
  content: SiteContent;
};

export function SiteHeader({ content }: SiteHeaderProps) {
  const locale = useLocale() as AppLocale;
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const onHome = pathname === "/";
  const onDark = onHome && !scrolled && !open;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-[60] transition-all duration-500",
        scrolled || open || !onHome
          ? "border-b border-border-light bg-white/95 shadow-sm backdrop-blur-md"
          : "bg-transparent",
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-5 sm:px-8 lg:h-20 lg:px-12 xl:px-16">
        <Link href="/" className="flex min-h-11 min-w-0 items-center">
          <BrandLogo variant={onDark ? "header-dark" : "header-light"} />
        </Link>
        <nav
          className="hidden items-center gap-6 xl:gap-8 lg:flex"
          aria-label={content.nav.menu}
        >
          {headerNavigation.map((item) => (
            <a
              key={item.id}
              href={homeHash(item.id, locale)}
              className={cn(
                "relative pb-1 font-accent text-xs font-medium uppercase tracking-[0.15em] transition-colors duration-300",
                "after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-gold after:transition-all after:duration-300 hover:after:w-full hover:text-gold",
                onDark ? "text-on-dark" : "text-dark",
              )}
            >
              {content.nav[item.navKey]}
            </a>
          ))}
        </nav>
        <div className="flex shrink-0 items-center gap-1 sm:gap-2">
          <InstagramLink
            label={content.a11y.instagram}
            onDark={onDark}
            className="hidden lg:inline-flex"
          />
          <LanguageSwitcher label={content.a11y.language} onDark={onDark} />
          <button
            type="button"
            className={cn(
              "min-h-11 min-w-11 p-2 lg:hidden",
              onDark ? "text-on-dark" : "text-dark",
            )}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? content.a11y.closeMenu : content.a11y.openMenu}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      <MobileNav
        content={content}
        locale={locale}
        open={open}
        onClose={() => setOpen(false)}
      />
    </header>
  );
}
