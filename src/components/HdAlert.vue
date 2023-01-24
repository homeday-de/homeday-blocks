<template>
  <div
    class="alert"
    :class="{
      [`alert--${type}`]: true,
      'alert--no-icon': noIcon,
    }"
  >
    <HdIcon v-if="!noIcon" :src="iconSrc" class="alert__icon" />
    <div class="alert__message">
      <slot />
    </div>
  </div>
</template>

<script>
import HdIcon from 'homeday-blocks/src/components/HdIcon.vue';
import TYPES from 'homeday-blocks/src/components/HdAlertTypes';

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

<style lang="scss">
@import 'homeday-blocks/src/styles/mixins.scss';

.alert {
  $root: &;
  display: flex;
  padding: $sp-s;
  @include font('DS-150');
  border-width: 1px;
  border-style: solid;
  border-radius: 3px;

  &--success {
    border-color: $success-color;
    color: $success-color;
    background-color: rgba($success-color, 0.07);

    #{$root}__icon {
      fill: $success-color;
    }
  }

  &--info {
    border-color: getShade($quaternary-color, 60);
    color: $quaternary-color;

    #{$root}__icon {
      fill: $secondary-color;
    }
  }

  &--warning {
    border-color: $tertiary-color;
    color: $tertiary-color;
    background-color: getShade($tertiary-color, 60);

    #{$root}__icon {
      fill: $tertiary-color;
    }
  }

  &--error {
    border-color: $error-color;
    color: $error-color;
    background-color: rgba($error-color, 0.07);

    #{$root}__icon {
      fill: $error-color;
    }
  }

  &--no-icon {
    padding: $sp-s $sp-m;
  }

  &__icon {
    width: 24px;
    align-self: flex-start;
    flex-shrink: 0;
    margin-top: $sp-xxs;
    margin-right: $sp-s;

    path {
      fill: currentColor;
    }
  }
}
</style>
