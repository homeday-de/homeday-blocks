/* eslint-disable import/no-extraneous-dependencies */
const dateFormat = require('dateformat');
const { readFileSync } = require('fs');
const { join } = require('path');
const { gitmojis } = require('gitmojis');

const TEMPLATE_DIR = './.semantic-release/templates';

const template = readFileSync(
  join(__dirname, TEMPLATE_DIR, 'default-template.hbs'),
).toString();
const commitTemplate = readFileSync(
  join(__dirname, TEMPLATE_DIR, 'commit-template.hbs'),
).toString();

module.exports = {
  branches: ['master', { name: 'beta', prerelease: true }],
  plugins: [
    [
      'semantic-release-gitmoji', {
        releaseRules: {
          major: gitmojis.filter(({ semver }) => semver === 'major').map(({ code }) => code),
          minor: gitmojis.filter(({ semver }) => semver === 'minor').map(({ code }) => code),
          patch: gitmojis.filter(({ semver }) => semver === 'patch').map(({ code }) => code),
        },
        releaseNotes: {
          template,
          partials: { commitTemplate },
          helpers: {
            datetime(format = 'UTC:yyyy-mm-dd') {
              return dateFormat(new Date(), format);
            },
            groupCommits(commits, options) {
              const allCommits = Object.values(commits).flat();
              let groupedCommits = {};

              allCommits
                .filter((commit) => commit !== undefined)
                .forEach((commit) => {
                  const gitmoji = gitmojis.find(({ emoji }) => emoji.localeCompare(commit.gitmoji) === 0);

                  if (gitmoji === undefined) {
                    return;
                  }

                  groupedCommits = {
                    ...groupedCommits,
                    [gitmoji.semver]: [
                      ...groupedCommits[gitmoji.semver] || [],
                      commit,
                    ],
                  };
                });

              return options.fn(groupedCommits);
            },
          },
        },
      },
    ],
    '@semantic-release/github',
    '@semantic-release/npm',
  ],
};
