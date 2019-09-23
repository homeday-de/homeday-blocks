<template>
  <section class="gallery-overlay">
    <button
      ref="closeBtn"
      class="gallery-overlay__close"
      @click="$emit('close')"
    />
    <HdGallery
      ref="gallery"
      :items="items"
      :aspect-ratio="16/9"
      :disable-key-events="true"
      :start-index="startIndex"
      class="gallery-overlay__gallery"
    />
    <HdZoomerGallery
      :items="items"
      :start-index="startIndex"
      class="gallery-overlay__zoomer-gallery"
    />
  </section>
</template>

<script>
import {
  freezeScrolling,
  unfreezeScrolling,
} from 'hd-blocks/services/scrolling';
import HdGallery from 'hd-blocks/components/gallery/HdGallery.vue';
import HdZoomerGallery from 'hd-blocks/components/gallery/HdZoomerGallery.vue';

export default {
  name: 'HdGalleryOverlay',
  components: {
    HdGallery,
    HdZoomerGallery,
  },
  props: {
    items: {
      type: Array,
      default: () => [],
    },
    startIndex: {
      type: Number,
      default: 0,
    },
  },
  mounted() {
    freezeScrolling(this.$el);
    window.addEventListener('keydown', this.onKeydown);
    this.$refs.closeBtn.focus();
  },
  beforeDestroy() {
    unfreezeScrolling(this.$el);
    window.removeEventListener('keydown', this.onKeydown);
  },
  methods: {
    onKeydown(e) {
      if (['Right', 'ArrowRight'].includes(e.key)) {
        this.$refs.gallery.goNext();
      } else if (['Left', 'ArrowLeft'].includes(e.key)) {
        this.$refs.gallery.goPrev();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.gallery-overlay {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  z-index: 100;
  padding: $stack-m 0;
  overflow-x: hidden;
  overflow-y: auto;
  background-color: rgba(white, .9);
  animation: fadeIn .5s;

  @media (min-width: $break-tablet) and (min-height: 800px) {
    padding: $inset-xl;
  }

  &__gallery {
    display: none;
    width: 100%;
    max-width: 1000px;
    margin: auto;

    @media (min-width: $break-tablet) {
      display: block;
    }
  }

  &__zoomer-gallery {
    width: 100%;
    height: 100%;

    @media (min-width: $break-tablet) {
      display: none;
    }
  }

  &__close {
    position: absolute;
    top: $stack-s;
    right: $inline-s;
    background: url('~hd-blocks/assets/icons/ic_close--white-stroke.svg') no-repeat center / contain;
    width: 24px;
    height: 24px;
    padding: 0;
    border: 0;
    z-index: 10;
    cursor: pointer;
  }
}
</style>
