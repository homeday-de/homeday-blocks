<template>
  <button
    class="tile-select-item"
    type="button"
    :class="{
      'tile-select-item--selected': isSelected,
    }"
    @click="emitInput"
    @keydown.enter.space.prevent="emitInput"
  >
    {{ text || value }}
  </button>
</template>

<script>
export default {
  name: 'HdTileSelectItem',
  model: {
    prop: 'model',
  },
  props: {
    model: {
      type: [String, Number, Boolean],
      default: '',
    },
    value: {
      type: [String, Number, Boolean],
      required: true,
    },
    text: {
      type: String,
      default: '',
    },
  },
  computed: {
    isSelected() {
      return this.model === this.value;
    },
  },
  methods: {
    emitInput() {
      this.$emit('input', this.value);
    },
  },
};
</script>

<style lang="scss">
@import "homeday-blocks/src/styles/mixins.scss";

.tile-select-item {
  cursor: pointer;
  width: 100%;
  background-color: white;
  border: 0;
  padding: $sp-m;
  font-family: inherit;
  font-size: inherit;
  font-weight: inherit;
  color: inherit;

  &:hover {
    color: $secondary-color;
    box-shadow: 0 0 5px 1px rgba(0, 0, 0, .4);
    z-index: 2;
  }

  &--selected {
    background-color: getShade($secondary-color, 110);
    color: white;
    box-shadow: 0 0 5px 1px rgba(0, 0, 0, .4);
    z-index: 1;

    &:hover {
      color: white;
    }
  }
}
</style>
