<template>
  <section class="tags-list">
    <div
      v-for="item in items"
      :key="item"
      class="tags-list__tag">
      {{ item }}
    </div>
  </section>
</template>

<script>
export default {
  name: 'HdTagsList',
  props: {
    // Array of strings
    items: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style lang="scss" scoped>
@import 'homeday-blocks/src/styles/mixins.scss';

.tags-list {
  display: flex;
  flex-wrap: wrap;
  min-height: #{$sp-l + $sp-s};
  margin-bottom: $sp-m;
  &__tag {
    display: flex;
    align-items: center;
    height: $sp-l;
    background-color: getShade($quaternary-color, 50);
    border-radius: 3px;
    padding: 0 $inline-s;
    margin: $sp-s $inline-s 0 0;
  }
}
</style>
