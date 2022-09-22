<template>
  <hd-tile-select-item
    v-if="!isEditing"
    class="tile-select-editable-item"
    :class="{
      'tile-select-editable-item--selected': isSelected,
    }"
    v-bind="$attrs"
    :value="value"
    @input="enableEditing"
  />
  <input
    v-else
    class="tile-select-editable-item tile-select-editable-item--input"
    :class="{
      'tile-select-editable-item--selected': isSelected,
    }"
    ref="input"
    :value="value"
    v-bind="$attrs"
    @input="$emit('input', $event.target.value)"
    @focus="enableEditing"
    @blur="disableEditing"
    @keydown.enter.prevent.stop="disableEditing"
  />
</template>

<script>
import HdTileSelectItem from 'homeday-blocks/src/components/HdTileSelectItem.vue';

export default {
  name: 'HdTileSelectEditableItem',
  inheritAttrs: false,
  components: {
    HdTileSelectItem,
  },
  props: {
    value: {
      type: [String, Number],
      required: true,
    },
  },
  data() {
    return {
      isEditing: false,
    };
  },
  computed: {
    isSelected() {
      return this.$attrs.model === this.value;
    },
  },
  methods: {
    enableEditing() {
      this.isEditing = true;

      this.$nextTick(() => {
        this.$refs.input.focus();
      });
    },
    disableEditing() {
      this.isEditing = false;
    },
  },
};
</script>

<style lang="scss">
@import 'homeday-blocks/src/styles/mixins.scss';

.tile-select-editable-item {
  background-color: getShade($quaternary-color, 40);

  &--selected {
    background-color: getShade($secondary-color, 110);
    color: white;
  }

  &--input {
    height: 100%;
    width: 100%;
    border: 0;
    padding: 0;
    font-family: inherit;
    font-size: inherit;
    text-align: center;

    // Hide the browser's controls
    -moz-appearance: textfield;
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  }
}
</style>
