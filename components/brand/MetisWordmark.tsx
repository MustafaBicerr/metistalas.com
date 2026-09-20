import { site } from "@/config/site";
import { cn } from "@/lib/utils/cn";

type WordmarkProps = {
  className?: string;
  tone?: "light" | "dark";
};

export function MetisWordmark({ className, tone = "dark" }: WordmarkProps) {
  const base = tone === "dark" ? "text-dark" : "text-on-dark";

  return (
    <span
      className={cn(
        "font-display font-light tracking-[0.14em] uppercase leading-none",
        base,
        className,
      )}
    >
      {site.shortName}{" "}
      <span className="text-gold">{site.productName}</span>
    </span>
  );
}
