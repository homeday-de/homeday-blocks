<template>
  <div class="welcome">
    <h1 class="welcome__title">Homeday-Blocks</h1>
    <p class="welcome__paragraph">A Vue component library built by Homeday's frontend team.</p>

    <h3 class="welcome__subtitle">Start using the library in 3 quick steps</h3>
    <p class="welcome__paragraph">
      1- Install the library:
      <vue-code-highlight class="welcome__code">{{
        `npm install homeday-de/homeday-blocks --save`
      }}</vue-code-highlight>
      2- Add the alias to your Webpack config:
      <vue-code-highlight class="welcome__code">{{
        `
        chainWebpack: config => {\n
        \tconfig.resolve.alias.set('hd-blocks', 'homeday-blocks/src');\n
        }
        `
      }}</vue-code-highlight>
      3- Consume the components
      <vue-code-highlight class="welcome__code">{{
        `import HdGallery from 'hd-blocks/components/HdGallery.vue';`
      }}</vue-code-highlight>
    </p>

    <h3 class="welcome__subtitle">How to use our storybook?</h3>
    <div class="welcome__paragraph">
      <h4>You don't have to check all the tabs to see if something is available. We use some suffixes in the story's title:</h4>
      <div class="text-small margin-top-s margin-left-m">
        <p>🎛 : Check the knobs tab to play around with the component's props</p>
        <p>📝 : Check the notes tab for more information about the component, how to use it or code snippets</p>
      </div>
    </div>

    <h3 class="welcome__subtitle">Contributing :)</h3>
    <p class="welcome__paragraph">Check out our <a class="link" href="https://github.com/homeday-de/homeday-blocks">Github repository</a> for more details.</p>
  </div>
</template>

<script>
import { component as VueCodeHighlight } from 'vue-code-highlight';

export default {
  name: 'Welcome',
  components: {
    VueCodeHighlight,
  },
};
</script>

<style lang="scss" scoped>
@import "~vue-code-highlight/themes/prism.css";

.welcome {
  padding-top: $stack-m;
  padding-bottom: $stack-l;

  &__title {
    display: inline-block;
    position: relative;
    font-size: 72px;
    line-height: 80px;
    font-weight: 900;
    color: $cello;
    margin-top: $stack-m;
    margin-bottom: $stack-m;

    &::before {
      content: '';
      display: inline-block;
      position: absolute;
      bottom: 0;
      left: 0;
      width: calc(100% + 3px);
      height: 40%;
      background: rgba(24,149,255, .25);
      z-index: -1;
    }
  }

  &__subtitle {
    @include font('title');
    margin-top: $stack-l;
  }

  &__paragraph {
    margin-top: $stack-m;
  }

  &__code {
    font-size: 14px;

    ::v-deep pre {
      background-color: $wild-sand;
    }
  }
}
</style>
