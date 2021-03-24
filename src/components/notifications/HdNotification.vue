<template>
  <div
    class="notification"
    :class="[`notification--${type}`]"
  >
    <HdIcon
      :src="icon"
      class="notification__icon"
    />
    <div
      class="notification__content"
      :class="{
        'notification__content--centered': centered
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
  error as errorIcon,
  bell as bellIcon,
  info as infoIcon,
  checkCircle as checkCircleIcon,
} from 'homeday-assets';

export const TYPES = {
  ERROR: 'error',
  NOTIFICATION: 'notification',
  INFO: 'info',
  SUCCESS: 'success',
};

export default {
  name: 'HdNotification',
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

.notification {
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
