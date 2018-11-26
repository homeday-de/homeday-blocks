<template>
  <button class="button" @click="handleClick">
    {{ label }}
  </button>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    label: String,
  },
  methods: {
    handleClick() {
      this.$emit('click');
    },
  },
};
</script>

<style scoped lang="scss">
.button {
  outline: 2px solid $vivid-blue;
  width: 200px;
}
</style>
