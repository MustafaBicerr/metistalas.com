import { site, telUrl, whatsappUrl, type SitePhone } from "@/config/site";

export function getPhones(): SitePhone[] {
  return [...site.phones];
}

export function getPhoneHref(phone: SitePhone) {
  return telUrl(phone.e164);
}

export function getWhatsAppHref(phone: SitePhone) {
  return whatsappUrl(phone.e164);
}
