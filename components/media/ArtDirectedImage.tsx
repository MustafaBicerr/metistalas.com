import type { MediaPair } from "@/lib/media/types";
import type { AppLocale } from "@/content/types";
import { cn } from "@/lib/utils/cn";

type ArtDirectedImageProps = {
  asset: MediaPair;
  locale: AppLocale;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
  sizes?: string;
};

export function ArtDirectedImage({
  asset,
  locale,
  className,
  imgClassName,
  priority = false,
  sizes = "(min-width: 768px) 50vw, 100vw",
}: ArtDirectedImageProps) {
  return (
    <picture className={cn("block h-full w-full", className)}>
      <source
        media="(min-width: 768px)"
        srcSet={asset.desktop}
        width={asset.widthDesktop}
        height={asset.heightDesktop}
      />
      <img
        src={asset.mobile}
        alt={asset.alt[locale]}
        width={asset.widthMobile}
        height={asset.heightMobile}
        sizes={sizes}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        decoding={priority ? "sync" : "async"}
        className={cn("h-full w-full object-cover art-image", imgClassName)}
        style={{
          ["--focal-m" as string]: `${asset.focal.mobile.x * 100}% ${asset.focal.mobile.y * 100}%`,
          ["--focal-d" as string]: `${asset.focal.desktop.x * 100}% ${asset.focal.desktop.y * 100}%`,
        }}
      />
    </picture>
  );
}
