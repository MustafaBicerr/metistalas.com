import type { SiteContent } from "@/content/types";

type SkipLinkProps = {
  content: SiteContent;
};

export function SkipLink({ content }: SkipLinkProps) {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[80] focus:bg-white focus:px-4 focus:py-3 focus:text-dark"
    >
      {content.a11y.skip}
    </a>
  );
}
