<template>
  <button
    class="arrowButton"
    autocomplete="off"
    :disabled="disabled"
    :class="computedClasses"
  />
</template>

<script>
export default {
  name: 'HdArrowButton',
  props: {
    direction: {
      type: String,
      default: 'right',
      validator: direction => ['right', 'left'].indexOf(direction) !== -1,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    computedClasses() {
      return `arrowButton--${this.direction}`;
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

  &--left {
    background: url('~homeday-blocks/src/assets/icons/ic_arrow_backwards--idle-24px.svg') no-repeat center;
  }

  &--right {
    background: url('~homeday-blocks/src/assets/icons/ic_arrow_forward--idle-24px.svg') no-repeat center;
  }
}
</style>
