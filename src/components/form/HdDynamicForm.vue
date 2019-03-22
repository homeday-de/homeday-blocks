<template>
  <form class="dynamicForm" @submit.prevent="submit" novalidate>
    <div v-for="(line, i) in lines" class="dynamicForm__line" :key="`line-${i}`">
      <component
      v-for="item in getItemsArray(line)"
      ref="fields"
      :is="getComponent(item.type)"
      :key="`input-${item.name}`"
      v-model="formData[item.name]"
      v-bind="item.props"
      :name="item.name"
      class="dynamicForm__line__item"
      :lang="lang"
      />
    </div>
    <button
      v-if="submitLabel"
      class="btn btn--primary dynamicForm__submit"
    >{{ submitLabel }}</button>
  </form>
</template>

<script>
import HdInput from 'hd-blocks/components/form/HdInput.vue';
import HdCheckbox from 'hd-blocks/components/form/HdCheckbox.vue';
import HdRadio from 'hd-blocks/components/form/HdRadio.vue';
import HdPasswordConfirm from 'hd-blocks/components/form/HdPasswordConfirm.vue';

export default {
  name: 'HdDynamicForm',
  props: {
    submitLabel: {
      type: String,
      default: '',
    },
    items: {
      type: Array,
      default: () => [],
    },
    lang: {
      type: String,
      default: '',
    },
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
  created() {
    this.initializeFormData(this.items);
  },
  computed: {
    lines() {
      return this.items;
    },
  },
  methods: {
    initializeFormData(array) {
      const flattenedArray = array.reduce((flatArray, item) => [
        ...flatArray,
        ...this.getItemsArray(item),
      ], []);
      flattenedArray.forEach((item) => {
        this.$set(this.formData, item.name, item.initialValue);
      });
    },
    submit() {
      const invalidFields = this.$refs.fields.filter((field) => {
        if (field.validate) {
          return !field.validate();
        }
        return false;
      });

      this.$emit('submit', {
        data: this.formData,
        isValid: invalidFields.length === 0,
        invalidFields,
      });
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

.dynamicForm {
  &__line {
    display: flex;
    &__item {
      flex: 1;
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
