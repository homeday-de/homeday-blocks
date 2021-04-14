<template>
  <FieldBase
    v-bind="$attrs"
    :name="name"
    :label="label"
    :error="error"
    :helper="helper"
    :active="isActive"
    :disabled="disabled"
    minimized-label
    grouped
    #default="{ labelId }"
  >
    <div
      @keydown="setUsingMouse(false)"
      @mousedown="setUsingMouse(true)"
      class="checkbox"
      :class="{
        ['checkbox--active']: isActive,
        ['checkbox--disabled']: disabled,
        ['checkbox--checked']: isChecked,
        ['checkbox--indeterminate']: boundIndeterminate,
        ['checkout--use-mouse']: isUsingMouse,
      }"
      :key="name+error+isChecked"
    >
      <input
        class="checkbox__input"
        type="checkbox"
        :name="name"
        :disabled="disabled"
        v-model="isChecked"/>
      <div
        :ref="name"
        :aria-checked="isChecked"
        :aria-labelledby="labelId"
        :tabindex="disabled ? -1 : 0"
        class="checkbox__inner"
        role="checkbox"
        @click="toggle"
        @keydown.space.enter.prevent="toggle"
        @focus="handleFocus"
        @blur="handleBlur"
      >
        <div class="checkbox__circle">
          <div class="checkbox__box">
            <div class="checkbox__overlay"></div>
            <div class="checkbox__border"></div>
            <HdIcon
              v-if="statusIcon"
              :src="statusIcon"
              class="checkbox__icon"
            />
          </div>
        </div>

        <p
          v-if="innerLabel"
          v-html="innerLabel"
          class="checkbox__description"
        />
      </div>
    </div>
  </FieldBase>
</template>

<script>
import merge from 'lodash/merge';
import { getMessages } from 'homeday-blocks/src/lang';
import HdIcon from 'homeday-blocks/src/components/HdIcon.vue';
import { check as checkIcon, minus as minusIcon } from 'homeday-assets';
import formField from './formFieldMixin';
import FieldBase from './FieldBase.vue';

export default {
  name: 'HdCheckbox',
  mixins: [
    formField,
  ],
  components: {
    FieldBase,
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
      helper: null,
      boundIndeterminate: this.indeterminate,
    };
  },
  computed: {
    t() {
      return merge(getMessages(this.lang), this.texts);
    },
    isChecked: {
      get() {
        return this.value;
      },
      set() {
        this.toggle();
      },
    },
    statusIcon() {
      if (this.boundIndeterminate) return minusIcon;
      if (this.isChecked) return checkIcon;
      return null;
    },
  },
  methods: {
    toggle() {
      this.$emit('input', !this.isChecked);
      this.$nextTick(() => {
        this.validate();
        const element = this.$refs[this.name];
        if (element) element.focus();
      });
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
  watch: {
    isChecked() {
      if (this.boundIndeterminate) {
        this.boundIndeterminate = false;
      }
    },
    indeterminate(newIndeterminate) {
      this.boundIndeterminate = newIndeterminate;
    },
  },
};
</script>

<style lang="scss" scoped>
@import 'homeday-blocks/src/styles/mixins.scss';

.field {
  margin-bottom: $sp-m;
}

.field--errored {
  .checkbox {
    &:hover, &:focus, &.checkbox--active {
      .checkbox__circle {
        transition: ease-in $time-s;
        box-shadow: 0 0 0 7px rgba($error-color, 0.15);
      }
    }
    &__border {
      border-color: $error-color;
    }
  }
}

.checkbox {
  $c: &;
  position: relative;
  cursor: default;

  &:hover, &:focus, &.checkbox--active {
    outline: 0;

    .checkbox__circle {
      transition: ease-in 0.1s;
      border-radius: 100%;
      box-shadow: 0 0 0 7px rgba(getShade($dodger-blue, 110), 0.15);
    }
  }

  &__overlay {
    display: block;
    position: absolute;
    top:0; left:0;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    transform: scale(0);
    opacity: 0;
    transition: transform .3s, opacity .2s;
    .checkbox--checked & {
      background-color: getShade($secondary-color, 110);
      transform: scale(1.3);
      opacity: 1;
    }
    #{$c}--disabled & {
      background-color: transparent;
    }
  }

  &--disabled {
    pointer-events: none;
    color: getShade($quaternary-color, 70);

    .checkbox__border {
      border-color: getShade($quaternary-color, 70);
    }
    .checkout__icon::v-deep path {
      fill: getShade($quaternary-color, 70);
    }
  }

  &--indeterminate {
    .checkbox__overlay {
      background-color: getShade($secondary-color, 110);
      transform: scale(1.3);
      opacity: 1;
    }
    &.checkbox--disabled {
      .checkbox__overlay {
        background-color: transparent;
      }
    }
    .checkout__icon::v-deep path {
      fill: getShade($quaternary-color, 70);
    }
  }

  &__input {
    display: none;
  }

  &__description {
    flex: 1;
    margin: 0 0 0 $sp-s;
    text-align: left;
    @include font('text-small');
  }

  &__icon {
    position: absolute;
    top:0;
    left:0;
    width: 100%;
    height: 100%;
    opacity: 0;
    transition: opacity .2s;
    #{$c}.checkbox--checked &, #{$c}.checkbox--indeterminate & {
      opacity: 1;
    }
    #{$c}--disabled & {
      top:1px;
      left:1px;
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

  &__box {
    position: relative;
    flex: 0 0 20px;
    width: 20px;
    height: 20px;
    cursor: pointer;
    border-radius: 3px;
    overflow: hidden;
    outline-width: 0;
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

    #{$c}:not(#{$c}--disabled).checkbox--checked &, #{$c}:not(#{$c}--disabled).checkbox--indeterminate & {
      border-color: transparent;
    }
  }

  &__use-mouse {
    outline: 0;
  }

  &__inner {
    display: flex;
    align-items: center;
    transition: outline 0.1s ease-in-out;

    &:focus {
      outline: 0;
    }
  }
  &__error {
    @include font('text-xxsmall');
    position: absolute;
    top: calc(100% + #{$sp-xs});
    margin-left: $sp-m;
    color: $error-color;
    display: none;
  }
  &__label {
    display: block;
    flex: 1;
    margin: 0 0 0 $sp-s;

    text-align: left;
    font-size: 14px;
    line-height: 18px;
    color: $quaternary-color;
    transition: color 0.3s cubic-bezier(0.250, 0.460, 0.450, 0.940);
    pointer-events: none;
  }
}
</style>
