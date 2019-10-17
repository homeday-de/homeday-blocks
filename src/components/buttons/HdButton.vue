<template>
  <button :class="computedClasses">
    {{ text }}
  </button>
</template>

<script>
import { ALL, TYPES } from 'hd-blocks/components/buttons/TYPES';

export default {
  name: 'HdButton',
  props: {
    text: {
      required: true,
    },
    modifier: {
      type: String,
      default: TYPES.DEFAULT,
      validator(value) {
        return ALL.includes(value);
      },
    },
  },
  computed: {
    computedClasses() {
      const baseClass = 'btn';
      const classes = [baseClass];

      if (this.modifier) {
        classes.push(`${baseClass}--${this.modifier}`);
      }

      return classes;
    },
  },
};
</script>

<style lang="scss" scoped>
.btn {
  width: 100%;
}
</style>
