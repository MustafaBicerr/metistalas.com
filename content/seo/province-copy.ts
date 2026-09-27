import type { AppLocale } from "@/content/types";
import {
  getProvince,
  isPriorityProvince,
  neighborProvinces,
  regionLabel,
  type Province,
} from "@/content/seo/provinces";
import { joinList, locative } from "@/content/seo/turkish";

export type CopySection = {
  id: string;
  title: string;
  paragraphs: string[];
};

export type CopyFaq = {
  question: string;
  answer: string;
};

export type ProvincePageCopy = {
  title: string;
  description: string;
  keywords: string;
  eyebrow: string;
  h1: string;
  lede: string;
  sections: CopySection[];
  faqs: CopyFaq[];
};

const priorityNotes: Record<string, { tr: string; en: string }> = {
  elazig: {
    tr: "Üretim Elazığ Merkez Yurtbaşı Beldesi’ndedir. Tomruk burada talaşa döner, stok aynı tesisten çıkar. Tavuk, at ve buzağı işletmeleri için yol tesisin bulunduğu ilden başlar.",
    en: "Production is in Yurtbaşı, Merkez, Elazığ. Logs become shavings here, and stock leaves from the same facility. For poultry, horse and calf farms, delivery starts in the province where the mill stands.",
  },
  bingol: {
    tr: "Bingöl, Elazığ’ın doğu komşusudur. Tunceli, Erzurum, Muş ve Diyarbakır ile aynı hattadır. Çiftlik altlığı Yurtbaşı’ndaki stoktan bu ile gider.",
    en: "Bingöl borders Elazığ to the east and sits on the same corridor as Tunceli, Erzurum, Muş and Diyarbakır. Farm bedding leaves from stock in Yurtbaşı.",
  },
  diyarbakir: {
    tr: "Diyarbakır, Güneydoğu’da Elazığ’a bağlı karayolu hattındadır. Kümes, ahır ve buzağı barınağı için talaş ticareti bu ilden çevre illere de uzanır.",
    en: "Diyarbakır sits on the road corridor that ties Southeastern Anatolia to Elazığ. Shavings for poultry houses, stables and calf pens are traded from this province outward.",
  },
  malatya: {
    tr: "Malatya, Elazığ’ın batı komşusudur. Adıyaman, Kahramanmaraş, Sivas ve Erzincan da bu çevrededir. Altlık, Yurtbaşı stokundan Malatya’daki işletmelere gider.",
    en: "Malatya is the western neighbour of Elazığ, with Adıyaman, Kahramanmaraş, Sivas and Erzincan around the same belt. Bedding goes from Yurtbaşı stock to farms in Malatya.",
  },
  erzurum: {
    tr: "Erzurum, Doğu Anadolu’nun yüksek ilidir. Kuru ve emici altlık ahır ve kümes zemininde kullanılır. Sevkiyat Elazığ’dan, Erzincan ve Bingöl’ün de bulunduğu hat üzerinden yapılır.",
    en: "Erzurum is the high province of Eastern Anatolia. Dry, absorbent bedding is used on stable and poultry-house floors. Shipment leaves Elazığ along the corridor that also includes Erzincan and Bingöl.",
  },
  erzincan: {
    tr: "Erzincan, Elazığ ile Erzurum arasındaki geçiş ilidir. Tunceli ve Malatya da bu çevrededir. Çiftlik talaşı üreticiden, stoktan çıkar.",
    en: "Erzincan is the province between Elazığ and Erzurum. Tunceli and Malatya are in the same neighbourhood. Farm shavings leave the producer from stock.",
  },
  tunceli: {
    tr: "Tunceli; Elazığ, Bingöl ve Erzincan ile komşudur. Ahır ve kümes için doğal ahşap altlık bu kısa çevreye Yurtbaşı’ndan gider.",
    en: "Tunceli borders Elazığ, Bingöl and Erzincan. Natural wood bedding for stables and poultry houses reaches this close ring from Yurtbaşı.",
  },
  van: {
    tr: "Van, doğu koridorunun ucundadır. Bitlis, Ağrı, Hakkari ve Şırnak ile komşudur. Talaş Elazığ’daki tesisten stok olarak çıkar.",
    en: "Van is at the far end of the eastern corridor. It borders Bitlis, Ağrı, Hakkari and Şırnak. Shavings leave as stock from the facility in Elazığ.",
  },
  mus: {
    tr: "Muş; Bingöl, Diyarbakır, Bitlis ve Erzurum ile komşudur. Büyükbaş ve kümes altlığı aynı Elazığ stokundan bu ile gelir.",
    en: "Muş borders Bingöl, Diyarbakır, Bitlis and Erzurum. Cattle and poultry bedding for this province comes from the same Elazığ stock.",
  },
};

function neighborNames(province: Province, limit = 4) {
  return neighborProvinces(province)
    .slice(0, limit)
    .map((item) => item.name);
}

function angleParagraph(province: Province, locale: AppLocale) {
  const plate = Number(province.code.slice(3));
  const names = joinList(neighborNames(province, 3), locale);
  const where = locative(province.name);
  const anglesTr = [
    `${where} damızlık tavuk kümesleri için doğal, tozsuz ahşap altlık sevkiyatı yapılır. Çevre: ${names}.`,
    `${where} at çiftliği ve ahır zemini için kaba, emici talaş stoktan çıkar. Çevre: ${names}.`,
    `${where} buzağı barınağı ve büyükbaş işletmesi için kuru doğal altlık gönderilir. Çevre: ${names}.`,
    `${province.name} teslimatında kimyasal katkı yoktur. Talaş ahşaptan kesilir, taranır, elenir. Çevre: ${names}.`,
    `${province.name} siparişi telefonla alınır. Paket stok Elazığ Yurtbaşı’ndan yola çıkar. Çevre: ${names}.`,
    `${province.name} için aracı zinciri kurulmaz. Üretici MET-İŞ TALAŞ doğrudan sevkiyat yapar. Çevre: ${names}.`,
  ];
  const anglesEn = [
    `Natural, low-dust wood bedding is shipped for breeder poultry houses in ${province.name}. Nearby: ${names}.`,
    `Coarse, absorbent shavings leave stock for horse farms and stable floors in ${province.name}. Nearby: ${names}.`,
    `Dry natural bedding is sent for calf housing and cattle farms in ${province.name}. Nearby: ${names}.`,
    `Deliveries to ${province.name} contain no chemical additive. Wood is cut, combed and screened into shavings. Nearby: ${names}.`,
    `Orders for ${province.name} are taken by phone. Packed stock leaves Yurtbaşı, Elazığ. Nearby: ${names}.`,
    `There is no reseller chain for ${province.name}. The producer, MET-İŞ TALAŞ, ships directly. Nearby: ${names}.`,
  ];
  const list = locale === "tr" ? anglesTr : anglesEn;
  return list[plate % list.length] ?? list[0];
}

export function provincePageCopy(province: Province, locale: AppLocale): ProvincePageCopy {
  const region = regionLabel[province.region][locale];
  const neighbors = joinList(neighborNames(province), locale);
  const where = locative(province.name);
  const priorityNote = priorityNotes[province.slug];
  const priority = isPriorityProvince(province.slug);

  if (locale === "en") {
    const title = priority
      ? `${province.name} Wood Shavings | Quality Farm Bedding`
      : `${province.name} Wood Shavings | Farm Bedding Delivery`;
    const description =
      province.slug === "elazig"
        ? "Elazığ farm shavings: economical, quality wood bedding for poultry, horse and calf farms. Stock leaves Yurtbaşı."
        : priority
          ? `${province.name} farm shavings: economical, quality wood bedding. Poultry, horse and calf farms in ${province.name} receive stock from Elazığ.`
          : `${province.name} wood shavings for farms. Quality, economical bedding shipped from Elazığ to ${region}.`;
    return {
      title,
      description,
      keywords: `${province.name} wood shavings, farm bedding, poultry bedding, horse bedding, calf bedding, MET-İŞ TALAŞ`,
      eyebrow: region,
      h1: `Wood shavings for ${province.name}.`,
      lede: priorityNote
        ? priorityNote.en
        : `MET-İŞ TALAŞ produces natural wood shavings in Yurtbaşı, Elazığ, and delivers stock to ${province.name}. The province is in ${region}, near ${neighbors}.`,
      sections: [
        {
          id: "ciftlik",
          title: `Farm bedding in ${province.name}`,
          paragraphs: [
            `Farm shavings for ${province.name} are natural wood bedding for breeder poultry houses, horse stables and calf pens.`,
            angleParagraph(province, "en"),
          ],
        },
        {
          id: "kalite",
          title: "Quality shavings",
          paragraphs: [
            `Quality shavings for ${province.name} means the same product made in Elazığ: fully natural, low dust, hygienic, absorbent and suited to barn and poultry-house floors.`,
          ],
        },
        {
          id: "ekonomik",
          title: "Economical delivery",
          paragraphs: [
            `Economical, quality bedding for ${province.name} is producer-direct stock, not a price printed on this page. Call for the current load. The same stock also serves ${neighbors}.`,
          ],
        },
      ],
      faqs: [
        {
          question: `Where do shavings for ${province.name} come from?`,
          answer: `From the MET-İŞ TALAŞ facility in Yurtbaşı, Merkez, Elazığ. ${province.name} is in ${region}, near ${neighbors}.`,
        },
        {
          question: `Which farms in ${province.name} is the bedding for?`,
          answer:
            "Breeder poultry houses, horse farms and stables, and cattle and calf housing.",
        },
        {
          question: `How is an order placed for ${province.name}?`,
          answer:
            "By phone. Stock and shipment are confirmed on the call. There is no online price list.",
        },
      ],
    };
  }

  const title = priority
    ? `${province.name} Talaş | Kaliteli Çiftlik Altlığı`
    : `${province.name} Talaş | Çiftlik Altlığı Teslimatı`;
  const description =
    province.slug === "elazig"
      ? "Elazığ çiftlik talaşı: ucuz ve kaliteli ahşap altlık. Yurtbaşı’nda tavuk, at ve buzağı işletmelerine stok teslim."
      : priority
        ? `${province.name} çiftlik talaşı: ucuz ve kaliteli ahşap altlık. ${where} tavuk, at ve buzağı işletmelerine Elazığ’dan stok teslim.`
        : `${province.name} talaş ve ${province.name} çiftlik talaşı. ${region} içinde kaliteli, ekonomik altlık. Elazığ’dan stok teslim.`;

  const lede = priorityNote
    ? priorityNote.tr
    : `${province.name} için doğal ahşap talaş, Elazığ Yurtbaşı’ndaki MET-İŞ TALAŞ tesisinden çıkar. ${province.name}, ${region} bölgesindedir; komşuları ${neighbors}.`;

  return {
    title,
    description,
    keywords: `${province.name} talaş, ${province.name} çiftlik talaş, ${province.name} kaliteli talaş, ${province.name} ucuz talaş, talaş teslimatı`,
    eyebrow: `${region} · Teslimat`,
    h1: `${province.name} talaş.`,
    lede,
    sections: [
      {
        id: "ciftlik",
        title: `${province.name} çiftlik talaşı`,
        paragraphs: [
          `${province.name} çiftlik talaşı; damızlık tavuk kümesi, at çiftliği ve buzağı barınağı için doğal ahşap altlıktır.`,
          angleParagraph(province, "tr"),
        ],
      },
      {
        id: "kalite",
        title: `${province.name} kaliteli talaş`,
        paragraphs: [
          `${province.name} kaliteli talaş, Elazığ’da üretilen aynı üründür: yüzde yüz doğal, tozsuz, hijyenik, emici. Kimyasal katkı eklenmez.`,
        ],
      },
      {
        id: "ekonomik",
        title: "Ucuz ve kaliteli talaş",
        paragraphs: [
          `${province.name} ucuz ve kaliteli talaş, bu sayfada bir liste fiyatı değildir. Ekonomik olan, üreticiden stok teslimdir. Rakam için arayın. Aynı stok ${neighbors} hattına da gider.`,
        ],
      },
    ],
    faqs: [
      {
        question: `${province.name} için talaş nereden gelir?`,
        answer: `MET-İŞ TALAŞ, Elazığ Merkez Yurtbaşı Beldesi’nde üretir. ${province.name}, ${region} bölgesindedir; komşuları ${neighbors}.`,
      },
      {
        question: `${province.name} çiftliklerinde altlık nerede kullanılır?`,
        answer:
          "Damızlık tavuk kümeslerinde, at çiftliği ve ahırda, sığır ve buzağı barınaklarında.",
      },
      {
        question: `${province.name} siparişi nasıl verilir?`,
        answer:
          "Telefonla. Stok ve sevkiyat konuşmada netleşir. Sitede liste fiyatı yoktur.",
      },
    ],
  };
}

export function provinceBySlugCopy(slug: string, locale: AppLocale) {
  const province = getProvince(slug);
  if (!province) return null;
  return { province, copy: provincePageCopy(province, locale) };
}
