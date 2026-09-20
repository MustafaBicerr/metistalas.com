import type { AppLocale, SiteContent } from "@/content/types";
import { site } from "@/config/site";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { PhoneList } from "@/components/ui/PhoneList";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { Eyebrow, Heading, Body } from "@/components/ui/Typography";

type Props = { content: SiteContent; locale: AppLocale };

export function Contact({ content, locale }: Props) {
  const copy = content.contact;

  return (
    <Section id="iletisim" tone="white">
      <Container className="grid gap-12 lg:grid-cols-12 lg:gap-20">
        <ScrollReveal className="lg:col-span-5">
          <Eyebrow className="mb-4">
            {copy.index} / {content.nav.contact}
          </Eyebrow>
          <Heading className="mb-6">{copy.title}</Heading>
          <Body muted className="max-w-md leading-loose">
            {copy.body}
          </Body>
          <p className="mt-10 font-accent text-xs uppercase tracking-[0.2em] text-muted">
            {content.facility.addressLabel}
          </p>
          <p className="mt-2 font-display text-2xl font-light">
            {site.location.line[locale]}
          </p>
          <p className="mt-2 font-body text-muted">
            {site.location.service[locale]}
          </p>
        </ScrollReveal>
        <div className="lg:col-span-7">
          <p className="font-accent text-xs font-semibold uppercase tracking-[0.22em] text-muted">
            {copy.phonesLabel}
          </p>
          <div className="mt-6">
            <PhoneList content={content} />
          </div>
        </div>
      </Container>
    </Section>
  );
}
