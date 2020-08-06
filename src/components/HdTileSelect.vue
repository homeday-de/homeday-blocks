<template>
  <div class="field tile-select">
    <div class="tile-select__items">
      <hd-tile-select-item
        v-for="item in itemsMapped"
        :key="item.value"
        :value="item.value"
        :text="item.text"
        :model="value"
        @input="$emit('input', $event)"
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
</template>

<script>
/**
 * @typedef ItemEntryObject
 * @type {Object}
 * @property {string}                   text  - Text to be used in the tile
 * @property {(string|number|boolean)}  value - Value associated with the tile
 */

import _get from 'lodash/get';
import HdTileSelectItem from 'homeday-blocks/src/components/HdTileSelectItem.vue';
import HdTileSelectEditableItem from 'homeday-blocks/src/components/HdTileSelectEditableItem.vue';

export default {
  name: 'HdTileSelect',
  inheritAttrs: false,
  components: {
    HdTileSelectItem,
    HdTileSelectEditableItem,
  },
  data() {
    return {
      customInputModel: '',
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
    formatter: {
      type: Function,
      default: value => (String(value)),
    },
    acceptNewValue: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    customInputModel(newValue) {
      this.$emit('input', newValue);
    },
  },
  computed: {
    itemsMapped() {
      return this.items.map(item => ({
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
  },
};
</script>

<style lang="scss" scoped>
@import "homeday-blocks/src/styles/mixins.scss";

$item-min-size: 100px;
$border-width: 1px;

.tile-select {
  @include font('text-xsmall');

  &__items {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax($item-min-size, 1fr));
    grid-gap: $border-width;
    background-color: getShade($quaternary-color, 60);
    border: $border-width solid getShade($quaternary-color, 60);
    border-radius: 4px;
    font-weight: 600;
    overflow: hidden;
  }
}
</style>
