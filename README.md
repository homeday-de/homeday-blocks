[![Build Status](https://travis-ci.com/homeday-de/homeday-blocks.svg?token=rxKqgsBkMR5FqNpvxBcx&branch=develop)](https://travis-ci.com/homeday-de/homeday-blocks)
[![Coverage Status](https://coveralls.io/repos/github/homeday-de/homeday-blocks/badge.svg?t=Kbz7Vb)](https://coveralls.io/github/homeday-de/homeday-blocks)
[![This project is using Percy.io for visual regression testing.](https://percy.io/static/images/percy-badge.svg)](https://percy.io/Homeday/homeday-blocks)

# Homeday Blocks
A library of Vue components used across Homeday projects - [here](https://blocks.homeday.dev)

## Local setup

Fork the main repository, clone it to your local machine and add main repo as upstream.

```
$ git clone git@github.com:YOUR_USERNAME/homeday-blocks.git
$ cd homeday-blocks
$ git remote add upstream git@github.com:homeday-de/homeday-blocks.git
```

## Prerequisites

Homeday Blocks requires [Node.js](https://nodejs.org/) version 8.9 or above (8.11.0+ recommended). It's recommended to manage multiple versions of Node on the same machine with [nvm](https://github.com/nvm-sh/nvm) or [nvm-windows](https://github.com/coreybutler/nvm-windows).

Don't forget to setup the [deeper shell integration](https://github.com/nvm-sh/nvm#deeper-shell-integration) in your console to take full advantage of `nvm`. You can achieve this by adding the following alias into your `~/.bashrc`, or `~/.zshrc` file:

```bash
alias cd="cdnvm(){ cd $1; if [[ -f .nvmrc && -s .nvmrc && -r .nvmrc ]]; then <.nvmrc nvm install; elif [[ $(nvm current) != $(nvm version default) ]]; then nvm use default; fi; };cdnvm"
```

## Project setup
```
npm install
```

### Download and install dependencies

For a breif explanation of what is being install, please read our [setup documentation file](/docs/SETUP.md).

#### OSX

To install all our dependencies on OSX, run `scripts/setup.osx.sh`.

#### Ubuntu

To install all our dependencies on Ubuntu, run `scripts/setup.ubuntu.sh`.

It is recommended to run the setup script everytime you pull from the `develop` branch. This way you can always be sure to have all the project dependencies up to date.

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
### Build as a library
```
npm run build:lib
```

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
- The form components share many classes (mostly `field--*`), to avoid repeatedly defining some of them in each form test, [FIELD_CLASSES.js](https://github.com/homeday-de/homeday-blocks/blob/develop/tests/unit/components/form/FIELD_CLASSES.js) contains the most common classes we need for testing. Feel free to add more classes.

## Deployment

The [CI](https://travis-ci.com/homeday-de/homeday-blocks) will deploy storybook automatically to our [showcase env](https://blocks.homeday.dev), once PR is merged to `develop` branch. 


## Consuming in other projects

```js
import { HdDynamicForm } from 'homeday-blocks';
```

## Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## Services
Together with the components, Homeday Blocks also provides useful services that can be reused across projects. You can read more about them in the services [documentation](https://github.com/homeday-de/homeday-blocks/tree/develop/src/services).