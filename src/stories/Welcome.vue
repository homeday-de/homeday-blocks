<template>
  <div class="welcome">
    <h1 class="welcome__title">Homeday-Blocks</h1>
    <p class="welcome__paragraph">A Vue component library built by Homeday's frontend team.</p>

    <h3 class="welcome__subtitle">Start using the library in 3 quick steps</h3>
    <p class="welcome__paragraph">
      1- Install the library:
      <vue-code-highlight class="welcome__code">{{
        'npm install homeday-de/homeday-blocks --save'
      }}</vue-code-highlight>
      2- Consume the components
      <vue-code-highlight class="welcome__code">{{
        "import { HdGallery } from 'homeday-blocks';"
      }}</vue-code-highlight>
      3- Import global css file
      <vue-code-highlight class="welcome__code">{{
        "import 'homeday-blocks/src/styles/main.scss';"
      }}</vue-code-highlight>
    </p>

    <h3 class="welcome__subtitle">How to use our storybook?</h3>
    <h4>
      You don't have to check all the tabs to see if something is available. We use some suffixes in
      the story's title:
    </h4>
    <div class="welcome__paragraph">
      <ul class="text-small margin-top-s margin-left-m">
        <li>🎛 : Check the knobs tab to play around with the component's props</li>
        <li>
          📝 : Check the notes tab for more information about the component, how to use it or code
          snippets
        </li>
      </ul>
    </div>
    <h3 class="welcome__subtitle">Contributing :)</h3>
    <p class="welcome__paragraph">
      Check out our
      <a class="link" href="https://github.com/homeday-de/homeday-blocks" target="_blank"
        >Github repository</a
      >
      for more details.
    </p>
  </div>
</template>

<script>
// eslint-disable-next-line import/no-extraneous-dependencies
import { component as VueCodeHighlight } from 'vue-code-highlight';

export default {
  name: 'WelcomeStory',
  components: {
    VueCodeHighlight,
  },
};
</script>

<style lang="scss" scoped>
@import '~homeday-blocks/src/styles/mixins.scss';
@import '~vue-code-highlight/themes/prism.css';

.welcome {
  padding-top: $sp-m;
  padding-bottom: $sp-l;

  &__title {
    display: inline-block;
    position: relative;
    font-size: 72px;
    line-height: 80px;
    font-weight: 900;
    color: $primary-color;
    margin-top: $sp-m;
    margin-bottom: $sp-m;

    &::before {
      content: '';
      display: inline-block;
      position: absolute;
      bottom: 0;
      left: 0;
      width: calc(100% + 3px);
      height: 40%;
      background: getShade($secondary-color, 80);
      z-index: -1;
    }
  }

  &__subtitle {
    @include font('DS-200');
    font-weight: 900;
    margin-top: $sp-l;
  }

  &__paragraph {
    margin-top: $sp-m;
  }

  &__code {
    font-size: 14px;

    ::v-deep pre {
      background-color: $secondary-bg;
    }
  }
}
</style>
