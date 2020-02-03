<template>
  <div class="tabs-menu">
    <div class="tabs-menu__wrap">
      <div class="tabs-menu__wrap__inner">
        <flickity
          ref="flickity"
          :options="flickityOptions"
        >
          <button
            v-for="(item, i) in items"
            :key="i"
            :class="{
              'tabs-menu__item': true,
              'btn': true,
              'btn--flat': true,
              'js-tabs-menu-item': true,
              'isActive': item.value === value
            }"
            :data-index="i"
            type="button"
            @click.prevent="$emit('input', item.value)"
          >
            {{ item.label }}
          </button>
        </flickity>
      </div>
    </div>
  </div>
</template>

<script>
import { hidePaginationWhenNotNeeded } from 'hd-blocks/services/flickity';
// eslint-disable-next-line import/extensions
import Flickity from 'vue-flickity';

const TABS_MENU_ITEM_CLASS = 'js-tabs-menu-item';

export default {
  name: 'HdTabsMenu',
  components: {
    Flickity,
  },
  props: {
    items: {
      type: Array,
      default: () => [],
    },
    value: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      flickityOptions: {
        prevNextButtons: true,
        pageDots: false,
        cellAlign: 'center',
        freeScroll: true,
        contain: true,
        initialIndex: this.items.findIndex(item => item.value === this.value),
        on: {
          ready: hidePaginationWhenNotNeeded,
          resize: hidePaginationWhenNotNeeded,
        },
      },
    };
  },
  watch: {
    value(value) {
      this.$refs.flickity.select(this.items.findIndex(item => item.value === value));
    },
  },
  mounted() {
    this.addFocusEvents();
  },
  beforeDestroy() {
    this.removeFocusEvents();
  },
  methods: {
    bringCellIntoViewOnFocus(event) {
      if (!event.target.classList.contains(TABS_MENU_ITEM_CLASS)) {
        return;
      }

      this.$refs.flickity.select(parseInt(event.target.getAttribute('data-index'), 10));
    },
    addFocusEvents() {
      this.$el.addEventListener(
        'focus',
        this.bringCellIntoViewOnFocus,
        true,
      );
    },
    removeFocusEvents() {
      this.$el.removeEventListener(
        'focus',
        this.bringCellIntoViewOnFocus,
        true,
      );
    },
  },
};
</script>

<style lang="scss">
@import 'hd-blocks/styles/mixins.scss';

.tabs-menu {
  $_root: &;
  position: relative;

  &__item {
    padding-left: 0;
    padding-right: 0;
    margin-right: $inline-l;
    white-space: nowrap;
    font-weight: 400;
    text-align: left;
    outline: 0;

    &::after {
      width: 100%;
    }

    &:focus::after,
    &.isActive::after {
      border-color: $secondary-color;
    }
  }

  .flickity--no-controls .flickity-slider {
    transform: none !important;
  }

  svg.flickity-button-icon {
    display: none;
  }

  .flickity-prev-next-button {
    height: 100%;
    padding: 0;
    background-color: transparent;

    &:active {
      opacity: 1;
    }

    &:focus {
      border-radius: 0;
      box-shadow: 0 4px 0 0 $secondary-color;
      outline: initial;
    }

    &:disabled {
      opacity: 0;
      pointer-events: none;
    }

    &::before {
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      width: 24px;
      height: 100%;
      background-color: $white;
      background-image: url('../assets/icons/ic_arrow-left.svg');
      background-repeat: no-repeat;
      background-position: center left;
      background-size: contain;
      content: '';
    }

    &::after {
      display: block;
      position: absolute;
      top: 0;
      left: 24px;
      width: 16px;
      height: 100%;
      background-image: linear-gradient(
        90deg,
        $white,
        rgba($white, 0)
      );
      content: '';
    }

    &.previous {
      left: 0;
    }

    &.next {
      right: 0;

      &::before {
        left: auto;
        right: 0;
        transform: rotate(180deg);
      }

      &::after {
        right: 24px;
        left: auto;
        transform: rotate(180deg);
      }
    }
  }

  .flickity--no-controls .flickity-prev-next-button {
    display: none;
  }
}
</style>
