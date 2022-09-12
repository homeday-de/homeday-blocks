import de from './de.json';
import en from './en.json';

export type Language = 'de' | 'en';
export type Messages = typeof de | typeof en;

const langs: { [key in Language]: Messages } = {
  de,
  en,
};

/**
 * Get static Homeday Blocks translation files
 */
export function getMessages(lang: keyof typeof langs): Messages {
  return langs[lang] || langs.de;
}

export default {
  getMessages,
};
