const frontVowels = new Set(["e", "i", "ö", "ü"]);
const vowels = new Set(["a", "ı", "o", "u", "e", "i", "ö", "ü"]);
const fortis = new Set(["p", "ç", "t", "k", "f", "h", "s", "ş"]);

function lastVowel(name: string) {
  const chars = [...name.toLocaleLowerCase("tr")];
  for (let index = chars.length - 1; index >= 0; index -= 1) {
    const char = chars[index];
    if (char && vowels.has(char)) return char;
  }
  return "a";
}

function suffixStem(name: string) {
  const chars = [...name.toLocaleLowerCase("tr")];
  const last = chars[chars.length - 1] ?? "a";
  const vowel = lastVowel(name);
  return {
    buffer: fortis.has(last) ? "t" : "d",
    front: frontVowels.has(vowel),
  };
}

export function locative(name: string) {
  const { buffer, front } = suffixStem(name);
  return `${name}’${buffer}${front ? "e" : "a"}`;
}

export function joinList(names: string[], locale: "tr" | "en") {
  if (names.length <= 1) return names[0] ?? "";
  const conjunction = locale === "tr" ? "ve" : "and";
  if (names.length === 2) return `${names[0]} ${conjunction} ${names[1]}`;
  return `${names.slice(0, -1).join(", ")} ${conjunction} ${names.at(-1)}`;
}
