<template>
  <div
    class="alert"
    :class="{
      [`alert--${type}`]: true,
      'alert--no-icon': noIcon,
    }"
  >
    <img
      v-if="!noIcon"
      :src="iconSrc"
      class="alert__icon"
    >
    <p
      class="alert__message"
    >
      <slot />
    </p>
  </div>
</template>

<script>
import successIcon from 'hd-blocks/assets/icons/ic_success.svg';
import infoIcon from 'hd-blocks/assets/icons/ic_info.svg';
import warningIcon from 'hd-blocks/assets/icons/ic_warning.svg';
import errorIcon from 'hd-blocks/assets/icons/ic_error.svg';

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
@import 'hd-blocks/styles/mixins.scss';

.alert {
  display: flex;
  padding: $inset-s;
  @include font('text-small');
  border-width: 1px;
  border-style: solid;
  border-radius: 3px;

  &--success {
    border-color: $mantis;
    color: $mantis;
    background-color: rgba($mantis, .07);
  }

  &--info {
    border-color: $heather;
    color: $nevada;
  }

  &--warning {
    border-color: $crusta;
    color: $crusta;
    background-color: rgba($crusta, .07);
  }

  &--error {
    border-color: $torch-red;
    color: $torch-red;
    background-color: rgba($torch-red, .07);
  }

  &--no-icon {
    padding: $stack-s $inline-m;
  }

  &__icon {
    width: 24px;
    align-self: flex-start;
    margin-top: $stack-xxs;
    margin-right: $inline-s;
  }
}
</style>
