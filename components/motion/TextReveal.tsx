"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

type Props = {
  children: ReactNode;
  className?: string;
};

export function TextReveal({ children, className }: Props) {
  return <div className={cn("luxury-in", className)}>{children}</div>;
}
