<template>
  <section class="spacing-story">
    <h1>Spacing</h1>
    <h3>Usage:</h3>
    <p>Spacing values range from 2px to 64px:</p>
    <ul>
        <li>xxs - 2px</li>
        <li>xs - 4px</li>
        <li>s - 8px</li>
        <li>m - 16px</li>
        <li>l - 32px</li>
        <li>xl - 64px</li>
    </ul>
    <p>Spacing can be used with SASS variables.</p>
    <p>Spacing variables are composed of:
        <ul>
            <li>the position where we want to apply padding/margin (inset, inline, stack)</li>
            <li>the size of spacing (xxs - xl).</li>
        </ul>
    </p>
    <h3>Examples:</h3>
    <VueCodeHighlight language="css" class="spacing-story__code">{{ codeExample }}</VueCodeHighlight>
  </section>
</template>

<script>
// eslint-disable-next-line import/no-extraneous-dependencies
import { component as VueCodeHighlight } from 'vue-code-highlight';

export default {
  name: 'SpacingStory',
  components: {
    VueCodeHighlight,
  },
  data() {
    return {
      codeExample: `// use inset for uniform vertical and horizontal spacing (top, right,bottom, left)
padding: $sp-s;

// use stack for vertical spacing (top, bottom)
padding-left: $inline-s;

// use inline for horizontal spacing (left, right)
padding-top: $sp-s;`,
    };
  },
};
</script>
<style lang="scss" scoped>
@import '~homeday-blocks/src/styles/mixins.scss';

.spacing-story {
  max-width: 800px;
  margin-right: auto;
  margin-left: auto;

  > h1 {
    @include font('headline');
  }
  > h3 {
    @include font('title');
    margin-top: $sp-l;
  }

  > p {
      margin-top: $sp-m;
  }

  ul {
      margin-left: $inline-m;
      list-style: inside;
      list-style-type: disc;
  }

  &__code {
    font-size: 14px;
    ::v-deep pre {
      background-color: $secondary-bg;
    }
  }
}
</style>
