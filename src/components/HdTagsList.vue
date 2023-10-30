<template>
  <section class="tags-list" :class="customClasses">
    <div v-for="item in items" :key="item" class="tags-list__tag">
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
    modifier: {
      type: String,
      default: 'primary',
    },
  },
  computed: {
    customClasses() {
      return [`tags-list--${this.modifier}`];
    },
  },
};
</script>

<style lang="scss">
@import 'homeday-blocks/src/styles/mixins.scss';

.tags-list {
  $root: &;
  display: flex;
  flex-wrap: wrap;
  min-height: #{$sp-l + $sp-s};
  margin-bottom: $sp-m;

  &__tag {
    display: flex;
    align-items: center;
    padding: 0 $sp-s;
    margin: $sp-s $sp-s 0 0;
  }

  &--primary {
    #{$root}__tag {
      height: $sp-l;
      background-color: getShade($quaternary-color, 50);
      border-radius: 3px;
    }
  }
  &--secondary {
    #{$root}__tag {
      height: $sp-m;
      background-color: $cello-blue;
      border-radius: 12px;
      color: $white;
      font-weight: 600;
      font-size: 10px;
      line-height: 17px;
    }
  }
}
</style>
