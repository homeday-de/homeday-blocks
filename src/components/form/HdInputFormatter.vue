<template>
  <hd-input
    ref="input"
    v-bind="$attrs"
    :name="name"
    :value="valueToShow"
    :type="boundType"
    @blur="handleBlurEvent"
    @focus="handleFocusEvent"
    @input="handleInputEvent"
  />
</template>

<script>
import HdInput from './HdInput.vue';
import formField from './formFieldMixin';

const defaultInputType = 'text';

export default {
  name: 'HdInputFormatter',
  mixins: [formField],
  components: { HdInput },
  inheritAttrs: false,
  props: {
    value: {
      type: [Number, String],
      default: '',
    },
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: defaultInputType,
    },
    formatter: {
      type: Function,
      required: true,
    },
  },
  data() {
    return {
      boundValue: this.value,
      boundType: 'text',
      isFocused: false,
    };
  },
  computed: {
    valueToShow() {
      return this.isFocused ? this.boundValue : this.formatter(this.boundValue);
    },
  },
  watch: {
    value(value) {
      this.boundValue = value;
    },
  },
  methods: {
    handleFocusEvent() {
      this.isFocused = true;
      this.boundType = this.type;
      this.$emit('focus');
    },
    async handleBlurEvent() {
      this.isFocused = false;
      this.boundType = defaultInputType;
      this.$emit('blur');

      await this.$nextTick();

      this.validate();
    },
    handleInputEvent(value) {
      this.$emit('input', value);
    },
    showError(...args) {
      return this.$refs.input.showError(...args);
    },
    showHelper(...args) {
      return this.$refs.input.showHelper(...args);
    },
    validate() {
      return this.$refs.input.validate(this.boundValue);
    },
    hideError(...args) {
      return this.$refs.input.hideError(...args);
    },
  },
};
</script>
