<template>
  <div
    role="alert"
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
    <button
      v-if="closable"
      data-dismiss="alert"
      :aria-label="t.GENERAL.CLOSE"
      class="notification__close"
    >
      <HdIcon
        :src="closeIcon"
        class="notification__close__icon"
      />
    </button>
  </div>
</template>

<script>
import HdIcon from 'homeday-blocks/src/components/HdIcon.vue';
import { getMessages } from 'homeday-blocks/src/lang';

import {
  error as errorIcon,
  bell as bellIcon,
  info as infoIcon,
  close as closeIcon,
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
      validator: (type) => Object.values(TYPES).includes(type),
    },
    message: {
      type: String,
      default: '',
    },
    centered: {
      type: Boolean,
      default: false,
    },
    closable: {
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
    closeIcon() {
      return closeIcon;
    },
    t() {
      return getMessages(this.lang);
    },
  },
};
</script>

<style lang="scss">
@import 'homeday-blocks/src/styles/mixins.scss';

.notification {
  display: flex;
  padding: $sp-m $sp-s;
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
    margin-right: $sp-s;

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

  &__close {
    background-color: transparent;
    border: none;
    &__icon path {
      fill: $white;
    }

  }
}
</style>
