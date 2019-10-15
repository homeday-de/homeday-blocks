<template>
  <button
    class="btn btn--primary"
    :disabled="disabled"
  >
    {{ label }}
  </button>
</template>

<script>
export default {
  name: 'HdPrimaryButton',
  props: {
    label: {
      required: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
.btn {
  width: 100%;
}
</style>
