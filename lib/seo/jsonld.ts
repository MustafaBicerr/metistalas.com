import type { AppLocale } from "@/content/types";
import { site } from "@/config/site";
import { getContent } from "@/content";

export function localBusinessJsonLd(locale: AppLocale) {
  const content = getContent(locale);
  const logo = `${site.domain}/media/logo/icon.png`;

  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${site.domain}/#business`,
    name: site.name,
    alternateName: ["METIS TALAS", "Metiş Talaş"],
    url: site.domain,
    logo,
    image: [`${site.domain}/og.jpg`, logo],
    telephone: site.phones.map((phone) => phone.e164),
    sameAs: [site.instagram.url],
    knowsLanguage: ["tr", "en"],
    hasMap: site.location.mapUrl,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.location.town,
      addressLocality: site.location.city,
      addressRegion: site.location.district,
      addressCountry: "TR",
    },
    areaServed: site.areaServed.map((name) => ({
      "@type": "AdministrativeArea",
      name,
    })),
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
