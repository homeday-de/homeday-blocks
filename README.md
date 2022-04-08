![Build Status](https://github.com/homeday-de/homeday-blocks/actions/workflows/deploy-storybook.yml/badge.svg)
[![Coverage Status](https://coveralls.io/repos/github/homeday-de/homeday-blocks/badge.svg?t=Kbz7Vb)](https://coveralls.io/github/homeday-de/homeday-blocks)
[![This project is using Percy.io for visual regression testing.](https://percy.io/static/images/percy-badge.svg)](https://percy.io/Homeday/homeday-blocks)

# Homeday Blocks
A library of Vue components and tokens used across Homeday projects - [here](https://blocks.homeday.dev)

## Local setup

Fork the main repository, clone your fork to your local machine and add the main repo as upstream.

```
$ git clone git@github.com:YOUR_USERNAME/homeday-blocks.git
$ cd homeday-blocks
$ git remote add upstream git@github.com:homeday-de/homeday-blocks.git
```

## Prerequisites

Homeday Blocks requires [Node.js](https://nodejs.org/) version 14.17.0 ([.nvmrc](.nvmrc)). It's recommended to manage multiple versions of Node on the same machine with [nvm](https://github.com/nvm-sh/nvm) or [nvm-windows](https://github.com/coreybutler/nvm-windows).

Don't forget to setup the [deeper shell integration](https://github.com/nvm-sh/nvm#deeper-shell-integration) in your console to take full advantage of `nvm`. You can achieve this by adding the following alias into your `~/.bashrc`, or `~/.zshrc` file:

```bash
alias cd="cdnvm(){ cd $1; if [[ -f .nvmrc && -s .nvmrc && -r .nvmrc ]]; then <.nvmrc nvm install; elif [[ $(nvm current) != $(nvm version default) ]]; then nvm use default; fi; };cdnvm"
```

## Project setup

### Download and install dependencies

For a breif explanation of what is being install, please read our [setup documentation file](/docs/SETUP.md).

#### OSX

To install all our dependencies on OSX, run `scripts/setup.osx.sh`.

#### Ubuntu

To install all our dependencies on Ubuntu, run `scripts/setup.ubuntu.sh`.

It is recommended to run the setup script everytime you pull from the `master` branch. This way you can always be sure to have all the project dependencies up to date.

### Lints and fixes files
```
npm run lint
```

### Storybook
#### Development
```
npm run serve:storybook
```
#### Build
```
npm run build:storybook
```
### Build the library
```
npm run build
```
For a brief explanation of how the library is built, checkout [this documentation](/docs/BUILD.md).

## Testing

To just run all unit tests:
```bash
npm run test:unit
```

To watch for changes while writing tests:
```bash
npm run test:unit:watch
```

To watch for changes while writing tests for a single component:
```bash
npm run test:unit:watch ComponentName
```

### Screenshot tests on Percy

Make sure you've `PERCY_TOKEN` exported first and the [project is built](#build).

*The token can be obtained from Percy dashboard if you've access to it.*

```bash
npm run test:percy
```

You can also follow build statuses in https://percy.io/Homeday/homeday-blocks

#### Gotchas
- `tests/` is an alias for `<rootDir>/tests/`

## TypeScript
For a basic explanation of what it is and how to use it, please read [TypeScript.md](/docs/TypeScript.md).
## Generators

We use [Hygen](https://www.hygen.io/) as a code generator tool to save time when we need to scaffold some structure.

Just run:

```
npm run new component
npm run new service
```

And follow the wizzard in order to generate a base component structure or a service.

## Contribution guide

This project follows [forking workflow](https://www.atlassian.com/git/tutorials/comparing-workflows/forking-workflow). See [project setup](#project-setup) to get started locally. That means that all code changes enter the project by PR to `master` branch. Once you open the PR with suggested changes, the checks for `build` and `coverage` will run. If those fail, your PR needs some more work. :) 

Each PR should be reviewed by at least two team members. Once reviewed and approved, it can be merged. Please follow the following convention when merging the PR: 

1) Use "Squash and merge" to merge the PR. 
2) Use a meaningful title when merging your PR. 
3) Give title a semantic meaning through [emojis](https://gitmoji.carloscuesta.me/). Please use emoji first, then the text. 
4) **:boom: - marks breaking changes (MAJOR version change)** 
5) **:sparkles: - marks new feature (MINOR version change)**
6) The other gitmojis are either a **patch** or have no effect at all.

It is important to follow this convention, because our automated releases are based on it.

#### Examples 

##### Major change
:boom: Removed HdNotNeeded component

##### Minor change
:sparkles: Added HdAwesomeComponent

##### Patch
:bug: Fixed that annoying bug

## Version release

Releasing a new version is as easy as pushing your changes to `master` 😎

- [Github Actions](/.github/workflows/deploy-storybook.yml) will automatically deploy the storybook to our [showcase env](https://blocks.homeday.dev).
- And this [Github workflow](https://github.com/homeday-de/homeday-blocks/tree/master/.github/workflows/release.yml) will automatically create a [release on Github](https://github.com/homeday-de/homeday-blocks/releases) and publish a new [version to NPM](https://www.npmjs.com/package/homeday-blocks?activeTab=versions). 

## Consuming in other projects

```js
import { HdDynamicForm } from 'homeday-blocks';
```

## Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## Services
Together with the components, Homeday Blocks also provides useful services that can be reused across projects. You can read more about them in the services [documentation](https://github.com/homeday-de/homeday-blocks/tree/master/src/services).
