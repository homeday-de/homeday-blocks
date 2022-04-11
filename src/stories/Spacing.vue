<template>
  <section class="spacing-story">
    <h1 class="font-DS-400">Spacing</h1>
    <p>Spacing values range from 2px to 64px and all of them are defined as SASS variables.</p>
    <table class="spacing-table">
      <thead>
        <tr>
          <th>-</th>
          <th>Value</th>
          <th>Variable</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>XXS</td>
          <td>2px</td>
          <td>$sp-xxs</td>
        </tr>
        <tr>
          <td>XS</td>
          <td>4px</td>
          <td>$sp-xs</td>
        </tr>
        <tr>
          <td>S</td>
          <td>8px</td>
          <td>$sp-s</td>
        </tr>
        <tr>
          <td>M</td>
          <td>16px</td>
          <td>$sp-m</td>
        </tr>
        <tr>
          <td>L</td>
          <td>32px</td>
          <td>$sp-l</td>
        </tr>
        <tr>
          <td>XL</td>
          <td>64px</td>
          <td>$sp-xl</td>
        </tr>
      </tbody>
    </table>
    <h3 class="font-DS-200">Usage examples:</h3>
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
      codeExample: `padding: $sp-s $sp-l;

margin-bottom: $sp-xl;`,
    };
  },
};
</script>
<style lang="scss">
@import '~homeday-blocks/src/styles/mixins.scss';

.spacing-story {
  max-width: 800px;
  margin-right: auto;
  margin-left: auto;

  h3 {
    margin-top: $sp-l;
  }

  h1, h3 {
    font-weight: 900;
  }

  p {
    margin-top: $sp-m;
  }

  &__code {
    @include font('DS-100');

    pre {
      background-color: $secondary-bg;
    }
  }
}

.spacing-table {
  margin-top: $sp-m;

  th, td {
    padding: $sp-s $sp-l;
  }

  th, td, tr {
    border: 1px solid $quaternary-color;
  }

  th, td:nth-child(1) {
    text-align: center;
    font-weight: 600;
  }
}
</style>
