<template>
  <div class="password-input">
    <HdInput
      ref="input"
      :type="type"
      v-model="computedValue"
      v-bind="$attrs"
      :class="{ 'field--hasControl': this.showVisibilityToggle }"
    />

    <span v-if="showVisibilityToggle"
      class="field__visibilityToggle"
      :class="{'field__visibilityToggle--visible': type === 'text'}"
      @click="toggleVisibility"
    >
      <HdIcon
        :src="visibilityOnIcon"
        width="100%"
        height="100%"
      />
    </span>
  </div>
</template>

<script>
import HdInput from 'homeday-blocks/src/components/form/HdInput.vue';
import HdIcon from 'homeday-blocks/src/components/HdIcon.vue';
import { visibilityOnIcon } from 'homeday-blocks/src/assets/small-icons';

export default {
  name: 'HdInputPassword',
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
    showVisibilityToggle() {
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import 'homeday-blocks/src/styles/mixins.scss';
@import 'homeday-blocks/src/styles/inputs.scss';

$icon-color: getShade($quaternary-color, 80);

.passwordInput {
  position: relative;

  .field__visibilityToggle {

    position: absolute;
    top: $inputPaddingTop;
    right: $inline-s;
    width: 24px;
    height: 24px;
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
      border-top: 1px solid $inputBackground;
      transform-origin: left;
      transform: rotateZ(45deg) scaleX(1);
      transition: transform .3s;
    }
    &--visible {
      &:after {
        transform: rotateZ(45deg) scaleX(0);
      }
    }

    &::v-deep path {
      fill: $icon-color;
    }
  }
}
</style>
