<template>
  <TextFieldBase
    v-bind="$attrs"
    :name="name"
    :label="label"
    :icon="icon"
    :error="error"
    :helper="helper"
    :active="isActive"
    :filled="isFilled"
    :disabled="disabled"
    @clear-click="clearTextarea"
    @status-click="focusTextarea"
  >
    <textarea
      ref="textarea"
      :autocomplete="autocomplete"
      :value="value"
      :id="name"
      :name="name"
      :placeholder="placeholderAttr"
      :required="required"
      :autofocus="autofocus"
      :style="{ height }"
      :disabled="disabled"
      class="textarea"
      @focus="handleFocus"
      @blur="handleBlur"
      @input="handleInput"
    />
  </TextFieldBase>
</template>

<script>
import merge from 'lodash/merge';
import { getMessages } from 'homeday-blocks/src/lang';
import TextFieldBase from './TextFieldBase.vue';
import formField from './formFieldMixin';

export default {
  name: 'HdTextarea',
  mixins: [
    formField,
  ],
  components: {
    TextFieldBase,
  },
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
    isFilled() {
      return this.value !== null && this.value !== undefined && this.value !== '';
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
    clearTextarea() {
      this.focusTextarea();
      this.$emit('input', '');
    },
    focusTextarea() {
      this.$refs.textarea.focus();
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

<style scoped lang="scss">
.textarea {
  display: block;
  resize: vertical;
}
</style>
