<template>
  <FieldBase
    v-bind="$attrs"
    :name="name"
    :label="label"
    :error="error"
    :helper="helper"
    :active="isActive"
    :disabled="disabled"
    minimized-label
    grouped
    #default="{ labelId }"
  >
    <div
      @keydown="setUsingMouse(false)"
      @mousedown="setUsingMouse(true)"
      class="checkbox"
      :class="{
        ['checkbox--active']: isActive,
        ['checkbox--disabled']: disabled,
        ['checkbox--checked']: isChecked,
        ['checkbox--indeterminate']: boundIndeterminate,
        ['checkout--use-mouse']: isUsingMouse,
      }"
      :key="name+error+isChecked"
    >
      <input
        class="checkbox__input"
        type="checkbox"
        role="checkbox"
        :name="name"
        :disabled="disabled"
        v-model="isChecked"
      />
      <div
        :ref="name"
        :aria-checked="isChecked"
        :aria-labelledby="labelId"
        :tabindex="disabled ? -1 : 0"
        class="checkbox__inner"
        @click="toggle"
        role="checkbox"
        @keydown.space.enter.prevent="toggle"
        @focus="handleFocus"
        @blur="handleBlur"
      >
        <HdCheckboxIndicator
          :checked="isChecked"
          :disabled="disabled"
          :invalid="Boolean(error)"
          :indeterminated="boundIndeterminate"
        />

        <p
          v-if="innerLabel"
          v-html="innerLabel"
          class="checkbox__description"
        />
      </div>
    </div>
  </FieldBase>
</template>

<script>
import merge from 'lodash/merge';
import { getMessages } from 'homeday-blocks/src/lang';
import formField from './formFieldMixin';
import FieldBase from './FieldBase.vue';
import HdCheckboxIndicator from './HdCheckboxIndicator.vue';

export default {
  name: 'HdCheckbox',
  mixins: [
    formField,
  ],
  components: {
    FieldBase,
    HdCheckboxIndicator,
  },
  props: {
    name: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      default: '',
    },
    innerLabel: {
      type: String,
      default: '',
    },
    value: {
      type: Boolean,
      default: false,
    },
    required: {
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
    indeterminate: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      error: null,
      isActive: false,
      isUsingMouse: false,
      helper: null,
      boundIndeterminate: this.indeterminate,
    };
  },
  computed: {
    t() {
      return merge(getMessages(this.lang), this.texts);
    },
    isChecked: {
      get() {
        return this.value;
      },
      set() {
        this.toggle();
      },
    },
  },
  methods: {
    toggle() {
      this.$emit('input', !this.isChecked);
      this.$nextTick(() => {
        this.validate();
        const element = this.$refs[this.name];
        if (element) element.focus();
      });
    },
    handleFocus() {
      this.isActive = true;
    },
    handleBlur() {
      this.isActive = false;
      this.validate();
    },
    validate() {
      if (this.required && !this.isChecked) {
        this.error = this.t.FORM.VALIDATION.REQUIRED;
      } else {
        this.error = null;
      }
      return !this.error;
    },
    setUsingMouse(usingMouse) {
      this.isUsingMouse = usingMouse;
    },
  },
  watch: {
    isChecked() {
      if (this.boundIndeterminate) {
        this.boundIndeterminate = false;
      }
    },
    indeterminate(newIndeterminate) {
      this.boundIndeterminate = newIndeterminate;
    },
  },
};
</script>

<style lang="scss" scoped>
@import 'homeday-blocks/src/styles/mixins.scss';

$checkbox-width: 20px;

.field {
  margin-bottom: $sp-m;
  ::v-deep .field__helper {
    padding-left: #{$checkbox-width + $sp-s};
  }
}

.checkbox {
  $c: &;
  position: relative;
  cursor: default;

  &:hover, &:focus, &.checkbox--active {
    outline: 0;
  }

  &--disabled {
    pointer-events: none;
    color: getShade($quaternary-color, 70);
  }

  &__input {
    display: none;
  }

  &__description {
    flex: 1;
    margin: 0 0 0 $sp-s;
    text-align: left;
    @include font("DS-100");
  }

  &__use-mouse {
    outline: 0;
  }

  &__inner {
    display: flex;
    align-items: center;
    transition: outline 0.1s ease-in-out;

    &:focus {
      outline: 0;
    }
  }
}
</style>
