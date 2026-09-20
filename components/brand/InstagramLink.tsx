import { site } from "@/config/site";
import { cn } from "@/lib/utils/cn";

type InstagramLinkProps = {
  label: string;
  className?: string;
  showHandle?: boolean;
  onDark?: boolean;
};

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function InstagramLink({
  label,
  className,
  showHandle = false,
  onDark = false,
}: InstagramLinkProps) {
  return (
    <a
      href={site.instagram.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className={cn(
        "inline-flex min-h-11 items-center gap-2 font-accent text-xs uppercase tracking-[0.16em] transition-colors",
        onDark ? "text-on-dark/80 hover:text-gold" : "text-dark hover:text-gold",
        className,
      )}
    >
      <InstagramIcon className="h-4 w-4" />
      {showHandle ? <span>{site.instagram.handle}</span> : null}
    </a>
  );
}
