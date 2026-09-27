import type { AppLocale, SiteContent } from "@/content/types";
import { Link } from "@/i18n/navigation";
import { media } from "@/config/media";
import { ArtDirectedImage } from "@/components/media/ArtDirectedImage";
import { ScaleOnScroll } from "@/components/motion/ScaleOnScroll";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { Eyebrow, Heading, Body } from "@/components/ui/Typography";

type Props = { content: SiteContent; locale: AppLocale };

export function Logistics({ content, locale }: Props) {
  const copy = content.logistics;

  return (
    <section id="sevkiyat" className="relative min-h-[90svh] overflow-hidden bg-dark">
      <ScaleOnScroll className="absolute inset-0" amount={1.06}>
        <ArtDirectedImage
          asset={media.logisticsTruck}
          locale={locale}
          sizes="100vw"
          className="h-full"
          imgClassName="h-full"
        />
      </ScaleOnScroll>
      <div className="absolute inset-0 bg-dark/55" />
      <div className="relative z-10 flex min-h-[90svh] items-end px-5 py-16 sm:px-8 lg:px-12 xl:px-16">
        <ScrollReveal className="max-w-2xl">
          <Eyebrow onDark className="mb-4">
            {copy.index} / {content.nav.logistics}
          </Eyebrow>
          <Heading onDark className="mb-5">
            {copy.title}
          </Heading>
          <Body onDark muted className="text-lg">
            {copy.body}
          </Body>
          <p className="mt-8 font-accent text-sm uppercase tracking-[0.22em] text-gold">
            {copy.stock}
          </p>
          <Link
            href="/hizmet-bolgeleri"
            className="mt-6 inline-flex font-accent text-xs uppercase tracking-[0.2em] text-gold"
          >
            {content.nav.regions}
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}
