<template>
  <form ref="form" class="form" @submit.prevent="submit" novalidate>
    <slot />
  </form>
</template>

<script>
import _cloneDeep from 'lodash/cloneDeep';
import _isEqual from 'lodash/isEqual';
import _isNil from 'lodash/isNil';
import { scrollToEl } from 'homeday-blocks/src/services/scrolling';
import { formatNestedData } from 'homeday-blocks/src/services/utils';

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
  computed: {
    fieldsValues() {
      return this.fields.map((field) => field.value);
    },
  },
  created() {
    this.initialFormData = _cloneDeep(this.getFormData());
  },
  watch: {
    fieldsValues() {
      const formData = formatNestedData(this.getFormData());
      const initialFormData = formatNestedData(this.initialFormData);
      const hasChanged = !_isEqual(formData, initialFormData);
      const areAllFieldsValid = this.$refs.form.checkValidity() && this.validate();
      this.$emit('change', { hasChanged, areAllFieldsValid });
    },
  },
  methods: {
    getFormData() {
      return this.fields.reduce(
        (formData, field) => ({
          ...formData,
          [field.name]: field.value,
        }),
        {}
      );
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
      const formData = formatNestedData(this.getFormData());
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
      if (_isNil(fieldToAdd.name)) {
        // eslint-disable-next-line no-console
        console.warn('The field must have a `name` property to be added to the HdForm', fieldToAdd);
        return;
      }

      this.fields.push(fieldToAdd);

      if (this.isDynamicallyAddedField(fieldToAdd.name)) {
        this.initialFormData[fieldToAdd.name] = _cloneDeep(fieldToAdd.value);
      }
    },
    isDynamicallyAddedField(fieldName) {
      return this.initialFormData[fieldName] === undefined;
    },
    removeField(fieldToRemove) {
      this.fields = this.fields.filter((field) => field.name !== fieldToRemove.name);
    },
  },
};
</script>
