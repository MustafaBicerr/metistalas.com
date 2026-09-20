import { cn } from "@/lib/utils/cn";

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "outline";
  external?: boolean;
};

export function Button({
  href,
  children,
  className,
  variant = "primary",
  external,
}: ButtonProps) {
  const look =
    variant === "primary"
      ? "bg-gold text-dark hover:bg-gold-dark"
      : "border border-gold text-gold hover:bg-gold hover:text-dark";

  return (
    <a
      href={href}
      className={cn(
        "inline-flex min-h-11 items-center justify-center gap-3 px-10 py-4",
        "font-accent text-xs font-semibold uppercase tracking-[0.2em]",
        "transition-colors duration-300",
        look,
        className,
      )}
      {...(external
        ? { target: "_blank", rel: "noopener noreferrer" }
        : undefined)}
    >
      {children}
    </a>
  );
}
