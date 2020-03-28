<template>
  <button
    :class="{
      'arrowButton': true,
      [`arrowButton--${direction}`]: true,
    }"
    autocomplete="off"
    :disabled="disabled"
  >
    <HdIcon
      :src="chevronIcon"
      :transform="`rotate(${rotation})`"
      class="arrowButton__icon"
    />
  </button>
</template>

<script>
import HdIcon from 'homeday-blocks/src/components/HdIcon.vue';
import { chevronIcon } from 'homeday-blocks/src/assets/small-icons';

export default {
  name: 'HdArrowButton',
  components: {
    HdIcon,
  },
  props: {
    direction: {
      type: String,
      default: 'right',
      validator: direction => ['right', 'left'].includes(direction),
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      chevronIcon,
    };
  },
  computed: {
    rotation() {
      return this.direction === 'left' ? 180 : 0;
    },
  },
};
</script>

<style lang="scss">
@import 'homeday-blocks/src/styles/mixins.scss';

.arrowButton {
  border: none;
  width: 16px;
  height: 16px;
  background: transparent;
  padding: 0;
  cursor: pointer;
  z-index: 2;
  opacity: 0.8;

  @media (min-width: $break-mobile) {
    display: block;
    width: 24px;
    height: 24px;
  }

  &:hover {
    opacity: 1;
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  &__icon {
    width: 100%;
    height: 100%;

    path {
      fill: $quaternary-color;
    }
  }
}
</style>
