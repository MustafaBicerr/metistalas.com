import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { isLocale } from "@/content";
import { articlesMentioning } from "@/content/seo/articles";
import { provinceBySlugCopy } from "@/content/seo/province-copy";
import { provinces } from "@/content/seo/provinces";
import {
  breadcrumbJsonLd,
  faqItemsJsonLd,
  provinceServiceJsonLd,
  serializeJsonLd,
} from "@/lib/seo/jsonld";
import { pageMetadata } from "@/lib/seo/metadata";
import { site } from "@/config/site";
import { neighborSlugList, SeoArticle } from "@/components/seo/SeoArticle";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return provinces.map((province) => ({ slug: province.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const resolved = isLocale(locale) ? locale : "tr";
  const page = provinceBySlugCopy(slug, resolved);
  if (!page) return {};
  const { province, copy } = page;
  const geo =
    province.slug === "elazig"
      ? {
          region: site.location.regionCode,
          placename: "Yurtbaşı, Elazığ",
          position: `${site.location.geo.latitude};${site.location.geo.longitude}`,
        }
      : { region: province.code, placename: province.name };

  return pageMetadata({
    locale: resolved,
    title: copy.title,
    description: copy.description,
    path: `/talas/${province.slug}`,
    keywords: copy.keywords,
    geo,
  });
}

export default async function ProvincePage({ params }: Props) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const page = provinceBySlugCopy(slug, locale);
  if (!page) notFound();
  setRequestLocale(locale);

  const { province, copy } = page;
  const home = locale === "tr" ? "Ana sayfa" : "Home";
  const regions = locale === "tr" ? "Hizmet bölgeleri" : "Service areas";
  const related = articlesMentioning(province.slug).map((article) => ({
    slug: article.slug,
    title: article[locale].title,
  }));
  const crumbs = [
    { name: home, path: "/" },
    { name: regions, path: "/hizmet-bolgeleri" },
    { name: province.name, path: `/talas/${province.slug}` },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(provinceServiceJsonLd(locale, province, copy.description)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(faqItemsJsonLd(copy.faqs)),
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
        eyebrow={copy.eyebrow}
        title={copy.h1}
        lede={copy.lede}
        sections={copy.sections}
        faqs={copy.faqs}
        provinceSlugs={neighborSlugList(province)}
        articleLinks={related}
        crumbs={[
          { label: home, path: "/" },
          { label: regions, path: "/hizmet-bolgeleri" },
          { label: province.name },
        ]}
      />
    </>
  );
}
