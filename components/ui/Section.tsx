import { cn } from "@/lib/utils/cn";

type SectionProps = {
  id?: string;
  children: React.ReactNode;
  className?: string;
  tone?: "white" | "muted" | "dark";
  compact?: boolean;
};

const tones = {
  white: "bg-white text-dark",
  muted: "bg-muted-bg text-dark",
  dark: "bg-dark text-on-dark",
};

export function Section({
  id,
  children,
  className,
  tone = "white",
  compact = false,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        compact ? "section-padding-sm" : "section-padding",
        tones[tone],
        className,
      )}
    >
      {children}
    </section>
  );
}
