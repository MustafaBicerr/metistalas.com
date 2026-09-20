import type { AppLocale, SiteContent } from "@/content/types";
import { media } from "@/config/media";
import type { MediaPair } from "@/lib/media/types";
import { ArtDirectedImage } from "@/components/media/ArtDirectedImage";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Eyebrow, Heading, Body } from "@/components/ui/Typography";
import { FragmentReveal } from "@/components/motion/ImageReveal";
import { ImageHover } from "@/components/motion/ImageHover";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { Parallax } from "@/components/motion/Parallax";

type Props = { content: SiteContent; locale: AppLocale };

export function RawMaterial({ content, locale }: Props) {
  const copy = content.rawMaterial;
  const frames: MediaPair[] = [
    media.rawLogs,
    media.rawLogsDetail,
    media.bulkHandling,
  ];

  return (
    <Section id="hammadde" tone="muted">
      <Container>
        <ScrollReveal className="max-w-2xl">
          <Eyebrow className="mb-4">
            {copy.index} / {content.nav.rawMaterial}
          </Eyebrow>
          <Heading className="mb-6">{copy.title}</Heading>
          <Body muted className="max-w-md">
            {copy.body}
          </Body>
        </ScrollReveal>
        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {frames.map((asset, index) => (
            <figure key={asset.id} className={index === 0 ? "sm:col-span-2 lg:col-span-1" : undefined}>
              <FragmentReveal className="aspect-[4/5] overflow-hidden sm:aspect-[5/4] lg:aspect-[4/5]">
                <ImageHover className="h-full">
                  <Parallax className="h-full w-full">
                    <ArtDirectedImage
                      asset={asset}
                      locale={locale}
                      sizes="(min-width: 1024px) 33vw, 100vw"
                    />
                  </Parallax>
                </ImageHover>
              </FragmentReveal>
              {asset.caption ? (
                <figcaption className="mt-3 font-accent text-[0.65rem] uppercase tracking-[0.16em] text-muted">
                  {asset.caption[locale]}
                </figcaption>
              ) : null}
            </figure>
          ))}
        </div>
      </Container>
    </Section>
  );
}
