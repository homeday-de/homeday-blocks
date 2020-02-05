<template>
  <div
    :class="{
      'zoomer-gallery': true,
      isZoomed,
  }">
    <p class="zoomer-gallery__caption">{{ currentItemCaption || '&#8203;' }}</p>
    <v-zoomer-gallery
      :list="images"
      :overflow-hidden="false"
      v-model="currentItemIndex"
      background-color="transparent"
      class="zoomer-gallery__main"
      @zoomedChange="onZoomedChange"
    />
    <p class="zoomer-gallery__info">
      {{ `${currentItemIndex + 1}/${items.length}` }}
    </p>
  </div>
</template>

<script>
import VZoomerGallery from 'vue-zoomer/src/vue-zoomer-gallery.vue';

export default {
  name: 'HdZoomerGallery',
  components: {
    VZoomerGallery,
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
  data() {
    return {
      isZoomed: false,
      currentItemIndex: this.startIndex,
    };
  },
  computed: {
    currentItem() {
      return this.items[this.currentItemIndex] || this.items[0];
    },
    currentItemCaption() {
      return this.currentItem.caption;
    },
    images() {
      return this.items.map(({ image }) => image);
    },
  },
  methods: {
    onZoomedChange(isZoomed) {
      this.isZoomed = isZoomed;
    },
  },
};
</script>

<style lang="scss" scoped>
@import 'homeday-blocks/src/styles/mixins.scss';

.zoomer-gallery {
  $_root: &;

  display: flex;
  flex-direction: column;
  position: relative;

  &__main {
    width: 100%;
    height: 100%;
  }

  &__caption {
    margin-bottom: $stack-s;
    margin-left: $inline-m;
    transition: opacity .5s ease-in-out;

    #{$_root}.isZoomed & {
      opacity: 0;
    }
  }

  &__info {
    position: absolute;
    right: $inline-m;
    bottom: $stack-xs;
    padding-right: $inline-s;
    padding-left: $inline-s;
    background-color: rgba(0, 0, 0, 0.8);
    @include font('text-xsmall');
    font-weight: 600;
    color: white;
    border-radius: 2px;
    transition: opacity .5s ease-in-out;

    #{$_root}.isZoomed & {
      opacity: 0;
    }
  }
}
</style>
