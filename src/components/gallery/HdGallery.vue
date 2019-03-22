<template>
  <div class="gallery">
    <HdGalleryMedia
      v-if="hasPhotos"
      :item="currentItem"
      :item-caption="currentItemCaption"
      :aspect-ratio="aspectRatio"
      :shadow="shadow"
    />
    <HdGalleryPlaceholder
      v-else
      :aspect-ratio="aspectRatio"
      v-bind="{icon: placeholderIcon, text: placeholderText}"
    />
    <slot name="middle"/>
    <HdGalleryCarousel
      v-if="hasPhotos"
      :items="items"
      v-model="currentItemIndex"
      :aspect-ratio="aspectRatio"
    />
  </div>
</template>

<script>
import HdGalleryCarousel from 'hd-blocks/components/gallery/HdGalleryCarousel.vue';
import HdGalleryMedia from 'hd-blocks/components/gallery/HdGalleryMedia.vue';
import HdGalleryPlaceholder from 'hd-blocks/components/gallery/HdGalleryPlaceholder.vue';

export default {
  name: 'HdGallery',
  components: {
    HdGalleryCarousel,
    HdGalleryMedia,
    HdGalleryPlaceholder,
  },
  props: {
    items: {
      type: Array,
      default: () => [],
    },
    aspectRatio: {
      type: Number,
      default: 16 / 9,
    },
    placeholderIcon: {
      type: String,
      // eslint-disable-next-line global-require
      default: require('hd-blocks/assets/icons/ic_photos.svg'),
    },
    placeholderText: {
      type: String,
      default: '',
    },
    shadow: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      currentItemIndex: 0,
    };
  },
  computed: {
    currentItem() {
      return this.items[this.currentItemIndex] || this.items[0];
    },
    currentItemCaption() {
      const pageCaption = `${this.currentItemIndex + 1}/${this.items.length}`;

      if (!this.currentItem.caption) {
        return pageCaption;
      }

      return `${pageCaption}: ${this.currentItem.caption}`;
    },
    hasPhotos() {
      return this.items.length > 0;
    },
  },
  watch: {
    currentItem(currentItem, oldCurrentItem) {
      if (currentItem.image === oldCurrentItem.image) {
        return;
      }

      this.$emit('input', currentItem);
    },
  },
};
</script>

<style lang="scss" scoped>
.gallery {
  margin-left: auto;
  margin-right: auto;
}
</style>
