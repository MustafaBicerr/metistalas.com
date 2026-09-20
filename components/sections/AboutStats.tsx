import type { SiteContent } from "@/content/types";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Eyebrow, Heading, Body } from "@/components/ui/Typography";
import { Button } from "@/components/ui/Button";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { Stagger } from "@/components/motion/Stagger";

type Props = { content: SiteContent };

export function AboutStats({ content }: Props) {
  return (
    <>
      <Section id="hakkimizda" tone="muted">
        <Container>
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <ScrollReveal>
              <Eyebrow className="mb-4">{content.about.eyebrow}</Eyebrow>
              <Heading className="mb-6 whitespace-pre-line">
                {content.about.title}
              </Heading>
              <Body muted className="mb-8 leading-loose">
                {content.about.body}
              </Body>
              <Button href="#tesis" variant="outline">
                {content.about.cta}
              </Button>
            </ScrollReveal>
            <Stagger className="grid list-none grid-cols-3 gap-6 lg:gap-8">
              {content.stats.map((stat) => (
                <li key={stat.label} className="text-center">
                  <p className="mb-2 font-body text-[clamp(2rem,4vw,3.5rem)] font-light leading-none tracking-tight text-dark tabular-nums">
                    {stat.value}
                  </p>
                  <p className="font-accent text-[0.65rem] font-medium uppercase tracking-[0.2em] text-muted">
                    {stat.label}
                  </p>
                </li>
              ))}
            </Stagger>
          </div>
        </Container>
      </Section>
      <Section tone="dark" compact>
        <Container>
          <Eyebrow onDark className="mb-12 text-center">
            {content.statsBar.eyebrow}
          </Eyebrow>
          <Stagger className="grid list-none grid-cols-2 gap-8 lg:grid-cols-4 lg:gap-12">
            {content.statsBar.items.map((item) => (
              <li key={item.label} className="text-center">
                <p className="mb-2 font-body text-[clamp(2rem,4vw,3.5rem)] font-light leading-none tracking-tight text-on-dark tabular-nums">
                  {item.value}
                </p>
                <p className="font-accent text-[0.65rem] font-medium uppercase tracking-[0.2em] text-on-dark/50">
                  {item.label}
                </p>
              </li>
            ))}
          </Stagger>
        </Container>
      </Section>
    </>
  );
}
