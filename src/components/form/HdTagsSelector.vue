<template>
  <section ref="wrapper" class="tags-selector">
    <section class="tags-selector__selected-tags">
      <div
        v-for="(tag, index) in selectedTags"
        :key="tag.value"
        class="tags-selector__selected-tags__tag"
      >
        <div class="tags-selector__selected-tags__tag__label">{{ tag.label }}</div>
        <button class="tags-selector__selected-tags__tag__remove" @click="removeTag(index)">
          <HdIcon :src="closeIcon" width="70%" height="70%" />
        </button>
      </div>
      <button
        ref="panelToggle"
        :class="panelToggleClasses"
        class="tags-selector__selected-tags__panel-toggle"
        @click="togglePanel"
      >
        <HdIcon :src="plusCircleIcon" width="100%" height="100%" />
      </button>
    </section>
    <section ref="panel" :class="panelClasses" class="tags-selector__panel">
      <div
        v-for="tag in items"
        :key="tag.value"
        :class="getTagClasses(tag)"
        class="tags-selector__panel__tag"
        @click="toggleTag(tag)"
      >
        {{ tag.label }}
      </div>
    </section>
  </section>
</template>

<script>
import HdIcon from 'homeday-blocks/src/components/HdIcon.vue';
import { plusCircle as plusCircleIcon, close as closeIcon } from 'homeday-assets';
import formField from './formFieldMixin';

export default {
  name: 'HdTagsSelector',
  mixins: [formField],
  components: {
    HdIcon,
  },
  props: {
    value: {
      type: Array,
      default: () => [],
    },
    name: {
      type: String,
      required: true,
    },
    // Array of items, each item (Object) should have `label` and `value` properties
    items: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      selectedTags: this.value,
      panelVisible: false,
      plusCircleIcon,
      closeIcon,
    };
  },
  computed: {
    panelToggleClasses() {
      return {
        'tags-selector__selected-tags__panel-toggle--close': this.panelVisible,
      };
    },
    panelClasses() {
      return {
        'tags-selector__panel--isVisible': this.panelVisible,
      };
    },
  },
  watch: {
    value(value) {
      this.selectedTags = value;
    },
  },
  mounted() {
    window.addEventListener('click', this.onWindowClick);
    window.addEventListener('keyup', this.onEscPress);
  },
  beforeDestroy() {
    window.removeEventListener('click', this.onWindowClick);
    window.removeEventListener('keyup', this.onEscPress);
  },
  methods: {
    onWindowClick(e) {
      if (this.panelVisible && !this.$refs.wrapper.contains(e.target)) {
        this.hidePanel();
      }
    },
    onEscPress(e) {
      // 27 is keyCode for escape button. This is added,
      // so we can test this part of code
      if (['Escape', 'Esc'].includes(e.key) || e.keyCode === 27) {
        this.hidePanel();
      }
    },
    toggleTag(tag) {
      const tagIndex = this.selectedTags.findIndex((t) => t.value === tag.value);
      if (tagIndex > -1) {
        this.removeTag(tagIndex);
      } else {
        this.addTag(tag);
      }
    },
    addTag(tag) {
      this.selectedTags.push(tag);
      this.$emit('input', this.selectedTags);
      this.repositionPanel();
    },
    removeTag(index) {
      this.selectedTags.splice(index, 1);
      this.$emit('input', this.selectedTags);
      this.repositionPanel();
    },
    togglePanel() {
      if (!this.panelVisible) {
        this.showPanel();
      } else {
        this.hidePanel();
      }
    },
    repositionPanel() {
      if (this.panelVisible) {
        this.$nextTick(() => {
          const { wrapper, panel, panelToggle } = this.$refs;

          if (!wrapper) {
            return;
          }

          const wrapperRect = wrapper.getBoundingClientRect();
          const panelToggleRect = panelToggle.getBoundingClientRect();
          const panelRect = panel.getBoundingClientRect();

          const left = panelToggleRect.left + panelToggleRect.width / 2 - wrapperRect.left;
          const leftOverflow = left + panelRect.width - wrapperRect.width;

          if (leftOverflow > 0) {
            panel.style.left = 'auto';
            panel.style.right = '0px';
          } else {
            panel.style.left = `${left}px`;
            panel.style.right = 'auto';
          }
        });
      }
    },
    showPanel() {
      this.panelVisible = true;
      this.repositionPanel();
    },
    hidePanel() {
      this.panelVisible = false;
    },
    getTagClasses(tag) {
      return {
        'tags-selector__panel__tag--isSelected': this.selectedTags.some(
          (item) => item.value === tag.value
        ),
      };
    },
  },
};
</script>

<style lang="scss" scoped>
@import 'homeday-blocks/src/styles/mixins.scss';

.tags-selector {
  position: relative;
  margin-bottom: $sp-m;
  &__selected-tags {
    display: flex;
    flex-wrap: wrap;
    min-height: #{$sp-l + $sp-s};
    &__tag {
      display: flex;
      align-items: center;
      height: $sp-l;
      background-color: getShade($quaternary-color, 50);
      border-radius: 3px;
      padding: 0 $sp-s;
      margin: $sp-s $sp-s 0 0;
      &__remove {
        display: flex;
        justify-content: center;
        align-content: center;
        width: 24px;
        height: 24px;
        background-color: transparent;
        padding: 0;
        margin-left: $sp-s;
        border: 0;
        border-radius: 50%;
        cursor: pointer;

        transition: background-color $time-s;
        &:hover {
          background-color: rgba(0, 0, 0, 0.1);
        }
      }
    }
    &__panel-toggle {
      width: 24px;
      height: 24px;
      background: transparent;
      padding: 0;
      margin-top: #{$sp-s + $sp-xs};
      margin-left: $sp-xs;
      border: 0;
      cursor: pointer;
      transition: transform $time-s ease-in-out;
      &--close {
        transform: rotateZ(45deg);
      }

      &::v-deep path {
        fill: getShade($secondary-color, 110);
      }
    }
  }
  &__panel {
    display: none;
    flex-wrap: wrap;
    position: absolute;
    top: 100%;
    max-width: 300px;
    background-color: $secondary-bg;
    border-radius: 3px;
    padding: $sp-xs;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.23);
    opacity: 0;
    z-index: 5;
    transition: left $time-s ease-out;
    &__tag {
      background-color: $primary-bg;
      border: 1px solid getShade($secondary-color, 110);
      border-radius: 3px;
      padding: 0 $sp-s;
      margin: $sp-xs;
      cursor: pointer;
      transition: background-color $time-s ease-in-out;
      &--isSelected {
        background-color: getShade($secondary-color, 110);
        color: $white;
      }
    }
    &--isVisible {
      display: inline-flex;
      animation: fadeIn $time-s forwards;
    }
  }
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
}
</style>
