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

export function Stagger({ children, className }: Props) {
  const ref = useRef<HTMLUListElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || window.matchMedia(mm.reduced).matches) return;

      gsap.fromTo(
        el.children,
        { y: 16 },
        {
          y: 0,
          duration: 0.7,
          stagger: 0.07,
          ease: easings.luxury,
          scrollTrigger: {
            trigger: el,
            start: "top 82%",
            toggleActions: "play reverse play reverse",
          },
        },
      );
    },
    { scope: ref },
  );

  return (
    <ul ref={ref} className={cn(className)}>
      {children}
    </ul>
  );
}
