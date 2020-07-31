<template>
  <button
    v-on="$listeners"
    :class="computedClasses"
  >
    <HdIcon
      v-if="iconSrc"
      :src="iconSrc"
      class="btn__icon"
    />
    <slot />
  </button>
</template>

<script>
import HdIcon from 'homeday-blocks/src/components/HdIcon.vue';

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
  components: {
    HdIcon,
  },
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
    iconSrc: {
      type: String,
      default: '',
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

<style lang="scss">
@import 'homeday-blocks/src/styles/_variables.scss';

.btn__icon {
  margin-right: $inline-xs;

  path {
    fill: currentColor;
  }
}
</style>
