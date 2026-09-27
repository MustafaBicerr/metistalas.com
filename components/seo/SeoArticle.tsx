import { Link } from "@/i18n/navigation";
import type { AppLocale } from "@/content/types";
import { getContent } from "@/content";
import { getProvince, neighborProvinces, type Province } from "@/content/seo/provinces";
import { site } from "@/config/site";
import { homeHash } from "@/config/navigation";
import { publicPath } from "@/lib/seo/paths";
import { getPhoneHref } from "@/lib/utils/phone";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Eyebrow, Heading, Body } from "@/components/ui/Typography";
import { Button } from "@/components/ui/Button";

type Crumb = {
  label: string;
  path?: string;
};

type SectionCopy = {
  id: string;
  title: string;
  paragraphs: string[];
};

type SeoArticleProps = {
  locale: AppLocale;
  eyebrow: string;
  title: string;
  lede: string;
  sections: SectionCopy[];
  faqs?: { question: string; answer: string }[];
  crumbs: Crumb[];
  provinceSlugs?: string[];
  placesLabel?: string;
  articleLinks?: { slug: string; title: string }[];
};

const labels = {
  tr: {
    neighbors: "Komşu iller",
    related: "İlgili yazılar",
    phones: "Telefon",
    breadcrumb: "Konum",
  },
  en: {
    neighbors: "Nearby provinces",
    related: "Related notes",
    phones: "Telephone",
    breadcrumb: "Breadcrumb",
  },
} as const;

export function SeoArticle({
  locale,
  eyebrow,
  title,
  lede,
  sections,
  faqs = [],
  crumbs,
  provinceSlugs = [],
  placesLabel,
  articleLinks = [],
}: SeoArticleProps) {
  const content = getContent(locale);
  const ui = labels[locale];
  const places = provinceSlugs
    .map((slug) => getProvince(slug))
    .filter((province): province is Province => Boolean(province));

  return (
    <main id="main-content" tabIndex={-1} className="pt-24">
      <Section tone="white">
        <Container className="max-w-3xl pr-20 lg:pr-12">
          <nav aria-label={ui.breadcrumb} className="mb-8">
            <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 font-accent text-[0.65rem] text-muted">
              {crumbs.map((crumb, index) => (
                <li key={`${crumb.label}-${index}`} className="flex items-center gap-2">
                  {index > 0 ? (
                    <span aria-hidden="true" className="text-gold">
                      /
                    </span>
                  ) : null}
                  {crumb.path ? (
                    <a
                      href={publicPath(locale, crumb.path)}
                      className="uppercase tracking-[0.16em] hover:text-gold"
                    >
                      {crumb.label}
                    </a>
                  ) : (
                    <span className="text-dark">{crumb.label}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
          <Eyebrow className="mb-4">{eyebrow}</Eyebrow>
          <Heading as="h1" className="mb-6">
            {title}
          </Heading>
          <Body muted>{lede}</Body>
        </Container>
      </Section>
      {sections.map((section, index) => (
        <Section key={section.id} id={section.id} tone={index % 2 === 0 ? "muted" : "white"}>
          <Container className="max-w-3xl pr-20 lg:pr-12">
            {section.title ? (
              <>
                <h2 className="font-display text-3xl font-light text-dark">{section.title}</h2>
                <div className="mt-4 h-px w-12 bg-gold" aria-hidden="true" />
              </>
            ) : null}
            <div className={section.title ? "mt-6 space-y-4" : "space-y-4"}>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph} className="font-body text-muted leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </Container>
        </Section>
      ))}
      {faqs.length > 0 ? (
        <Section tone="muted">
          <Container className="max-w-3xl pr-20 lg:pr-12">
            <h2 className="font-display text-3xl font-light">{content.faq.title}</h2>
            <div className="mt-10 space-y-8">
              {faqs.map((item) => (
                <article key={item.question}>
                  <h3 className="font-display text-xl text-dark">{item.question}</h3>
                  <p className="mt-3 font-body text-muted">{item.answer}</p>
                </article>
              ))}
            </div>
          </Container>
        </Section>
      ) : null}
      {places.length > 0 || articleLinks.length > 0 ? (
        <Section tone="white">
          <Container className="max-w-3xl pr-20 lg:pr-12">
            {places.length > 0 ? (
              <div>
                <h2 className="font-accent text-xs font-semibold uppercase tracking-[0.22em] text-gold">
                  {placesLabel ?? ui.neighbors}
                </h2>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {places.map((province) => (
                    <li key={province.slug}>
                      <Link
                        href={{ pathname: "/talas/[slug]", params: { slug: province.slug } }}
                        className="inline-flex border border-border-light px-3 py-1.5 font-accent text-[0.65rem] uppercase tracking-[0.16em] text-dark hover:border-gold hover:text-gold"
                      >
                        {province.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
            {articleLinks.length > 0 ? (
              <div className={places.length > 0 ? "mt-12" : undefined}>
                <h2 className="font-accent text-xs font-semibold uppercase tracking-[0.22em] text-gold">
                  {ui.related}
                </h2>
                <ul className="mt-4 space-y-3">
                  {articleLinks.map((article) => (
                    <li key={article.slug}>
                      <Link
                        href={{ pathname: "/blog/[slug]", params: { slug: article.slug } }}
                        className="font-body text-dark hover:text-gold"
                      >
                        {article.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </Container>
        </Section>
      ) : null}
      <Section tone="dark">
        <Container className="max-w-3xl pr-20 lg:pr-12">
          <h2 className="font-accent text-xs font-semibold uppercase tracking-[0.22em] text-gold">
            {ui.phones}
          </h2>
          <ul className="mt-6 space-y-4">
            {site.phones.map((phone) => (
              <li key={phone.id}>
                <a href={getPhoneHref(phone)} className="group block">
                  <span className="block font-accent text-[0.65rem] uppercase tracking-[0.18em] text-on-dark/50">
                    {phone.name}
                  </span>
                  <span className="mt-1 block font-display text-2xl font-light text-on-dark group-hover:text-gold">
                    {phone.display}
                  </span>
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-10">
            <Button href={homeHash("iletisim", locale)}>{content.hero.cta}</Button>
          </div>
        </Container>
      </Section>
    </main>
  );
}

export function neighborSlugList(province: Province) {
  return neighborProvinces(province).map((item) => item.slug);
}
