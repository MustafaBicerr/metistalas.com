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
};

export function Parallax({ children, className }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const media = gsap.matchMedia();
      media.add(`${mm.motion} and ${mm.desktop}`, () => {
        gsap.fromTo(
          el,
          { yPercent: -8 },
          {
            yPercent: 8,
            ease: "none",
            scrollTrigger: {
              trigger: el.parentElement ?? el,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.6,
            },
          },
        );
      });
      return () => media.revert();
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={cn("will-change-transform", className)}>
      {children}
    </div>
  );
}
