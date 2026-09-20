import { setRequestLocale } from "next-intl/server";
import { getContent, isLocale } from "@/content";
import { heroSlides } from "@/config/media";
import { faqJsonLd, localBusinessJsonLd } from "@/lib/seo/jsonld";
import { Hero } from "@/components/sections/Hero";
import { AboutStats } from "@/components/sections/AboutStats";
import { Product } from "@/components/sections/Product";
import { Applications } from "@/components/sections/Applications";
import { Quality } from "@/components/sections/Quality";
import { RawMaterial } from "@/components/sections/RawMaterial";
import { Production } from "@/components/sections/Production";
import { Logistics } from "@/components/sections/Logistics";
import { Facility } from "@/components/sections/Facility";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { Contact } from "@/components/sections/Contact";

type Props = {
  params: Promise<{ locale: string }>;
};

export const dynamic = "force-static";

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  const resolved = isLocale(locale) ? locale : "tr";
  setRequestLocale(resolved);
  const content = getContent(resolved);

  return (
    <main id="main-content" tabIndex={-1}>
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
      <Hero content={content} locale={resolved} slides={heroSlides} />
      <AboutStats content={content} />
      <Product content={content} locale={resolved} />
      <Applications content={content} locale={resolved} />
      <Quality content={content} />
      <RawMaterial content={content} locale={resolved} />
      <Production content={content} locale={resolved} />
      <Logistics content={content} locale={resolved} />
      <Facility content={content} locale={resolved} />
      <ContactCTA content={content} locale={resolved} />
      <Contact content={content} locale={resolved} />
    </main>
  );
}
