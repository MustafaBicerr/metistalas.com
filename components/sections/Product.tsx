import type { AppLocale, SiteContent } from "@/content/types";
import { media } from "@/config/media";
import { site } from "@/config/site";
import { ArtDirectedImage } from "@/components/media/ArtDirectedImage";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Eyebrow, Heading, Body } from "@/components/ui/Typography";
import { FragmentReveal } from "@/components/motion/ImageReveal";
import { ImageHover } from "@/components/motion/ImageHover";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { Stagger } from "@/components/motion/Stagger";

type Props = { content: SiteContent; locale: AppLocale };

export function Product({ content, locale }: Props) {
  const copy = content.product;

  return (
    <Section id="urun" tone="white">
      <Container className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7 lg:order-2">
          <FragmentReveal className="aspect-[4/5] overflow-hidden md:aspect-[5/4]">
            <ImageHover className="h-full">
              <ArtDirectedImage
                asset={media.productShavings}
                locale={locale}
                sizes="(min-width: 1024px) 55vw, 100vw"
              />
            </ImageHover>
          </FragmentReveal>
        </div>
        <ScrollReveal className="lg:col-span-5 lg:order-1">
          <Eyebrow className="mb-4">
            {copy.index} / {content.nav.product}
          </Eyebrow>
          <Heading className="mb-6">{copy.title}</Heading>
          <Body muted className="max-w-md">
            {copy.body}
          </Body>
          <Stagger className="mt-10 flex flex-col gap-0">
            {site.claims[locale].map((claim) => (
              <li
                key={claim}
                className="flex list-none items-baseline gap-4 border-b border-border-light py-3"
              >
                <span className="h-px w-8 bg-gold" aria-hidden="true" />
                <span className="font-accent text-xs font-semibold uppercase tracking-[0.16em] text-dark">
                  {claim}
                </span>
              </li>
            ))}
          </Stagger>
        </ScrollReveal>
      </Container>
    </Section>
  );
}
