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
import { SectionTransition } from "@/components/motion/SectionTransition";

type Props = { content: SiteContent; locale: AppLocale };

const chapterMedia: Record<string, MediaPair> = {
  poultry: media.poultryBedding,
  horse: media.horseBedding,
  cattle: media.cattleBedding,
};

export function Applications({ content, locale }: Props) {
  const copy = content.applications;

  return (
    <Section id="kullanim" tone="muted" className="overflow-hidden">
      <Container>
        <ScrollReveal className="max-w-2xl">
          <Eyebrow className="mb-4">
            {copy.index} / {content.nav.applications}
          </Eyebrow>
          <Heading className="mb-5">{copy.title}</Heading>
          <Body muted>{copy.intro}</Body>
        </ScrollReveal>
        <div className="mt-16 flex flex-col gap-16 lg:mt-24 lg:gap-24">
          {copy.chapters.map((chapter, index) => {
            const asset = chapterMedia[chapter.id];
            const reverse = index === 1;
            return (
              <article
                key={chapter.id}
                className="grid items-center gap-8 lg:grid-cols-12 lg:gap-16"
              >
                <div className={`lg:col-span-7 ${reverse ? "lg:order-2" : ""}`}>
                  <FragmentReveal className="aspect-[4/5] overflow-hidden md:aspect-[5/4]">
                    <ImageHover className="h-full">
                      <ArtDirectedImage
                        asset={asset}
                        locale={locale}
                        sizes="(min-width: 1024px) 58vw, 100vw"
                      />
                    </ImageHover>
                  </FragmentReveal>
                </div>
                <div className={`lg:col-span-5 ${reverse ? "lg:order-1" : ""}`}>
                  <SectionTransition />
                  <Eyebrow className="mb-4">{chapter.kicker}</Eyebrow>
                  <Heading as="h3" size="subsection" className="mb-5">
                    {chapter.title}
                  </Heading>
                  <Body muted>{chapter.body}</Body>
                  {asset.caption ? (
                    <p className="mt-6 font-accent text-[0.65rem] uppercase tracking-[0.16em] text-muted">
                      {asset.caption[locale]}
                    </p>
                  ) : null}
                </div>
              </article>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
