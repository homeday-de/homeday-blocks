<template>
  <div class="passwordInput">
    <HdInput
    :type="type"
    v-model="computedValue"
    v-bind="$attrs"
    :class="{ 'field--hasControl': this.showVisibilityToggle }"
    />

    <span v-if="showVisibilityToggle"
      class="field__visibilityToggle"
      :class="{'field__visibilityToggle--visible': type === 'text'}"
      @click="toggleVisibility"
    />
  </div>
</template>

<script>
import HdInput from 'homeday-blocks/src/components/form/HdInput.vue';

export default {
  name: 'HdInputPassword',
  inheritAttrs: false,
  components: {
    HdInput,
  },
  props: {
    value: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      type: 'password',
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
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import 'homeday-blocks/src/styles/mixins.scss';

.passwordInput {
  position: relative;

  .field__visibilityToggle {
    position: absolute;
    right: $inline-s;
    bottom: $stack-m;
    background-image: url('~homeday-blocks/src/assets/icons/ic_visibility-on.svg');
    background-repeat: no-repeat;
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
      width: 24px;
      height: 0px;
      border-bottom: 2px solid $regent-gray;
      border-top: 1px solid $wild-sand;
      transform-origin: left;
      transform: rotateZ(45deg) scaleX(1);
      transition: transform .3s;
    }
    &--visible {
      &:after {
        transform: rotateZ(45deg) scaleX(0);
      }
    }
  }
}
</style>
