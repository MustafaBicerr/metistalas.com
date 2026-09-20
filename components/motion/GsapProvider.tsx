"use client";

import { useEffect } from "react";
import { registerGsap } from "@/lib/animation/register";

export function GsapProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    registerGsap();
  }, []);

  return children;
}
