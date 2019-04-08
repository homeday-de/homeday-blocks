<template>
  <div
    :class="fieldClasses"
    class="field field--select">
    <select
      ref="input"
      v-model="currentValue"
      :id="name"
      :name="name"
      :required="required"
      :autofocus="autofocus"
      class="field__input"
      @focus="handleFocus"
      @blur="handleBlur"
    >
      <option
        v-for="(option, i) in options"
        :key="i"
        :value="option.value"
      >{{ option.label }}</option>
    </select>
    <label
      v-if="label"
      :for="name"
      class="field__label">{{ label }}</label>
    <p
      v-if="error"
      class="field__error">{{ error }}</p>
    <p
      v-else-if="helper"
      class="field__error field__error--helper"
      v-html="helper"/>
    <span class="field__border"/>
  </div>
</template>

<script>
import merge from 'lodash/merge';
import { getMessages } from 'hd-blocks/lang';

export default {
  name: 'HdSelect',
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
    options: {
      type: Array,
      default: () => [],
    },
    required: {
      type: Boolean,
      default: false,
    },
    autofocus: {
      type: Boolean,
      default: false,
    },
    lang: {
      type: String,
      default: 'de',
    },
    texts: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      currentValue: this.value,
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
        'field--valid': false,
        'field--invalid': this.isValid === false,
      };
    },
  },
  watch: {
    value(value) {
      this.currentValue = value;
    },
    currentValue() {
      this.handleChange();
    },
  },
  methods: {
    handleChange() {
      this.$emit('input', this.currentValue);
      this.validate();
    },
    handleFocus() {
      this.isActive = true;
    },
    handleBlur() {
      this.isActive = false;
      this.validate();
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
.field {
  &__label {
    left: 0;
  }
  &__error {
    width: 100%;
    text-align: left;
    &--helper {
      display: block;
      color: $regent-gray;
    }
  }
  &::after {
    height: 100%;
    top: 0;
    bottom: 0;
  }
}
</style>
