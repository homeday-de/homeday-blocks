/* eslint-disable */
import merge from 'lodash/merge';

const accentMap = {
  'ä': 'a',
  'ö': 'o',
  'ü': 'u',
  'ß': 'ss'
};

// Replaces all occurances of accents from the accentMap
export const accentFold = string => string.split('').map(char => {
  return accentMap[char] ? accentMap[char] : char;
}).join('');


/** Replace all the occurrences in a string */
export function populateTemplate(template, map) {
  const regex = new RegExp(`(${Object.keys(map).map(k => `:${k}`).join('|')})`, 'g');
  return template.replace(regex, match => map[match.slice(1)]);
}

/** Takes a data object and returns a nested object based on the keys and the nestingString
*/
export function formatNestedData(data, nestingString = '.') {
  const formattedObj = {};
  Object.keys(data).forEach((fieldKey) => {
    const value = data[fieldKey];
    const keys = fieldKey.split(nestingString);
    const nestedSubObj = keys.reverse().reduce((acc, currentKey, index) => {
      if (index === 0) {
        acc[currentKey] = value;
        return acc;
      }
      acc = merge({}, { [currentKey]: acc });
      return acc;
    }, {});
    merge(formattedObj, nestedSubObj);
  });
  return formattedObj;
}

/** Returns the level of password strength in a range of [0 - (levelsCount - 1)] */
export function getPasswordStrength(password, levelsCount) {
  const MAX_POINTS = 4; // The number of points required to get the highest strength level

  const minimumLength = (string) => {
    const MINIMUM_LENGTH = 8;
    const LENGTH_BONUS_STEP = 5;
    const stringLength = string.length;

    if (stringLength >= MINIMUM_LENGTH) {
      return Math.floor((stringLength - MINIMUM_LENGTH) / LENGTH_BONUS_STEP) + 1;
    }
    return 0;
  };
  const number = string => /\d/.test(string) ? 1 : 0;
  const upperAndLowcase = string => string.toUpperCase() !== string && string.toLowerCase() !== string ? 1 : 0;
  const specialCharacter = string => /[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/g.test(string) ? 1 : 0;

  const rules = [
    minimumLength,
    number,
    upperAndLowcase,
    specialCharacter,
  ];

  let passedRules = 0;
  rules.forEach((rule) => {
    passedRules += rule(password);
  });
  passedRules = passedRules > MAX_POINTS ? MAX_POINTS : passedRules;
  return Math.floor((passedRules / MAX_POINTS) * (levelsCount - 1));
}

// Generates random integer based on provided min and max
export const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

export const circleToPath = (cx, cy, r) => `M ${cx} ${cy} m -${r}, 0 a ${r},${r} 0 1,0 ${r * 2},0 a ${r},${r} 0 1,0 -${r * 2},0`;

export const loadJSAsync = (e, n, o) => {
  const t = document,
    a = "script",
    i = t.createElement(a),
    r = t.getElementsByTagName(a)[0];
  i.src = "//" + e, n && i.addEventListener("load", function (e) {
    n(null, e)
  }, !1), o && i.addEventListener("error", function (e) {
    o(e)
  }, !1), r.parentNode.insertBefore(i, r)
};

export default {
  populateTemplate,
  getPasswordStrength,
  formatNestedData,
  getRandomInt,
  loadJSAsync,
  accentFold,
};
