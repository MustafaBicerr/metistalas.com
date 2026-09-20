import { Phone, MessageCircle } from "lucide-react";
import { site } from "@/config/site";
import { getPhoneHref, getWhatsAppHref } from "@/lib/utils/phone";
import type { SiteContent } from "@/content/types";

type Props = {
  content: SiteContent;
};

export function FloatingActions({ content }: Props) {
  const phone = site.phones[0];

  return (
    <div
      className="fixed right-5 z-40 flex flex-col gap-3 sm:right-8 bottom-[max(1.5rem,env(safe-area-inset-bottom))]"
      aria-label={content.contact.phonesLabel}
    >
      <a
        href={getWhatsAppHref(phone)}
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-12 w-12 items-center justify-center bg-[#25D366] text-white shadow-lg transition-transform duration-300 hover:scale-110"
        aria-label={content.a11y.whatsapp}
      >
        <MessageCircle className="h-5 w-5" aria-hidden="true" />
      </a>
      <a
        href={getPhoneHref(phone)}
        className="flex h-12 w-12 items-center justify-center bg-gold text-dark shadow-lg transition-transform duration-300 hover:scale-110"
        aria-label={content.a11y.call}
      >
        <Phone className="h-5 w-5" aria-hidden="true" />
      </a>
    </div>
  );
}
