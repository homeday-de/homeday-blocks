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

<script lang="ts">
import { customRules as customRulesType } from '@/@types/global';
import { Messages, Language } from '@/lang/index';
import merge from 'lodash/merge';
import { getMessages } from 'homeday-blocks/src/lang';
import {
  email as validateEmail,
  date as validateDate,
} from 'homeday-blocks/src/services/formValidation';
import Vue, { PropType, PropOptions } from 'vue';
import TextFieldBase from './TextFieldBase.vue';
import formField from './formFieldMixin';

interface HdInputProps {
  name: string;
  type?: string;
  value?: string | number;
  placeholder?: string;
  required: boolean;
  autocomplete?: string;
  min?: number;
  max?: number;
  lang?: Language;
  texts?: { [key: string]: string };
  disabled: boolean;
  customRules?: (() => boolean)[];
}

export default Vue.extend({
  name: 'HdInput',
  inheritAttrs: false,
  mixins: [formField],
  components: {
    TextFieldBase,
  },
  props: {
    name: {
      type: String as PropType<HdInputProps['name']>,
      required: true,
    },
    type: {
      type: String as PropType<HdInputProps['type']>,
      default: 'text',
    },
    value: {
      type: [String, Number, Date] as PropType<HdInputProps['value']>,
      default: '',
    },
    placeholder: {
      type: String as PropType<HdInputProps['placeholder']>,
      default: '',
    },
    required: {
      type: Boolean as PropType<HdInputProps['required']>,
      default: false,
    },
    autocomplete: {
      type: String as PropType<HdInputProps['autocomplete']>,
      default: 'on',
    },
    min: {
      type: Number as PropType<HdInputProps['min']>,
      default: undefined,
    },
    max: {
      type: Number as PropType<HdInputProps['max']>,
      default: undefined,
    },
    lang: {
      type: String as PropType<HdInputProps['lang']>,
      default: 'de',
    },
    texts: {
      type: Object as PropType<HdInputProps['texts']>,
      default: () => ({}),
    },
    disabled: {
      type: Boolean as PropType<HdInputProps['disabled']>,
      default: false,
    },
    customErrorMessage: {
      type: String,
      default: null,
    },
    customRules: {
      type: Array as PropType<HdInputProps['customRules']>,
      default: () => [],
      validator: (rulesProvided: customRulesType) =>
        rulesProvided.every(
          ({ validate, errorMessage }) =>
            typeof validate === 'function' && typeof errorMessage === 'string'
        ),
    } as PropOptions<customRulesType>,
  },
  data(): {
    currentType: string;
    isActive?: boolean;
    isValid?: boolean;
    error: string | null;
    helper: string | null;
  } {
    return {
      currentType: this.type || 'text',
      isActive: undefined,
      isValid: undefined,
      error: null,
      helper: null,
    };
  },
  computed: {
    t(): Messages {
      return merge(getMessages(this.lang as Language), this.texts);
    },
    isFilled(): boolean {
      return this.value !== null && this.value !== undefined && this.value !== '';
    },
  },
  watch: {
    value(): void {
      this.validate();
    },
    type(type): void {
      this.currentType = type;
    },
    required(): boolean | void {
      if (this.error) this.validate();
    },
    customRules(): boolean | void {
      if (this.error) this.validate();
    },
  },
  methods: {
    clearInput(): void {
      this.focusInput();
      this.$emit('input', '');
    },
    focusInput(): void {
      (this.$refs.input as HTMLInputElement).focus();
    },
    handleFocus(): void {
      this.isActive = true;
      this.$emit('focus');
    },
    handleBlur(): void {
      this.isActive = false;
      this.validate();
      this.$emit('blur');
    },
    handleInput(e: Event & { target: HTMLInputElement }): void {
      let newValue: string | number = e.target.value;

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
    showError(errorMessage: string): boolean {
      this.error = errorMessage;
      this.isValid = false;

      return false;
    },
    showHelper(message: string): void {
      this.helper = message;
    },
    hideError(): boolean {
      this.isValid = true;
      this.error = null;

      return true;
    },
    // @ts-ignore
    validate(value: string | number = this.value): boolean {
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

        // @ts-ignore
        if (!this.$refs.input.checkValidity()) {
          // @ts-ignore
          return this.showError(this.customErrorMessage || this.t.FORM.VALIDATION.GENERAL);
        }
      }

      return this.hideError();
    },
    // @ts-ignore
    validateCustomRules(value: string | number = this.value): boolean {
      const firstFailingRule = this.customRules.find(({ validate }) => !validate(value));

      if (firstFailingRule) {
        return this.showError(firstFailingRule.errorMessage);
      }

      return this.hideError();
    },
  },
});
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
