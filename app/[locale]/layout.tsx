import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { getContent, isLocale } from "@/content";
import { site } from "@/config/site";
import { SkipLink } from "@/components/layout/SkipLink";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { FloatingActions } from "@/components/layout/FloatingActions";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const dynamic = "force-static";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const content = getContent(locale);

  return {
    title: {
      absolute: content.meta.title,
    },
    description: content.meta.description,
    keywords: content.meta.keywords,
    alternates: {
      canonical: locale === "tr" ? "/" : "/en",
      languages: {
        tr: "/",
        en: "/en",
      },
    },
    openGraph: {
      title: content.meta.title,
      description: content.meta.description,
      locale: locale === "tr" ? "tr_TR" : "en_US",
      type: "website",
      url: locale === "tr" ? site.domain : `${site.domain}/en`,
      siteName: site.name,
      images: [{ url: "/og.jpg", width: 1200, height: 630, alt: site.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: content.meta.title,
      description: content.meta.description,
      images: ["/og.jpg"],
    },
    other: {
      "geo.region": site.location.regionCode,
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale) || !isLocale(locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const content = getContent(locale);
  const messages = await getMessages();

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <SkipLink content={content} />
      <SiteHeader content={content} />
      {children}
      <SiteFooter content={content} locale={locale} />
      <FloatingActions content={content} />
    </NextIntlClientProvider>
  );
}
