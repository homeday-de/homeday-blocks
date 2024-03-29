/* eslint-disable */
import _merge from 'lodash/merge';
import _isArray from 'lodash/isArray';
import _isPlainObject from 'lodash/isPlainObject';
import _camelCase from 'lodash/camelCase';
import _snakeCase from 'lodash/snakeCase';

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
      acc = _merge({}, { [currentKey]: acc });
      return acc;
    }, {});
    _merge(formattedObj, nestedSubObj);
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

// Returns an array of the desired length filled with indexes as values
export function getArrayOfSize(size = 0) {
  return Array.from(Array(size), (_, x) => x);
}

/**
 * create and load a script tag in html
 * @param url (string) src attribute
 * @param first (boolean) prepend/append status
 * @param head (boolean) adding to head/body status
 * @param attributes (object) set of script tag attributes
 * @returns {Promise<void>}
 */
export function loadScript({ url = '', first = false, head = false, attributes = {} }) {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.onload = resolve;
    script.type = 'text/javascript';
    script.src = url;

    Object.entries(attributes).forEach(([key, value]) => {
      script.setAttribute(key, value);
    });

    const parent = document[head ? 'head' : 'body'];
    if (first) {
      parent.insertBefore(script, parent.firstChild);
    } else {
      parent.appendChild(script);
    }
  });
}

// Returns list of random integers
export const generateUniqueNumbers = (amount, min, max) => {
  const indexes = [];
  // sanity check to prevent infinit loop
  if (amount > (max - min + 1)) {
    return indexes;
  }
  // max tries are arbitrary selected attempts limit
  // to prevent super expensive cases of finding all
  // unique numbers
  let maxTries = 10 * amount;
  while (indexes.length < amount && maxTries > 0) {
    maxTries -= 1;
    const randomInt = getRandomInt(min, max);
    if (!indexes.includes(randomInt)) {
      indexes.push(randomInt);
    }
  }
  return indexes;
};

/**
 * Clones a single VNode
 * @param {import("vue").VNode} vnodes VNode to be cloned
 * @param {Function} createElement Render function
 * @returns {import("vue").VNode} Cloned VNodes
 */
 export function cloneVNode (vnode, createElement) {
  const clonedChildren = vnode.children && vnode.children.map(vnode => cloneVNode(vnode, createElement))
  const cloned = createElement(vnode.tag, vnode.data, clonedChildren)
  cloned.text = vnode.text
  cloned.isComment = vnode.isComment
  cloned.componentOptions = vnode.componentOptions
  cloned.fnOptions = vnode.fnOptions
  cloned.fnContext = vnode.fnContext
  cloned.elm = vnode.elm
  cloned.context = vnode.context
  cloned.ns = vnode.ns
  cloned.isStatic = vnode.isStatic
  cloned.key = vnode.key
  cloned.data = vnode.data
  return cloned
}

/**
 * Clones VNode with merged data
 * @param {import("vue").VNode} vnode VNode
 * @param {Object} data VNode data
 * @param {import("vue").CreateElement} h Render function
 * @returns {import("vue").VNode}
 */
export function cloneVNodeElement (vnode, { props, attrs, children, ...rest }, h) {
  const cloned = cloneVNode(vnode, h)
  return h(cloned.componentOptions.Ctor, {
    ...cloned.data,
    ...(cloned.componentOptions.listeners || {}),
    props: {
      ...(cloned.data.props || {}),
      ...cloned.componentOptions.propsData,
      ...props
    },
    attrs: {
      ...(cloned.data.attrs || {}),
      ...attrs
    },
    ...rest
  }, cloned.componentOptions.children || children)
}

// Deeply converts the keys of a given object to camelCase
export function keysToCamelCase(collection) {
  if (_isPlainObject(collection)) {
    const newCollection = {};

    Object.keys(collection)
      .forEach((item) => {
        newCollection[_camelCase(item)] = keysToCamelCase(collection[item]);
      });

    return newCollection;
  }

  if (_isArray(collection)) {
    return collection.map((item) => keysToCamelCase(item));
  }

  return collection;
}

// Deeply converts the keys of a given object to snake_case
export function keysToSnakeCase(collection) {
  if (_isPlainObject(collection)) {
    const newCollection = {};

    Object.keys(collection)
      .forEach((item) => {
        newCollection[_snakeCase(item)] = keysToSnakeCase(collection[item]);
      });

    return newCollection;
  }

  if (_isArray(collection)) {
    return collection.map((item) => keysToSnakeCase(item));
  }

  return collection;
}

export default {
  populateTemplate,
  getPasswordStrength,
  formatNestedData,
  getRandomInt,
  circleToPath,
  getArrayOfSize,
  loadScript,
  generateUniqueNumbers,
  keysToCamelCase,
  keysToSnakeCase,
};
