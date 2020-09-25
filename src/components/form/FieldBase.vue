<template>
  <div
    class="x-field"
    :class="{
      ['x-field--error']: hasError,
      ['x-field--active']: active,
      ['x-field--filled']: filled,
      ['x-field--minimized-label']: minimizedLabel,
      ['x-field--disabled']: disabled,
    }"
  >
    <HdIcon
      v-if="icon"
      :src="icon"
      role="presentation"
      class="x-field__icon"
    />
    <div class="x-field__body">
      <div class="x-field__main">
        <slot />
        <label
          v-if="label"
          :for="name"
          class="x-field__label"
        >
          {{ label }}
        </label>
        <div class="x-field__input-right">
          <slot name="input-right"/>
        </div>
        <div class="x-field__border"/>
      </div>
      <p
        class="x-field__helper"
        v-html="helperText"
      />
    </div>
  </div>
</template>

<script>
import HdIcon from 'homeday-blocks/src/components/HdIcon.vue';

export default {
  name: 'FieldBase',
  components: {
    HdIcon,
  },
  props: {
    name: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      default: '',
    },
    icon: {
      type: String,
      default: '',
    },
    error: {
      type: String,
      default: '',
    },
    helper: {
      type: String,
      default: '',
    },
    active: {
      type: Boolean,
      default: false,
    },
    filled: {
      type: Boolean,
      default: false,
    },
    minimizedLabel: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    helperText() {
      return this.error || this.helper || '&#8205;';
    },
    hasError() {
      return Boolean(this.error);
    },
  },
};
</script>

<style scoped lang="scss">
@import 'homeday-blocks/src/styles/mixins.scss';
// @import 'homeday-blocks/src/styles/inputs.scss';

@mixin typography-regular {
  font-size: 16px;
  line-height: 24px;
}
@mixin typography-small {
  font-size: 12px;
  line-height: 16px;
}

.x-field {
  $root: &;
  display: flex;
  align-items: flex-start;
  @include typography-regular;

  &__icon {
    margin-top: $stack-m;
    margin-right: $inline-s;

    #{$root}--disabled & {
      ::v-deep path {
        fill: getShade($quaternary-color, 70);
      }
    }
  }
  &__body {
    flex: 1;
  }
  &__main {
    position: relative;

    & > :first-child {
      width: 100%;
      background: $secondary-bg;
      border-radius: 4px 4px 0 0;
      border: 0;
      padding-top: $stack-l - $stack-s;
      padding-right: $inline-s;
      padding-bottom: $stack-s;
      padding-left: $inline-m;
      color: inherit;
      font-size: inherit;
      line-height: inherit;
      font-family: inherit;
      outline: none;
      appearance: none;
    }
  }
  &__label {
    position: absolute;
    top: $stack-m;
    left: $inline-m;
    transform-origin: left;
    transition: transform .3s, color .2s;
    pointer-events: none;

    #{$root}--active &,
    #{$root}--filled &,
    #{$root}--minimized-label & {
      transform: translateY(-50%) scale(0.75);
    }
    #{$root}:hover:not(#{$root}--active) &,
    #{$root}--filled &,
    #{$root}--disabled & {
      color: getShade($quaternary-color, 80);
    }
    #{$root}--active & {
      color: getShade($secondary-color, 110);
    }
  }
  &__border {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 2px;
    background-color: getShade($quaternary-color, 60);

    #{$root}:hover:not(#{$root}--error):not(#{$root}--disabled) & {
      background-color: getShade($quaternary-color, 80);
    }

    #{$root}--error & {
      background-color: $error-color;
    }

    &::after {
      content: '';
      display: block;
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background-color: getShade($secondary-color, 110);
      transform: scaleX(0);
      opacity: .1;
      transition: transform .2s, opacity .2s;

      #{$root}--active & {
        transform: scaleX(1);
        opacity: 1;
      }
    }
  }
  &__input-right {
    position: absolute;
    top: $stack-m;
    right: $inline-m;
  }
  &__helper {
    width: 100%;
    color: getShade($quaternary-color, 80);
    @include typography-small;
    padding-right: $inline-m;
    padding-left: $inline-m;

    #{$root}--error:not(#{$root}--active) & {
      color: $error-color;
    }
  }
}
</style>
