<template>
  <span ref="tooltip" class='hd-tooltip'></span>
</template>

<script>
export default {
  name: 'hd-tooltip',
  mounted() {
    window.tooltipElement = this.$refs.tooltip;
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import 'hd-blocks-src/styles/variables.scss';

.hd-tooltip {
  position: absolute;
  top: 0;
  min-width: 80px;
  text-align: center;
  font-size: 12px;
  line-height: 12px;
  padding: 4px 8px;
  background-color: $nevada;
  border-radius: 5px;
  color: white;
  pointer-events: none;
  opacity: 0;
  z-index: 1000;
  box-shadow: 0 2px 5px 0 rgba(0,0,0,.2);
  &.show {
    animation: fadeInBottom .4s ease-in-out forwards;
    &.left {
      animation: fadeInLeft .4s ease-in-out forwards;
    }
  }
  @keyframes fadeInBottom {
    from { opacity: 0; transform: translateY(-4px); }
    to { opacity: 1; transform: translateY(0px); }
  }
  @keyframes fadeInLeft {
    from { opacity: 0; transform: translateX(4px); }
    to { opacity: 1; transform: translateX(0px); }
  }
}
</style>
