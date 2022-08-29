import de from './de.json';
import en from './en.json';

export type Messages = { [key in keyof typeof de]: typeof de[key] };

const langs = {
  de,
  en,
};

/**
 * Get static Homeday Blocks translation files
 */
export function getMessages(lang: string): Messages {
  return langs[lang] || langs.de;
}

export default {
  getMessages,
};
