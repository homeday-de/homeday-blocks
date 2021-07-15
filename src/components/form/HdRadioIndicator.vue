<template>
  <div
    class="indicator"
    :class="{
      ['indicator--selected']: checked,
      ['indicator--disabled']: disabled,
      ['indicator--invalid']: invalid,
    }"
  ></div>
</template>

<script>
export default {
  name: 'HdRadioIndicator',
  props: {
    checked: {
      type: Boolean,
      required: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    invalid: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
@import "homeday-blocks/src/styles/mixins.scss";

.indicator {
  position: relative;
  cursor: pointer;
  width: 20px;
  height: 20px;
  max-width: 20px;

  border-radius: 50%;
  border: 2px solid $neutral-gray;

  outline-width: 0;
  overflow: hidden;

  transition: box-shadow ease-in-out $time-s;

  &:hover,
  &:active,
  &:focus {
    box-shadow: 0 0 0 7px getShade($secondary-color, 90);
  }

  &::before {
    content: "";

    position: absolute;
    top: 50%;
    left: 50%;
    width: 8px;
    height: 8px;
    border-radius: 50%;

    background-color: $white;

    opacity: 0;
    transform: scale(0) translate(-50%, -50%);
    transform-origin: top left;
    transition: transform $time-s, opacity $time-s;
  }
}

.indicator--invalid {
  border-color: $error-color;

  &:hover {
    box-shadow: 0 0 0 7px rgba($error-color, 0.15);
  }
}

.indicator--selected {
  border-color: getShade($secondary-color, 110);
  background-color: getShade($secondary-color, 110);

  &:hover,
  &:active,
  &:focus {
    box-shadow: 0 0 0 7px rgba(getShade($secondary-color, 110), 0.15);
  }

  &:before {
    transform: scale(1) translate(-50%, -50%);
    opacity: 1;
  }
}

.indicator--disabled {
  cursor: not-allowed;
  border-color: getShade($neutral-gray, 70);

  &:hover,
  &:active,
  &:focus {
    box-shadow: none;
  }
}

.indicator--disabled.indicator--selected {
  border-color: getShade($neutral-gray, 70);
  background-color: transparent;

  &:before {
    background-color: getShade($neutral-gray, 70);
  }
}
</style>
