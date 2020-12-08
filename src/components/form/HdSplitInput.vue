<template>
  <FieldBase
    v-bind="$attrs"
    :name="name"
    :error="error"
    :helper="helper"
    :active="isActive"
    :filled="isFilled"
    :disabled="disabled"
    :valid="isValid"
    minimized-label
  >
    <div class="split-input">
      <template
        v-for="(field, index) in fields">
        <input
          ref="inputs"
          :key="`split-input-${index}`"
          v-model="fieldsValues[field.name]"
          v-bind="field"
          :disabled="disabled"
          class="split-input__input"
          @focus="handleFocus(field)"
          @blur="handleBlur(field)">
        <div
          v-if="index < fields.length - 1"
          :key="`split-input-separator-${index}`"
          class="split-input__separator">
          <div
            class="split-input__separator-symbol"
            v-text="separator"/>
        </div>
      </template>
    </div>
  </FieldBase>
</template>

<script>
import merge from 'lodash/merge';
import { getMessages } from 'homeday-blocks/src/lang';
import FieldBase from './FieldBase.vue';
import formField from './formFieldMixin';

export default {
  name: 'HdSplitInput',
  mixins: [
    formField,
  ],
  components: {
    FieldBase,
  },
  props: {
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
    name: {
      type: String,
      required: true,
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
    isFilled() {
      return Object.values(this.fieldsValues || {})
        .some(value => value !== null && value !== undefined && value !== '');
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
      if (this.required && !this.isFilled) {
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

<style scoped lang="scss">
@import 'homeday-blocks/src/styles/mixins.scss';

.split-input {
  display: flex;

  &__input {
    width: 100%;
  }

  &__separator {
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 0 0 $inline-m;
    z-index: 1;
    background-color: $secondary-bg;
    color: getShade($quaternary-color, 80);
    font-size: 20px;
    font-weight: 700;

    &-symbol {
      margin-top: $stack-m;
    }
  }
}
</style>
