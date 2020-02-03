<template>
  <div
    :class="fieldClasses"
    class="field field--textarea">
    <img
      v-if="icon"
      :src="icon"
      role="presentation"
      class="field__icon"
    >
    <textarea
      ref="input"
      :autocomplete="autocomplete"
      :value="value"
      :id="name"
      :name="name"
      :placeholder="placeholderAttr"
      :required="required"
      :autofocus="autofocus"
      :style="{ height }"
      :disabled="disabled"
      class="field__input"
      @focus="handleFocus"
      @blur="handleBlur"
      @input="handleInput"
    />
    <label
      v-if="label"
      :for="name"
      class="field__label"
    >
      {{ label }}
    </label>
    <p
      v-if="error"
      class="field__error"
    >
      {{ error }}
    </p>
    <p
      v-else-if="helper"
      class="field__error field__error--helper"
      v-html="helper"
    />
    <span class="field__border"/>
  </div>
</template>

<script>
import merge from 'lodash/merge';
import { getMessages } from 'hd-blocks/lang';

export default {
  name: 'HdTextarea',
  props: {
    label: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      required: true,
    },
    value: {
      type: [String, Number],
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
    required: {
      type: Boolean,
      default: false,
    },
    autocomplete: {
      type: String,
      default: 'on',
    },
    autofocus: {
      type: Boolean,
      default: false,
    },
    height: {
      type: String,
      default: '100px',
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
    icon: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      isActive: undefined,
      isValid: undefined,
      error: null,
      helper: null,
    };
  },
  computed: {
    t() {
      return merge(getMessages(this.lang), this.texts);
    },
    isEmpty() {
      return this.value === null || this.value === undefined || this.value === '';
    },
    fieldClasses() {
      return {
        'field--active': this.isActive,
        'field--filled': !this.isEmpty,
        'field--invalid': this.isValid === false,
        'field--no-label': this.label === '',
        'field--disabled': this.disabled,
        'field--hasIcon': this.icon,
      };
    },
    placeholderAttr() {
      if (!this.placeholder) {
        return '';
      }

      if (!this.label || this.isActive) {
        return this.placeholder;
      }

      return '';
    },
  },
  watch: {
    value() {
      this.validate();
    },
  },
  methods: {
    clearInput() {
      this.$refs.input.focus();
      this.hideError();
      this.$emit('input', '');
    },
    handleFocus() {
      this.isActive = true;
    },
    handleBlur() {
      this.isActive = false;
      this.validate();
    },
    handleInput(e) {
      this.$emit('input', e.target.value);
    },
    showError(errorMessage) {
      this.error = errorMessage;
      this.isValid = false;
    },
    showHelper(message) {
      this.helper = message;
    },
    hideError() {
      this.isValid = true;
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
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import 'hd-blocks/styles/mixins.scss';
@import 'hd-blocks/styles/inputs.scss';

.field {
  $_root: &;

  &--no-label {

    &::before {
      display: none;
    }

    & #{$_root}__input {
      padding-top: $stack-s;
    }
  }

  &__input {
    resize: vertical;
  }
  &__error {
    width: 100%;
    text-align: left;
    &--helper {
      display: block;
      color: getShade($quaternary-color, 80);
    }
  }
}
</style>
