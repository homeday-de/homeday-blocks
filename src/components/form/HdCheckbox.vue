<template>
  <div
    :class="{
      'checkbox': true,
      isChecked,
      hasError: !!error,
    }">
    <input
      class="checkbox__input"
      type="checkbox"
      :name="name"
      v-model="isChecked"/>
    <div
      class="checkbox__inner"
      tabindex="0"
      @click="toggle"
      @keydown.space.enter.prevent="toggle">
      <div class="checkbox__inner__box">
        <div class="checkbox__inner__box__overlay"></div>
        <div class="checkbox__inner__box__border"></div>
        <div class="checkbox__inner__box__tick"></div>
      </div>
      <p class="checkbox__inner__label">{{ label }}</p>
    </div>
    <p class="field__error checkbox__error">{{ error }}</p>
  </div>
</template>

<script>
import { getMessages } from 'hd-blocks/lang';

export default {
  name: 'hdCheckbox',
  props: {
    name: String,
    label: String,
    checked: Boolean,
    required: Boolean,
    lang: String,
  },
  data() {
    return {
      isChecked: !!this.checked,
      error: null,
      t: {},
    };
  },
  created() {
    this.t = getMessages(this.lang);
    this.$emit('dataChange', { name: this.name, value: this.isChecked, error: this.error });
  },
  methods: {
    toggle() {
      this.isChecked = !this.isChecked;
      this.error = null;
      this.$emit('dataChange', { name: this.name, value: this.isChecked, error: this.error });
    },
    validityCheck() {
      this.validate();
      this.$emit('dataChange', { name: this.name, value: this.isChecked, error: this.error });
    },
    validate() {
      if (this.required && !this.isChecked) {
        this.error = this.t.FORM.VALIDATION.REQUIRED;
      } else {
        this.error = null;
      }
    },
  },
};
</script>

<style lang="scss" scoped>

.checkbox {
  $_c: &;
  position: relative;
  margin-bottom: 26px;
  cursor: default;
  &__input {
    display: none;
  }
  &__inner {
    display: flex;
    align-items: center;
    &__box {
      position: relative;
      flex: 0 0 20px;
      width: 20px;
      height: 20px;
      cursor: pointer;
      border-radius: 3px;
      overflow: hidden;
      outline-width: 0;
      &__overlay {
        display: block;
        position: absolute;
        top:0; left:0;
        width: 100%;
        height: 100%;
        background-color: $vivid-blue;
        border-radius: 50%;
        transform: scale(0);
        opacity: 0;
        transition: transform .3s, opacity .2s;
        .isChecked & {
          transform: scale(1.3);
          opacity: 1;
        }
      }
      &__border {
        display: block;
        position: absolute;
        top:0; left:0;
        width: 100%;
        height: 100%;
        border-radius: 3px;
        border: 2px solid $nevada;
        transition: border-color .3s;
        #{$_c}.isChecked & {
          border-color: transparent;
        }
        #{$_c}.hasError & {
          border-color: $torch-red;
        }
      }
      &__tick {
        position: absolute;
        top:0; left:0;
        width: 100%;
        height: 100%;
        background-image: url('~hd-blocks/assets/icons/ic_checkmark-white.svg');
        background-repeat: no-repeat;
        background-position: center;
        background-size: 20px;
        opacity: 0;
        transition: opacity .2s;
        #{$_c}.isChecked & {
          opacity: 1;
        }
      }
    }
    &__label {
      flex: 1;
      margin: 0 0 0 $inline-s;
      text-align: left;
      @include font('text-small');
    }
  }
  &__error {
    #{$_c}.hasError & {
      display: block;
    }
  }
}
</style>
