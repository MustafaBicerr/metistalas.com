"use client";

import dynamic from "next/dynamic";
import type { AppLocale, SiteContent } from "@/content/types";
import { media } from "@/config/media";
import { ArtDirectedImage } from "@/components/media/ArtDirectedImage";
import { FragmentReveal } from "@/components/motion/ImageReveal";
import { ScaleOnScroll } from "@/components/motion/ScaleOnScroll";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { Eyebrow, Heading, Body } from "@/components/ui/Typography";

const WebGLShatter = dynamic(
  () =>
    import("@/components/motion/WebGLShatter").then((mod) => mod.WebGLShatter),
  { ssr: false },
);

type Props = { content: SiteContent; locale: AppLocale };

export function Production({ content, locale }: Props) {
  const copy = content.production;
  const image = (
    <ScaleOnScroll className="absolute inset-0" amount={1.06}>
      <ArtDirectedImage
        asset={media.productionMachine}
        locale={locale}
        sizes="100vw"
        className="h-full"
        imgClassName="h-full"
      />
    </ScaleOnScroll>
  );

  return (
    <section id="uretim" className="relative min-h-[90svh] overflow-hidden bg-dark">
      <WebGLShatter src={media.productionMachine.desktop} className="absolute inset-0 h-full">
        <FragmentReveal className="absolute inset-0 h-full">
          {image}
        </FragmentReveal>
      </WebGLShatter>
      <div className="absolute inset-0 bg-dark/60" />
      <div className="relative z-10 flex min-h-[90svh] items-end px-5 py-16 sm:px-8 lg:items-center lg:px-12 xl:px-16">
        <ScrollReveal className="max-w-2xl">
          <Eyebrow onDark className="mb-4">
            {copy.index} / {content.nav.production}
          </Eyebrow>
          <Heading onDark className="mb-6">
            {copy.title}
          </Heading>
          <Body onDark muted className="text-[var(--text-lede,1.25rem)]">
            {copy.body}
          </Body>
          {media.productionMachine.caption ? (
            <p className="mt-8 font-accent text-[0.65rem] uppercase tracking-[0.18em] text-on-dark/45">
              {media.productionMachine.caption[locale]}
            </p>
          ) : null}
        </ScrollReveal>
      </div>
    </section>
  );
}
