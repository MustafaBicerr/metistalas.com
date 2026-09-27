import type { AppLocale } from "@/content/types";
import { site } from "@/config/site";
import { getContent } from "@/content";
import { provinces } from "@/content/seo/provinces";
import type { Article } from "@/content/seo/articles";
import type { Province } from "@/content/seo/provinces";
import { absoluteUrl } from "@/lib/seo/paths";

const brandNames = [
  "Metiş Talaş",
  "Metis Talaş",
  "METİŞ TALAŞ",
  "Met-İş Talaş",
  "METIS TALAS",
];

export function serializeJsonLd(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export function localBusinessJsonLd(locale: AppLocale) {
  const content = getContent(locale);
  const logo = `${site.domain}/media/logo/icon.png`;

  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "Manufacturer"],
    "@id": `${site.domain}/#business`,
    name: site.name,
    alternateName: brandNames,
    description: content.meta.description,
    slogan: site.tagline[locale],
    url: site.domain,
    logo,
    image: [`${site.domain}/og.jpg`, logo],
    telephone: site.phones.map((phone) => phone.e164),
    sameAs: [site.instagram.url],
    knowsLanguage: ["tr", "en"],
    hasMap: site.location.mapUrl,
    geo: {
      "@type": "GeoCoordinates",
      latitude: site.location.geo.latitude,
      longitude: site.location.geo.longitude,
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: site.location.town,
      addressLocality: site.location.city,
      addressRegion: site.location.district,
      addressCountry: "TR",
    },
    areaServed: [
      { "@type": "Country", name: "Türkiye" },
      {
        "@type": "GeoCircle",
        geoMidpoint: {
          "@type": "GeoCoordinates",
          latitude: site.location.geo.latitude,
          longitude: site.location.geo.longitude,
        },
        geoRadius: "480000",
      },
      ...provinces.map((province) => ({
        "@type": "AdministrativeArea",
        name: province.name,
      })),
    ],
    makesOffer: content.applications.chapters.map((chapter) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: chapter.title,
        description: chapter.body,
        areaServed: "TR",
      },
    })),
    contactPoint: site.phones.map((phone) => ({
      "@type": "ContactPoint",
      name: phone.name,
      telephone: phone.e164,
      contactType: "sales",
      availableLanguage: ["Turkish", "English"],
    })),
    employee: site.phones.map((phone) => ({
      "@type": "Person",
      name: phone.name,
      telephone: phone.e164,
    })),
  };
}

export function faqJsonLd(locale: AppLocale) {
  const content = getContent(locale);
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: content.faq.items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${site.domain}/#website`,
    name: site.name,
    alternateName: brandNames,
    url: site.domain,
    inLanguage: ["tr-TR", "en"],
    publisher: { "@id": `${site.domain}/#business` },
  };
}

type Crumb = { name: string; path: string };

export function breadcrumbJsonLd(locale: AppLocale, crumbs: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: absoluteUrl(locale, crumb.path),
    })),
  };
}

export function provinceServiceJsonLd(
  locale: AppLocale,
  province: Province,
  description: string,
) {
  const path = `/talas/${province.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: locale === "tr" ? `${province.name} talaş teslimatı` : `${province.name} shavings delivery`,
    serviceType: locale === "tr" ? "Talaş teslimatı" : "Wood shavings delivery",
    url: absoluteUrl(locale, path),
    description,
    provider: { "@id": `${site.domain}/#business` },
    areaServed: {
      "@type": "AdministrativeArea",
      name: province.name,
    },
  };
}

export function articleJsonLd(locale: AppLocale, article: Article) {
  const copy = article[locale];
  const path = `/blog/${article.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: copy.title,
    description: copy.description,
    datePublished: "2026-09-27",
    dateModified: "2026-09-27",
    inLanguage: locale === "tr" ? "tr-TR" : "en",
    mainEntityOfPage: absoluteUrl(locale, path),
    author: { "@id": `${site.domain}/#business` },
    publisher: { "@id": `${site.domain}/#business` },
    image: `${site.domain}/og.jpg`,
  };
}

export function faqItemsJsonLd(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}
