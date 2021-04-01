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
        <div class="radio__circle"></div>
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

export default {
  name: 'HdRadio',
  mixins: [
    formField,
  ],
  components: {
    FieldBase,
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

<style lang="scss" scoped>
@import 'homeday-blocks/src/styles/mixins.scss';

.radio-wrapper {
  position: relative;
  flex: 1;
  display: flex;
}

.radio-wrapper--vertical {
  flex-direction: column;

  > .radio:not(:first-of-type) {
    margin-top: $stack-m;
    margin-left: 0;
  }
}

.radio-wrapper--using-mouse > .radio {
  outline: 0;
}

.radio-wrapper--errored > .radio > .radio__circle {
  border-color: $error-color;

  &:hover {
    transition: ease-in $time-s;
    box-shadow: 0 0 0 7px rgba($error-color, 0.15);
  }
}

.radio-wrapper--disabled {
  pointer-events: none;

  > .radio,
  > .radio--selected {
    color: getShade($neutral-gray, 70);

    > .radio__circle {
      border-color: getShade($neutral-gray, 70);
      background-color: transparent;

      &::before {
        background-color: getShade($neutral-gray, 70);
      }
    }
  }
}

.radio {
  flex: 1;
  display: flex;
  align-items: center;

  cursor: pointer;

  position: relative;

  &:not(:first-of-type) {
    margin-left: $inline-m;
  }

  > input[type="radio"] {
    display: none;
  }

  > .radio__circle {
    position: relative;
    width: 20px;
    height: 20px;
    max-width: 20px;

    border-radius: 50%;
    border: 2px solid $neutral-gray;

    outline-width: 0;
    overflow: hidden;

    &:hover,
    &:active,
    &:focus {
      transition: ease-in-out $time-s;
      box-shadow: 0 0 0 7px getShade($secondary-color, 90);
    }

    &::before {
      content: "";

      position: absolute;
      top: 50%;
      left: 50%;
      width: 8px;
      height: 8px;
      border-radius: 50%;

      background-color: $white;

      opacity: 0;
      transform: scale(0) translate(-50%, -50%);
      transform-origin: top left;
      transition: transform $time-s, opacity $time-s;
    }
  }

  > .radio__label {
    flex: 1;
    padding-left: $inline-s;
    cursor: pointer;
    text-align: left;
    @include font("text-small");
  }
}

.radio--selected > .radio__circle {
  border-color: getShade($secondary-color, 110);
  background-color: getShade($secondary-color, 110);

  &:hover,
  &:active,
  &:focus {
    box-shadow: 0 0 0 7px rgba(getShade($secondary-color, 110), 0.15);
  }

  &:before {
    transform: scale(1) translate(-50%, -50%);
    opacity: 1;
  }
}
</style>
