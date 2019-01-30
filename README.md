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

## Deployment

The [CI](https://travis-ci.com/homeday-de/homeday-blocks) will deploy storybook automatically, once PR is merged to `develop` branch. Additionally, you can deploy your current working branch locally, by running 

```
npm run deploy
```

this will build and deploy your local version of storybook. You can also specify subfolder you'd like to use 
for your local build by passing it as argument

```
$ FOLDER=test npm run deploy
```

If no folder is specified, timestamp will be used as folder prefix.

For this to work, you have to all add your `AWS` credentials to the project. You can create JSON file in root folder, with following structure:

```
{
    "AWS_ACCESS_KEY_ID": "MY_ID",
    "AWS_SECRET_ACCESS_KEY": "MY_SECRET"
}
```

You can find/create your credentials [here](https://console.aws.amazon.com/iam/home?#security_credential).
**This file is part of `.gitignore`, so it should never be check in to the project itself.**

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
