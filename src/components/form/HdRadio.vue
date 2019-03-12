<template>
  <section
    :class="wrapperClasses"
    class="radio-wrapper"
  >
    <label
      v-if="label"
      :id="`${name}--label`"
      class="radio-wrapper__label"
      tabindex="-1"
    >{{ label }}</label>
    <div
      :id="name"
      :aria-labelledby="label ? `${name}--label` : null"
      class="radio-wrapper__items"
      role="radiogroup"
    >
      <!-- eslint-disable vue/valid-v-on -->
      <div
        v-for="(item, i) in items"
        :key="`radio-${item.value}`"
        ref="items"
        :aria-checked="item.value === value ? 'true' : 'false'"
        :class="{
          'isSelected': item.value === value,
        }"
        :tabindex="getTabindex(item, i)"
        class="radio"
        role="radio"
        @keydown.space.enter.prevent="radioSelect(item.value)"
        @keyup="maybeRadioSelect"
        @click="radioSelect(item.value)"
        @focus="handleFocus"
        @blur="handleBlur"
      >
      <!-- eslint-enable vue/valid-v-on -->
        <input
          :name="name"
          :value="item.value"
          :checked="item.value === value"
          class="radio__input"
          type="radio"
        />
        <div class="radio__circle"></div>
        <p class="radio__label">{{ item.label }}</p>
      </div>
    </div>
    <p
      v-if="error"
      class="field__error radio__error">{{ error }}
    </p>
  </section>
</template>

<script>
import merge from 'lodash/merge';
import { getMessages } from 'hd-blocks/lang';

export default {
  name: 'HdRadio',
  props: {
    label: {
      type: String,
      default: '',
    },
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
      default: () => {},
    },
  },
  data() {
    return {
      error: null,
      isActive: false,
    };
  },
  computed: {
    t() {
      return merge(getMessages(this.lang), this.texts);
    },
    isEmpty() {
      return this.value == null || this.value === '';
    },
    wrapperClasses() {
      return {
        'radio-wrapper--active': this.isActive,
        'radio-wrapper--vertical': this.vertical,
        hasError: !!this.error,
      };
    },
  },
  watch: {
    value() {
      this.validate();
    },
  },
  methods: {
    getTabindex(item, index) {
      if (!this.value) {
        return index === 0
          ? 0
          : -1;
      }

      return item.value === this.value
        ? 0
        : -1;
    },
    radioSelect(value) {
      this.$emit('input', value);
    },
    maybeRadioSelect(e) {
      if (['ArrowDown', 'ArrowRight'].includes(e.key)) {
        if (!this.value) {
          this.$emit('input', this.items[0].value);
          this.$refs.items[0].focus();
          return;
        }

        const currentIndex = this.items.findIndex(item => item.value === this.value);

        if (currentIndex === -1 || currentIndex === this.items.length - 1) {
          this.$emit('input', this.items[0].value);
          this.$refs.items[0].focus();
          return;
        }

        this.$emit('input', this.items[currentIndex + 1].value);
        this.$refs.items[currentIndex + 1].focus();
      } else if (['ArrowUp', 'ArrowLeft'].includes(e.key)) {
        if (!this.value) {
          this.$emit('input', this.items[0].value);
          this.$refs.items[0].focus();
          return;
        }

        const currentIndex = this.items.findIndex(item => item.value === this.value);

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
    showHelper(message) {
      this.helper = message;
    },
    hideError() {
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
  },
};
</script>

<style lang="scss" scoped>
@import 'hd-blocks/styles/inputs.scss';

.radio {
  $r: &;

  display: flex;
  align-items: center;
  position: relative;
  flex: 1;
  cursor: pointer;
  margin-left: $inline-m;
  &:first-of-type {
    margin-left: 0;
  }

  &__input {
    display: none;
  }
  &__circle {
    position: relative;
    flex: 0 0 20px;
    width: 20px;
    max-width: 20px;
    height: 20px;
    border-radius: 50%;
    overflow: hidden;
    outline-width: 0;
    border: 2px solid $nevada;
    &:before {
      content: '';
      display: block;
      position: absolute;
      top: 3px;
      left: 3px;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background-color: $vivid-blue;
      transform: scale(0);
      opacity: 0;
      transition: transform .2s, opacity .2s;
    }

    #{$r}:hover & {
      border-color: $regent-gray;
    }

    #{$r}:focus & {
      border-color: $vivid-blue;
    }
  }
  &__label {
    flex: 1;
    margin: 0 0 0 $inline-s;
    text-align: left;
    @include font('text-small');
  }
  &.isSelected {
    .radio__circle {
      border-color: $vivid-blue;
      &:before {
        transform: scale(1);
        opacity: 1;
      }
    }
  }
  &__error {
    display: block;
  }
}

.radio-wrapper {
  $r: &;

  position: relative;
  margin-bottom: $labelHeight + $stack-s;

  &__label {
    display: block;
    margin-bottom: 3px;
    font-size: 14px;
    line-height: 18px;
    color: $nevada;
    transition: color 0.3s cubic-bezier(0.250, 0.460, 0.450, 0.940);
    pointer-events: none;

    #{$r}.hasError & {
      color: $torch-red;
    }

    #{$r}:hover &,
    #{$r}--active &,
    #{$r}--active.hasError & {
      color: $vivid-blue;
    }
  }

  &__items {
    display: flex;
    flex-direction: row;
    flex: 1;
  }

  &--vertical &__items {
    flex-direction: column;

    .radio {
      margin-left: 0;
    }
  }

  &.hasError &__items {

    .radio:not(:focus) .radio__circle {
      border-color: $torch-red;
    }
  }

  &--active.hasError {

    #{$r}__items {

      .radio:not(:focus) .radio__circle {
        border-color: $regent-gray;
      }
    }

    .radio__error {
      color: $regent-gray;
    }
  }
}
</style>
