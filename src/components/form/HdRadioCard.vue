<template>
  <label
    ref="label"
    :for="inputName"
    @click="$refs.radio.focus()"
    @keydown.prevent.space="$refs.label.click()"
    :tabindex="disabled ? -1 : 0"
  >
    <input
      ref="radio"
      type="radio"
      :id="inputName"
      :name="name"
      :aria-label="ariaLabel"
      :aria-labelledby="ariaLabelledBy"
      :aria-invalid="hasValidationErrors || isInvalid"
      :aria-disabled="disabled"
      :disabled="disabled"
      :checked="isChecked"
      :value="nativeValue"
      @change="$emit('input', $event.target.value)"
    />

    <div
      class="card"
      :class="{
        ['card--selected']: isChecked,
        ['card--disabled']: disabled,
        ['card--tile']: mode === 'tile',
      }"
    >
      <div class="card__border"></div>
      <HdRadioIndicator
        class="card__indicator"
        :checked="isChecked"
        :disabled="disabled"
        :invalid="hasValidationErrors || isInvalid"
      />

      <div class="card__icon"><slot name="icon" /></div>

      <span class="card__control-label"><slot /></span>
    </div>

    <span v-if="hasValidationErrors" class="error">{{ error }}</span>
  </label>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue';
import deepmerge from 'deepmerge';
import { customRules } from '@/@types/global';
import { getMessages, Messages } from 'homeday-blocks/src/lang';
import formFieldMixin from './formFieldMixin';
import HdRadioIndicator from './HdRadioIndicator.vue';

export const name = 'HdRadioCard';

export default Vue.extend({
  name,
  mixins: [formFieldMixin],
  components: {
    HdRadioIndicator,
  },
  props: {
    name: {
      type: String,
      required: true,
    },
    value: [String, Number],
    nativeValue: {
      type: [String, Number],
      required: true,
    },
    ariaLabel: String,
    ariaLabelledBy: String,
    disabled: Boolean,
    required: Boolean,
    isInvalid: {
      type: Boolean,
      default: false,
    },
    mode: {
      type: String,
      default: 'card',
      validator: (value) => ['card', 'tile'].includes(value),
    },
    texts: {
      type: Object,
      default: () => ({}),
    },
    lang: {
      type: String,
      default: 'de',
    },
    customRules: {
      type: Array,
      default: () => [],
      validator: (rulesProvided) => rulesProvided.every(
        ({ validate, errorMessage }) => typeof validate === 'function' && typeof errorMessage === 'string',
      ),
    } as PropOptions<customRules>,
  },
  data(): {
    error: null | string;
    } {
    return {
      error: null,
    };
  },
  watch: {
    value() {
      this.validate();
    },
    required() {
      if (this.error) this.validate();
    },
    customRules() {
      if (this.error) this.validate();
    },
  },
  computed: {
    t(): Messages {
      return deepmerge(getMessages(this.lang), this.texts);
    },
    isChecked(): boolean {
      return this.nativeValue === this.value;
    },
    hasValidationErrors(): boolean {
      return Boolean(this.error);
    },
    inputName(): string {
      return `${this.name}-${this.nativeValue}`;
    },
  },
  methods: {
    validateForm() {
      if (this.required && !this.value) return this.t.FORM.VALIDATION.SELECT_ONE_OPTION;

      const firstFailingRule = this.customRules.find(({ validate }) => !validate(this.value));
      if (firstFailingRule) return firstFailingRule.errorMessage;

      return null;
    },
    /**
     * This is a default validate function
     * it is a special function that is automatically
     * invoked by HdForm.
     *
     * By surrounding HdRadioCard with a HdRadioCardGroup
     * this function is automatically overridden.
     *
     */
    validate(): boolean {
      this.error = this.validateForm();
      return !this.hasValidationErrors;
    },
  },
});
</script>

<style lang="scss" scoped>
@import "homeday-blocks/src/styles/mixins.scss";

::v-deep path {
  transition: fill ($time-s * 2);
}

input[type="radio"] {
  display: none;
}

.card {
  position: relative;
  cursor: pointer;
  border: 1px solid getShade($neutral-gray, 60);
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: $sp-m;
  transition: box-shadow ($time-s * 2), border ($time-s * 2);
  @include elevation(0);
}

.card--selected {
  @include elevation(0);
}

label:hover > .card,
label:active > .card {
  @include elevation(2);
}

label:focus > .card {
  box-shadow: 0px 0px 14px getShade($dodger-blue, 110), 0px 0px 1px getShade($dodger-blue, 110);
}

.card--disabled,
label:hover > .card--disabled,
label:active > .card--disabled,
label:focus > .card--disabled {
  cursor: not-allowed;
  border-color: getShade($quaternary-color, 60);
  border-width: 1px;
  @include elevation(0);
}

.card--disabled > .card__icon ::v-deep svg {
  opacity: 0.4;
  filter: grayscale(0.95);
}

.card__border {
  position: absolute;
  inset: -1px;
  border-radius: 4px;
  transition: border ($time-s * 2);
  border: 4px solid transparent;
}

.card--selected:not(.card--disabled) > .card__border,
label:focus > .card:not(.card--disabled) > .card__border {
  border-color: getShade($dodger-blue, 110);
}

label:active > .card:not(.card--disabled)  > .card__border {
  border-width: 2px;
  border-color: getShade($dodger-blue, 110);
}

.card__control-label {
  margin-top: $sp-xs;
  color: $primary-color;
  @include font("DS-100");
}

.card__indicator {
  position: absolute;
  top: $sp-m;
  right: $sp-m;
}

.card--tile {
  flex-direction: row;
  padding: $sp-s;
}

.card--tile > .card__indicator {
  position: relative;
  top: unset;
  right: unset;
  align-self: center;
  order: 1;
}

.card--tile > .card__control-label {
  flex: 1;
  margin-top: 0;
  margin-left: $sp-xs;
  margin-right: $sp-xs;
}

.card--tile ::v-deep svg {
  max-width: rem-calc(44);
  max-height: rem-calc(44);
}

.error {
  display: block;
  margin-top: $sp-s;
  color: $error-color;
  @include font("DS-100");
}
</style>
