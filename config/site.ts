export const site = {
  name: "MET-İŞ TALAŞ",
  shortName: "MET-İŞ",
  productName: "TALAŞ",
  domain: "https://metistalas.com",
  tagline: {
    tr: "Kaliteli talaş, güvenilir hizmet",
    en: "Quality shavings, reliable service",
  },
  instagram: {
    handle: "@metis_talas",
    url: "https://www.instagram.com/metis_talas/",
  },
  attributes: {
    tr: ["Yüksek performans", "Hijyenik", "Ekonomik çözüm"],
    en: ["High performance", "Hygienic", "Economical solution"],
  },
  claims: {
    tr: [
      "%100 doğal",
      "Tozsuz",
      "Ekonomik",
      "Yüksek performans",
      "Çevre dostu üretim",
      "Sürdürülebilir",
    ],
    en: [
      "100% natural",
      "Low dust",
      "Economical",
      "High performance",
      "Environmentally conscious production",
      "Sustainable",
    ],
  },
  location: {
    city: "Elazığ",
    district: "Merkez",
    town: "Yurtbaşı Beldesi",
    regionCode: "TR-23",
    line: {
      tr: "Elazığ Merkez, Yurtbaşı Beldesi",
      en: "Yurtbaşı, Merkez, Elazığ, Türkiye",
    },
    service: {
      tr: "81 ile teslimat.",
      en: "Delivery to 81 provinces.",
    },
    mapUrl:
      "https://www.openstreetmap.org/search?query=Yurtba%C5%9F%C4%B1%20Elaz%C4%B1%C4%9F",
  },
  phones: [
    {
      id: "phone-1",
      display: "0 (506) 169 04 53",
      e164: "+905061690453",
      name: "Sinan Sadık Biçer",
    },
    {
      id: "phone-2",
      display: "0 (532) 321 67 43",
      e164: "+905323216743",
      name: "H. Hüseyin Biçer",
    },
    {
      id: "phone-3",
      display: "0 (532) 779 19 37",
      e164: "+905327791937",
      name: "Metin Yıldırım",
    },
  ],
  areaServed: [
    "Elazığ",
    "Malatya",
    "Bingöl",
    "Tunceli",
    "Erzincan",
    "Erzurum",
    "Diyarbakır",
    "Muş",
    "Bitlis",
    "Van",
    "Hakkari",
    "Ağrı",
    "Kars",
    "Iğdır",
    "Ardahan",
    "Şanlıurfa",
    "Mardin",
    "Batman",
    "Siirt",
    "Adıyaman",
    "Gaziantep",
    "Kilis",
    "Şırnak",
    "Sivas",
    "Kayseri",
    "Ankara",
    "Konya",
    "Trabzon",
    "Samsun",
    "Ordu",
    "Giresun",
    "Rize",
  ],
} as const;

export type SitePhone = (typeof site.phones)[number];

export function whatsappUrl(e164: string) {
  return `https://wa.me/${e164.replace("+", "")}`;
}

export function telUrl(e164: string) {
  return `tel:${e164}`;
}
