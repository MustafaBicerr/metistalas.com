import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { isLocale } from "@/content";
import { articles } from "@/content/seo/articles";
import { pageMetadata } from "@/lib/seo/metadata";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Eyebrow, Heading, Body } from "@/components/ui/Typography";

type Props = {
  params: Promise<{ locale: string }>;
};

export const dynamic = "force-static";

const copy = {
  tr: {
    eyebrow: "Rehber",
    title: "Talaş rehberi.",
    description:
      "Metiş Talaş rehberi: Elazığ üretimi, çiftlik altlığı, kalite ve 81 ile teslimat. Her ilin kendi sayfası vardır.",
    lede: "Yazılar, ana sayfanın başlığında toplanmaz. Marka, Elazığ, Doğu, Güneydoğu ve il teslimatı ayrı sayfalardadır.",
    home: "Ana sayfa",
    regions: "81 il",
  },
  en: {
    eyebrow: "Guide",
    title: "Shavings guide.",
    description:
      "Notes on Metiş Talaş: production in Elazığ, farm bedding, quality and delivery to 81 provinces.",
    lede: "These notes stay off the homepage title. Brand, Elazığ, the east, the southeast and province delivery each have a page.",
    home: "Home",
    regions: "81 provinces",
  },
} as const;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const resolved = isLocale(locale) ? locale : "tr";
  const text = copy[resolved];
  return pageMetadata({
    locale: resolved,
    title: resolved === "tr" ? "Talaş Rehberi | MET-İŞ TALAŞ" : "Shavings Guide | MET-İŞ TALAŞ",
    description: text.description,
    path: "/blog",
  });
}

export default async function BlogIndexPage({ params }: Props) {
  const { locale } = await params;
  const resolved = isLocale(locale) ? locale : "tr";
  setRequestLocale(resolved);
  const text = copy[resolved];

  return (
    <main id="main-content" tabIndex={-1} className="pt-24">
      <Section tone="white">
        <Container className="max-w-3xl pr-20 lg:pr-12">
          <p className="mb-8 font-accent text-[0.65rem] uppercase tracking-[0.16em] text-muted">
            <a href={resolved === "en" ? "/en" : "/"} className="hover:text-gold">
              {text.home}
            </a>
          </p>
          <Eyebrow className="mb-4">{text.eyebrow}</Eyebrow>
          <Heading as="h1" className="mb-6">
            {text.title}
          </Heading>
          <Body muted>{text.lede}</Body>
          <p className="mt-8">
            <Link
              href="/hizmet-bolgeleri"
              className="font-accent text-xs uppercase tracking-[0.2em] text-gold"
            >
              {text.regions}
            </Link>
          </p>
        </Container>
      </Section>
      <Section tone="muted">
        <Container className="max-w-3xl pr-20 lg:pr-12">
          <ul className="space-y-10">
            {articles.map((article) => {
              const item = article[resolved];
              return (
                <li key={article.slug}>
                  <article>
                    <h2 className="font-display text-3xl font-light text-dark">
                      <Link
                        href={{ pathname: "/blog/[slug]", params: { slug: article.slug } }}
                        className="hover:text-gold"
                      >
                        {item.title.split(" | ")[0]}
                      </Link>
                    </h2>
                    <p className="mt-3 font-body text-muted">{item.description}</p>
                  </article>
                </li>
              );
            })}
          </ul>
        </Container>
      </Section>
    </main>
  );
}
