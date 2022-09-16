<template>
  <FieldBase
    v-bind="$attrs"
    :name="name"
    :error="error"
    :helper="helper"
    :active="isActive"
    :filled="isFilled"
    :disabled="disabled"
    minimized-label
    grouped
    #default="{ hasError }"
  >
    <div
      role="radiogroup"
      class="radio-wrapper"
      :class="{
        ['radio-wrapper--errored']: hasError,
        ['radio-wrapper--disabled']: disabled,
        ['radio-wrapper--vertical']: vertical,
      }"
    >
      <div
        v-for="(item, i) in items"
        :key="item.value"
        ref="items"
        :aria-checked="item.value === value ? 'true' : 'false'"
        :class="{
          'radio--selected': item.value === value,
        }"
        :tabindex="getTabindex(item, i)"
        class="radio"
        @keydown.space.enter.prevent="radioSelect(item.value)"
        @keydown.exact="maybeRadioSelect"
        @click="radioSelect(item.value)"
        @focus="handleFocus"
        @blur="handleBlur"
      >
        <input
          :id="getItemName(item)"
          :name="getItemName(item)"
          v-model="boundValue"
          :value="item.value"
          :disabled="disabled"
          type="radio"
        />
        <HdRadioIndicator
          :checked="item.value === value"
          :disabled="disabled"
          :invalid="hasError"
        />
        <label
          :for="getItemName(item)"
          class="radio__label"
        >
          {{ item.label }}
        </label>
      </div>
    </div>
  </FieldBase>
</template>

<script>
import merge from 'lodash/merge';
import { getMessages } from 'homeday-blocks/src/lang';
import FieldBase from './FieldBase.vue';
import formField from './formFieldMixin';
import HdRadioIndicator from './HdRadioIndicator.vue';

export default {
  name: 'HdRadio',
  mixins: [
    formField,
  ],
  components: {
    FieldBase,
    HdRadioIndicator,
  },
  props: {
    name: {
      type: String,
      required: true,
    },
    items: {
      type: Array,
      default: () => [],
    },
    value: {
      type: [String, Number],
      default: '',
    },
    required: {
      type: Boolean,
      default: false,
    },
    vertical: {
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
      error: null,
      helper: null,
      isActive: false,
    };
  },
  computed: {
    t() {
      return merge(getMessages(this.lang), this.texts);
    },
    boundValue: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('input', value);
      },
    },
    isFilled() {
      return this.value !== null && this.value !== undefined && this.value !== '';
    },
  },
  watch: {
    value() {
      this.validate();
    },
  },
  methods: {
    getItemName({ value }) {
      return `${this.name}-${value}`;
    },
    getTabindex(item, index) {
      if (this.disabled === true) {
        return -1;
      }

      if (!this.value) {
        return index === 0 ? 0 : -1;
      }

      return item.value === this.value ? 0 : -1;
    },
    radioSelect(value) {
      this.$emit('input', value);
    },
    maybeRadioSelect(e) {
      if (['ArrowDown', 'Down', 'ArrowRight', 'Right'].includes(e.key)) {
        if (!this.value) {
          this.$emit('input', this.items[0].value);
          this.$refs.items[0].focus();
          return;
        }

        const currentIndex = this.items.findIndex(
          (item) => item.value === this.value,
        );

        if (currentIndex === -1 || currentIndex === this.items.length - 1) {
          this.$emit('input', this.items[0].value);
          this.$refs.items[0].focus();
          return;
        }

        this.$emit('input', this.items[currentIndex + 1].value);
        this.$refs.items[currentIndex + 1].focus();
      } else if (['ArrowUp', 'Up', 'ArrowLeft', 'Left'].includes(e.key)) {
        if (!this.value) {
          this.$emit('input', this.items[0].value);
          this.$refs.items[0].focus();
          return;
        }

        const currentIndex = this.items.findIndex(
          (item) => item.value === this.value,
        );

        if (currentIndex === -1 || currentIndex === 0) {
          this.$emit('input', this.items[this.items.length - 1].value);
          this.$refs.items[this.items.length - 1].focus();
          return;
        }

        this.$emit('input', this.items[currentIndex - 1].value);
        this.$refs.items[currentIndex - 1].focus();
      }
    },
    handleFocus() {
      this.isActive = true;
    },
    handleBlur() {
      this.isActive = false;
      this.$nextTick(() => {
        if (!this.isActive) {
          this.validate();
        }
      });
    },
    showError(errorMessage) {
      this.error = errorMessage;
    },
    hideError() {
      this.error = null;
    },
    showHelper(helper) {
      this.helper = helper;
    },
    hideHelper() {
      this.helper = null;
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

.field ::v-deep .field__helper {
  margin-top: $sp-xs;
  padding-left: 0;
}

.radio-wrapper {
  position: relative;
  flex: 1;
  display: flex;
}

.radio-wrapper--vertical {
  flex-direction: column;

  > .radio:not(:first-of-type) {
    margin-top: $sp-m;
    margin-left: 0;
  }
}

.radio-wrapper--using-mouse > .radio {
  outline: 0;
}

.radio-wrapper--disabled {
  pointer-events: none;

  > .radio,
  > .radio--selected {
    color: getShade($neutral-gray, 70);
  }
}

.radio {
  flex: 1;
  display: flex;
  align-items: center;

  cursor: pointer;

  position: relative;

  &:not(:first-of-type) {
    margin-left: $sp-m;
  }

  > input[type="radio"] {
    display: none;
  }

  > .radio__label {
    flex: 1;
    padding-left: $sp-s;
    cursor: pointer;
    text-align: left;
    @include font("DS-100");
  }
}
</style>
