import { cn } from "@/lib/utils/cn";

type MarkProps = {
  className?: string;
  title?: string;
  decorative?: boolean;
};

export function MetisMark({
  className,
  title = "MET-İŞ TALAŞ",
  decorative = false,
}: MarkProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={cn("block", className)}
      role={decorative ? "presentation" : "img"}
      aria-hidden={decorative ? true : undefined}
      aria-label={decorative ? undefined : title}
    >
      {decorative ? null : <title>{title}</title>}
      <path
        fill="currentColor"
        d="M32 2.5 36.2 8.4 43.6 6.8 44.4 14.4 51.6 16.2 49.2 23.2 55.5 27.8 50.2 33.2 55.5 38.6 49.2 43.2 51.6 50.2 44.4 52 43.6 59.6 36.2 58 32 63.9 27.8 58 20.4 59.6 19.6 52 12.4 50.2 14.8 43.2 8.5 38.6 13.8 33.2 8.5 27.8 14.8 23.2 12.4 16.2 19.6 14.4 20.4 6.8 27.8 8.4 32 2.5Z"
      />
      <circle cx="32" cy="33" r="18.2" className="fill-dark" />
      <path
        className="fill-on-dark"
        d="M32 16.8 37.4 28.2h5.2L32 47.2 21.4 28.2h5.2L32 16.8Z"
      />
      <path
        className="fill-surface"
        d="M32 22.4 35.1 29.2h3.1L32 41.4 25.8 29.2h3.1L32 22.4Z"
      />
      <rect x="30.2" y="40.6" width="3.6" height="8.4" className="fill-on-dark" />
    </svg>
  );
}
