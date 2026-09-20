import { ArrowRight } from "lucide-react";
import type { AppLocale, SiteContent } from "@/content/types";
import { media } from "@/config/media";
import { ArtDirectedImage } from "@/components/media/ArtDirectedImage";
import { Container } from "@/components/ui/Container";
import { Eyebrow, Body } from "@/components/ui/Typography";
import { Button } from "@/components/ui/Button";
import { ScrollReveal } from "@/components/motion/ScrollReveal";

type Props = { content: SiteContent; locale: AppLocale };

export function ContactCTA({ content, locale }: Props) {
  const copy = content.contactCta;

  return (
    <section className="relative overflow-hidden section-padding">
      <div className="absolute inset-0" aria-hidden="true">
        <ArtDirectedImage
          asset={media.shavingsTexture}
          locale={locale}
          sizes="100vw"
          className="h-full"
          imgClassName="h-full"
        />
        <div className="absolute inset-0 bg-dark/70" />
      </div>
      <Container className="relative z-10 text-center">
        <ScrollReveal>
          <Eyebrow onDark className="mb-4">
            {copy.eyebrow}
          </Eyebrow>
          <h2 className="font-display text-[clamp(2rem,5vw,4rem)] font-light leading-[1.05] text-on-dark">
            {copy.title}
          </h2>
          <Body onDark muted className="mx-auto mt-6 max-w-lg">
            {copy.subtitle}
          </Body>
          <div className="mt-10">
            <Button href="#iletisim">
              {copy.cta}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
