<template>
  <HdInput
    ref="input"
    :type="type"
    :name="name"
    v-model="computedValue"
    v-bind="$attrs"
    class="password-input"
  >
    <template #input-right>
      <button v-if="isVisibilityToggleVisible"
        class="password-input__visibility-toggle"
        :class="{'password-input__visibility-toggle--visible': type === 'text'}"
        @click="toggleVisibility"
        type="button"
      >
        <HdIcon
          :src="visibilityOnIcon"
          width="24"
          height="24"
          class="password-input__visibility-toggle-icon"
        />
      </button>
    </template>
  </HdInput>
</template>

<script>
import HdInput from 'homeday-blocks/src/components/form/HdInput.vue';
import HdIcon from 'homeday-blocks/src/components/HdIcon.vue';
import { visibilityOn as visibilityOnIcon } from 'homeday-assets';
import formField from './formFieldMixin';

export default {
  name: 'HdInputPassword',
  mixins: [
    formField,
  ],
  inheritAttrs: false,
  components: {
    HdInput,
    HdIcon,
  },
  props: {
    value: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      type: 'password',
      visibilityOnIcon,
    };
  },
  computed: {
    computedValue: {
      get() { return this.value; },
      set(value) {
        this.$emit('input', value);
      },
    },
    isVisibilityToggleVisible() {
      return this.value.length !== 0;
    },
  },
  methods: {
    toggleVisibility() {
      this.type = this.type === 'password' ? 'text' : 'password';
    },
    showError(...args) {
      return this.$refs.input.showError(...args);
    },
    showHelper(...args) {
      return this.$refs.input.showHelper(...args);
    },
    validate(...args) {
      return this.$refs.input.validate(...args);
    },
    hideError(...args) {
      return this.$refs.input.hideError(...args);
    },
  },
};
</script>

<style lang="scss">
@import 'homeday-blocks/src/styles/mixins.scss';

$icon-color: $quaternary-color;

.password-input {
  &__visibility-toggle {
    background-color: transparent;
    padding: 0;
    border: 0;
    cursor: pointer;

    &:after {
      display: block;
      content: '';
      position: absolute;
      opacity: 1;
      top: 2px;
      left: 3px;
      width: calc(100% - 1px);
      height: 0px;
      border-bottom: 2px solid $icon-color;
      border-top: 1px solid $secondary-bg;
      transform-origin: left;
      transform: rotateZ(45deg) scaleX(1);
      transition: transform .3s;
    }
    &--visible {
      &:after {
        transform: rotateZ(45deg) scaleX(0);
      }
    }

    &-icon {
      display: block;
    }

    path {
      fill: $icon-color;
    }
  }
}
</style>
