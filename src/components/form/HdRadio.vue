<template>
  <section
    :class="wrapperClasses"
    class="radio-wrapper"
    @keydown="setUsingMouse(false)"
    @mousedown="setUsingMouse(true)"
  >
    <label
      v-if="label"
      :id="`${name}--label`"
      class="radio-wrapper__label"
      tabindex="-1"
    >{{ label }}</label>
    <div
      :id="name"
      :aria-labelledby="label ? `${name}--label` : null"
      class="radio-wrapper__items"
      role="radiogroup"
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
        role="radio"
        @keydown.space.enter.prevent="radioSelect(item.value)"
        @keydown.exact="maybeRadioSelect"
        @click="radioSelect(item.value)"
        @focus="handleFocus"
        @blur="handleBlur"
      >
      <!-- eslint-enable vue/valid-v-on -->
        <input
          :name="name"
          :value="item.value"
          :checked="item.value === value"
          :disabled="disabled"
          class="radio__input"
          type="radio"
        />
        <div class="radio__circle"></div>
        <p class="radio__label">{{ item.label }}</p>
      </div>
    </div>
    <p
      v-if="error"
      class="field__error radio__error">{{ error }}
    </p>
  </section>
</template>

<script>
import merge from 'lodash/merge';
import { getMessages } from 'homeday-blocks/src/lang';

export default {
  name: 'HdRadio',
  props: {
    label: {
      type: String,
      default: '',
    },
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
      isActive: false,
      isUsingMouse: false,
    };
  },
  computed: {
    t() {
      return merge(getMessages(this.lang), this.texts);
    },
    isEmpty() {
      return this.value === null || this.value === undefined || this.value === '';
    },
    wrapperClasses() {
      return {
        'radio-wrapper--active': this.isActive,
        'radio-wrapper--vertical': this.vertical,
        'radio-wrapper--disabled': this.disabled,
        hasError: !!this.error,
        isUsingMouse: this.isUsingMouse,
      };
    },
  },
  watch: {
    value() {
      this.validate();
    },
  },
  methods: {
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
      this.error = null;
    },
    validate() {
      if (this.required && this.isEmpty) {
        this.showError(this.t.FORM.VALIDATION.REQUIRED);
      } else {
        this.hideError();
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
@import 'homeday-blocks/src/styles/inputs.scss';

.radio {
  $r: &;

  display: flex;
  align-items: center;
  position: relative;
  flex: 1;
  cursor: pointer;
  margin-left: $inline-m;
  transition: outline 0.1s ease-in-out;
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
    border: 2px solid $nevada;

    .radio-wrapper--disabled & {
      border-color: rgba($regent-gray, 0.8);
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
      background-color: $vivid-blue;
      transform: scale(0);
      opacity: 0;
      transition: transform .2s, opacity .2s;
    }

    #{$r}:hover & {
      border-color: $regent-gray;
    }

    #{$r}:focus & {
      border-color: $vivid-blue;
    }
  }
  &__label {
    flex: 1;
    margin: 0 0 0 $inline-s;
    text-align: left;
    @include font('text-small');

    .radio-wrapper--disabled & {
      color: rgba($regent-gray, 0.8);
    }
  }
  &.isSelected {
    .radio__circle {
      border-color: $vivid-blue;
      &:before {
        transform: scale(1);
        opacity: 1;
      }
    }
  }
  &__error {
    display: block;
  }
}

.radio-wrapper {
  $r: &;

  position: relative;
  margin-bottom: $labelHeight + $stack-s;

  &__label {
    display: block;
    margin-bottom: 3px;
    font-size: 14px;
    line-height: 18px;
    color: $nevada;
    transition: color 0.3s cubic-bezier(0.250, 0.460, 0.450, 0.940);
    pointer-events: none;

    #{$r}.hasError & {
      color: $torch-red;
    }

    #{$r}:not(#{$r}--disabled):hover &,
    #{$r}--active:not(#{$r}--disabled) &,
    #{$r}--active.hasError:not(#{$r}--disabled) & {
      color: $vivid-blue;
    }
  }

  &__items {
    display: flex;
    flex-direction: row;
    flex: 1;
  }

  &--vertical &__items {
    flex-direction: column;

    .radio {
      margin-left: 0;
    }
  }

  &.hasError &__items {

    .radio:not(:focus):not(#{$r}--disabled) .radio__circle {
      border-color: $torch-red;
    }
  }

  &--active.hasError {

    #{$r}__items {

      .radio:not(:focus):not(#{$r}--disabled) .radio__circle {
        border-color: $regent-gray;
      }
    }

    .radio__error {
      color: $regent-gray;
    }
  }

  &.isUsingMouse .radio {
    outline: 0;
  }
}
</style>
