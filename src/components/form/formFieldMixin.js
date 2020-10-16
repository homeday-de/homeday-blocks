export default {
  inject: {
    addFormField: {
      default: null,
    },
    removeFormField: {
      default: null,
    },
  },
  // We overwrite the injected methods for the children
  // to avoid add the children fields to the form as well
  // in case the component is composed of other form field, e.g. HdInputFormatter
  provide: {
    addFormField: () => {},
    removeFormField: () => {},
  },
  created() {
    if (typeof this.addFormField === 'function') {
      this.addFormField(this);
    }
  },
  beforeDestroy() {
    if (typeof this.addFormField === 'function') {
      this.removeFormField(this);
    }
  },
};
