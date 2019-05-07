<template>
  <section
    ref="wrapper"
    class="tags-selector">
    <section class="tags-selector__selected-tags">
      <div
        v-for="(tag, index) in selectedTags"
        :key="tag.value"
        class="tags-selector__selected-tags__tag">
        <div class="tags-selector__selected-tags__tag__label">{{ tag.label }}</div>
        <div
          role="button"
          class="tags-selector__selected-tags__tag__remove"
          @click="removeTag(index)"/>
      </div>
      <img
        ref="panelToggle"
        :class="panelToggleClasses"
        class="tags-selector__selected-tags__panel-toggle"
        src="~hd-blocks/assets/icons/ic_add-circle--blue.svg"
        alt="Add"
        role="button"
        @click="togglePanel">
    </section>
    <section
      ref="panel"
      :class="panelClasses"
      class="tags-selector__panel">
      <div
        v-for="tag in items"
        :key="tag.value"
        :class="getTagClasses(tag)"
        class="tags-selector__panel__tag"
        @click="toggleTag(tag)">
        {{ tag.label }}
      </div>
    </section>
  </section>
</template>

<script>
export default {
  name: 'HdTagsSelector',
  props: {
    value: {
      type: Array,
      default: () => [],
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
      const tagIndex = this.selectedTags.findIndex(t => t.value === tag.value);
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
          const wrapperRect = wrapper.getBoundingClientRect();
          const panelToggleRect = panelToggle.getBoundingClientRect();
          const panelRect = panel.getBoundingClientRect();

          const left = (panelToggleRect.left + (panelToggleRect.width / 2)) - wrapperRect.left;
          const leftOverflow = (left + panelRect.width) - wrapperRect.width;

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
        'tags-selector__panel__tag--isSelected':
          this.selectedTags.some(item => item.value === tag.value),
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.tags-selector {
  position: relative;
  margin-bottom: $stack-m;
  &__selected-tags {
    display: flex;
    flex-wrap: wrap;
    min-height: #{$stack-l + $stack-s};
    &__tag {
      display: flex;
      align-items: center;
      height: $stack-l;
      background-color: rgba($heather, 0.5);
      border-radius: 3px;
      padding: 0 $inline-s;
      margin: $stack-s $inline-s 0 0;
      &__remove {
        width: 24px;
        height: 24px;
        background-image: url('~hd-blocks/assets/icons/ic_close.svg');
        background-repeat: no-repeat;
        background-size: $inset-m;
        background-position: center;
        border-radius: 50%;
        margin-left: $stack-s;
        cursor: pointer;
        transition: background-color $time-s;
        &:hover {
          background-color: rgba(0,0,0, .1);
        }
      }
    }
    &__panel-toggle {
      width: 24px;
      height: 24px;
      margin-top: #{$stack-s + $stack-xs};
      margin-left: $inset-xs;
      cursor: pointer;
      transition: transform $time-s ease-in-out;
      &--close {
        transform: rotateZ(45deg);
      }
    }
  }
  &__panel {
    display: none;
    flex-wrap: wrap;
    position: absolute;
    top: 100%;
    max-width: 300px;
    background-color: $wild-sand;
    border-radius: 3px;
    padding: $stack-xs;
    box-shadow: 0 2px 4px 0 rgba(0,0,0,0.23);
    opacity: 0;
    z-index: 5;
    transition: left $time-s ease-out;
    &__tag {
      background-color: white;
      border: 1px solid $vivid-blue;
      border-radius: 3px;
      padding: 0 $inline-s;
      margin: $stack-xs;
      cursor: pointer;
      transition: background-color $time-s ease-in-out;
      &--isSelected {
        background-color: $vivid-blue;
        color: white;
      }
    }
    &--isVisible {
      display: inline-flex;
      animation: fadeIn $time-s forwards;
    }
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
}
</style>
