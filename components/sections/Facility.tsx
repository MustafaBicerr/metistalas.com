import type { AppLocale, SiteContent } from "@/content/types";
import { media } from "@/config/media";
import { site } from "@/config/site";
import { ArtDirectedImage } from "@/components/media/ArtDirectedImage";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Eyebrow, Heading, Body } from "@/components/ui/Typography";
import { Button } from "@/components/ui/Button";
import { FragmentReveal } from "@/components/motion/ImageReveal";
import { ImageHover } from "@/components/motion/ImageHover";
import { ScrollReveal } from "@/components/motion/ScrollReveal";

type Props = { content: SiteContent; locale: AppLocale };

export function Facility({ content, locale }: Props) {
  const copy = content.facility;

  return (
    <Section id="tesis" tone="white">
      <Container className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <ScrollReveal className="lg:col-span-5">
          <Eyebrow className="mb-4">
            {copy.index} / {content.nav.facility}
          </Eyebrow>
          <Heading className="mb-6">{copy.title}</Heading>
          <Body muted className="max-w-md leading-loose">
            {copy.body}
          </Body>
          <p className="mt-8 font-accent text-xs uppercase tracking-[0.2em] text-muted">
            {copy.addressLabel}
          </p>
          <p className="mt-2 font-display text-2xl font-light">
            {site.location.line[locale]}
          </p>
          <div className="mt-8">
            <Button href={site.location.mapUrl} external variant="outline">
              {content.a11y.map}
            </Button>
          </div>
        </ScrollReveal>
        <div className="lg:col-span-7">
          <FragmentReveal className="aspect-[16/10] overflow-hidden">
            <ImageHover className="h-full">
              <ArtDirectedImage
                asset={media.facilityYard}
                locale={locale}
                sizes="(min-width: 1024px) 55vw, 100vw"
              />
            </ImageHover>
          </FragmentReveal>
        </div>
      </Container>
    </Section>
  );
}
