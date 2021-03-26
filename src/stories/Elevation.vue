<template>
  <section class="elevation-story">
    <h1>Elevation</h1>

    <h3>Usage:</h3>
    The available elevation levels are from <b>0</b> to <b>{{ numberOfLevels - 1 }}</b>.<br>
    Elevation can  be used either with classes:
    <VueCodeHighlight class="elevation-story__code">{{
      codeExampleClasses
    }}</VueCodeHighlight>

    Or with the sass mixin:
    <VueCodeHighlight
      language="css"
      class="elevation-story__code"
    >{{
      codeExampleMixin
    }}</VueCodeHighlight>

    <h3>The elevation levels:</h3>
    <div class="elevated-blocks">
      <div
        v-for="i in numberOfLevels"
        :key="i-1"
        :class="['elevated-block', `elevation-${i-1}`]"
      >
        <p class="elevated-block__label">Level {{ i-1 }}</p>
      </div>
    </div>
  </section>
</template>

<script>
// eslint-disable-next-line import/no-extraneous-dependencies
import { component as VueCodeHighlight } from 'vue-code-highlight';
import { numberOfLevels } from 'homeday-blocks/src/styles/_elevation.scss';

export default {
  name: 'ElevationStory',
  components: {
    VueCodeHighlight,
  },
  data() {
    return {
      numberOfLevels: Number(numberOfLevels),
      codeExampleClasses: '<div class="elevation-8">My elevated block</div>',
      codeExampleMixin: `@import '~homeday-blocks/src/styles/mixins.scss';

.my-elevated-block {
  @include elevation(8);
}`,
    };
  },
};
</script>
<style lang="scss" scoped>
@import '~homeday-blocks/src/styles/mixins.scss';
@import "~vue-code-highlight/themes/prism.css";

.elevation-story {
  max-width: 800px;
  margin-right: auto;
  margin-left: auto;

  > h1 {
    @include font('headline');
  }
  > h3 {
    @include font('title');
    margin-top: $stack-l;
  }

  &__code {
    font-size: 14px;

    ::v-deep pre {
      background-color: $secondary-bg;
    }
  }
}

.elevated-blocks {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: $sp-xl;
  padding: $sp-l;
}

.elevated-block {
  position: relative;
  background-color: getShade($quaternary-color, 40);
  width: 100%;
  padding-top: 100%;
  place-self: center;
  border-radius: 2px;

  &__label {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    @include font('text-xsmall');
  }
}
</style>
