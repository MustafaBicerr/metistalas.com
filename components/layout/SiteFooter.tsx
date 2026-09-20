import { Link } from "@/i18n/navigation";
import type { AppLocale, SiteContent } from "@/content/types";
import { site } from "@/config/site";
import { headerNavigation, homeHash } from "@/config/navigation";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { InstagramLink } from "@/components/brand/InstagramLink";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { Container } from "@/components/ui/Container";
import { getPhoneHref } from "@/lib/utils/phone";

type SiteFooterProps = {
  content: SiteContent;
  locale: AppLocale;
};

export function SiteFooter({ content, locale }: SiteFooterProps) {
  const year = new Date().getFullYear();
  const pageLinks = headerNavigation;

  return (
    <footer className="bg-dark text-on-dark">
      <Container className="py-16 lg:py-20">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-5 lg:gap-8">
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="mb-4 inline-flex items-center">
              <BrandLogo variant="footer" />
            </Link>
            <p className="mt-6 font-accent text-xs font-medium uppercase tracking-[0.2em] text-gold">
              {content.footer.tagline}
            </p>
            <p className="mt-4 max-w-sm font-body text-sm leading-relaxed text-on-dark/60">
              {site.location.line[locale]}
            </p>
            <p className="mt-2 font-body text-sm text-on-dark/60">
              {site.location.service[locale]}
            </p>
            <InstagramLink
              label={content.a11y.instagram}
              showHandle
              onDark
              className="mt-6"
            />
          </div>
          <div>
            <h3 className="mb-6 font-accent text-xs font-semibold uppercase tracking-[0.25em] text-gold">
              {content.nav.pages}
            </h3>
            <ul className="space-y-3">
              {pageLinks.map((item) => (
                <li key={item.id}>
                  <a
                    href={homeHash(item.id, locale)}
                    className="font-body text-sm text-on-dark/60 transition-colors hover:text-gold"
                  >
                    {content.nav[item.navKey]}
                  </a>
                </li>
              ))}
              <li>
                <Link
                  href="/hizmet-bolgeleri"
                  className="font-body text-sm text-on-dark/60 transition-colors hover:text-gold"
                >
                  {content.nav.regions}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-6 font-accent text-xs font-semibold uppercase tracking-[0.25em] text-gold">
              {content.nav.applications}
            </h3>
            <ul className="space-y-3">
              {content.applications.chapters.map((chapter) => (
                <li key={chapter.id}>
                  <a
                    href={homeHash("kullanim", locale)}
                    className="font-body text-sm text-on-dark/60 transition-colors hover:text-gold"
                  >
                    {chapter.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-6 font-accent text-xs font-semibold uppercase tracking-[0.25em] text-gold">
              {content.contact.phonesLabel}
            </h3>
            <ul className="space-y-3">
              {site.phones.map((phone) => (
                <li key={phone.id}>
                  <a
                    href={getPhoneHref(phone)}
                    className="font-accent text-sm tabular-nums text-on-dark/80 hover:text-gold"
                  >
                    <span className="block text-[0.65rem] uppercase tracking-[0.18em] text-on-dark/45">
                      {phone.name}
                    </span>
                    {phone.display}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-6 font-accent text-xs font-semibold uppercase tracking-[0.25em] text-gold">
              {content.nav.regions}
            </h3>
            <ul className="space-y-3">
              {content.regions.groups.map((group) => (
                <li key={group.id}>
                  <Link
                    href="/hizmet-bolgeleri"
                    className="font-body text-sm text-on-dark/60 transition-colors hover:text-gold"
                  >
                    {group.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
      <div className="border-t border-border">
        <Container className="flex flex-col gap-4 py-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-accent text-[0.7rem] uppercase tracking-[0.16em] text-on-dark/45">
            © {year} {site.name}. {content.footer.rights}
          </p>
          <LanguageSwitcher label={content.a11y.language} onDark />
        </Container>
      </div>
    </footer>
  );
}
