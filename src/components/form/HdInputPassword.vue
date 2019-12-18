<template>
  <div
    class="passwordInput"
  >
    <HdInput
    :type="currentType"
    v-model="currentValue"
    v-bind="$props"
    :class="{ 'field--hasControl': this.showVisibilityToggle }"
    />

    <span v-if="showVisibilityToggle"
      class="field__visibilityToggle"
      :class="{'field__visibilityToggle--visible': currentType === 'text'}"
      @click="togglePasswordVisibility"
    />
  </div>
</template>

<script>
import HdInput from 'hd-blocks/components/form/HdInput.vue';

export default {
  name: 'HdInputPassword',
  components: {
    HdInput,
  },
  props: {
    ...HdInput.props,
  },
  data() {
    return {
      currentValue: this.value,
      currentType: 'password',
    };
  },
  computed: {
    showVisibilityToggle() {
      return this.currentValue.length !== 0;
    },
  },
  watch: {
    value() {
      this.currentValue = this.value;
    },
  },
  methods: {
    togglePasswordVisibility() {
      this.currentType = this.currentType === 'password' ? 'text' : 'password';
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

.passwordInput {
  position: relative;

  .field__visibilityToggle {
    position: absolute;
    right: $inline-s;
    bottom: $stack-m;
    background-image: url('~hd-blocks/assets/icons/ic_visibility-on.svg');
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
