export const CONTENT_UPDATED = "2026-09-27";

export type ArticleSection = {
  heading?: string;
  paragraphs: string[];
};

export type ArticleLocale = {
  title: string;
  description: string;
  sections: ArticleSection[];
};

export type Article = {
  slug: string;
  province?: string;
  relatedProvinces: readonly string[];
  tr: ArticleLocale;
  en: ArticleLocale;
};

export const articles: readonly Article[] = [
  {
    slug: "metis-talas",
    relatedProvinces: ["elazig"],
    tr: {
      title: "Metiş Talaş | MET-İŞ TALAŞ Elazığ",
      description:
        "Metiş Talaş, Metis Talaş ve MET-İŞ TALAŞ aynı üreticidir. Tesis Elazığ Merkez Yurtbaşı Beldesi’ndedir. Tavuk, at ve buzağı altlığı.",
      sections: [
        {
          paragraphs: [
            "Metiş Talaş, MET-İŞ TALAŞ’ın arama yazımıdır. Tireli MET-İŞ ile tiresiz Metiş aynı işletmeyi gösterir. Metis Talaş ve Metiştalaş da aynı adın Latin harfli karşılıklarıdır.",
            "Tesis Elazığ Merkez, Yurtbaşı Beldesi’ndedir. Doğal ahşap talaşı burada üretilir. Ürün damızlık tavuk kümesi, at çiftliği ve buzağı barınağı için altlıktır.",
            "Sipariş telefonda alınır. Stok teslim vardır. Sevkiyat Türkiye’nin 81 iline yapılır. Çekirdek hat Elazığ ve komşu illerdir: Tunceli, Bingöl, Malatya, Diyarbakır, Erzincan.",
          ],
        },
        {
          heading: "Hangi yazım doğrudur?",
          paragraphs: [
            "Tabeladaki ad MET-İŞ TALAŞ’tır. Arama kutusuna metiş talaş, metis talaş veya met-iş talaş yazıldığında bulunan işletme budur. Ayrı bir marka veya ayrı bir tesis yoktur.",
          ],
        },
      ],
    },
    en: {
      title: "Metiş Talaş | The MET-İŞ TALAŞ name",
      description:
        "Metiş Talaş, Metis Talaş and MET-İŞ TALAŞ are the same producer in Yurtbaşı, Elazığ. Bedding for poultry, horses and calves.",
      sections: [
        {
          paragraphs: [
            "Metiş Talaş is the unhyphenated search spelling of MET-İŞ TALAŞ. Metis Talaş is the same name without Turkish diacritics. There is one mill, not three brands.",
            "The facility is in Yurtbaşı, Merkez, Elazığ. It produces natural wood shavings for breeder poultry houses, horse farms and calf housing.",
            "Orders are taken by phone, from stock, with delivery to all 81 provinces. The core corridor is Elazığ and its neighbours.",
          ],
        },
      ],
    },
  },
  {
    slug: "elazig-ciftlik-talasi",
    province: "elazig",
    relatedProvinces: ["elazig", "malatya", "bingol", "tunceli", "diyarbakir"],
    tr: {
      title: "Elazığ Çiftlik Talaş | Tavuk, At ve Buzağı Altlığı",
      description:
        "Elazığ çiftlik talaşı: damızlık tavuk, at ve buzağı için doğal ahşap altlık. Üretim Yurtbaşı’nda, teslimat stoktan.",
      sections: [
        {
          paragraphs: [
            "Elazığ çiftlik talaşı, Yurtbaşı’ndaki tesiste üretilen doğal ahşap altlıktır. Kümes, ahır ve buzağı barınağının zeminine serilir.",
            "Damızlık tavuk tarafında aranan şey hijyenik ve tozsuz zemindir. At tarafında kontrollü, emici yatak gerekir. Buzağı ve sığır tarafında kuru doğal altlık kullanılır. Üçü de aynı talaşın kullanım yeridir.",
          ],
        },
        {
          heading: "Elazığ’da üretim",
          paragraphs: [
            "Hammadde, üretim ve sevkiyat aynı yerdedir: Elazığ Merkez, Yurtbaşı Beldesi. İlin dışına çıkan araç da bu stoktan dolar. Komşu hat Malatya, Tunceli, Bingöl, Diyarbakır ve Erzincan’dır.",
          ],
        },
      ],
    },
    en: {
      title: "Elazığ Farm Shavings | Poultry, Horse and Calf Bedding",
      description:
        "Farm shavings from Elazığ for breeder poultry, horses and calves. Produced in Yurtbaşı and shipped from stock.",
      sections: [
        {
          paragraphs: [
            "Elazığ farm shavings are natural wood bedding made in Yurtbaşı. They go on the floor of a poultry house, a stable or a calf pen.",
            "Breeder houses need a hygienic, low-dust floor. Horse barns need an absorbent bed. Calf and cattle housing needs dry natural bedding. One product, three uses.",
            "Raw material, production and dispatch share one yard in Yurtbaşı, Merkez, Elazığ.",
          ],
        },
      ],
    },
  },
  {
    slug: "elazig-kaliteli-talas",
    province: "elazig",
    relatedProvinces: ["elazig"],
    tr: {
      title: "Elazığ Kaliteli Talaş | Doğal Ahşap Altlık",
      description:
        "Elazığ kaliteli talaş: yüzde yüz doğal, tozsuz, hijyenik ahşap altlık. Kimyasal katkı yok. Üretici MET-İŞ TALAŞ, Yurtbaşı.",
      sections: [
        {
          paragraphs: [
            "Elazığ kaliteli talaş, katkıyla süslenmiş bir iddia değildir. Sitede vaat edilenler şunlardır: yüzde yüz doğal, tozsuz, hijyenik, yüksek emici performans, ekonomik stok teslim, ahşaptan altlığa giden üretim.",
            "Kalite burada tür adı veya sertifika numarası olarak yazılmaz. Yazılan, tesisin işidir: tomruk kesilir, taranır, elenir, altlık çıkar.",
          ],
        },
        {
          heading: "Kim için",
          paragraphs: [
            "Damızlık kümes, at çiftliği ve buzağı barınağı. Elazığ’daki işletme de, 81 ildeki işletme de aynı stoku arar. Fark, teslimatın başladığı yerin Elazığ olmasıdır.",
          ],
        },
      ],
    },
    en: {
      title: "Quality Wood Shavings in Elazığ",
      description:
        "Quality shavings from Elazığ: fully natural, low-dust, hygienic wood bedding. No chemical additive. Made in Yurtbaşı.",
      sections: [
        {
          paragraphs: [
            "Quality, on this site, is a short list: fully natural, low dust, hygienic, absorbent, economical stock delivery, and a process that turns wood into bedding.",
            "The mill cuts, combs and screens. It does not publish a species name or a certificate number.",
            "Breeder poultry houses, horse farms and calf pens in Elazığ and in the other 80 provinces draw on the same stock.",
          ],
        },
      ],
    },
  },
  {
    slug: "elazig-ucuz-ve-kaliteli-talas",
    province: "elazig",
    relatedProvinces: ["elazig", "malatya", "bingol", "diyarbakir", "erzurum"],
    tr: {
      title: "Elazığ Ucuz ve Kaliteli Talaş | Üreticiden Stok",
      description:
        "Elazığ ucuz talaş ve Elazığ ucuz ve kaliteli talaş: liste fiyatı yok, üreticiden stok teslim. Tavuk, at ve buzağı altlığı. Yurtbaşı.",
      sections: [
        {
          paragraphs: [
            "Elazığ ucuz ve kaliteli talaş arayanın bu sitede göreceği şey bir etiket fiyatı değildir. Ucuz, burada aracı zinciri olmadan, üreticiden stok teslim anlamına gelir. Kalite, doğal ve tozsuz ahşap altlık anlamına gelir.",
            "Elazığ ucuz talaş da aynı sayfanın konusudur. Ayrı bir düşük kalite ürün yoktur. Aynı talaş, telefonla konuşulan sevkiyata göre çıkar.",
          ],
        },
        {
          heading: "Fiyat neden sitede yok?",
          paragraphs: [
            "Yük, il ve stok konuşmadan rakam yazmak yanlış olur. Sinan Sadık Biçer, H. Hüseyin Biçer ve Metin Yıldırım hatlarından arayın. Stok varsa sevkiyat Elazığ Yurtbaşı’ndan başlar.",
          ],
        },
      ],
    },
    en: {
      title: "Economical Quality Shavings from Elazığ",
      description:
        "Economical, quality wood shavings from the Elazığ producer. No price list on the site. Stock delivery for poultry, horse and calf farms.",
      sections: [
        {
          paragraphs: [
            "A search for cheap, quality shavings in Elazığ will not find a printed price here. Economical means producer-direct stock, without a reseller chain. Quality means natural, low-dust wood bedding.",
            "There is no second, lower-grade product. The same shavings leave once the load is agreed by phone.",
            "Call the published numbers. If stock is available, shipment starts in Yurtbaşı, Elazığ.",
          ],
        },
      ],
    },
  },
  {
    slug: "bingol-ciftlik-talasi",
    province: "bingol",
    relatedProvinces: ["bingol", "elazig", "mus", "tunceli", "diyarbakir"],
    tr: {
      title: "Bingöl Çiftlik Talaşı | Kaliteli ve Ekonomik Altlık",
      description:
        "Bingöl çiftlik talaşı, Bingöl kaliteli talaş ve Bingöl ucuz ve kaliteli talaş: Elazığ Yurtbaşı’ndan stok teslim. Tavuk, at, buzağı.",
      sections: [
        {
          paragraphs: [
            "Bingöl çiftlik talaşı, Elazığ’da üretilip Bingöl’deki kümes, ahır ve buzağı barınağına giden doğal ahşap altlıktır. Bingöl, Elazığ’ın doğu komşusudur.",
            "Bingöl kaliteli talaş ayrı bir reçete değildir. Yüzde yüz doğal, tozsuz, hijyenik altlık bu ile de gider. Bingöl ucuz talaş ve Bingöl ucuz ve kaliteli talaş ise liste fiyatı değil, üreticiden stok teslimdir.",
          ],
        },
        {
          heading: "Çevre iller",
          paragraphs: [
            "Aynı hat Tunceli, Erzurum, Muş ve Diyarbakır’a da uzanır. Sipariş telefonla verilir. Rakam, yük konuşulunca netleşir.",
          ],
        },
      ],
    },
    en: {
      title: "Bingöl Farm Shavings | Quality, Economical Bedding",
      description:
        "Farm shavings for Bingöl, shipped from stock in Yurtbaşı, Elazığ. Poultry, horse and calf bedding.",
      sections: [
        {
          paragraphs: [
            "Bingöl farm shavings are natural wood bedding made in Elazığ and delivered to poultry houses, stables and calf pens in Bingöl. The province borders Elazığ.",
            "Quality is the same product: fully natural, low dust, hygienic. Economical means producer-direct stock, not a price printed here.",
            "The same corridor reaches Tunceli, Erzurum, Muş and Diyarbakır. Order by phone.",
          ],
        },
      ],
    },
  },
  {
    slug: "diyarbakir-ciftlik-talasi",
    province: "diyarbakir",
    relatedProvinces: ["diyarbakir", "elazig", "sanliurfa", "mardin", "batman"],
    tr: {
      title: "Diyarbakır Çiftlik Talaşı | Kaliteli ve Ekonomik Altlık",
      description:
        "Diyarbakır çiftlik talaşı ve Diyarbakır kaliteli talaş. Ucuz ve kaliteli ahşap altlık, Elazığ’dan Diyarbakır’a stok teslim.",
      sections: [
        {
          paragraphs: [
            "Diyarbakır çiftlik talaşı, Güneydoğu’daki tavuk, at ve buzağı işletmeleri için Elazığ Yurtbaşı’ndan çıkan altlıktır. Diyarbakır, Elazığ ile aynı karayolu çevresindedir.",
            "Diyarbakır kaliteli talaş, katkı maddesiz ahşap altlıktır. Diyarbakır ucuz talaş ve Diyarbakır ucuz ve kaliteli talaş araması da bu üreticiye gelir: fiyat sitede yazılmaz, stok telefonda söylenir.",
          ],
        },
        {
          heading: "Güneydoğu hattı",
          paragraphs: [
            "Şanlıurfa, Mardin, Batman, Adıyaman ve Malatya bu çevrenin illeridir. Hepsi için üretim yeri değişmez: Elazığ.",
          ],
        },
      ],
    },
    en: {
      title: "Diyarbakır Farm Shavings | Quality, Economical Bedding",
      description:
        "Farm shavings for Diyarbakır from the Elazığ producer. Quality wood bedding for poultry, horses and calves, shipped from stock.",
      sections: [
        {
          paragraphs: [
            "Diyarbakır farm shavings leave Yurtbaşı, Elazığ for poultry, horse and calf farms in the southeast. Diyarbakır shares the road corridor with Elazığ.",
            "Quality bedding has no chemical additive. An economical load is agreed by phone; this page does not print a price.",
            "Şanlıurfa, Mardin, Batman, Adıyaman and Malatya are on the same regional map. Production stays in Elazığ.",
          ],
        },
      ],
    },
  },
  {
    slug: "malatya-ciftlik-talasi",
    province: "malatya",
    relatedProvinces: ["malatya", "elazig", "adiyaman", "kahramanmaras"],
    tr: {
      title: "Malatya Çiftlik Talaşı | Kaliteli ve Ekonomik Altlık",
      description:
        "Malatya çiftlik talaşı, Malatya kaliteli talaş, Malatya ucuz ve kaliteli talaş. Komşu il Elazığ’dan stok teslim.",
      sections: [
        {
          paragraphs: [
            "Malatya çiftlik talaşı, Elazığ’ın batı komşusuna giden doğal ahşap altlıktır. Mesafe kısadır; üretim Yurtbaşı’ndadır, Malatya’da ikinci bir tesis yoktur.",
            "Malatya kaliteli talaş, tozsuz ve hijyenik altlık demektir. Malatya ucuz talaş ve Malatya ucuz ve kaliteli talaş, üreticiden çıkan stok için kullanılan arama cümleleridir. Rakam telefonda konuşulur.",
          ],
        },
        {
          heading: "Kim kullanır",
          paragraphs: [
            "Damızlık kümes, at ahırı, buzağı barınağı. Adıyaman, Kahramanmaraş, Sivas ve Erzincan da Malatya çevresinin illeridir.",
          ],
        },
      ],
    },
    en: {
      title: "Malatya Farm Shavings | Quality, Economical Bedding",
      description:
        "Farm shavings for Malatya, delivered from neighbouring Elazığ. Natural bedding for poultry, horses and calves.",
      sections: [
        {
          paragraphs: [
            "Malatya farm shavings are natural wood bedding for the province next to Elazığ. There is no second mill in Malatya. Production stays in Yurtbaşı.",
            "Quality means low-dust, hygienic bedding. Economical means a producer-direct load, priced on the phone.",
            "The same region includes Adıyaman, Kahramanmaraş, Sivas and Erzincan.",
          ],
        },
      ],
    },
  },
  {
    slug: "erzurum-ciftlik-talasi",
    province: "erzurum",
    relatedProvinces: ["erzurum", "erzincan", "bingol", "kars", "agri"],
    tr: {
      title: "Erzurum Çiftlik Talaşı | Kaliteli ve Ekonomik Altlık",
      description:
        "Erzurum çiftlik talaşı ve Erzurum kaliteli talaş. Ucuz ve kaliteli ahşap altlık, Elazığ’dan Erzurum’a stok teslim.",
      sections: [
        {
          paragraphs: [
            "Erzurum çiftlik talaşı, yüksek ildeki ahır ve kümes için Elazığ’dan giden kuru, emici altlıktır. Erzincan ve Bingöl bu hattın üzerinde durur.",
            "Erzurum kaliteli talaş, doğal ahşaptır. Erzurum ucuz talaş ve Erzurum ucuz ve kaliteli talaş aramasında ayrı bir indirimli ürün yoktur. Ekonomik olan, üreticiden stok teslimdir.",
          ],
        },
        {
          heading: "Doğu ucu",
          paragraphs: [
            "Kars, Ağrı, Muş ve Ardahan Erzurum çevresindedir. Onların da üretim yeri Elazığ Yurtbaşı’dır. 81 ilin tamamı teslimat kapsamındadır.",
          ],
        },
      ],
    },
    en: {
      title: "Erzurum Farm Shavings | Quality, Economical Bedding",
      description:
        "Farm shavings for Erzurum from Elazığ stock. Dry, absorbent bedding for stables and poultry houses.",
      sections: [
        {
          paragraphs: [
            "Erzurum farm shavings are dry, absorbent bedding shipped from Elazığ for stables and poultry houses. Erzincan and Bingöl lie on that route.",
            "Quality bedding is natural wood. An economical order is producer-direct stock, not a discounted second grade.",
            "Kars, Ağrı, Muş and Ardahan sit around Erzurum. Their mill of origin is still Yurtbaşı. All 81 provinces are in the delivery map.",
          ],
        },
      ],
    },
  },
  {
    slug: "erzincan-ciftlik-talasi",
    province: "erzincan",
    relatedProvinces: ["erzincan", "elazig", "erzurum", "tunceli", "malatya"],
    tr: {
      title: "Erzincan Çiftlik Talaşı | Kaliteli ve Ekonomik Altlık",
      description:
        "Erzincan çiftlik talaşı, Erzincan kaliteli talaş, Erzincan ucuz ve kaliteli talaş. Elazığ ile Erzurum arasındaki hatta stok teslim.",
      sections: [
        {
          paragraphs: [
            "Erzincan çiftlik talaşı, Elazığ ile Erzurum arasındaki geçiş iline giden ahşap altlıktır. Tunceli ve Malatya da bu üçgenin içindedir.",
            "Erzincan kaliteli talaş, tozsuz ve hijyenik zemindir. Erzincan ucuz talaş ya da Erzincan ucuz ve kaliteli talaş yazıldığında kastedilen, üreticinin stok teslimidir. Sitede fiyat tablosu yoktur.",
          ],
        },
      ],
    },
    en: {
      title: "Erzincan Farm Shavings | Quality, Economical Bedding",
      description:
        "Farm shavings for Erzincan, on the corridor between Elazığ and Erzurum. Stock delivery of natural wood bedding.",
      sections: [
        {
          paragraphs: [
            "Erzincan farm shavings go to the province between Elazığ and Erzurum. Tunceli and Malatya sit in the same triangle.",
            "Quality bedding is low-dust and hygienic. Economical delivery is stock from the producer. No price table is published.",
          ],
        },
      ],
    },
  },
  {
    slug: "tunceli-ciftlik-talasi",
    province: "tunceli",
    relatedProvinces: ["tunceli", "elazig", "bingol", "erzincan"],
    tr: {
      title: "Tunceli Çiftlik Talaşı | Kaliteli ve Ekonomik Altlık",
      description:
        "Tunceli çiftlik talaşı ve Tunceli kaliteli talaş. Ucuz ve kaliteli altlık, komşu il Elazığ Yurtbaşı’ndan stok teslim.",
      sections: [
        {
          paragraphs: [
            "Tunceli çiftlik talaşı, Elazığ, Bingöl ve Erzincan ile komşu olan ile gider. Üretim Tunceli’de değil, Yurtbaşı’ndadır. Altlık ahır ve kümes içindir.",
            "Tunceli kaliteli talaş doğal ahşaptır. Tunceli ucuz talaş ve Tunceli ucuz ve kaliteli talaş, aynı ürünün ekonomik sevkiyatıdır. Sipariş üç telefon hattından biriyle verilir.",
          ],
        },
      ],
    },
    en: {
      title: "Tunceli Farm Shavings | Quality, Economical Bedding",
      description:
        "Farm shavings for Tunceli from neighbouring Elazığ. Natural bedding for stables and poultry houses.",
      sections: [
        {
          paragraphs: [
            "Tunceli farm shavings go to the province that borders Elazığ, Bingöl and Erzincan. The mill is in Yurtbaşı, not in Tunceli.",
            "Quality bedding is natural wood. Economical delivery is the same product, ordered by phone.",
          ],
        },
      ],
    },
  },
  {
    slug: "van-ciftlik-talasi",
    province: "van",
    relatedProvinces: ["van", "bitlis", "agri", "mus", "hakkari"],
    tr: {
      title: "Van Çiftlik Talaşı | Kaliteli ve Ekonomik Altlık",
      description:
        "Van çiftlik talaşı, Van kaliteli talaş ve Van ucuz ve kaliteli talaş. Doğu koridorunun ucuna Elazığ’dan stok teslim.",
      sections: [
        {
          paragraphs: [
            "Van çiftlik talaşı, doğu koridorunun ucundaki il için Elazığ stokundan çıkan altlıktır. Bitlis, Ağrı, Hakkari ve Şırnak Van’ın komşularıdır.",
            "Van kaliteli talaş, kümes ve ahır için hijyenik ahşap altlıktır. Van ucuz talaş ve Van ucuz ve kaliteli talaş araması ayrı bir kampanya sayfası değildir. Üretici tektir: MET-İŞ TALAŞ.",
          ],
        },
      ],
    },
    en: {
      title: "Van Farm Shavings | Quality, Economical Bedding",
      description:
        "Farm shavings for Van, at the eastern end of the delivery corridor from Elazığ. Poultry, horse and calf bedding.",
      sections: [
        {
          paragraphs: [
            "Van farm shavings leave Elazığ stock for the province at the far end of the eastern corridor. Bitlis, Ağrı, Hakkari and Şırnak are the neighbours.",
            "Quality bedding is hygienic wood for poultry houses and stables. Economical delivery is the same producer, MET-İŞ TALAŞ, not a separate offer.",
          ],
        },
      ],
    },
  },
  {
    slug: "mus-ciftlik-talasi",
    province: "mus",
    relatedProvinces: ["mus", "bingol", "diyarbakir", "bitlis", "erzurum"],
    tr: {
      title: "Muş Çiftlik Talaşı | Kaliteli ve Ekonomik Altlık",
      description:
        "Muş çiftlik talaşı ve Muş kaliteli talaş. Muş ucuz ve kaliteli talaş, Elazığ Yurtbaşı’ndan stok teslim edilir.",
      sections: [
        {
          paragraphs: [
            "Muş çiftlik talaşı; Bingöl, Diyarbakır, Bitlis ve Erzurum ile komşu olan ile giden doğal altlıktır. Büyükbaş barınağı ve kümes aynı ürünü kullanır.",
            "Muş kaliteli talaş tozsuz ahşaptır. Muş ucuz talaş ve Muş ucuz ve kaliteli talaş, fiyat listesi değil, üreticiden sevkiyattır. Stok konuşması telefonda yapılır.",
          ],
        },
      ],
    },
    en: {
      title: "Muş Farm Shavings | Quality, Economical Bedding",
      description:
        "Farm shavings for Muş from Yurtbaşı, Elazığ. Natural bedding for cattle housing and poultry houses.",
      sections: [
        {
          paragraphs: [
            "Muş farm shavings go to the province that borders Bingöl, Diyarbakır, Bitlis and Erzurum. Cattle housing and poultry houses use the same bedding.",
            "Quality shavings are low-dust wood. Economical delivery is a phone order to the producer, not a published tariff.",
          ],
        },
      ],
    },
  },
  {
    slug: "dogu-anadolu-talas",
    relatedProvinces: [
      "elazig",
      "malatya",
      "bingol",
      "tunceli",
      "erzincan",
      "erzurum",
      "mus",
      "bitlis",
      "van",
      "hakkari",
      "agri",
      "kars",
      "igdir",
      "ardahan",
    ],
    tr: {
      title: "Doğu Anadolu Talaş | Elazığ’dan Bölge Teslimatı",
      description:
        "Doğu Anadolu talaş teslimatı: Elazığ, Bingöl, Malatya, Erzurum, Erzincan, Tunceli, Van ve Muş. Üretim Yurtbaşı’nda.",
      sections: [
        {
          paragraphs: [
            "Doğu Anadolu talaşının üretim yeri tektir: Elazığ Merkez, Yurtbaşı. Bölgedeki illere ayrı fabrika açılmaz. Stok bu tesisten çıkar.",
            "Çekirdek hat Elazığ, Malatya, Bingöl, Tunceli, Erzincan, Erzurum, Muş ve Van’dır. Bitlis, Ağrı, Kars, Iğdır, Ardahan ve Hakkari de aynı bölgenin illeridir.",
          ],
        },
        {
          heading: "Elazığ’a yakın iller",
          paragraphs: [
            "Tunceli, Bingöl, Malatya, Diyarbakır ve Erzincan tesisin yakın çevresidir. Erzurum, Muş ve Van bu çevrenin devamıdır. Arama konumunu Elazığ ve komşu iller yapan kullanıcı için sevkiyat bu haritadadır.",
            "Her ilin kendi teslimat sayfası vardır. Çiftlik, kalite ve ekonomik stok o sayfada, o ilin adıyla yazılır.",
          ],
        },
      ],
    },
    en: {
      title: "Eastern Anatolia Wood Shavings | Delivery from Elazığ",
      description:
        "Wood shavings for Eastern Anatolia: Elazığ, Bingöl, Malatya, Erzurum, Erzincan, Tunceli, Van and Muş. Made in Yurtbaşı.",
      sections: [
        {
          paragraphs: [
            "Eastern Anatolia is supplied from one mill: Yurtbaşı, Merkez, Elazığ. There is not a second factory in each province.",
            "The core line is Elazığ, Malatya, Bingöl, Tunceli, Erzincan, Erzurum, Muş and Van. Bitlis, Ağrı, Kars, Iğdır, Ardahan and Hakkari are in the same region.",
            "Tunceli, Bingöl, Malatya, Diyarbakır and Erzincan are the close ring around the mill. Each province has its own delivery page.",
          ],
        },
      ],
    },
  },
  {
    slug: "guneydogu-anadolu-talas",
    relatedProvinces: [
      "diyarbakir",
      "sanliurfa",
      "mardin",
      "batman",
      "siirt",
      "adiyaman",
      "gaziantep",
      "kilis",
      "sirnak",
    ],
    tr: {
      title: "Güneydoğu Anadolu Talaş | Diyarbakır ve Çevre İller",
      description:
        "Güneydoğu Anadolu talaş teslimatı: Diyarbakır, Şanlıurfa, Mardin, Batman, Siirt, Adıyaman, Gaziantep, Kilis, Şırnak.",
      sections: [
        {
          paragraphs: [
            "Güneydoğu Anadolu talaşı da Elazığ Yurtbaşı’nda üretilir. Diyarbakır bu bölgenin MET-İŞ hattındaki merkez ilidir. Şanlıurfa, Mardin, Batman, Siirt, Adıyaman, Gaziantep, Kilis ve Şırnak aynı teslimat bölgesindedir.",
            "Ürün değişmez: tavuk, at ve buzağı için doğal ahşap altlık. Kaliteli ve ekonomik sevkiyat, il sayfasında o ilin adıyla anlatılır.",
          ],
        },
        {
          heading: "Doğu ile ortak hat",
          paragraphs: [
            "Diyarbakır, Elazığ, Malatya, Bingöl ve Muş ile komşudur. Güneydoğu araması ile Doğu Anadolu araması çoğu zaman aynı stoka çıkar.",
          ],
        },
      ],
    },
    en: {
      title: "Southeastern Anatolia Wood Shavings | Diyarbakır and Beyond",
      description:
        "Wood shavings for Southeastern Anatolia: Diyarbakır, Şanlıurfa, Mardin, Batman, Siirt, Adıyaman, Gaziantep, Kilis and Şırnak.",
      sections: [
        {
          paragraphs: [
            "Southeastern Anatolia is also supplied from Yurtbaşı, Elazığ. Diyarbakır is the hub province on this side of the map. Şanlıurfa, Mardin, Batman, Siirt, Adıyaman, Gaziantep, Kilis and Şırnak are in the same delivery region.",
            "The product does not change: natural wood bedding for poultry, horses and calves.",
            "Diyarbakır borders Elazığ, Malatya, Bingöl and Muş. An eastern search and a southeastern search often reach the same stock.",
          ],
        },
      ],
    },
  },
  {
    slug: "turkiye-81-il-talas",
    relatedProvinces: ["elazig", "ankara", "istanbul", "izmir", "diyarbakir", "erzurum"],
    tr: {
      title: "81 İle Talaş | Türkiye Geneli Teslimat",
      description:
        "MET-İŞ TALAŞ, Elazığ Yurtbaşı’ndan Türkiye’nin 81 iline talaş gönderir. Her ilin teslimat sayfası hizmet bölgelerinde.",
      sections: [
        {
          paragraphs: [
            "81 ile talaş teslimatı, üretimin Elazığ’da kalıp sevkiyatın Türkiye’ye yayılmasıdır. Marmara, Ege, Akdeniz, İç Anadolu, Karadeniz, Doğu Anadolu ve Güneydoğu Anadolu aynı stoktan beslenir.",
            "Yakın hat Doğu ve Güneydoğu’dur: Elazığ, Bingöl, Diyarbakır, Malatya, Erzurum, Erzincan, Tunceli, Van, Muş ve bölge illeri. Uzak iller de kapsamın içindedir. Ayrıcalıklı ikinci bir ürün yoktur.",
          ],
        },
        {
          heading: "İl sayfaları",
          paragraphs: [
            "Her ilin kendi sayfası vardır. Başlık o ilin adını taşır: Adana talaş, İzmir talaş, Trabzon talaş. Ana sayfanın başlığı markada kalır: Metiş Talaş, MET-İŞ TALAŞ.",
            "Çiftlik altlığı, kaliteli talaş ve ucuz ve kaliteli talaş her il sayfasında o ile göre yazılır. Sipariş yine telefonladır.",
          ],
        },
      ],
    },
    en: {
      title: "Wood Shavings to All 81 Provinces",
      description:
        "MET-İŞ TALAŞ ships wood shavings from Yurtbaşı, Elazığ to all 81 provinces of Türkiye. Each province has a delivery page.",
      sections: [
        {
          paragraphs: [
            "Delivery to 81 provinces means production stays in Elazığ while shipment covers Türkiye: Marmara, the Aegean, the Mediterranean, Central Anatolia, the Black Sea, Eastern Anatolia and the Southeast.",
            "The close corridor is the east and southeast. Distant provinces are included. There is no second product for them.",
            "Each province has its own page, titled with that province. The homepage title stays the brand: Metiş Talaş, MET-İŞ TALAŞ.",
          ],
        },
      ],
    },
  },
];

const bySlug = new Map(articles.map((article) => [article.slug, article]));

export function getArticle(slug: string) {
  return bySlug.get(slug);
}

export function articlesMentioning(provinceSlug: string) {
  const exact = articles.filter((article) => article.province === provinceSlug);
  const related = articles.filter(
    (article) =>
      article.province !== provinceSlug && article.relatedProvinces.includes(provinceSlug),
  );
  return [...exact, ...related].slice(0, 4);
}
