import de from './de.json';
import en from './en.json';

const langs = {
  de,
  en,
};
export function getMessages(lang) {
  const currentLang = langs[lang];
  if (currentLang !== undefined) {
    return currentLang;
  }
  return langs.en;
}

export default {
  getMessages,
};
