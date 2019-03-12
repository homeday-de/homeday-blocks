<template>
  <div
    :class="fieldClasses"
    class="field field--input"
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
      class="field__input"
      ref="input"
      @input="handleInput"
      @focus="handleFocus"
      @blur="handleBlur"
    />
    <label
      v-if="label"
      :for="name"
      class="field__label"
    >{{ label }}
    </label>
    <p
      v-if="error"
      class="field__error">{{ error }}</p>
    <p
      v-else-if="helper"
      class="field__error field__error--helper"
      v-html="helper"/>
    <span v-if="showVisibilityToggle"
      :class="{'field__visibilityToggle--visible': currentType === 'text'}"
      class="field__visibilityToggle"
      @click="togglePasswordVisibility"></span>
    <span class="field__border"></span>
  </div>
</template>

<script>
import merge from 'lodash/merge';
import { getMessages } from 'hd-blocks/lang';
import {
  email as validateEmail,
  date as validateDate,
} from 'hd-blocks/services/formValidation';

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
      default: () => {},
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
      return this.value == null || this.value === '';
    },
    showVisibilityToggle() {
      return this.type === 'password' && this.value.length !== 0;
    },
    fieldClasses() {
      return {
        'field--active': this.isActive,
        'field--filled': !this.isEmpty,
        'field--invalid': this.isValid === false,
        'field--hasControl': this.showVisibilityToggle,
      };
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
      } else if (this.currentType === 'email' && !validateEmail(this.value)) {
        this.showError(this.t.FORM.VALIDATION.INVALID_EMAIL);
      } else if (this.currentType === 'date' && !validateDate(this.value)) {
        this.showError(this.t.FORM.VALIDATION.INVALID_DATE);
      } else {
        this.hideError();
      }

      return !this.error;
    },
    togglePasswordVisibility() {
      this.currentType = this.currentType === 'password' ? 'text' : 'password';
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import 'hd-blocks/styles/inputs.scss';

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
  &__visibilityToggle {
    position: absolute;
    right: $inline-s;
    bottom: $stack-m;
    background-image: url('~hd-blocks/assets/icons/ic_visibility-on.svg');
    background-repeat: no-repeat;
    width: 24px;
    height: 24px;
    cursor: pointer;
    &:after {
      display: block;
      content: '';
      position: absolute;
      opacity: 1;
      top: 2px;
      left: 3px;
      width: 24px;
      height: 0px;
      border-bottom: 2px solid $regent-gray;
      border-top: 1px solid $wild-sand;
      transform-origin: left;
      transform: rotateZ(45deg) scaleX(1);
      transition: transform .3s;
    }
    &--visible {
      &:after {
        transform: rotateZ(45deg) scaleX(0);
      }
    }
  }
}
</style>
