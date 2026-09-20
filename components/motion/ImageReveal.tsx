"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { registerGsap, gsap } from "@/lib/animation/register";
import { mm } from "@/lib/animation/matchMedia";
import { easings } from "@/lib/animation/easings";
import { cn } from "@/lib/utils/cn";

registerGsap();

const SHATTERED =
  "polygon(8% 12%, 28% 0%, 48% 14%, 72% 4%, 100% 16%, 90% 42%, 100% 70%, 74% 100%, 46% 88%, 18% 100%, 0% 72%, 6% 40%)";
const ASSEMBLED =
  "polygon(0% 0%, 20% 0%, 40% 0%, 60% 0%, 80% 0%, 100% 0%, 100% 50%, 100% 100%, 80% 100%, 40% 100%, 0% 100%, 0% 50%)";

type Props = {
  children: React.ReactNode;
  className?: string;
  immediate?: boolean;
};

export function FragmentReveal({ children, className, immediate = false }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || window.matchMedia(mm.reduced).matches) return;

      gsap.fromTo(
        el,
        { clipPath: SHATTERED, webkitClipPath: SHATTERED },
        {
          clipPath: ASSEMBLED,
          webkitClipPath: ASSEMBLED,
          ease: "none",
          scrollTrigger: immediate
            ? undefined
            : {
                trigger: el,
                start: "top 88%",
                end: "top 42%",
                scrub: 0.55,
              },
          duration: immediate ? 1.1 : undefined,
          delay: immediate ? 0.08 : 0,
        },
      );
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={cn("overflow-hidden", className)}>
      {children}
    </div>
  );
}

export function ImageReveal({ children, className, immediate = false }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || window.matchMedia(mm.reduced).matches) return;

      gsap.fromTo(
        el,
        { y: immediate ? 16 : 28 },
        {
          y: 0,
          duration: immediate ? 1 : 0.9,
          delay: immediate ? 0.05 : 0,
          ease: easings.luxury,
          scrollTrigger: immediate
            ? undefined
            : {
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
    <div ref={ref} className={cn("overflow-hidden", className)}>
      {children}
    </div>
  );
}
