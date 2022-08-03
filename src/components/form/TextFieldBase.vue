<template>
  <FieldBase
    v-bind="$attrs"
    class="text-field"
    :class="{ 'with-infobox': withInfoMessage }"
    @focusin.native="onFieldFocusIn"
    @focusout.native="onFieldFocusOut"
  >
    <slot />
    <template #input-right>
      <slot
        v-if="$slots['input-right']"
        name="input-right"
      />
      <HdIcon
        v-else-if="isValidationCheckVisible"
        :src="checkIcon"
        width="24"
        height="24"
        class="text-field__status-icon text-field__status-icon--valid"
        @click.native="$emit('status-click')"
      />
      <HdIcon
        v-else-if="withInfoMessage"
        :src="infoIcon"
        width="24"
        height="24"
        @click.native="openModal"
      />
      <button
        v-else-if="isClearButtonVisible"
        type="button"
        class="text-field__clear-button"
        @click="$emit('clear-click')"
        @focus="onClearButtonFocus"
        @blur="onClearButtonBlur"
      >
        <HdIcon
          :src="closeIcon"
          width="20"
          height="20"
        />
      </button>
      <HdIcon
        v-else-if="isErrorStatusVisible"
        :src="errorIcon"
        width="24"
        height="24"
        class="text-field__status-icon text-field__status-icon--error"
        @click.native="$emit('status-click')"
      />
    </template>
    <hd-modal
      v-if="isModalShown"
      :is-close-button-visible="true"
      @close="closeModal"
    >
      <template #title>
        {{ $attrs.label }}
      </template>
      <template #body>
        <p class="hd-modal__paragraph"> {{ withInfoMessage }} </p>
      </template>
    </hd-modal>
  </FieldBase>
</template>

<script>
import HdIcon from 'homeday-blocks/src/components/HdIcon.vue';
import HdModal from 'homeday-blocks/src/components/HdModal.vue';

import {
  close as closeIcon,
  error as errorIcon,
  check as checkIcon,
  info as infoIcon,
} from 'homeday-assets';
import FieldBase from './FieldBase.vue';

export default {
  name: 'TextFieldBase',
  inheritAttrs: false,
  components: {
    FieldBase,
    HdIcon,
    HdModal,
  },
  props: {
    withValidationCheck: {
      type: Boolean,
      default: false,
    },
    withInfoMessage: {
      type: String,
      default: () => undefined,
    },
  },
  data() {
    return {
      hasFocus: false,
      isButtonFocused: false,
      isModalShown: false,
      closeIcon,
      errorIcon,
      checkIcon,
      infoIcon,
    };
  },
  computed: {
    isClearButtonVisible() {
      return this.$attrs.filled && this.hasError && this.hasFocus;
    },
    isErrorStatusVisible() {
      return this.hasError && !this.$attrs.active;
    },
    isValidationCheckVisible() {
      return this.withValidationCheck
        && this.$attrs.valid
        && this.$attrs.filled;
    },
    hasError() {
      return Boolean(this.$attrs.error);
    },
  },
  methods: {
    onFieldFocusIn() {
      this.hasFocus = true;
    },
    onFieldFocusOut({ relatedTarget }) {
      if (!this.$el.contains(relatedTarget)) {
        this.hasFocus = false;
      }
    },
    onClearButtonFocus() {
      this.isButtonFocused = true;
    },
    onClearButtonBlur() {
      this.isButtonFocused = false;
    },
    openModal() {
      this.isModalShown = true;
    },
    closeModal() {
      this.isModalShown = false;
    },
  },
};
</script>

<style lang="scss">
@import 'homeday-blocks/src/styles/mixins.scss';

.text-field {
  &__clear-button {
    $clear-button: &;
    display: flex;
    position: relative;
    border: 0;
    outline: 0;
    background: transparent;
    padding: $sp-xxs;
    cursor: pointer;

    &::before {
      content: '';
      display: block;
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background-color: rgba(0,0,0,.07);
      border-radius: 50%;
      transform: scale(0);
      opacity: .5;
      transition: transform .2s, opacity .2s;
    }

    &:hover, &:focus, &:active {
      &::before {
        transform: scale(1);
        opacity: 1;
      }
    }
    &:active {
      &::before {
        background-color: rgba(0,0,0,.1);
      }
    }

    path {
      fill: $quaternary-color;
    }
  }

  &__status-icon {
    path {
      fill: currentColor;
    }
    &--error {
      color: $error-color;
    }
    &--valid {
      color: $success-color;
    }
  }
}

.with-infobox .field__input-right {
  svg path {
    fill: getShade($secondary-color, 110);
  }
}
</style>
