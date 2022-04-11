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
    :class="{
      'field--maxlength-indicator-visible': isMaxlengthIndicatorVisible,
      'field--label-background-visible': shouldShowLabelBackground,
    }"
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
      :maxlength="maxlength"
      class="textarea"
      @focus="handleFocus"
      @blur="handleBlur"
      @input="handleInput"
    />
    <span
      v-if="isMaxlengthIndicatorVisible"
      class="maxlength-indicator"
    >
      {{ maxlengthIndicator }}
    </span>
    <!-- `data-gramm_editor` attribute is used to control Grammarly (chrome extension) -->
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
    maxlength: {
      type: Number,
      default: Number.POSITIVE_INFINITY,
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
    maxlengthIndicator() {
      return `${this.value.length}/${this.maxlength}`;
    },
    isMaxlengthIndicatorVisible() {
      return this.maxlength < Number.POSITIVE_INFINITY;
    },
    shouldShowLabelBackground() {
      return this.label && (this.isActive || this.value);
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

<style lang="scss">
@import 'homeday-blocks/src/styles/mixins.scss';
$distanceFromTextareaToIndicator: -18px;

.textarea {
  display: block;
  resize: vertical;
}
.maxlength-indicator {
  position: absolute;
  right: 0;
  bottom: $distanceFromTextareaToIndicator;
  @include font("DS-60");
  padding: 0px $sp-s;
  color: getShade($quaternary-color, 70);
}
.field--maxlength-indicator-visible {
  .field__helper {
    padding-right: $sp-xl;
  }
}

.field--label-background-visible {
  .field__main::after {
    content: '';
    position: absolute;
    z-index: 1;
    top: 0;
    left: 0;
    width: 100%;
    height: $sp-l - $sp-s; // Same as the padding top from the textarea, defined on FieldBase
    background-color: $secondary-bg;
  }
}

</style>
