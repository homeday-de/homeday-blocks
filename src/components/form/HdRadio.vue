<template>
  <FieldBase
    v-bind="$attrs"
    :name="name"
    :error="error"
    :helper="helper"
    :active="isActive"
    :filled="isFilled"
    :disabled="disabled"
    minimized-label
    grouped
    #default="{ hasError }"
  >
    <div
      role="radiogroup"
      class="radio-wrapper"
      :class="{
        ['radio-wrapper--errored']: hasError,
        ['radio-wrapper--disabled']: disabled,
        ['radio-wrapper--vertical']: vertical,
      }"
    >
      <!-- eslint-disable vue/valid-v-on -->
      <div
        v-for="(item, i) in items"
        :key="`radio-${item.value}`"
        ref="items"
        :aria-checked="item.value === value ? 'true' : 'false'"
        :class="{
          'isSelected': item.value === value,
        }"
        :tabindex="getTabindex(item, i)"
        class="radio"
        @keydown.space.enter.prevent="radioSelect(item.value)"
        @keydown.exact="maybeRadioSelect"
        @click="radioSelect(item.value)"
        @focus="handleFocus"
        @blur="handleBlur"
      >
      <!-- eslint-enable vue/valid-v-on -->
        <input
          :id="getItemName(item)"
          :name="getItemName(item)"
          v-model="boundValue"
          :value="item.value"
          :disabled="disabled"
          class="radio__input"
          type="radio"
        />
        <div class="radio__circle"></div>
        <label
          :for="getItemName(item)"
          class="radio__label"
        >
          {{ item.label }}
        </label>
      </div>
    </div>
  </FieldBase>
</template>

<script>
import merge from 'lodash/merge';
import { getMessages } from 'homeday-blocks/src/lang';
import FieldBase from './FieldBase.vue';

export default {
  name: 'HdRadio',
  components: {
    FieldBase,
  },
  props: {
    name: {
      type: String,
      required: true,
    },
    items: {
      type: Array,
      default: () => [],
    },
    value: {
      type: [String, Number],
      default: '',
    },
    required: {
      type: Boolean,
      default: false,
    },
    vertical: {
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
  },
  data() {
    return {
      error: null,
      helper: null,
      isActive: false,
    };
  },
  computed: {
    t() {
      return merge(getMessages(this.lang), this.texts);
    },
    boundValue: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('input', value);
      },
    },
    isFilled() {
      return this.value !== null && this.value !== undefined && this.value !== '';
    },
  },
  watch: {
    value() {
      this.validate();
    },
  },
  methods: {
    getItemName({ value }) {
      return `${this.name}-${value}`;
    },
    getTabindex(item, index) {
      if (this.disabled === true) {
        return -1;
      }

      if (!this.value) {
        return index === 0
          ? 0
          : -1;
      }

      return item.value === this.value
        ? 0
        : -1;
    },
    radioSelect(value) {
      this.$emit('input', value);
    },
    maybeRadioSelect(e) {
      if (['ArrowDown', 'Down', 'ArrowRight', 'Right'].includes(e.key)) {
        if (!this.value) {
          this.$emit('input', this.items[0].value);
          this.$refs.items[0].focus();
          return;
        }

        const currentIndex = this.items.findIndex(item => item.value === this.value);

        if (currentIndex === -1 || currentIndex === this.items.length - 1) {
          this.$emit('input', this.items[0].value);
          this.$refs.items[0].focus();
          return;
        }

        this.$emit('input', this.items[currentIndex + 1].value);
        this.$refs.items[currentIndex + 1].focus();
      } else if (['ArrowUp', 'Up', 'ArrowLeft', 'Left'].includes(e.key)) {
        if (!this.value) {
          this.$emit('input', this.items[0].value);
          this.$refs.items[0].focus();
          return;
        }

        const currentIndex = this.items.findIndex(item => item.value === this.value);

        if (currentIndex === -1 || currentIndex === 0) {
          this.$emit('input', this.items[this.items.length - 1].value);
          this.$refs.items[this.items.length - 1].focus();
          return;
        }

        this.$emit('input', this.items[currentIndex - 1].value);
        this.$refs.items[currentIndex - 1].focus();
      }
    },
    handleFocus() {
      this.isActive = true;
    },
    handleBlur() {
      this.isActive = false;
      this.$nextTick(() => {
        if (!this.isActive) {
          this.validate();
        }
      });
    },
    showError(errorMessage) {
      this.error = errorMessage;
    },
    hideError() {
      console.log('hideError');
      this.error = null;
    },
    showHelper(helper) {
      this.helper = helper;
    },
    hideHelper() {
      console.log('hideError');
      this.helper = null;
    },
    validate() {
      console.log('validate');
      console.log('this.required', this.required);
      console.log('this.isFilled', this.isFilled);
      console.log('------');
      if (this.required && !this.isFilled) {
        this.showError(this.t.FORM.VALIDATION.REQUIRED);
      } else {
        this.hideError();
      }

      return !this.error;
    },
  },
};
</script>

<style lang="scss" scoped>
@import 'homeday-blocks/src/styles/mixins.scss';

.radio-wrapper--disabled {
  .isSelected {
    .radio {
      &__circle {
        border: 2px solid getShade($quaternary-color, 70);
        background-color: $white;
      }
    }
  }
}

.radio {
  $r: &;
  display: flex;
  align-items: center;
  position: relative;
  flex: 1;
  margin-left: $inline-m;
  transition: outline 0.1s ease-in-out;
  cursor: pointer;

  &:first-of-type {
    margin-left: 0;
  }

  .radio-wrapper--disabled & {
    pointer-events: none;
  }

  &__input {
    display: none;
  }
  &__circle {
    position: relative;
    flex: 0 0 20px;
    width: 20px;
    max-width: 20px;
    height: 20px;
    border-radius: 50%;
    overflow: hidden;
    outline-width: 0;
    border: 2px solid $quaternary-color;

    // Hover effect WITHOUT state
    &:hover, &:active, &:focus {
      transition: ease-in 0.1s;
      box-shadow: 0 0 1px 6px rgba(getShade($dodger-blue, 110), 0.15);
    }

    .radio-wrapper--disabled & {
      border-color: getShade($quaternary-color, 70);
    }

    &:before {
      content: '';
      display: block;
      position: absolute;
      top: 3px;
      left: 3px;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background-color: $white;
      transform: scale(0);
      opacity: 0;
      transition: transform .2s, opacity .2s;
    }

    #{$r}:hover & {
      border-color: getShade($quaternary-color, 80);
    }

    #{$r}:focus & {
      border-color: getShade($secondary-color, 110);
    }
  }
  &__label {
    flex: 1;
    padding-left: $inline-s;
    text-align: left;
    @include font('text-small');
    cursor: pointer;
  }
  &.isSelected {
    .radio__circle {
      border-color: getShade($secondary-color, 110);
      background-color: getShade($secondary-color, 110);
      &:before {
        transform: scale(1);
        opacity: 1;
      }
      .radio-wrapper--disabled & {
        border-color: getShade($quaternary-color, 70);
        background-color: $white;

        &:before {
          transform: scale(1);
          opacity: 1;
          background-color: getShade($quaternary-color, 70);
        }
      }
    }
  }
}

.radio-wrapper {
  $r: &;
  display: flex;
  flex-direction: row;
  flex: 1;
  position: relative;

    &--vertical {
    flex-direction: column;

    .radio {
      margin-left: 0;

      &:not(:first-child) {
        margin-top: $stack-m;
      }
    }
  }

  // Hover effect for error state
  &--errored {
    .radio {
      &__circle {
        &:hover {
          transition: ease-in 0.1s;
          box-shadow: 0 0 1px 6px rgba($error-color, 0.15);
        }
      }
    }

    .radio:not(:focus):not(#{$r}--disabled) .radio__circle {
      border-color: $error-color;
    }
  }

  &--active {
    .radio:not(:focus):not(#{$r}--disabled) .radio__circle {
      border-color: getShade($quaternary-color, 80);
    }
  }
}
</style>
