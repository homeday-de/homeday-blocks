<template>
  <div
    :class="fieldClasses"
    class="field field--input"
  >
    <img
      v-if="icon"
      :src="icon"
      role="presentation"
      class="field__icon"
    >
    <input
      :autocomplete="autocomplete"
      :value="value"
      :type="currentType"
      :id="name"
      :name="name"
      :placeholder="isActive && placeholder !== undefined ? placeholder : ''"
      :required="required"
      :autofocus="autofocus"
      :disabled="disabled"
      class="field__input"
      ref="input"
      data-lpignore="true"
      @input="handleInput"
      @focus="handleFocus"
      @blur="handleBlur"
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
import { getMessages } from 'homeday-blocks/src/lang';
import {
  email as validateEmail,
  date as validateDate,
} from 'homeday-blocks/src/services/formValidation';

export default {
  name: 'HdInput',
  props: {
    label: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: 'text',
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
    icon: {
      type: String,
      default: '',
    },
    customRules: {
      type: Array,
      default: () => [],
      validator: rulesProvided => rulesProvided.every(
        ({ validate, errorMessage }) => typeof validate === 'function' && typeof errorMessage === 'string',
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
    isEmpty() {
      return this.value === null || this.value === undefined || this.value === '';
    },
    fieldClasses() {
      return {
        'field--active': this.isActive,
        'field--filled': !this.isEmpty,
        'field--invalid': this.isValid === false,
        'field--disabled': this.disabled,
        'field--hasIcon': this.icon,
      };
    },
  },
  watch: {
    value() {
      this.validate();
    },
    type(type) {
      this.currentType = type;
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
      if (this.required && this.isEmpty) {
        return this.showError(this.t.FORM.VALIDATION.REQUIRED);
      }

      if (!this.isEmpty) {
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import 'homeday-blocks/src/styles/mixins.scss';
@import 'homeday-blocks/src/styles/inputs.scss';

.field {
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
