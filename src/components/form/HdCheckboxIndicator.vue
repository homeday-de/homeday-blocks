<template>
  <div
    class="checkbox-indicator"
    :class="{
      ['checkbox-indicator--selected']: checked,
      ['checkbox-indicator--disabled']: disabled,
      ['checkbox-indicator--invalid']: invalid,
      ['checkbox-indicator--indeterminate']: indeterminate,
    }"
  >
    <div class="checkbox-indicator__box">
      <HdIcon v-if="statusIcon" :src="statusIcon" class="checkbox-indicator__icon" />
    </div>
  </div>
</template>

<script>
import HdIcon from 'homeday-blocks/src/components/HdIcon.vue';
import { check as checkIcon, minus as minusIcon } from 'homeday-assets';

export default {
  name: 'HdCheckboxIndicator',
  components: {
    HdIcon,
  },
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
    indeterminate: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    statusIcon() {
      if (this.indeterminate) return minusIcon;
      if (this.checked) return checkIcon;
      return null;
    },
  },
};
</script>

<style lang="scss">
@import "homeday-blocks/src/styles/mixins.scss";

.checkbox-indicator {
  position: relative;
  border-radius: 50%;
  transition: box-shadow ease-in-out $time-s;

  &:hover,
  &:active,
  &:focus {
    box-shadow: 0 0 0 7px getShade($secondary-color, 90);
  }
}

.checkbox-indicator--invalid {
  &:hover,
  &:active,
  &:focus {
    box-shadow: 0 0 0 7px rgba($error-color, 0.15);
  }
}

.checkbox-indicator--selected,
.checkbox-indicator--indeterminate {
  &:hover,
  &:active,
  &:focus {
    box-shadow: 0 0 0 7px rgba(getShade($secondary-color, 110), 0.15);
  }
}

.checkbox-indicator--disabled {
  &:hover,
  &:active,
  &:focus {
    box-shadow: none;
  }
}

.checkbox-indicator__box {
  position: relative;
  cursor: pointer;
  width: 20px;
  height: 20px;
  max-width: 20px;

  border-radius: 2px;
  border: 2px solid $neutral-gray;

  outline-width: 0;
  overflow: hidden;

  transition: background ease $time-s;
}

.checkbox-indicator--invalid > .checkbox-indicator__box {
  border-color: $error-color;
}

.checkbox-indicator--selected > .checkbox-indicator__box,
.checkbox-indicator--indeterminate > .checkbox-indicator__box {
  border-width: 0;
  background-color: getShade($secondary-color, 110);
}

.checkbox-indicator--disabled > .checkbox-indicator__box {
  cursor: not-allowed;
  border-color: getShade($neutral-gray, 70);
}

.checkbox-indicator--disabled.checkbox-indicator--selected > .checkbox-indicator__box,
.checkbox-indicator--disabled.checkbox-indicator--indeterminate> .checkbox-indicator__box {
  border-width: 2px;
  border-color: getShade($neutral-gray, 70);
  background-color: transparent;
}

.checkbox-indicator__icon {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transition: opacity 0.2s;
}

.checkbox-indicator__icon path {
  fill: $white;
}

.checkbox-indicator--disabled .checkbox-indicator__icon path {
  fill: getShade($quaternary-color, 70);
  top: 1px;
  left: 1px;
  width: 90%;
  height: 90%;
}
</style>
