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
@import 'hd-blocks/styles/mixins.scss';

.tags-list {
  display: flex;
  flex-wrap: wrap;
  min-height: #{$stack-l + $stack-s};
  margin-bottom: $stack-m;
  &__tag {
    display: flex;
    align-items: center;
    height: $stack-l;
    background-color: getShade($quaternary-color, 50);
    border-radius: 3px;
    padding: 0 $inline-s;
    margin: $stack-s $inline-s 0 0;
  }
}
</style>
