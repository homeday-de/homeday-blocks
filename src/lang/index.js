// @ts-check
import de from './de.json';
import en from './en.json';

/**
 * @typedef {{ [key in keyof de]: de[key] }} Messages
 */

const langs = {
  de,
  en,
};

/**
 * Get static Homeday Blocks translation files
 *
 * @param {string} lang
 * @returns {Messages}
 */
export function getMessages(lang) {
  return langs[lang] || langs.de;
}

export default {
  getMessages,
};
