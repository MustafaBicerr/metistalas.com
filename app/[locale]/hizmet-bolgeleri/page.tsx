import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getContent, isLocale } from "@/content";
import { site } from "@/config/site";
import { faqJsonLd, localBusinessJsonLd } from "@/lib/seo/jsonld";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Eyebrow, Heading, Body } from "@/components/ui/Typography";
import { Button } from "@/components/ui/Button";
import { homeHash } from "@/config/navigation";

type Props = {
  params: Promise<{ locale: string }>;
};

export const dynamic = "force-static";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const resolved = isLocale(locale) ? locale : "tr";
  const content = getContent(resolved);
  const path = resolved === "tr" ? "/hizmet-bolgeleri" : "/en/service-areas";

  return {
    title: {
      absolute: `${content.regions.title} | ${site.name}`,
    },
    description: content.regions.intro,
    keywords: content.meta.keywords,
    alternates: {
      canonical: path,
      languages: {
        tr: "/hizmet-bolgeleri",
        en: "/en/service-areas",
      },
    },
    openGraph: {
      title: content.regions.title,
      description: content.regions.intro,
      url: `${site.domain}${path}`,
      locale: resolved === "tr" ? "tr_TR" : "en_US",
      type: "website",
      siteName: site.name,
      images: [{ url: "/og.jpg", width: 1200, height: 630, alt: site.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: content.regions.title,
      description: content.regions.intro,
      images: ["/og.jpg"],
    },
    other: {
      "geo.region": site.location.regionCode,
    },
  };
}

export default async function ServiceAreasPage({ params }: Props) {
  const { locale } = await params;
  const resolved = isLocale(locale) ? locale : "tr";
  setRequestLocale(resolved);
  const content = getContent(resolved);

  return (
    <main id="main-content" tabIndex={-1} className="pt-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessJsonLd(resolved)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqJsonLd(resolved)),
        }}
      />
      <Section tone="white">
        <Container className="max-w-3xl">
          <Eyebrow className="mb-4">{content.regions.eyebrow}</Eyebrow>
          <Heading className="mb-6">{content.regions.title}</Heading>
          <Body muted>{content.regions.intro}</Body>
        </Container>
      </Section>
      <Section tone="muted">
        <Container className="grid gap-12 lg:grid-cols-2">
          {content.regions.groups.map((group) => (
            <article key={group.id}>
              <h2 className="font-display text-3xl font-light text-dark">
                {group.title}
              </h2>
              <div className="mt-4 h-px w-12 bg-gold" aria-hidden="true" />
              <p className="mt-5 font-body text-muted">{group.body}</p>
              <ul className="mt-6 flex flex-wrap gap-2">
                {group.cities.map((city) => (
                  <li
                    key={city}
                    className="border border-border-light px-3 py-1.5 font-accent text-[0.65rem] uppercase tracking-[0.16em] text-dark"
                  >
                    {city}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </Container>
      </Section>
      <Section tone="white">
        <Container className="max-w-3xl">
          <h2 className="font-display text-3xl font-light">{content.faq.title}</h2>
          <div className="mt-10 space-y-8">
            {content.faq.items.map((item) => (
              <article key={item.question}>
                <h3 className="font-display text-xl text-dark">{item.question}</h3>
                <p className="mt-3 font-body text-muted">{item.answer}</p>
              </article>
            ))}
          </div>
          <div className="mt-12">
            <Button href={homeHash("iletisim", resolved)}>{content.hero.cta}</Button>
          </div>
          <p className="mt-8">
            <Link href="/" className="font-accent text-xs uppercase tracking-[0.2em] text-gold">
              MET-İŞ TALAŞ
            </Link>
          </p>
        </Container>
      </Section>
    </main>
  );
}
