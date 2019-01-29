# Homeday Blocks
A library of Vue components used across Homeday projects

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
