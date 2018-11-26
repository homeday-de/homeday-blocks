<template>
  <form class="dynamic-form" @submit.prevent="submit" novalidate>
    <div v-for="(line, i) in lines" class="dynamic-form__line" :key="`line-${i}`">
      <component
      v-for="item in getItemsArray(line)"
      :is="getComponent(item.type)"
      :key="`input-${item.name}`"
      v-bind="item.props"
      :name="item.name"
      @dataChange="dataChange"
      class="dynamic-form__line__item"
      />
    </div>
    <button class="btn btn--primary dynamic-form__submit">{{ submitLabel }}</button>
  </form>
</template>

<script>
import some from 'lodash/some';
import HdInput from '@/components/form/HdInput.vue';
import HdCheckbox from '@/components/form/HdCheckbox.vue';
import HdRadio from '@/components/form/HdRadio.vue';
import HdPasswordConfirm from '@/components/form/HdPasswordConfirm.vue';

export default {
  name: 'hd-dynamic-form',
  props: {
    submitLabel: String,
    items: Array,
  },
  components: {
    HdInput,
    HdCheckbox,
    HdRadio,
  },
  data() {
    return {
      formData: {},
    };
  },
  computed: {
    lines() {
      return this.items;
    },
  },
  methods: {
    dataChange({ name, value, error }) {
      this.formData[name] = { value, error };
    },
    hasErrors(formData) {
      return some(formData, field => field.error !== null);
    },
    submit() {
      this.$children.forEach((child) => {
        if (child.validityCheck !== undefined) {
          child.validityCheck();
        }
      });
      if (!this.hasErrors(this.formData)) {
        this.$emit('submit', this.formData);
      }
    },
    // Return an array with one item if the current line is an object and not an array
    getItemsArray(line) {
      if (Array.isArray(line)) {
        return line;
      }
      return [line];
    },
    getComponent(type) {
      switch (type) {
        case 'input':
          return HdInput;
        case 'checkbox':
          return HdCheckbox;
        case 'radio':
          return HdRadio;
        case 'passwordConfirm':
          return HdPasswordConfirm;
        default:
          return null;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.dynamic-form {
  &__line {
    display: flex;
    &__item {
      margin-left: $inline-xs;
      margin-right: $inline-xs;
      &:first-of-type {
        margin-left: 0;
      }
      &:last-of-type {
        margin-right: 0;
      }
    }
  }
  &__submit {
    width: 100%;
  }
}
</style>
