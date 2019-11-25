[![Build Status](https://travis-ci.com/homeday-de/homeday-blocks.svg?token=rxKqgsBkMR5FqNpvxBcx&branch=develop)](https://travis-ci.com/homeday-de/homeday-blocks) [![Coverage Status](https://coveralls.io/repos/github/homeday-de/homeday-blocks/badge.svg?t=Kbz7Vb)](https://coveralls.io/github/homeday-de/homeday-blocks)

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

Vue CLI requires [Node.js](https://nodejs.org/) version 8.9 or above (8.11.0+ recommended). You can manage multiple versions of Node on the same machine with nvm or nvm-windows.

## Project setup
```
npm install
```

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
Make sure you've `PERCY_TOKEN` exported first. It can be obtained from Percy dashboard if you've access to it.
```bash
npm run test:percy
```

#### Gotchas
- `tests/` is an alias for `<rootDir>/tests/`
- The form components share many classes (mostly `field--*`), to avoid repeatedly defining some of them in each form test, [FIELD_CLASSES.js](https://github.com/homeday-de/homeday-blocks/blob/develop/tests/unit/components/form/FIELD_CLASSES.js) contains the most common classes we need for testing. Feel free to add more classes.

## Deployment

The [CI](https://travis-ci.com/homeday-de/homeday-blocks) will deploy storybook automatically to our [showcase env](https://blocks.homeday.dev), once PR is merged to `develop` branch. 


## Consuming in other projects
Homeday Blocks makes use of the Webpack Alias feature, which need to be set up in a parent project (the project that consumes this library).

To help with that, a helper function is provided inside this project which should be included in the parent project as in the following example:

```js
// vue.config.js
 getHdBlockWebpackAlias = require('homeday-blocks/webpack-alias');

module.exports = {
  // ...
  chainWebpack: ({ resolve: { alias } }) => {
    const hdBlocksAlias = getHdBlockWebpackAlias();

    Object.keys(hdBlocksAlias).forEach(aliasKey => alias.set(
      aliasKey, hdBlocksAlias[aliasKey],
    ));
  },
  // ...
};
```

We can then include the components from Homeday Blocks by using the `hd-blocks` alias, like so:

```js
import HdDynamicForm from 'hd-blocks/components/form/HdDynamicForm.vue';
```

## Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## Services
Together with the components, Homeday Blocks also provides useful services that can be reused across projects. You can read more about them in the services [documentation](https://github.com/homeday-de/homeday-blocks/tree/develop/src/services).