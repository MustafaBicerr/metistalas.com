import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getContent, isLocale } from "@/content";
import { provincesIn, regionLabel, regionOrder, type RegionId } from "@/content/seo/provinces";
import { faqJsonLd, localBusinessJsonLd, serializeJsonLd } from "@/lib/seo/jsonld";
import { pageMetadata } from "@/lib/seo/metadata";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Eyebrow, Heading, Body } from "@/components/ui/Typography";
import { Button } from "@/components/ui/Button";
import { homeHash } from "@/config/navigation";

type Props = {
  params: Promise<{ locale: string }>;
};

const extraRegionBody: Record<"tr" | "en", Partial<Record<RegionId, string>>> = {
  tr: {
    akdeniz:
      "Antalya, Adana, Mersin ve Kahramanmaraş hattına Elazığ’dan stok teslim.",
    ege: "İzmir, Aydın, Manisa ve Muğla’daki çiftliklere ahşap altlık sevkiyatı.",
    marmara: "İstanbul, Bursa, Balıkesir ve Trakya hattına Elazığ’dan stok teslim.",
  },
  en: {
    akdeniz:
      "Stock delivery from Elazığ toward Antalya, Adana, Mersin and Kahramanmaraş.",
    ege: "Wood bedding shipped to farms in İzmir, Aydın, Manisa and Muğla.",
    marmara: "Stock delivery from Elazığ toward İstanbul, Bursa, Balıkesir and Thrace.",
  },
};

export const dynamic = "force-static";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const resolved = isLocale(locale) ? locale : "tr";
  const content = getContent(resolved);
  return pageMetadata({
    locale: resolved,
    title: `MET-İŞ TALAŞ | ${content.regions.title}`,
    description: content.regions.intro,
    path: "/hizmet-bolgeleri",
  });
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
          __html: serializeJsonLd(localBusinessJsonLd(resolved)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(faqJsonLd(resolved)),
        }}
      />
      <Section tone="white">
        <Container className="max-w-3xl pr-20 lg:pr-12">
          <Eyebrow className="mb-4">{content.regions.eyebrow}</Eyebrow>
          <Heading as="h1" className="mb-6">
            {content.regions.title}
          </Heading>
          <Body muted>{content.regions.intro}</Body>
          <p className="mt-8">
            <Link
              href="/blog"
              className="font-accent text-xs uppercase tracking-[0.2em] text-gold"
            >
              {content.nav.guide}
            </Link>
          </p>
        </Container>
      </Section>
      {regionOrder.map((id, index) => {
        const fromContent = content.regions.groups.find((group) => group.id === id);
        const title = fromContent?.title ?? regionLabel[id][resolved];
        const body = fromContent?.body ?? extraRegionBody[resolved][id] ?? "";
        const cities = provincesIn(id);
        return (
          <Section key={id} id={id} tone={index % 2 === 0 ? "muted" : "white"}>
            <Container className="pr-20 lg:pr-12">
              <h2 className="font-display text-3xl font-light text-dark">{title}</h2>
              <div className="mt-4 h-px w-12 bg-gold" aria-hidden="true" />
              <p className="mt-5 max-w-2xl font-body text-muted">{body}</p>
              <ul className="mt-6 flex flex-wrap gap-2">
                {cities.map((city) => (
                  <li key={city.slug}>
                    <Link
                      href={{ pathname: "/talas/[slug]", params: { slug: city.slug } }}
                      className="inline-flex border border-border-light px-3 py-1.5 font-accent text-[0.65rem] uppercase tracking-[0.16em] text-dark hover:border-gold hover:text-gold"
                    >
                      {city.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </Container>
          </Section>
        );
      })}
      <Section tone="white">
        <Container className="max-w-3xl pr-20 lg:pr-12">
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
        </Container>
      </Section>
    </main>
  );
}
