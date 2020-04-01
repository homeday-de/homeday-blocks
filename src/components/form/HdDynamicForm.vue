<template>
  <form class="dynamicForm" @submit.prevent="submit" novalidate>
    <slot name="before"/>
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
    <slot name="before-button"/>
    <HdButton
    v-if="submitLabel"
    modifier="primary"
    class="dynamicForm__submit"
    >
    {{ submitLabel }}
    </HdButton>
    <slot name="after"/>
  </form>
</template>

<script>
import HdInput from 'homeday-blocks/src/components/form/HdInput.vue';
import HdCheckbox from 'homeday-blocks/src/components/form/HdCheckbox.vue';
import HdRadio from 'homeday-blocks/src/components/form/HdRadio.vue';
import HdInputPassword from 'homeday-blocks/src/components/form/HdInputPassword.vue';
import HdPasswordConfirm from 'homeday-blocks/src/components/form/HdPasswordConfirm.vue';
import HdTextarea from 'homeday-blocks/src/components/form/HdTextarea.vue';
import HdSelect from 'homeday-blocks/src/components/form/HdSelect.vue';
import HdTagsSelector from 'homeday-blocks/src/components/form/HdTagsSelector.vue';
import HdSplitInput from 'homeday-blocks/src/components/form/HdSplitInput.vue';
import HdGoogleAutocomplete from 'homeday-blocks/src/components/form/HdGoogleAutocomplete.vue';
import HdButton from 'homeday-blocks/src/components/buttons/HdButton.vue';

export default {
  name: 'HdDynamicForm',
  components: {
    HdButton,
  },
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
      default: undefined,
    },
  },
  data() {
    return {
      formData: {},
    };
  },
  watch: {
    formData: {
      deep: true,
      handler(formData) {
        this.$emit('input', formData);
      },
    },
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
    getInvalidFields() {
      return this.$refs.fields.filter((field) => {
        if (field.validate) {
          return !field.validate();
        }
        return false;
      });
    },
    validate() {
      return this.getInvalidFields().length === 0;
    },
    submit() {
      const invalidFields = this.getInvalidFields();

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
        case 'inputPassword':
          return HdInputPassword;
        case 'checkbox':
          return HdCheckbox;
        case 'radio':
          return HdRadio;
        case 'passwordConfirm':
          return HdPasswordConfirm;
        case 'textarea':
          return HdTextarea;
        case 'select':
          return HdSelect;
        case 'tagsSelector':
          return HdTagsSelector;
        case 'splitInput':
          return HdSplitInput;
        case 'googleAutocomplete':
          return HdGoogleAutocomplete;
        default:
          return null;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import 'homeday-blocks/src/styles/mixins.scss';

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
