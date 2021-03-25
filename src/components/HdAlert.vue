<template>
  <div
    class="alert"
    :class="{
      [`alert--${type}`]: true,
      'alert--no-icon': noIcon,
    }"
  >
    <HdIcon
      v-if="!noIcon"
      :src="iconSrc"
      class="alert__icon"
    />
    <div
      class="alert__message"
    >
      <slot />
    </div>
  </div>
</template>

<script>
import HdIcon from 'homeday-blocks/src/components/HdIcon.vue';
import {
  checkCircle as successIcon,
  info as infoIcon,
  warning as warningIcon,
  error as errorIcon,
} from 'homeday-assets';

// The first item is the default
export const TYPES = {
  info: {
    icon: infoIcon,
  },
  success: {
    icon: successIcon,
  },
  warning: {
    icon: warningIcon,
  },
  error: {
    icon: errorIcon,
  },
};

export default {
  name: 'HdAlert',
  components: {
    HdIcon,
  },
  props: {
    type: {
      type: String,
      default: Object.keys(TYPES)[0],
      validator(type) {
        return TYPES[type] !== undefined;
      },
    },
    icon: {
      type: String,
      default: '',
    },
    noIcon: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    iconSrc() {
      return this.icon || TYPES[this.type].icon;
    },
  },
};
</script>

<style lang="scss" scoped>
@import 'homeday-blocks/src/styles/mixins.scss';

.alert {
  $root: &;
  display: flex;
  padding: $inset-s;
  @include font('text-small');
  border-width: 1px;
  border-style: solid;
  border-radius: 3px;

  &--success {
    border-color: $success-color;
    color: $success-color;
    background-color: rgba($success-color, .07);
  }

  &--info {
    border-color: getShade($quaternary-color, 60);
    color: $quaternary-color;
  }

  &--warning {
    border-color: $tertiary-color;
    color: $tertiary-color;
    background-color: getShade($tertiary-color, 60);
  }

  &--error {
    border-color: $error-color;
    color: $error-color;
    background-color: rgba($error-color, .07);
  }

  &--no-icon {
    padding: $stack-s $inline-m;
  }

  &__icon {
    width: 24px;
    align-self: flex-start;
    flex-shrink: 0;
    margin-top: $stack-xxs;
    margin-right: $inline-s;

    ::v-deep path {
      #{$root}--success & {
        fill: $success-color;
      }
      #{$root}--info & {
        fill: $secondary-color;
      }
      #{$root}--warning & {
        fill: $tertiary-color;
      }
      #{$root}--error & {
        fill: $error-color;
      }
    }
  }
}
</style>
