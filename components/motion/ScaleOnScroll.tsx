"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { registerGsap, gsap } from "@/lib/animation/register";
import { mm } from "@/lib/animation/matchMedia";
import { cn } from "@/lib/utils/cn";

registerGsap();

type Props = {
  children: React.ReactNode;
  className?: string;
  amount?: number;
};

export function ScaleOnScroll({ children, className, amount = 1.06 }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const media = gsap.matchMedia();
      media.add(`${mm.motion} and ${mm.desktop}`, () => {
        gsap.fromTo(
          el,
          { scale: amount },
          {
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: el.parentElement ?? el,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.5,
            },
          },
        );
      });
      media.add(`${mm.motion} and ${mm.mobile}`, () => {
        gsap.fromTo(
          el,
          { scale: Math.min(amount, 1.03) },
          {
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: el.parentElement ?? el,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.7,
            },
          },
        );
      });
      return () => media.revert();
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={cn("h-full w-full will-change-transform", className)}>
      {children}
    </div>
  );
}
