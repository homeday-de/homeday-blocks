<template>
  <form class="form" @submit.prevent="submit" novalidate>
    <slot />
  </form>
</template>

<script>
import _cloneDeep from 'lodash/cloneDeep';
import _isEqual from 'lodash/isEqual';
import { scrollToEl } from 'homeday-blocks/src/services/scrolling';

export default {
  name: 'HdForm',
  provide() {
    return {
      addFormField: this.addField,
      removeFormField: this.removeField,
    };
  },
  props: {
    scrollToInvalidField: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      initialFormData: {},
      fields: [],
    };
  },
  created() {
    this.initialFormData = _cloneDeep(this.getFormData());
  },
  methods: {
    getFormData() {
      return this.fields.reduce((formData, field) => ({
        ...formData,
        [field.name]: field.value,
      }), {});
    },
    getInvalidFields() {
      return this.fields.filter((field) => {
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
      const isValid = invalidFields.length === 0;
      const formData = this.getFormData();
      const hasChanged = !_isEqual(formData, this.initialFormData);

      this.$emit('submit', {
        formData,
        isValid,
        hasChanged,
        invalidFields,
      });

      if (!isValid && this.scrollToInvalidField) {
        scrollToEl({ el: invalidFields[0].$el });
      }
    },
    addField(fieldToAdd) {
      this.fields.push(fieldToAdd);

      // If a new field was dynamically added to the form, we add its value to the initial form data
      if (this.initialFormData[fieldToAdd.name] === undefined) {
        this.initialFormData[fieldToAdd.name] = _cloneDeep(fieldToAdd.value);
      }
    },
    removeField(fieldToRemove) {
      this.fields = this.fields.filter(field => field.name === fieldToRemove.name);
    },
  },
};
</script>
