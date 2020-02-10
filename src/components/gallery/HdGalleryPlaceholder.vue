<template>
  <div class="gallery-placeholder">
    <div
      :style="sizerStyles"
      class="gallery-placeholder__sizer"
    />
    <div class="gallery-placeholder__content">
      <img
        :src="icon"
        class="gallery-placeholder__content__icon"
      >
      <p class="gallery-placeholder__content__text">
        {{ text }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HdGalleryPlaceholder',
  props: {
    icon: {
      type: String,
      default: '',
    },
    text: {
      type: String,
      default: '',
    },
    aspectRatio: {
      type: Number,
      default: 16 / 9,
    },
  },
  computed: {
    sizerStyles() {
      return {
        paddingTop: `${100 / this.aspectRatio}%`,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
@import 'homeday-blocks/src/styles/mixins.scss';

.gallery-placeholder {
  position: relative;
  margin-bottom: $stack-s;
  background-color: $secondary-bg;
  &__content {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    &__icon {
      height: 100px;
      @media (min-width: $break-tablet) {
        height: 155px;
      }
    }
    &__text {
      margin-top: $stack-xs;
      @media (min-width: $break-tablet) {
        margin-top: $stack-l;
      }
    }
  }
}
</style>
