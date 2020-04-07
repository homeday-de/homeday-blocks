<template>
  <div
    :class="{
      'notifications-bar': true,
      [`notifications-bar--${type}`]: true,
      isVisible: visible,
      isCompact: compact,
    }"
  >
    <div class="notifications-bar__icon">
      <HdIcon
        :src="icon"
        class="notifications-bar__icon__image"
      />
    </div>
    <div class="notifications-bar__content">
      <slot>
        {{ message }}
      </slot>
    </div>
  </div>
</template>

<script>
import HdIcon from 'homeday-blocks/src/components/HdIcon.vue';
import {
  verifiedIcon,
  reportIcon,
  warningIcon,
  bellIcon,
} from 'homeday-blocks/src/assets/small-icons';

export default {
  name: 'HdNotificationsBar',
  components: {
    HdIcon,
  },
  props: {
    type: {
      type: String,
      default: 'notification',
      validator(type) {
        const allowedTypes = [
          'notification',
          'success',
          'error',
          'warning',
        ];

        return allowedTypes.some(allowedType => allowedType === type);
      },
    },
    message: {
      type: String,
      default: '',
    },
    visible: {
      type: Boolean,
      default: true,
    },
    customIcon: {
      type: String,
      default: '',
    },
    compact: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    icon() {
      if (this.customIcon) {
        return this.customIcon;
      }

      if (this.type === 'success') {
        return verifiedIcon;
      }

      if (this.type === 'error') {
        return reportIcon;
      }

      if (this.type === 'warning') {
        return warningIcon;
      }

      return bellIcon;
    },
  },
};
</script>

<style lang="scss">
@import 'homeday-blocks/src/styles/mixins.scss';

.notifications-bar {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  display: flex;
  justify-content: center;
  opacity: 0;
  padding: $stack-m $inline-s;
  transition: opacity ($time-s * 2) ease-in-out;
  z-index: 10;

  &.isVisible {
    opacity: 1;
  }

  &.isCompact {
    padding: $stack-s $inline-s;
  }

  &--enter-active,
  &--leave-active {
    transition: all ($time-s * 2) ease-in-out;
  }

  &--enter,
  &--leave-to {
    transform: translateY(-100%);
  }

  &--notification {
    background-color: $tertiary-color;
    color: $white;
  }

  &--success {
    background-color:$success-color;
    color: $white;
  }

  &--error {
    background-color:#E00016;
    color: $white;
  }

  &--warning {
    background-color:#FFAB00;
    color: $primary-color;
  }

  &__icon {
    align-items: center;
    display: flex;
    height: 24px;
    justify-content: center;
    margin-right: $inline-s;
    width: 24px;

    path {
      fill: currentColor;
    }
  }

  &__content {
    font-size: 14px;
    font-weight: 600;
    line-height: 24px;

    @media (min-width: $break-tablet) {
      font-size: 18px;
    }
  }
}
</style>
