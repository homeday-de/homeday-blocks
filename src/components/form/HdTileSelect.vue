<template>
  <FieldBase
    v-bind="$attrs"
    :name="name"
    :error="error"
    :helper="helper"
    :filled="isFilled"
    minimized-label
    grouped
  >
    <div class="field tile-select">
      <div class="tile-select__items">
        <hd-tile-select-item
          v-for="item in itemsMapped"
          :key="item.value"
          :value="item.value"
          :text="item.text"
          :model="value"
          @input="emitValue"
        />
        <hd-tile-select-editable-item
          v-if="acceptNewValue"
          v-bind="$attrs"
          v-model="customInputModel"
          :text="customInputText"
          :model="value"
        />
      </div>
    </div>
  </FieldBase>
</template>

<script>
/**
 * @typedef ItemEntryObject
 * @type {Object}
 * @property {string}                   text  - Text to be used in the tile
 * @property {(string|number|boolean)}  value - Value associated with the tile
 */

import _get from 'lodash/get';
import _merge from 'lodash/merge';
import { getMessages } from 'homeday-blocks/src/lang';
import HdTileSelectItem from 'homeday-blocks/src/components/HdTileSelectItem.vue';
import HdTileSelectEditableItem from 'homeday-blocks/src/components/HdTileSelectEditableItem.vue';
import FieldBase from './FieldBase.vue';
import formField from './formFieldMixin';

export default {
  name: 'HdTileSelect',
  inheritAttrs: false,
  mixins: [formField],
  components: {
    HdTileSelectItem,
    HdTileSelectEditableItem,
    FieldBase,
  },
  data() {
    return {
      customInputModel: '',
      error: null,
      helper: null,
    };
  },
  props: {
    /** @type {(string|number|boolean|ItemEntryObject)[]} */
    items: {
      type: Array,
      required: true,
      validator(value) {
        return value.length > 1;
      },
    },
    value: {
      type: [String, Number, Boolean],
      default: '',
    },
    name: {
      type: String,
      required: true,
    },
    formatter: {
      type: Function,
      default: (value) => String(value),
    },
    acceptNewValue: {
      type: Boolean,
      default: false,
    },
    required: {
      type: Boolean,
      default: false,
    },
    texts: {
      type: Object,
      default: () => ({}),
    },
  },
  watch: {
    customInputModel(newValue) {
      this.emitValue(newValue);
    },
  },
  computed: {
    t() {
      return _merge(getMessages(this.lang), this.texts);
    },
    itemsMapped() {
      return this.items.map((item) => ({
        value: _get(item, 'value', item),
        text: this.formatter(_get(item, 'text', item)),
      }));
    },
    customInputText() {
      if (this.customInputModel === '') {
        return '+';
      }

      return this.formatter(this.customInputModel);
    },
    isFilled() {
      return this.value !== null && this.value !== undefined && this.value !== '';
    },
  },
  methods: {
    async emitValue(value) {
      this.$emit('input', value);
      await this.$nextTick();
      this.validate();
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

$item-min-size: 100px;
$border-width: 1px;

.tile-select {
  @include font('DS-150');

  &__items {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax($item-min-size, 1fr));
    grid-gap: $border-width;
    flex: 1;
    background-color: getShade($quaternary-color, 60);
    border: $border-width solid getShade($quaternary-color, 60);
    border-radius: 4px;
    font-weight: 600;
    overflow: hidden;
  }
}
</style>
