export type AppLocale = "tr" | "en";

export type Localized<T> = Record<AppLocale, T>;

export type QualityItem = {
  title: string;
  body: string;
};

export type ApplicationChapter = {
  id: "poultry" | "horse" | "cattle";
  kicker: string;
  title: string;
  body: string;
};

export type StatItem = {
  value: string;
  label: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type RegionGroup = {
  id: string;
  title: string;
  body: string;
  cities: string[];
};

export type SiteContent = {
  meta: {
    title: string;
    description: string;
    keywords: string;
  };
  a11y: {
    skip: string;
    openMenu: string;
    closeMenu: string;
    language: string;
    call: string;
    whatsapp: string;
    map: string;
    instagram: string;
    prevSlide: string;
    nextSlide: string;
  };
  nav: {
    about: string;
    rawMaterial: string;
    production: string;
    product: string;
    applications: string;
    quality: string;
    logistics: string;
    facility: string;
    contact: string;
    regions: string;
    guide: string;
    menu: string;
    close: string;
    pages: string;
  };
  hero: {
    kicker: string;
    title: string;
    accent: string;
    tagline: string;
    alias: string;
    cta: string;
  };
  about: {
    eyebrow: string;
    title: string;
    body: string;
    cta: string;
  };
  stats: StatItem[];
  statsBar: {
    eyebrow: string;
    items: StatItem[];
  };
  rawMaterial: {
    index: string;
    title: string;
    body: string;
  };
  production: {
    index: string;
    title: string;
    body: string;
  };
  product: {
    index: string;
    title: string;
    body: string;
  };
  applications: {
    index: string;
    title: string;
    intro: string;
    chapters: ApplicationChapter[];
  };
  quality: {
    index: string;
    title: string;
    items: QualityItem[];
  };
  logistics: {
    index: string;
    title: string;
    body: string;
    stock: string;
  };
  facility: {
    index: string;
    title: string;
    body: string;
    addressLabel: string;
  };
  contactCta: {
    eyebrow: string;
    title: string;
    subtitle: string;
    cta: string;
  };
  contact: {
    index: string;
    title: string;
    body: string;
    phonesLabel: string;
    call: string;
    whatsapp: string;
  };
  regions: {
    eyebrow: string;
    title: string;
    intro: string;
    groups: RegionGroup[];
  };
  faq: {
    title: string;
    items: FaqItem[];
  };
  footer: {
    rights: string;
    tagline: string;
  };
};
