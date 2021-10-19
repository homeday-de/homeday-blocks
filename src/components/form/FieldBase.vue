<template>
  <div
    class="field"
    :class="{
      ['field--errored']: hasError,
      ['field--active']: active,
      ['field--filled']: filled,
      ['field--minimized-label']: minimizedLabel,
      ['field--disabled']: disabled,
      ['field--grouped']: grouped,
      ['field--unlabelled']: unlabelled,
    }"
  >
    <div
      v-if="icon"
      class="field__icon"
    >
      <HdIcon
        :src="icon"
        role="presentation"
      />
    </div>
    <div class="field__body">
      <div class="field__main">
        <slot v-bind="{ hasError, labelId }" />
        <label
          v-if="label"
          :for="name"
          :id="labelId"
          class="field__label"
        >
          {{ label }}
        </label>
        <div class="field__input-right">
          <slot name="input-right"/>
        </div>
        <div
          v-if="!grouped"
          class="field__border"
        />
      </div>
      <p
        class="field__helper"
        v-html="helperText"
      />
    </div>
  </div>
</template>

<script>
import HdIcon from 'homeday-blocks/src/components/HdIcon.vue';
import kebabCase from 'lodash/kebabCase';

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
    grouped: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    helperText() {
      // We default to an invisible character to keep the same element height
      // and avoid content shift
      return this.error || this.helper || '&#8205;';
    },
    hasError() {
      return Boolean(this.error);
    },
    unlabelled() {
      return this.label === '';
    },
    labelId() {
      return `${kebabCase(this.name.trim())}-label`;
    },
  },
};
</script>

<style scoped lang="scss">
@import 'homeday-blocks/src/styles/mixins.scss';

.field {
  $root: &;
  display: flex;
  align-items: flex-start;
  @include font("DS-100");

  &__icon {
    margin-top: $sp-m;
    margin-right: $sp-s;
    flex: 0 0 24px;

    #{$root}--disabled & {
      ::v-deep path {
        fill: getShade($quaternary-color, 70);
      }
    }
  }
  &__body {
    flex: 1;
    position: relative;

    #{$root}--grouped:not(#{$root}--unlabelled) & {
      padding-top: #{$sp-m + $sp-xs};
      margin-top: $sp-xs;
    }
  }
  &:not(#{$root}--grouped) &__main {
    position: relative;

    & > :first-child {
      width: 100%;
      background: $secondary-bg;
      border-radius: 4px 4px 0 0;
      &:not(textarea) {
        overflow: hidden;
      }
    }

    input, textarea, select {
      padding-top: $sp-l - $sp-s;
      padding-right: $sp-s;
      padding-bottom: $sp-s;
      padding-left: $sp-m;
      background: inherit;
      color: inherit;
      font-size: inherit;
      line-height: inherit;
      font-family: inherit;
      border: 0;
      outline: none;
      appearance: none;

      &::placeholder {
        color: getShade($quaternary-color, 60);
      }
    }
  }
  &__label {
    position: absolute;
    z-index: 2;
    top: $sp-m;
    left: $sp-m;
    transform-origin: left;
    transition: transform .3s, color .2s;
    pointer-events: none;

    #{$root}--grouped & {
      top: 0;
      left: 0;
    }
    #{$root}--errored & {
      color: $error-color;
    }

    @mixin minimized {
      transform: translateY(-50%) scale(0.75);
    }

    #{$root}--active &,
    #{$root}--filled &,
    #{$root}--minimized-label & {
      @include minimized;
    }
    // We are seperating this declaration from the block above
    // because non-webkit engines will ignore the whole block, e.g. Gecko
    input:-webkit-autofill + & {
      @include minimized;
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

    #{$root}:hover:not(#{$root}--errored):not(#{$root}--disabled) & {
      background-color: getShade($quaternary-color, 80);
    }

    #{$root}--errored & {
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
    top: $sp-m;
    right: $sp-m;
    pointer-events: none;

    > ::v-deep * {
      pointer-events: all;
    }
  }
  &__helper {
    width: 100%;
    color: getShade($quaternary-color, 80);
    @include font("DS-80");
    padding-right: $sp-m;
    padding-left: $sp-m;

    #{$root}--errored:not(#{$root}--active) & {
      color: $error-color;
    }
  }
}
</style>
