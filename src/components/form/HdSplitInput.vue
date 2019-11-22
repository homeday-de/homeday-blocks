<template>
  <div
    :class="fieldClasses"
    class="field field--double"
  >
    <img
      v-if="icon"
      :src="icon"
      role="presentation"
      class="field__icon"
    >
    <span class="field__border"/>
    <div class="field__double-input">
      <template
        v-for="(field, index) in fields">
        <input
          ref="inputs"
          :key="`split-input-${index}`"
          v-model="fieldsValues[field.name]"
          v-bind="field"
          :disabled="disabled"
          class="field__input"
          @focus="handleFocus(field)"
          @blur="handleBlur(field)">
        <div
          v-if="index < fields.length - 1"
          :key="`split-input-separator-${index}`"
          class="field__double-input__separator">
          <div
            class="field__double-input__separator__symbol"
            v-text="separator"/>
        </div>
      </template>
    </div>
    <label
      v-if="label"
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
  </div>
</template>

<script>
import merge from 'lodash/merge';
import { getMessages } from 'hd-blocks/lang';

export default {
  name: 'HdSplitInput',
  props: {
    label: {
      type: String,
      default: '',
    },
    fields: {
      type: Array,
      default: () => [],
      validator: fields => fields.every(({ name }) => {
        if (name === undefined || name === null) {
          // eslint-disable-next-line no-console
          console.warn('All fields must have a non-null `name` property');
          return false;
        }
        return true;
      }),
    },
    value: {
      type: Object,
      default: () => ({}),
    },
    separator: {
      type: String,
      default: '–',
    },
    required: {
      type: Boolean,
      default: false,
    },
    autofocus: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    icon: {
      type: String,
      default: '',
    },
    lang: {
      type: String,
      default: 'de',
    },
    texts: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      isActive: undefined,
      isValid: undefined,
      error: null,
      helper: null,
      fieldsValues: this.getFieldsValues(),
    };
  },
  computed: {
    t() {
      return merge(getMessages(this.lang), this.texts);
    },
    isEmpty() {
      return Object.values(this.fieldsValues || {})
        .some(value => value === null || value === undefined || value === '');
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
    fieldsValues: {
      deep: true,
      handler(value) {
        this.validate();
        this.$emit('input', value);
      },
    },
  },
  mounted() {
    if (this.autofocus) {
      this.$refs.inputs[0].focus();
    }
  },
  methods: {
    handleFocus(field) {
      this.isActive = true;
      this.$emit('fieldFocus', field);
    },
    handleBlur(field) {
      this.isActive = false;
      this.validate();
      this.$emit('fieldBlur', field);
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
    getFieldsValues() {
      return this.fields.reduce((values, { name }) => ({
        ...values,
        [name]: this.value[name],
      }), {});
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import 'hd-blocks/styles/inputs.scss';
.field {
  $f: &;
  &__double-input {
    &::before, &::after {
      display: none;
    }
    &__separator {
      display: flex;
      align-items: center;
      justify-content: center;
      flex: 0 0 $inline-m;
      z-index: 1;
      background-color: $inputBackground;
      color: $regent-gray;
      font-size: 20px;
      font-weight: 700;
      #{$f}--filled:not(#{$f}--active):not(#{$f}--invalid) & {
        background-color: $inputFilledBackground;
      }
      &__symbol {
        margin-top: $stack-m;
      }
    }
  }
  &__error {
    width: 100%;
    text-align: left;
    &--helper {
      display: block;
      color: $regent-gray;
    }
  }
}
.field--double .field__input {
  width: 100%;
}
</style>
