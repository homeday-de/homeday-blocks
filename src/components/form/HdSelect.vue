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
    <select
      v-model="currentValue"
      :id="name"
      :name="name"
      :required="required"
      :autofocus="autofocus"
      :disabled="disabled"
      class="select"
      @focus="handleFocus"
      @blur="handleBlur"
    >
      <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
      >
        {{ option.label }}
      </option>
    </select>
    <template #input-right>
      <HdIcon
        :src="smallArrowIcon"
        width="24px"
        height="24px"
        class="select__arrow"
      />
    </template>
  </FieldBase>
</template>

<script>
import merge from 'lodash/merge';
import { getMessages } from 'homeday-blocks/src/lang';
import HdIcon from 'homeday-blocks/src/components/HdIcon.vue';
import { smallArrowIcon } from 'homeday-blocks/src/assets/small-icons';
import FieldBase from './FieldBase.vue';
import formField from './formFieldMixin';

export default {
  name: 'HdSelect',
  mixins: [
    formField,
  ],
  components: {
    FieldBase,
    HdIcon,
  },
  props: {
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
      default: () => ({}),
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      currentValue: this.value,
      isActive: undefined,
      isValid: undefined,
      error: null,
      helper: null,
      smallArrowIcon,
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
@import 'homeday-blocks/src/styles/mixins.scss';

.select {
  &__arrow {
    transform: rotateZ(90deg);
    pointer-events: none;
  }
}
</style>
