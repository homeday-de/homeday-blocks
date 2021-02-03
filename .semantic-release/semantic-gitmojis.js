const { gitmojis } = require('gitmojis');

const MAJOR_EMOJIS = [':boom:'];
const MINOR_EMOJIS = [':sparkles:'];

// This function returns the list of gitmojis
// with their sermantic versioning effect
function getSemantifiedGitmojis() {
  return gitmojis.map((gitmoji) => {
    let semver = 'patch';

    if (MAJOR_EMOJIS.includes(gitmoji.code)) semver = 'major';
    if (MINOR_EMOJIS.includes(gitmoji.code)) semver = 'minor';

    return { ...gitmoji, semver };
  })
}

module.exports = {
  gitmojis: getSemantifiedGitmojis(),
};
