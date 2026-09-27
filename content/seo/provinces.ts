export type RegionId =
  | "marmara"
  | "ege"
  | "akdeniz"
  | "ic"
  | "karadeniz"
  | "dogu"
  | "guneydogu";

export type Province = {
  slug: string;
  name: string;
  region: RegionId;
  code: string;
  neighbors: readonly string[];
};

export const regionOrder = [
  "dogu",
  "guneydogu",
  "ic",
  "karadeniz",
  "akdeniz",
  "ege",
  "marmara",
] as const satisfies readonly RegionId[];

export const regionLabel: Record<RegionId, { tr: string; en: string }> = {
  marmara: { tr: "Marmara", en: "Marmara" },
  ege: { tr: "Ege", en: "Aegean" },
  akdeniz: { tr: "Akdeniz", en: "Mediterranean" },
  ic: { tr: "İç Anadolu", en: "Central Anatolia" },
  karadeniz: { tr: "Karadeniz", en: "Black Sea" },
  dogu: { tr: "Doğu Anadolu", en: "Eastern Anatolia" },
  guneydogu: { tr: "Güneydoğu Anadolu", en: "Southeastern Anatolia" },
};

export const prioritySlugs = [
  "elazig",
  "bingol",
  "diyarbakir",
  "malatya",
  "erzurum",
  "erzincan",
  "tunceli",
  "van",
  "mus",
] as const;

const priority = new Set<string>(prioritySlugs);

type Row = readonly [slug: string, name: string, code: string, region: RegionId, neighbors: readonly string[]];

const rows: readonly Row[] = [
  ["adana", "Adana", "TR-01", "akdeniz", ["mersin", "osmaniye", "nigde", "kahramanmaras", "hatay"]],
  ["adiyaman", "Adıyaman", "TR-02", "guneydogu", ["malatya", "kahramanmaras", "gaziantep", "sanliurfa", "diyarbakir"]],
  ["afyonkarahisar", "Afyonkarahisar", "TR-03", "ege", ["kutahya", "usak", "denizli", "burdur", "konya", "eskisehir"]],
  ["agri", "Ağrı", "TR-04", "dogu", ["kars", "igdir", "van", "bitlis", "mus", "erzurum"]],
  ["amasya", "Amasya", "TR-05", "karadeniz", ["samsun", "tokat", "corum", "yozgat"]],
  ["ankara", "Ankara", "TR-06", "ic", ["eskisehir", "bolu", "cankiri", "kirikkale", "kirsehir", "konya"]],
  ["antalya", "Antalya", "TR-07", "akdeniz", ["mugla", "burdur", "isparta", "konya", "karaman", "mersin"]],
  ["artvin", "Artvin", "TR-08", "karadeniz", ["rize", "ardahan", "erzurum"]],
  ["aydin", "Aydın", "TR-09", "ege", ["izmir", "manisa", "denizli", "mugla"]],
  ["balikesir", "Balıkesir", "TR-10", "marmara", ["canakkale", "bursa", "kutahya", "manisa", "izmir"]],
  ["bilecik", "Bilecik", "TR-11", "marmara", ["bursa", "kocaeli", "sakarya", "bolu", "eskisehir", "kutahya"]],
  ["bingol", "Bingöl", "TR-12", "dogu", ["elazig", "tunceli", "erzurum", "mus", "diyarbakir", "erzincan"]],
  ["bitlis", "Bitlis", "TR-13", "dogu", ["mus", "van", "siirt", "batman", "agri"]],
  ["bolu", "Bolu", "TR-14", "karadeniz", ["duzce", "zonguldak", "karabuk", "cankiri", "ankara", "sakarya"]],
  ["burdur", "Burdur", "TR-15", "akdeniz", ["antalya", "isparta", "afyonkarahisar", "denizli", "mugla"]],
  ["bursa", "Bursa", "TR-16", "marmara", ["balikesir", "kutahya", "bilecik", "kocaeli", "yalova"]],
  ["canakkale", "Çanakkale", "TR-17", "marmara", ["balikesir", "tekirdag", "edirne"]],
  ["cankiri", "Çankırı", "TR-18", "ic", ["kastamonu", "corum", "kirikkale", "ankara", "bolu", "karabuk"]],
  ["corum", "Çorum", "TR-19", "karadeniz", ["cankiri", "amasya", "yozgat", "kirikkale", "sinop", "samsun"]],
  ["denizli", "Denizli", "TR-20", "ege", ["aydin", "manisa", "usak", "afyonkarahisar", "burdur", "mugla"]],
  ["diyarbakir", "Diyarbakır", "TR-21", "guneydogu", ["elazig", "bingol", "mus", "batman", "mardin", "sanliurfa", "adiyaman", "malatya"]],
  ["edirne", "Edirne", "TR-22", "marmara", ["kirklareli", "tekirdag", "canakkale"]],
  ["elazig", "Elazığ", "TR-23", "dogu", ["tunceli", "bingol", "diyarbakir", "malatya", "erzincan"]],
  ["erzincan", "Erzincan", "TR-24", "dogu", ["erzurum", "bayburt", "gumushane", "sivas", "malatya", "tunceli", "elazig", "bingol"]],
  ["erzurum", "Erzurum", "TR-25", "dogu", ["artvin", "ardahan", "kars", "agri", "mus", "bingol", "erzincan", "bayburt"]],
  ["eskisehir", "Eskişehir", "TR-26", "ic", ["bilecik", "kutahya", "afyonkarahisar", "konya", "ankara", "bolu"]],
  ["gaziantep", "Gaziantep", "TR-27", "guneydogu", ["kahramanmaras", "adiyaman", "sanliurfa", "kilis", "osmaniye"]],
  ["giresun", "Giresun", "TR-28", "karadeniz", ["ordu", "sivas", "erzincan", "gumushane", "trabzon"]],
  ["gumushane", "Gümüşhane", "TR-29", "karadeniz", ["trabzon", "bayburt", "erzincan", "giresun"]],
  ["hakkari", "Hakkari", "TR-30", "dogu", ["van", "sirnak"]],
  ["hatay", "Hatay", "TR-31", "akdeniz", ["osmaniye", "gaziantep", "adana", "kilis"]],
  ["isparta", "Isparta", "TR-32", "akdeniz", ["burdur", "antalya", "konya", "afyonkarahisar"]],
  ["mersin", "Mersin", "TR-33", "akdeniz", ["antalya", "karaman", "konya", "nigde", "adana"]],
  ["istanbul", "İstanbul", "TR-34", "marmara", ["kocaeli", "tekirdag"]],
  ["izmir", "İzmir", "TR-35", "ege", ["balikesir", "manisa", "aydin"]],
  ["kars", "Kars", "TR-36", "dogu", ["ardahan", "erzurum", "agri", "igdir"]],
  ["kastamonu", "Kastamonu", "TR-37", "karadeniz", ["sinop", "corum", "cankiri", "karabuk", "bartin"]],
  ["kayseri", "Kayseri", "TR-38", "ic", ["sivas", "yozgat", "nevsehir", "nigde", "adana", "kahramanmaras"]],
  ["kirklareli", "Kırklareli", "TR-39", "marmara", ["edirne", "tekirdag"]],
  ["kirsehir", "Kırşehir", "TR-40", "ic", ["kirikkale", "yozgat", "nevsehir", "aksaray", "ankara"]],
  ["kocaeli", "Kocaeli", "TR-41", "marmara", ["istanbul", "sakarya", "bursa", "yalova"]],
  ["konya", "Konya", "TR-42", "ic", ["ankara", "aksaray", "nigde", "mersin", "karaman", "antalya", "isparta", "afyonkarahisar", "eskisehir"]],
  ["kutahya", "Kütahya", "TR-43", "ege", ["bursa", "bilecik", "eskisehir", "afyonkarahisar", "usak", "manisa", "balikesir"]],
  ["malatya", "Malatya", "TR-44", "dogu", ["elazig", "diyarbakir", "adiyaman", "kahramanmaras", "sivas", "erzincan"]],
  ["manisa", "Manisa", "TR-45", "ege", ["izmir", "aydin", "denizli", "usak", "kutahya", "balikesir"]],
  ["kahramanmaras", "Kahramanmaraş", "TR-46", "akdeniz", ["kayseri", "adana", "osmaniye", "gaziantep", "adiyaman", "malatya", "sivas"]],
  ["mardin", "Mardin", "TR-47", "guneydogu", ["diyarbakir", "batman", "siirt", "sirnak", "sanliurfa"]],
  ["mugla", "Muğla", "TR-48", "ege", ["aydin", "denizli", "burdur", "antalya"]],
  ["mus", "Muş", "TR-49", "dogu", ["bingol", "erzurum", "agri", "bitlis", "batman", "diyarbakir"]],
  ["nevsehir", "Nevşehir", "TR-50", "ic", ["kayseri", "nigde", "aksaray", "kirsehir", "yozgat"]],
  ["nigde", "Niğde", "TR-51", "ic", ["nevsehir", "kayseri", "adana", "mersin", "konya", "aksaray"]],
  ["ordu", "Ordu", "TR-52", "karadeniz", ["samsun", "tokat", "sivas", "giresun"]],
  ["rize", "Rize", "TR-53", "karadeniz", ["trabzon", "artvin", "erzurum", "bayburt"]],
  ["sakarya", "Sakarya", "TR-54", "marmara", ["kocaeli", "duzce", "bolu", "bilecik"]],
  ["samsun", "Samsun", "TR-55", "karadeniz", ["sinop", "corum", "amasya", "tokat", "ordu"]],
  ["siirt", "Siirt", "TR-56", "guneydogu", ["batman", "bitlis", "van", "sirnak", "mardin"]],
  ["sinop", "Sinop", "TR-57", "karadeniz", ["kastamonu", "corum", "samsun"]],
  ["sivas", "Sivas", "TR-58", "ic", ["yozgat", "tokat", "ordu", "giresun", "erzincan", "malatya", "kahramanmaras", "kayseri"]],
  ["tekirdag", "Tekirdağ", "TR-59", "marmara", ["istanbul", "kirklareli", "edirne", "canakkale"]],
  ["tokat", "Tokat", "TR-60", "karadeniz", ["amasya", "samsun", "ordu", "sivas", "yozgat"]],
  ["trabzon", "Trabzon", "TR-61", "karadeniz", ["giresun", "gumushane", "bayburt", "rize"]],
  ["tunceli", "Tunceli", "TR-62", "dogu", ["erzincan", "elazig", "bingol"]],
  ["sanliurfa", "Şanlıurfa", "TR-63", "guneydogu", ["adiyaman", "diyarbakir", "mardin", "gaziantep"]],
  ["usak", "Uşak", "TR-64", "ege", ["manisa", "denizli", "afyonkarahisar", "kutahya"]],
  ["van", "Van", "TR-65", "dogu", ["agri", "bitlis", "siirt", "hakkari", "sirnak"]],
  ["yozgat", "Yozgat", "TR-66", "ic", ["corum", "amasya", "tokat", "sivas", "kayseri", "nevsehir", "kirsehir", "kirikkale"]],
  ["zonguldak", "Zonguldak", "TR-67", "karadeniz", ["duzce", "bolu", "karabuk", "bartin"]],
  ["aksaray", "Aksaray", "TR-68", "ic", ["ankara", "kirsehir", "nevsehir", "nigde", "konya"]],
  ["bayburt", "Bayburt", "TR-69", "karadeniz", ["gumushane", "trabzon", "rize", "erzurum", "erzincan"]],
  ["karaman", "Karaman", "TR-70", "ic", ["konya", "mersin", "antalya"]],
  ["kirikkale", "Kırıkkale", "TR-71", "ic", ["ankara", "cankiri", "corum", "yozgat", "kirsehir"]],
  ["batman", "Batman", "TR-72", "guneydogu", ["diyarbakir", "mus", "bitlis", "siirt", "mardin"]],
  ["sirnak", "Şırnak", "TR-73", "guneydogu", ["siirt", "van", "hakkari", "mardin"]],
  ["bartin", "Bartın", "TR-74", "karadeniz", ["zonguldak", "karabuk", "kastamonu"]],
  ["ardahan", "Ardahan", "TR-75", "dogu", ["artvin", "erzurum", "kars"]],
  ["igdir", "Iğdır", "TR-76", "dogu", ["kars", "agri"]],
  ["yalova", "Yalova", "TR-77", "marmara", ["kocaeli", "bursa", "istanbul"]],
  ["karabuk", "Karabük", "TR-78", "karadeniz", ["bartin", "zonguldak", "bolu", "cankiri", "kastamonu"]],
  ["kilis", "Kilis", "TR-79", "guneydogu", ["gaziantep", "hatay"]],
  ["osmaniye", "Osmaniye", "TR-80", "akdeniz", ["adana", "hatay", "gaziantep", "kahramanmaras"]],
  ["duzce", "Düzce", "TR-81", "karadeniz", ["sakarya", "bolu", "zonguldak"]],
];

export const provinces: Province[] = rows.map(([slug, name, code, region, neighbors]) => ({
  slug,
  name,
  code,
  region,
  neighbors,
}));

function assertProvinces(list: Province[]) {
  if (list.length !== 81) {
    throw new Error(`Expected 81 provinces, received ${list.length}`);
  }
  const slugs = new Set<string>();
  for (const province of list) {
    if (slugs.has(province.slug)) throw new Error(`Duplicate slug ${province.slug}`);
    slugs.add(province.slug);
  }
  for (const province of list) {
    if (!/^TR-\d{2}$/.test(province.code)) {
      throw new Error(`Bad region code for ${province.slug}`);
    }
    for (const neighbor of province.neighbors) {
      if (!slugs.has(neighbor)) {
        throw new Error(`${province.slug} has unknown neighbor ${neighbor}`);
      }
    }
  }
}

assertProvinces(provinces);

const bySlug = new Map(provinces.map((province) => [province.slug, province]));

export function getProvince(slug: string) {
  return bySlug.get(slug);
}

export function isPriorityProvince(slug: string) {
  return priority.has(slug);
}

export function provincesIn(region: RegionId) {
  return provinces
    .filter((province) => province.region === region)
    .sort((a, b) => a.name.localeCompare(b.name, "tr"));
}

export function neighborProvinces(province: Province) {
  return province.neighbors
    .map((slug) => bySlug.get(slug))
    .filter((item): item is Province => Boolean(item));
}
