<template>
  <button
    class="arrowButton"
    :class="computedClasses"
  />
</template>

<script>
export default {
  name: 'HdArrowButton',
  props: {
    direction: {
      type: String,
      defalt: 'right',
      validator: direction => ['right', 'left'].indexOf(direction) !== -1,
    },
    isDisabled: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    computedClasses() {
      return {
        'arrowButton--isDisabled': this.isDisabled,
        [`arrowButton--${this.direction}`]: true,
      };
    },
  },
};
</script>

<style lang="scss">
.arrowButton {
  border: none;
  width: 16px;
  height: 16px;
  cursor: pointer;
  z-index: 2;

  @media (min-width: $break-mobile) {
    display: block;
    width: 24px;
    height: 24px;
  }
  &--isDisabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
  &--left {
    background: url('~assets/icons/ic_arrow_backwards--idle-24px.svg') no-repeat center;
  }
  &--right {
    background: url('~assets/icons/ic_arrow_forward--idle-24px.svg') no-repeat center;
  }
}
</style>
