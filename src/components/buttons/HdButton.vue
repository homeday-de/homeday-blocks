<template>
  <button
    v-on="$listeners"
    :class="computedClasses"
  >
    <slot />
  </button>
</template>

<script>
export const TYPES = {
  DEFAULT: '',
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  TERTIARY: 'tertiary',
  FLAT: 'flat',
  GHOST: 'ghost',
};

export default {
  name: 'HdButton',
  props: {
    modifier: {
      type: String,
      default: TYPES.DEFAULT,
      validator(value) {
        const allTypes = Object.values(TYPES);

        return allTypes.includes(value);
      },
    },
    isInDarkBackground: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    computedClasses() {
      const baseClass = 'btn';
      const classes = [baseClass];

      if (this.modifier) {
        classes.push(`${baseClass}--${this.modifier}`);
      }

      if (this.isInDarkBackground) {
        classes.push(`${baseClass}--dark-background`);
      }

      return classes;
    },
  },
};
</script>
