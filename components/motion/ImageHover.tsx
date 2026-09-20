"use client";

import { cn } from "@/lib/utils/cn";

type Props = {
  children: React.ReactNode;
  className?: string;
};

export function ImageHover({ children, className }: Props) {
  return (
    <div
      className={cn(
        "group relative overflow-hidden",
        "[@media(hover:hover)]:transition-transform [@media(hover:hover)]:duration-700 [@media(hover:hover)]:ease-out",
        "[@media(hover:hover)]:hover:scale-[1.02]",
        className,
      )}
    >
      {children}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 ring-0 ring-gold/0 transition-[box-shadow,opacity] duration-500 [@media(hover:hover)]:group-hover:ring-1 [@media(hover:hover)]:group-hover:ring-gold"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/25 to-transparent opacity-0 transition-none [@media(hover:hover)]:group-hover:animate-[shine_0.9s_ease]"
      />
    </div>
  );
}
