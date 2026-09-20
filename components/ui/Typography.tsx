import { cn } from "@/lib/utils/cn";

type EyebrowProps = {
  children: React.ReactNode;
  className?: string;
  onDark?: boolean;
};

export function Eyebrow({ children, className, onDark = false }: EyebrowProps) {
  return (
    <p
      className={cn(
        "font-accent text-eyebrow font-semibold uppercase tracking-[0.25em] text-gold",
        onDark && "text-gold",
        className,
      )}
    >
      {children}
    </p>
  );
}

type HeadingProps = {
  children: React.ReactNode;
  className?: string;
  as?: "h2" | "h3" | "h4";
  size?: "display" | "section" | "subsection";
  onDark?: boolean;
};

export function Heading({
  children,
  className,
  as: Tag = "h2",
  size = "section",
  onDark = false,
}: HeadingProps) {
  const sizeClass = {
    display: "[font-size:var(--text-display)]",
    section: "[font-size:var(--text-section)]",
    subsection: "[font-size:var(--text-subsection)]",
  }[size];

  return (
    <Tag
      className={cn(
        "font-display font-normal leading-[1.08] text-balance",
        sizeClass,
        onDark ? "text-on-dark" : "text-dark",
        className,
      )}
    >
      {children}
    </Tag>
  );
}

type BodyProps = {
  children: React.ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg";
  onDark?: boolean;
  muted?: boolean;
};

export function Body({
  children,
  className,
  size = "md",
  onDark = false,
  muted = false,
}: BodyProps) {
  const sizeClass = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
  }[size];

  return (
    <p
      className={cn(
        "font-body font-normal leading-relaxed text-pretty",
        sizeClass,
        muted && !onDark && "text-muted",
        muted && onDark && "text-on-dark/70",
        !muted && onDark && "text-on-dark",
        !muted && !onDark && "text-dark",
        className,
      )}
    >
      {children}
    </p>
  );
}
