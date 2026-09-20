import { cn } from "@/lib/utils/cn";

type BrandLogoProps = {
  variant: "header-dark" | "header-light" | "footer";
  className?: string;
};

const sources = {
  "header-dark": {
    webp: "/media/logo/header-transparent.webp",
    png: "/media/logo/header-transparent.png",
  },
  "header-light": {
    webp: "/media/logo/header-white.webp",
  },
  footer: {
    webp: "/media/logo/footer.webp",
  },
} as const;

export function BrandLogo({ variant, className }: BrandLogoProps) {
  const source = sources[variant];
  const heightClass =
    variant === "footer"
      ? "h-10 w-auto max-h-10 lg:h-12 lg:max-h-12"
      : "h-8 w-auto max-h-9 sm:h-9 lg:h-10 lg:max-h-10";

  return (
    <span className={cn("inline-flex min-w-0 items-center", className)}>
      {"png" in source ? (
        <picture>
          <source srcSet={source.webp} type="image/webp" />
          <img
            src={source.png}
            alt=""
            className={heightClass}
            width={360}
            height={144}
          />
        </picture>
      ) : (
        <img
          src={source.webp}
          alt=""
          className={heightClass}
          width={360}
          height={144}
        />
      )}
      <span className="sr-only">MET-İŞ TALAŞ</span>
    </span>
  );
}
