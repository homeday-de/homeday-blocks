<template>
  <div
    :class="{
      'notifications-bar': true,
      [`notifications-bar--${type}`]: true,
      isVisible: visible,
    }"
    :style="{
      'top': `${offsetTop}px`,
      'left': `${offsetLeft}px`,
    }"
  >
    <div class="notifications-bar__icon">
      <img
        :alt="`type-${icon}`"
        :src="icon"
        class="notifications-bar__icon__image"
      >
    </div>
    <div
      class="notifications-bar__message"
      v-html="message"
    />
  </div>
</template>

<script>
export default {
  name: 'HdNotificationsBar',
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
    offsetTop: {
      type: Number,
      default: 0,
    },
    offsetLeft: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    icon() {
      if (this.customIcon) {
        return this.customIcon;
      }

      /* eslint-disable global-require */
      if (this.type === 'success') {
        return require('hd-blocks/assets/icons/ic_shield-checkmark.svg');
      }

      if (this.type === 'error') {
        return require('hd-blocks/assets/icons/ic_alert-octagon.svg');
      }

      if (this.type === 'warning') {
        return require('hd-blocks/assets/icons/ic_alert-triangle.svg');
      }

      return require('hd-blocks/assets/icons/ic_bell.svg');
      /* eslint-enable global-require */
    },
  },
};
</script>

<style lang="scss">
@import 'hd-blocks/styles/mixins.scss';

.notifications-bar {
  display: flex;
  position: fixed;
  right: 0;
  justify-content: center;
  opacity: 0;
  padding: $stack-m $inline-s;
  transition: opacity ($time-s * 2) ease-in-out;
  z-index: 10;

  &.isVisible {
    opacity: 1;
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
    background-color: $crusta;
    color: $white;

    a {
      color: $white;
    }
  }

  &--success {
    background-color:#63B65B;
    color: $white;

    a {
      color: $white;
    }
  }

  &--error {
    background-color:#E00016;
    color: $white;

    a {
      color: $white;
    }
  }

  &--warning {
    background-color:#FFAB00;
    color: $cello;

    a {
      color: $cello;
    }
  }

  &__icon {
    align-items: center;
    display: flex;
    height: 24px;
    justify-content: center;
    margin-right: $inline-s;
    width: 24px;
  }

  &__message {
    font-size: 14px;
    font-weight: 600;
    line-height: 24px;

    @media (min-width: $break-tablet) {
      font-size: 18px;
    }
  }
}
</style>
