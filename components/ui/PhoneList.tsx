import type { SiteContent } from "@/content/types";
import { getPhoneHref, getWhatsAppHref } from "@/lib/utils/phone";
import { site } from "@/config/site";
import { cn } from "@/lib/utils/cn";

type PhoneListProps = {
  content: SiteContent;
  tone?: "light" | "dark";
  className?: string;
};

export function PhoneList({
  content,
  tone = "dark",
  className,
}: PhoneListProps) {
  const nameColor = tone === "dark" ? "text-muted" : "text-on-dark/70";
  const numberColor = tone === "dark" ? "text-dark" : "text-on-dark";
  const actionColor = tone === "dark" ? "text-gold-dark" : "text-gold";

  return (
    <ul className={cn("flex flex-col gap-8", className)}>
      {site.phones.map((phone) => (
        <li
          key={phone.id}
          className="border-t border-border-light pt-5 first:border-t-0 first:pt-0 md:first:border-t md:first:pt-5"
        >
          <p
            className={cn(
              "font-accent text-xs uppercase tracking-[0.22em]",
              nameColor,
            )}
          >
            {phone.name}
          </p>
          <a
            href={getPhoneHref(phone)}
            className={cn(
              "mt-2 block font-display text-[1.65rem] font-light leading-none tracking-tight tabular-nums sm:text-4xl",
              numberColor,
            )}
          >
            {phone.display}
          </a>
          <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
            <a
              href={getPhoneHref(phone)}
              className={cn(
                "inline-flex min-h-11 items-center font-accent text-xs font-semibold uppercase tracking-[0.2em]",
                actionColor,
              )}
            >
              {content.contact.call}
            </a>
            <a
              href={getWhatsAppHref(phone)}
              className={cn(
                "inline-flex min-h-11 items-center font-accent text-xs font-semibold uppercase tracking-[0.2em]",
                actionColor,
              )}
              target="_blank"
              rel="noopener noreferrer"
            >
              {content.contact.whatsapp}
            </a>
          </div>
        </li>
      ))}
    </ul>
  );
}
