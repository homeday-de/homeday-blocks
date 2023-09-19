<template>
  <TextFieldBase
    v-bind="$attrs"
    :name="name"
    :error="error"
    :helper="helper"
    :active="isActive"
    :filled="isFilled"
    :valid="isValid"
    :disabled="disabled"
    @clear-click="clearInput"
    @status-click="focusInput"
  >
    <input
      ref="input"
      v-bind="$attrs"
      :autocomplete="autocomplete"
      :value="value"
      :type="currentType"
      :id="name"
      :name="name"
      :placeholder="isActive && placeholder !== undefined ? placeholder : ''"
      :required="required"
      :disabled="disabled"
      data-lpignore="true"
      class="input"
      @input="handleInput"
      @focus="handleFocus"
      @blur="handleBlur"
    />
    <template #input-right>
      <slot name="input-right" />
    </template>
  </TextFieldBase>
</template>

<script>
import merge from 'lodash/merge';
import { getMessages } from 'homeday-blocks/src/lang';
import {
  email as validateEmail,
  date as validateDate,
} from 'homeday-blocks/src/services/formValidation';
import TextFieldBase from './TextFieldBase.vue';
import formField from './formFieldMixin';

export default {
  name: 'HdInput',
  inheritAttrs: false,
  mixins: [formField],
  components: {
    TextFieldBase,
  },
  props: {
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: 'text',
    },
    value: {
      type: [String, Number, Date],
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
    min: {
      type: Number,
      default: undefined,
    },
    max: {
      type: Number,
      default: undefined,
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
    customErrorMessage: {
      type: String,
      default: null,
    },
    customRules: {
      type: Array,
      default: () => [],
      validator: (rulesProvided) =>
        rulesProvided.every(
          ({ validate, errorMessage }) =>
            typeof validate === 'function' && typeof errorMessage === 'string'
        ),
    },
  },
  data() {
    return {
      currentType: this.type || 'text',
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
    isFilled() {
      return this.value !== null && this.value !== undefined && this.value !== '';
    },
  },
  watch: {
    value() {
      this.validate();
    },
    type(type) {
      this.currentType = type;
    },
    required() {
      if (this.error) this.validate();
    },
    customRules() {
      if (this.error) this.validate();
    },
  },
  methods: {
    clearInput() {
      this.focusInput();
      this.$emit('input', '');
    },
    focusInput() {
      this.$refs.input.focus();
    },
    handleFocus() {
      this.isActive = true;
      this.$emit('focus');
    },
    handleBlur() {
      this.isActive = false;
      this.validate();
      this.$emit('blur');
    },
    handleInput(e) {
      let newValue = e.target.value;

      if (this.currentType === 'number' && newValue !== '') {
        newValue = parseFloat(newValue);

        // If the parsed value is the same as the current value
        // we don't emit the custom input event
        // because it might suppress the the decimal separator on webkit browsers
        if (newValue === this.value) {
          return;
        }

        if (typeof this.min === 'number' && newValue < this.min) {
          newValue = this.min;
        } else if (typeof this.max === 'number' && newValue > this.max) {
          newValue = this.max;
        }

        if (newValue === this.value) {
          this.$nextTick(this.$forceUpdate);
        }
      }

      this.$emit('input', newValue);
    },
    showError(errorMessage) {
      this.error = errorMessage;
      this.isValid = false;

      return false;
    },
    showHelper(message) {
      this.helper = message;
    },
    hideError() {
      this.isValid = true;
      this.error = null;

      return true;
    },
    validate(value = this.value) {
      if (!this.$refs.input.checkValidity()) {
        return this.showError(this.customErrorMessage || this.t.FORM.VALIDATION.GENERAL);
      }

      if (this.required && !this.isFilled) {
        return this.showError(this.t.FORM.VALIDATION.REQUIRED);
      }

      if (this.isFilled) {
        if (this.currentType === 'email' && !validateEmail(value)) {
          return this.showError(this.t.FORM.VALIDATION.INVALID_EMAIL);
        }

        if (this.currentType === 'date' && !validateDate(value)) {
          return this.showError(this.t.FORM.VALIDATION.INVALID_DATE);
        }

        if (this.customRules.length) {
          return this.validateCustomRules(value);
        }
      }

      return this.hideError();
    },
    validateCustomRules(value = this.value) {
      const firstFailingRule = this.customRules.find(({ validate }) => !validate(value));

      if (firstFailingRule) {
        return this.showError(firstFailingRule.errorMessage);
      }

      return this.hideError();
    },
  },
};
</script>

<style lang="scss">
.input {
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    appearance: none;
    margin: 0;
  }
}
</style>
