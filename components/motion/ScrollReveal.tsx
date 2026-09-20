"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { registerGsap, gsap } from "@/lib/animation/register";
import { mm } from "@/lib/animation/matchMedia";
import { easings } from "@/lib/animation/easings";
import { cn } from "@/lib/utils/cn";

registerGsap();

type Props = {
  children: React.ReactNode;
  className?: string;
};

export function ScrollReveal({ children, className }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || window.matchMedia(mm.reduced).matches) return;

      gsap.fromTo(
        el,
        { y: 28 },
        {
          y: 0,
          duration: 0.85,
          ease: easings.luxury,
          scrollTrigger: {
            trigger: el,
            start: "top 84%",
            toggleActions: "play reverse play reverse",
          },
        },
      );
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={cn(className)}>
      {children}
    </div>
  );
}
