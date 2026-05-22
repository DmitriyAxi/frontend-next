import { translations } from "../app/translations";

const langs = Object.keys(translations) as (keyof typeof translations)[];
const referenceKeys = Object.keys(translations[langs[0]]);

let hasErrors = false;

for (const lang of langs) {
  const keys = Object.keys(translations[lang]);

  for (const key of referenceKeys) {
    if (!(key in translations[lang])) {
      console.error(`[MISSING] "${key}" not found in "${lang}"`);
      hasErrors = true;
    } else if (!translations[lang][key as keyof typeof translations[typeof lang]]) {
      console.error(`[EMPTY] "${key}" is empty in "${lang}"`);
      hasErrors = true;
    }
  }

  for (const key of keys) {
    if (!referenceKeys.includes(key)) {
      console.warn(`[EXTRA] "${key}" exists in "${lang}" but not in "${langs[0]}"`);
    }
  }
}

if (hasErrors) {
  console.error("\nTranslation check failed.");
  process.exit(1);
} else {
  console.log(`All translations OK (${langs.length} langs, ${referenceKeys.length} keys).`);
}
