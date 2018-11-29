import de from './de.json';
import en from './en.json';

const langs = {
  de,
  en,
};
export function getMessages(lang) {
  return langs[lang] || langs.de;
}

export default {
  getMessages,
};
