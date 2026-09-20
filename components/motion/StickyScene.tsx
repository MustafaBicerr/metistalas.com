"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { registerGsap, gsap, ScrollTrigger } from "@/lib/animation/register";
import { mm } from "@/lib/animation/matchMedia";
import { cn } from "@/lib/utils/cn";

registerGsap();

type Props = {
  children: React.ReactNode;
  className?: string;
};

export function StickyScene({ children, className }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const media = gsap.matchMedia();
      media.add(`${mm.motion} and ${mm.desktop}`, () => {
        const from = el.querySelector<HTMLElement>("[data-scene-from]");
        const to = el.querySelector<HTMLElement>("[data-scene-to]");

        ScrollTrigger.create({
          trigger: el,
          start: "top top",
          end: "+=70%",
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        });

        if (from && to) {
          gsap.set(to, { opacity: 0 });
          gsap.to(to, {
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top top",
              end: "+=70%",
              scrub: true,
            },
          });
        }
      });
      return () => media.revert();
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={cn(className)}>
      {children}
    </div>
  );
}
