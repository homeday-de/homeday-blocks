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
      default: TYPES.PRIMARY,
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
    isIconButton() {
      return this.$slots.default === undefined;
    },
    computedClasses() {
      const baseClass = 'btn';
      return [
        baseClass,
        {
          [`${baseClass}--${this.modifier}`]: this.modifier,
          [`${baseClass}--dark-background`]: this.isInDarkBackground,
          [`${baseClass}--icon-button`]: this.isIconButton,
        },
      ];
    },
  },
};
</script>

<style lang="scss">
@import 'homeday-blocks/src/styles/_variables.scss';

.btn {
  $root: &;

  &--icon-button {
    padding: $inset-s;
  }

  &__icon {
    margin-right: $inline-xs;

    #{$root}--icon-button & {
      width: 28px;
      height: 28px;
      margin-right: 0;
    }

    path {
      fill: currentColor;
    }
  }
}
</style>
