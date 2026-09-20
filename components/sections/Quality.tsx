import type { SiteContent } from "@/content/types";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Eyebrow, Heading } from "@/components/ui/Typography";
import { ScrollReveal } from "@/components/motion/ScrollReveal";

type Props = { content: SiteContent };

export function Quality({ content }: Props) {
  const copy = content.quality;

  return (
    <Section id="kalite" tone="white">
      <Container>
        <ScrollReveal className="mb-16 text-center">
          <Eyebrow className="mb-4">
            {copy.index} / {content.nav.quality}
          </Eyebrow>
          <Heading>{copy.title}</Heading>
          <div className="mx-auto mt-8 h-px w-16 bg-gold" aria-hidden="true" />
        </ScrollReveal>
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-12">
          {copy.items.map((item) => (
            <article key={item.title} className="group">
              <div
                className="mb-5 h-px w-10 bg-gold transition-all duration-500 [@media(hover:hover)]:group-hover:w-16"
                aria-hidden="true"
              />
              <h3 className="mb-2 font-display text-xl font-normal text-dark">
                {item.title}
              </h3>
              <p className="font-body text-sm text-muted">{item.body}</p>
            </article>
          ))}
        </div>
      </Container>
    </Section>
  );
}
