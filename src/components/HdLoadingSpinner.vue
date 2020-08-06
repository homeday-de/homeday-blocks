<template>
  <svg
    class="loading-spinner"
    viewBox="0 0 66 66"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle
      class="loading-spinner__path"
      fill="none"
      stroke-width="3"
      stroke-linecap="round"
      cx="33"
      cy="33"
      r="30"
    />
  </svg>
</template>

<script>
export default {
  name: 'HdLoadingSpinner',
};
</script>

<style lang="scss" scoped>
@import "@/styles/mixins.scss";
.loading-spinner {
  width: 40px;
  height: 40px;
  animation: spinnerAnim 1.4s linear infinite;
  z-index: 1;
  &__path {
    stroke-dasharray: 187;
    stroke-dashoffset: 0;
    transform-origin: center;
    stroke: getShade($secondary-color, 110);
    animation: pathAnim 1.4s ease-in-out infinite;
  }
}
@keyframes spinnerAnim {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(270deg);
  }
}
@keyframes pathAnim {
  0% {
    stroke-dashoffset: 187;
  }
  50% {
    stroke-dashoffset: 46;
    transform: rotate(135deg);
  }
  100% {
    stroke-dashoffset: 187;
    transform: rotate(450deg);
  }
}
</style>
