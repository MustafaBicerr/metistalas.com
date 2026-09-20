"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import type { AppLocale, SiteContent } from "@/content/types";
import type { MediaPair } from "@/lib/media/types";
import { site } from "@/config/site";
import { ArtDirectedImage } from "@/components/media/ArtDirectedImage";
import { Button } from "@/components/ui/Button";
import { TextReveal } from "@/components/motion/TextReveal";
import { usePrefersReducedMotion } from "@/components/motion/usePrefersReducedMotion";
import { registerGsap, gsap } from "@/lib/animation/register";
import { mm } from "@/lib/animation/matchMedia";
import { cn } from "@/lib/utils/cn";
import { homeHash } from "@/config/navigation";

registerGsap();

const INTERVAL_MS = 5500;

type HeroProps = {
  content: SiteContent;
  locale: AppLocale;
  slides: MediaPair[];
};

export function Hero({ content, locale, slides }: HeroProps) {
  const reduced = usePrefersReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const layerRefs = useRef<Array<HTMLDivElement | null>>([]);
  const touchStart = useRef<number | null>(null);

  useEffect(() => {
    if (reduced || paused || slides.length < 2) return;
    const id = window.setInterval(() => {
      setIndex((value) => (value + 1) % slides.length);
    }, INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [paused, reduced, slides.length]);

  useEffect(() => {
    const layers = layerRefs.current.filter(Boolean) as HTMLDivElement[];
    if (!layers.length) return;

    layers.forEach((layer, i) => {
      const active = i === index;
      const desktop = window.matchMedia(mm.desktop).matches;
      const clipFrom = desktop
        ? "polygon(12% 0%, 100% 0%, 100% 100%, 0% 100%)"
        : "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)";
      const clipTo = "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)";

      gsap.to(layer, {
        opacity: active ? 1 : 0,
        clipPath: active ? clipTo : clipFrom,
        duration: reduced ? 0 : 1.1,
        ease: "power2.inOut",
        overwrite: "auto",
      });

      const img = layer.querySelector("img");
      if (img && active && !reduced) {
        gsap.fromTo(
          img,
          { scale: 1.04 },
          { scale: 1.12, duration: INTERVAL_MS / 1000, ease: "none" },
        );
      }
    });
  }, [index, reduced]);

  function go(next: number) {
    setIndex((next + slides.length) % slides.length);
  }

  return (
    <section
      id="hero"
      className="relative flex min-h-svh w-full flex-col justify-end overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={(event) => {
        touchStart.current = event.changedTouches[0]?.clientX ?? null;
      }}
      onTouchEnd={(event) => {
        const start = touchStart.current;
        const end = event.changedTouches[0]?.clientX;
        if (start == null || end == null) return;
        const delta = end - start;
        if (Math.abs(delta) > 40) go(index + (delta < 0 ? 1 : -1));
      }}
    >
      {slides.map((slide, i) => (
        <div
          key={slide.id}
          ref={(node) => {
            layerRefs.current[i] = node;
          }}
          className={cn(
            "absolute inset-0",
            i === 0 ? "z-0 opacity-100" : "z-0 opacity-0",
          )}
          aria-hidden={i !== index}
        >
          <ArtDirectedImage
            asset={slide}
            locale={locale}
            priority={i === 0}
            sizes="100vw"
            className="h-full min-h-svh"
            imgClassName="h-full min-h-svh"
          />
        </div>
      ))}
      <div
        className="absolute inset-0 z-[1] bg-gradient-to-t from-dark/90 via-dark/50 to-dark/40"
        aria-hidden="true"
      />
      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-16 pt-24 sm:px-8 sm:pb-20 lg:px-12 lg:pb-24 xl:px-16">
        <TextReveal className="max-w-3xl">
          <p className="mb-3 font-accent text-xs font-semibold uppercase tracking-[0.3em] text-gold lg:mb-6">
            {content.hero.kicker}
          </p>
          <h1 className="font-display text-[var(--text-hero)] font-light leading-[0.95] text-on-dark">
            {content.hero.title}
            <span className="mt-1 block text-gold">{content.hero.accent}</span>
          </h1>
          <p className="mt-4 max-w-lg font-body text-base text-on-dark/75 sm:mt-6 sm:text-lg">
            {content.hero.tagline}
          </p>
          <p className="mt-3 font-accent text-[0.65rem] uppercase tracking-[0.18em] text-on-dark/55">
            {site.attributes[locale].join(" · ")}
          </p>
          <div className="mt-6 sm:mt-10">
            <Button href={homeHash("iletisim", locale)} variant="outline">
              {content.hero.cta}
            </Button>
          </div>
        </TextReveal>
      </div>
      <div className="absolute bottom-5 left-5 z-10 flex items-center gap-2 sm:left-8 lg:left-12">
        <button
          type="button"
          className="hidden min-h-11 min-w-11 items-center justify-center text-on-dark/70 hover:text-gold md:inline-flex"
          aria-label={content.a11y.prevSlide}
          onClick={() => go(index - 1)}
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <div className="flex gap-2" role="tablist" aria-label="Hero">
          {slides.map((slide, i) => (
            <button
              key={slide.id}
              type="button"
              role="tab"
              aria-selected={i === index}
              className={cn(
                "h-2 min-h-[44px] min-w-[44px] px-1",
                "after:block after:h-0.5 after:w-full after:transition-colors",
                i === index ? "after:bg-gold" : "after:bg-on-dark/40",
              )}
              onClick={() => go(i)}
            >
              <span className="sr-only">{i + 1}</span>
            </button>
          ))}
        </div>
        <button
          type="button"
          className="hidden min-h-11 min-w-11 items-center justify-center text-on-dark/70 hover:text-gold md:inline-flex"
          aria-label={content.a11y.nextSlide}
          onClick={() => go(index + 1)}
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
      <div
        className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 text-on-dark/50 md:block"
        aria-hidden="true"
      >
        <ChevronDown className="h-6 w-6" />
      </div>
    </section>
  );
}
