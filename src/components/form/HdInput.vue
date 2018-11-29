<template>
  <div class="field field--input" :class="fieldClasses">
    <input
      class="field__input"
      :autocomplete="autocomplete"
      v-model.trim="currentValue"
      ref="input"
      :type="currentType"
      :id="name"
      :name="name"
      :placeholder="isActive && placeholder !== undefined ? placeholder : ''"
      :required="required"
      :autofocus="autofocus"
      @focus="handleFocus"
      @blur="handleBlur"
    />
    <label :for="name" v-if="label" class="field__label">{{ label }}</label>
    <p class="field__error" v-if="error">{{ error }}</p>
    <p class="field__error field__error--helper" v-else-if="helper" v-html="helper"></p>
    <span v-if="false" class="field__error-clear" @click="clearInput"></span>
    <span v-if="showVisibilityToggle"
      class="field__visibilityToggle"
      :class="{'field__visibilityToggle--visible': currentType === 'text'}"
      @click="togglePasswordVisibility"></span>
    <span class="field__border"></span>
  </div>
</template>

<script>
import { getMessages } from '@/lang';
import validate from '@/services/formValidation';

export default {
  name: 'hdInput',
  props: {
    name: String,
    type: String,
    label: String,
    value: [String, Number],
    placeholder: String,
    required: Boolean,
    autocomplete: {
      type: Boolean,
      default: true,
    },
    autofocus: Boolean,
    lang: String,
  },
  data() {
    return {
      t: {},
      currentValue: this.value || '',
      currentType: this.type || 'text',
      isActive: undefined,
      isValid: undefined,
      error: null,
      helper: null,
    };
  },
  created() {
    this.t = getMessages(this.lang);
  },
  methods: {
    handleChange() {
      this.validate();
      this.$emit('dataChange', { name: this.name, value: this.currentValue, error: this.error });
    },
    clearInput() {
      this.$refs.input.focus();
      this.currentValue = '';
      this.hideError();
    },
    handleFocus() {
      // this.error = '';
      this.isActive = true;
    },
    handleBlur() {
      this.isActive = false;
      this.handleChange();
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
      if (this.required && this.currentValue === '') {
        this.showError(this.t.FORM.VALIDATION.REQUIRED);
      } else if (this.currentValue !== '' && this.type === 'email' && !validate.email(this.currentValue)) {
        this.showError(this.t.FORM.VALIDATION.INVALID_EMAIL);
      } else {
        this.hideError();
      }
    },
    validityCheck() {
      this.handleChange();
    },
    togglePasswordVisibility() {
      this.currentType = this.currentType === 'password' ? 'text' : 'password';
    },
  },
  computed: {
    showVisibilityToggle() {
      return this.type === 'password' && this.currentValue.length !== 0;
    },
    fieldClasses() {
      return {
        'field--active': this.isActive,
        'field--filled': this.currentValue.length !== 0,
        'field--valid': false,
        'field--invalid': this.isValid === false,
      };
    },
  },
  watch: {
    currentValue() {
      this.handleChange();
    },
    value() {
      this.currentValue = this.value || '';
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import '~styleguide/src/inputs.scss';

.field {
  &__input {
    font-family: 'Source Sans Pro', sans-serif;
    background: $wild-sand !important; // (to be fixed in the styleguide)
    &:required {
      box-shadow: none;
    }
    &::-ms-clear {
      display: none;
    }
    &::-ms-reveal {
      display: none;
    }
  }
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
    background-image: url('~assets/icons/ic_visibility-on.svg');
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
