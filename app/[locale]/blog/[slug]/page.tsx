import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { isLocale } from "@/content";
import { articles, CONTENT_UPDATED, getArticle } from "@/content/seo/articles";
import { articleJsonLd, breadcrumbJsonLd, serializeJsonLd } from "@/lib/seo/jsonld";
import { pageMetadata } from "@/lib/seo/metadata";
import { SeoArticle } from "@/components/seo/SeoArticle";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

function displayTitle(title: string) {
  return title.split(" | ")[0] ?? title;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const resolved = isLocale(locale) ? locale : "tr";
  const article = getArticle(slug);
  if (!article) return {};
  const copy = article[resolved];
  return pageMetadata({
    locale: resolved,
    title: copy.title,
    description: copy.description,
    path: `/blog/${article.slug}`,
    type: "article",
    publishedTime: CONTENT_UPDATED,
  });
}

export default async function ArticlePage({ params }: Props) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const article = getArticle(slug);
  if (!article) notFound();
  setRequestLocale(locale);

  const copy = article[locale];
  const home = locale === "tr" ? "Ana sayfa" : "Home";
  const guide = locale === "tr" ? "Rehber" : "Guide";
  const places = locale === "tr" ? "İlgili iller" : "Provinces";
  const intro = copy.sections[0];
  const lede = intro?.paragraphs[0] ?? copy.description;
  const sections = [
    ...(intro && intro.paragraphs.length > 1
      ? [{ id: "giris", title: intro.heading ?? "", paragraphs: intro.paragraphs.slice(1) }]
      : []),
    ...copy.sections.slice(1).map((section, index) => ({
      id: `bolum-${index}`,
      title: section.heading ?? "",
      paragraphs: section.paragraphs,
    })),
  ];
  const crumbs = [
    { name: home, path: "/" },
    { name: guide, path: "/blog" },
    { name: displayTitle(copy.title), path: `/blog/${article.slug}` },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(articleJsonLd(locale, article)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(breadcrumbJsonLd(locale, crumbs)),
        }}
      />
      <SeoArticle
        locale={locale}
        eyebrow={guide}
        title={displayTitle(copy.title)}
        lede={lede}
        sections={sections}
        placesLabel={places}
        provinceSlugs={[...article.relatedProvinces]}
        crumbs={[
          { label: home, path: "/" },
          { label: guide, path: "/blog" },
          { label: displayTitle(copy.title) },
        ]}
      />
    </>
  );
}
