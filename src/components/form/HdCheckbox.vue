<template>
  <div
    :class="{
      'checkbox': true,
      'checkbox--active': isActive,
      'checkbox--disabled': disabled,
      'isChecked': isChecked,
      'hasError': !!error,
      'isUsingMouse': isUsingMouse,
      'checkbox--indeterminate': indeterminate,
    }"
    :key="error+isChecked"
    @keydown="setUsingMouse(false)"
    @mousedown="setUsingMouse(true)"
  >
    <label
      v-if="label"
      :id="`${name}--label`"
      class="checkbox__label"
      tabindex="-1"
    >{{ label }}</label>
    <input
      class="checkbox__input"
      type="checkbox"
      :name="name"
      :disabled="disabled"
      v-model="isChecked"/>
    <div
      :aria-checked="isChecked ? 'true' : 'false'"
      :aria-labelledby="label ? `${name}--label` : null"
      :tabindex="disabled ? -1 : 0"
      class="checkbox__inner"
      role="checkbox"
      @click="toggle"
      @keydown.space.enter.prevent="toggle"
      @focus="handleFocus"
      @blur="handleBlur"
    >
      <div class="checkbox__inner__box__shadow">
        <div class="checkbox__inner__box">
          <div class="checkbox__inner__box__overlay"></div>
          <div class="checkbox__inner__box__border"></div>
          <HdIcon
            :src="checkIcon"
            class="checkbox__inner__box__tick"
          />
        </div>
      </div>
      <p
        v-if="innerLabel"
        v-html="innerLabel"
        class="checkbox__inner__label"
      />
    </div>
    <p
      v-if="error"
      class="field__error checkbox__error"
    >
      {{ error }}
    </p>
  </div>
</template>

<script>
import merge from 'lodash/merge';
import { getMessages } from 'homeday-blocks/src/lang';
import HdIcon from 'homeday-blocks/src/components/HdIcon.vue';
import { checkIcon } from 'homeday-blocks/src/assets/small-icons';

export default {
  name: 'HdCheckbox',
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
    innerLabel: {
      type: String,
      default: '',
    },
    value: {
      type: Boolean,
      default: false,
    },
    required: {
      type: Boolean,
      default: false,
    },
    lang: {
      type: String,
      default: 'de',
    },
    texts: {
      type: Object,
      default: () => ({}),
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    indeterminate: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      error: null,
      isActive: false,
      isUsingMouse: false,
      checkIcon,
    };
  },
  computed: {
    t() {
      return merge(getMessages(this.lang), this.texts);
    },
    isChecked() {
      return this.value;
    },
  },
  methods: {
    toggle() {
      this.$emit('input', !this.isChecked);
      this.$nextTick(this.validate);
    },
    handleFocus() {
      this.isActive = true;
    },
    handleBlur() {
      this.isActive = false;
      this.validate();
    },
    validate() {
      if (this.required && !this.isChecked) {
        this.error = this.t.FORM.VALIDATION.REQUIRED;
      } else {
        this.error = null;
      }
      return !this.error;
    },
    setUsingMouse(usingMouse) {
      this.isUsingMouse = usingMouse;
    },
  },
};
</script>

<style lang="scss" scoped>
@import 'homeday-blocks/src/styles/mixins.scss';

.hasError {
  .checkbox {
    &__inner {
      &__box {
        &__shadow:hover {
          transition: ease-in 0.1s;
          border-radius: 100%;
          box-shadow: 0 0 1px 6px rgba($error-color, 0.15);
        }
      }
    }
  }
}

.checkbox {
  $c: &;
  position: relative;
  margin-bottom: 26px;
  cursor: default;

  &--disabled {
    pointer-events: none;
  }

  &--indeterminate {
    ::v-deep .checkbox__inner__box::before {
      content: '';
      display: block;
      background: getShade($quaternary-color, 80);
      width: 50%;
      height: 2px;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
  }

  &__input {
    display: none;
  }
  &__inner {
    display: flex;
    align-items: center;
    transition: outline 0.1s ease-in-out;
    #{$c}.isUsingMouse & {
      outline: 0;
    }
    &__box {
      position: relative;
      flex: 0 0 20px;
      width: 20px;
      height: 20px;
      cursor: pointer;
      border-radius: 3px;
      overflow: hidden;
      outline-width: 0;

      &__shadow {
        &:hover, &:active, &:focus {
          transition: ease-in 0.1s;
          border-radius: 100%;
          box-shadow: 0 0 1px 6px rgba(getShade($dodger-blue, 110), 0.15);
        }
      }

      &__overlay {
        display: block;
        position: absolute;
        top:0; left:0;
        width: 100%;
        height: 100%;
        background-color: getShade($secondary-color, 110);
        border-radius: 50%;
        transform: scale(0);
        opacity: 0;
        transition: transform .3s, opacity .2s;
        .isChecked & {
          transform: scale(1.3);
          opacity: 1;
        }
        #{$c}--disabled & {
          background-color: transparent;
        }
      }
      &__border {
        display: block;
        position: absolute;
        top:0; left:0;
        width: 100%;
        height: 100%;
        border-radius: 3px;
        border: 2px solid $quaternary-color;
        transition: border-color .3s;
        #{$c}:hover & {
          border-color: getShade($quaternary-color, 80);
        }
        #{$c}:not(#{$c}--disabled).isChecked & {
          border-color: transparent;
        }
        #{$c}:not(#{$c}--active).hasError & {
          border-color: $error-color;
        }
        #{$c}--active & {
          border-color: getShade($secondary-color, 110);
        }
        #{$c}--disabled & {
          border-color: getShade($quaternary-color, 70);
        }
      }
      &__tick {
        position: absolute;
        top:0; left:0;
        width: 100%;
        height: 100%;
        opacity: 0;
        transition: opacity .2s;
        #{$c}.isChecked & {
          opacity: 1;
        }
        #{$c}--disabled & {
          top:1px; left:1px;
          width: 90%;
          height: 90%;
          &::v-deep path {
            fill: getShade($quaternary-color, 70);
          }
        }

        &::v-deep path {
          fill: $white;
        }
      }
    }
    &__label {
      flex: 1;
      margin: 0 0 0 $inline-s;
      text-align: left;
      @include font('text-small');

      #{$c}--disabled & {
        color: getShade($quaternary-color, 70);
      }
    }
  }
  &__error {
    @include font('text-xxsmall');
    position: absolute;
    top: calc(100% + #{$inline-xs});
    margin-left: $inline-m;
    color: $error-color;
    display: none;

    #{$c}.hasError & {
      display: block;
    }

    #{$c}--active & {
      color: getShade($quaternary-color, 80);
    }
  }
  &__label {
    display: block;
    margin-bottom: 3px;
    font-size: 14px;
    line-height: 18px;
    color: $quaternary-color;
    transition: color 0.3s cubic-bezier(0.250, 0.460, 0.450, 0.940);
    pointer-events: none;

    #{$c}.hasError & {
      color: $error-color;
    }

    #{$c}:hover &,
    #{$c}--active &,
    #{$c}--active.hasError & {
      color: getShade($secondary-color, 110);
    }
  }
}
</style>
