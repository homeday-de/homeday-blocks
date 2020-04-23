/* eslint-disable no-use-before-define */
// Documentation: https://haveibeenpwned.com/API/v3#PwnedPasswords

/**
 * hasPasswordBeenPwnd
 * this is an entry point to the service and function wich controls the flow
 * @param {String} text
 * Returns boolean true or false, depending on api call results
 * NOTE: If request fails for any reason (network error, unexpected status code),
 * we swallow the error and return true. This is to prevent blocking the user flow
 * if there are issue with the extenral service
 */
export default async function hasPasswordBeenPwnd(text) {
  if (!canBeChecked(text)) {
    return false;
  }
  const hash = await digestMessage(text);
  try {
    const result = await queryHIBP(hash);
    return hasBeenPwnd(hash, result);
  } catch (e) {
    // to prevent breaking of the flow, we exit with false
    return false;
  }
}

/**
 * Sanity check before executing the lookup
 * In general, Crypto and TextEncoding are well supported in
 * everygreen browsers. But IE does not support it.In order to prevent
 * bloating of JS, we probably don't need to polyfil any of this
 * @param {String} text
 * Returns boolean - true if all the requierments are meet
 */
function canBeChecked(text) {
  if (window.TextEncoder && window.crypto
    && window.crypto.subtle && text.length > 0) {
    return true;
  }
  return false;
}

/**
 *
 * @param {String} hash - SHA-1 hash HEX representation of user passed input
 * @param {Array} setOfPwds - Set of passwords the service returns, that
 * need to be checked for the match with our user hash
 * Returns boolean - true in case the password has been comprimised
 */
function hasBeenPwnd(hash, setOfPwds) {
  // format of the set of passwords is
  // hash:N, hash is a substring of original hash
  // and N is number of times this pwd has been breached
  const hashEndingSubstring = hash.substring(5, hash.length);
  const compromisedPwds = setOfPwds.filter(h => h.split(':')[0] === hashEndingSubstring);
  return compromisedPwds.length > 0;
}

/**
 * Function that handles api query and data formatting
 * @param {String} hash - SHA-1 hash HEX representation of user passed input
 * returns Array of HEX to be checked. I
 */
function queryHIBP(hash) {
  const first5chars = hash.substring(0, 5);
  return fetch(`https://api.pwnedpasswords.com/range/${first5chars}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response error');
      }
      return response.text();
    }).then(text => text.split('\r\n'));
}

/**
 * Function that converts message/text to SHA-1 UTF encoded HEX string
 * Taken from here: https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/digest
 * @param {String} message
 * Returns capitalized SHA-1 hash HEX representation of user passed input
 */
async function digestMessage(message) {
  //
  const msgUint8 = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-1', msgUint8);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex.toUpperCase();
}
