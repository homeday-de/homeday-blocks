<template>
  <div
    class="notifications-bar"
    :class="[`notifications-bar--${type}`]"
  >
    <HdIcon
      :src="icon"
      class="notifications-bar__icon"
    />
    <div
      class="notifications-bar__content"
      :class="{
        'notifications-bar__content--centered': centered
      }"
    >
      <slot>
        {{ message }}
      </slot>
    </div>
  </div>
</template>

<script>
import HdIcon from 'homeday-blocks/src/components/HdIcon.vue';
import {
  errorIcon,
  bellIcon,
  infoIcon,
  checkCircleIcon,
} from 'homeday-blocks/src/assets/small-icons';

export const TYPES = {
  ERROR: 'error',
  NOTIFICATION: 'notification',
  INFO: 'info',
  SUCCESS: 'success',
};

export default {
  name: 'HdNotificationsBar',
  inheritAttrs: false,
  components: {
    HdIcon,
  },
  props: {
    type: {
      type: String,
      default: TYPES.NOTIFICATION,
      validator: type => Object.values(TYPES).includes(type),
    },
    message: {
      type: String,
      default: '',
    },
    centered: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    icon() {
      return {
        [TYPES.ERROR]: errorIcon,
        [TYPES.NOTIFICATION]: bellIcon,
        [TYPES.INFO]: infoIcon,
        [TYPES.SUCCESS]: checkCircleIcon,
      }[this.type];
    },
  },
};
</script>

<style lang="scss">
@import 'homeday-blocks/src/styles/mixins.scss';

.notifications-bar {
  display: flex;
  padding: $stack-m $inline-s;
  color: $white;

  &--notification {
    background-color: $crusta-orange;
  }

  &--success {
    background-color: $success-color;
  }

  &--error {
    background-color: $monza-red;
  }

  &--info {
    background-color: getShade($cello-blue, 80);
  }

  &__icon {
    width: 24px;
    height: 24px;
    min-width: 24px;
    min-height: 24px;
    margin-right: $inline-s;

    path {
      fill: currentColor;
    }
  }

  &__content {
    flex: 1;
    font-size: 16px;
    font-weight: 600;
    line-height: 24px;

    &--centered {
      text-align: center;
    }
  }
}
</style>
