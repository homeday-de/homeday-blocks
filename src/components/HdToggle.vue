<template>
  <div
    :class="{
      'hd-toggle': true,
      'hd-toggle--is-open': open,
      'hd-toggle--is-using-mouse': isUsingMouse,
    }"
    @keydown="setUsingMouse(false)"
    @mousedown="setUsingMouse(true)"
  >
    <button :disabled="!canBeToggled" class="hd-toggle__control" type="button" @click="toggleOpen">
      <p v-html="title" />
      <div class="hd-toggle__control-icon-wrapper">
        <ul
          v-if="actions.length && !hasSingleAction"
          :class="{
            'hd-toggle__control-actions-menu': true,
            'hd-toggle__control-actions-menu--is-open': isActionsMenuOpen,
          }"
        >
          <li
            class="hd-toggle__control-actions-menu-item"
            v-for="action in actions"
            :key="action.name"
            @click.stop="executeAction(action.name)"
          >
            <HdIcon :src="action.icon" class="hd-toggle__control-actions-icon" />
            <span class="hd-toggle__control-actions-label">{{ action.label }}</span>
          </li>
        </ul>
        <HdIcon :src="chevronIcon" class="hd-toggle__control-icon" />
        <HdButton
          v-if="actions.length"
          class="hd-toggle__control-actions"
          :icon-src="actionMenuIcon"
          @click.stop="onClickActionsMenu"
        />
      </div>
    </button>
    <div
      ref="body"
      :style="{
        maxHeight: `${maxHeight}px`,
        transitionDuration: `${transitionDuration}ms`,
      }"
      class="hd-toggle__body"
    >
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { VueConstructor, PropType } from 'vue';
import OnResizeService from 'homeday-blocks/src/services/on-resize';
import HdIcon from 'homeday-blocks/src/components/HdIcon.vue';
import HdButton from 'homeday-blocks/src/components/buttons/HdButton.vue';
import { chevron as chevronIcon, kebabMenu as kebabMenuIcon } from 'homeday-assets';

export const TABINDEX_BACKUP_ATTRIBUTE = 'data-hd-tabindex-backup';

export interface HdToggleAction {
  name: string;
  label: string;
  icon: string;
}

export interface HdToggleProps {
  title: string;
  canBeToggled: boolean;
  open: boolean;
  transitionDuration: number;
  actions: HdToggleAction[];
}

export default (
  Vue as VueConstructor<
    Vue & {
      $refs: {
        body: HTMLElement;
      };
    }
  >
).extend({
  name: 'HdToggle',
  components: {
    HdButton,
    HdIcon,
  },
  props: {
    title: {
      type: String as PropType<HdToggleProps['title']>,
      default: '',
    },
    canBeToggled: {
      type: Boolean as PropType<HdToggleProps['canBeToggled']>,
      default: true,
    },
    open: {
      type: Boolean as PropType<HdToggleProps['open']>,
      default: true,
    },
    transitionDuration: {
      type: Number as PropType<HdToggleProps['transitionDuration']>,
      default: 300,
    },
    actions: {
      type: Array as PropType<HdToggleProps['actions']>,
      default: () => [],
      validator: (actions: HdToggleProps['actions']) =>
        actions.every((action) => ['name', 'label', 'icon'].every((key) => key in action)),
    },
  },
  data(): {
    bodyHeight: number;
    isUsingMouse: boolean;
    internalFocusRemoved: boolean;
    isActionsMenuOpen: boolean;
    chevronIcon: string;
    kebabMenuIcon: string;
  } {
    return {
      // bodyHeight is a random big number only initially,
      // it will be calculated on mounted
      bodyHeight: 10000,
      isUsingMouse: false,
      internalFocusRemoved: false,
      isActionsMenuOpen: false,
      chevronIcon,
      kebabMenuIcon,
    };
  },
  computed: {
    hasSingleAction(): boolean {
      return this.actions.length === 1;
    },
    actionMenuIcon(): string {
      return this.hasSingleAction ? this.actions[0].icon : kebabMenuIcon;
    },
    maxHeight(): number {
      if (this.open) {
        return this.bodyHeight;
      }

      return 0;
    },
  },
  watch: {
    open: {
      handler(open) {
        this.ensureBodyScrolledToTop();

        this.$nextTick(() => {
          if (open) {
            this.enableInternalFocus();
          } else {
            this.disableInternalFocus();
          }
        });
      },
      immediate: true,
    },
  },
  mounted() {
    this.$nextTick(this.calculateBodyHeight);
    this.addResizeEvents();
  },
  beforeDestroy() {
    this.removeResizeEvents();
  },
  methods: {
    // Encapsulated in a method to be able to mock it in the tests
    getScrollHeight(el: HTMLElement): number {
      return el.scrollHeight;
    },
    toggleActionsMenu(): void {
      this.isActionsMenuOpen = !this.isActionsMenuOpen;
    },
    onClickActionsMenu(): void {
      if (this.hasSingleAction) {
        this.$emit(this.actions[0].name);
      } else {
        this.toggleActionsMenu();
      }
    },
    executeAction(action: string): void {
      this.$emit(action);
      this.toggleActionsMenu();
    },
    toggleOpen(): void {
      if (this.canBeToggled === false) {
        return;
      }

      this.$emit('toggle', !this.open);
    },
    calculateBodyHeight(): void {
      if (!this.$refs.body) {
        return;
      }

      this.bodyHeight = this.getScrollHeight(this.$refs.body);
    },
    ensureBodyScrolledToTop(): void {
      if (!this.$refs.body) {
        return;
      }

      this.$refs.body.scrollTop = 0;
    },
    disableInternalFocus(): void {
      if (!this.$refs.body) {
        return;
      }

      const $innerFocusableElements = this.$refs.body.querySelectorAll('a, button, [tabindex]');

      if (!$innerFocusableElements.length) {
        return;
      }

      $innerFocusableElements.forEach((el) => {
        const currentTabIndex = el.getAttribute('tabindex');

        if (currentTabIndex !== null) {
          el.setAttribute(TABINDEX_BACKUP_ATTRIBUTE, currentTabIndex);
        }

        el.setAttribute('tabindex', '-1');
      });

      this.internalFocusRemoved = true;
    },
    enableInternalFocus(): void {
      if (!this.$refs.body || this.internalFocusRemoved === false) {
        return;
      }

      const $innerFocusableElements = this.$refs.body.querySelectorAll(
        `[${TABINDEX_BACKUP_ATTRIBUTE}]`
      );

      if (!$innerFocusableElements.length) {
        return;
      }

      $innerFocusableElements.forEach((el) => {
        const oldTabIndex = el.getAttribute(TABINDEX_BACKUP_ATTRIBUTE) ?? '';

        el.setAttribute('tabindex', oldTabIndex);
        el.removeAttribute(TABINDEX_BACKUP_ATTRIBUTE);
      });
    },
    addResizeEvents(): void {
      OnResizeService.onDebounced(this.calculateBodyHeight);
    },
    removeResizeEvents(): void {
      OnResizeService.offDebounced(this.calculateBodyHeight);
    },
    setUsingMouse(usingMouse: boolean): void {
      this.isUsingMouse = usingMouse;
    },
  },
});
</script>

<style lang="scss">
@import 'homeday-blocks/src/styles/mixins.scss';

$_controlIconSize: 32px;

.hd-toggle {
  $_root: &;

  &__control {
    display: block;
    position: relative;
    width: 100%;
    min-height: $_controlIconSize;
    padding: 0 $_controlIconSize 0 0;
    margin: 0;
    border: 0;
    background-color: transparent;
    box-shadow: none;
    @include font('subtitle');
    text-align: left;
    transition: outline $time-s ease-in-out;

    @media (min-width: $break-tablet) {
      @include font('title');
    }

    &:not([disabled]) {
      cursor: pointer;
    }

    #{$_root}--is-using-mouse & {
      outline: 0;
    }
  }

  &__control-icon-wrapper {
    align-items: center;
    display: flex;
    position: absolute;
    top: 0;
    right: 0;
  }

  &__control-icon {
    width: $_controlIconSize;
    height: $_controlIconSize;
    transform: rotate(90deg);
    transition: transform ($time-s * 2) ease-in-out;

    #{$_root}--is-open & {
      transform: rotate(-90deg);
    }
  }

  &__control-actions {
    background-color: transparent;
    box-shadow: none;
    color: $primary-color;

    &:focus,
    &:hover {
      box-shadow: none;
    }

    &:active {
      background-color: transparent;
    }
  }

  &__control-actions-menu {
    @include font('DS-100');
    background-color: $primary-bg;
    border-radius: 4px;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.14);
    display: none;
    font-weight: 400;
    left: calc(#{-$sp-l - $sp-s});
    position: absolute;
    top: $sp-l;

    &-item {
      align-items: center;
      display: flex;
      padding: calc(#{$sp-s + $sp-xs}) calc(#{$sp-m + $sp-xs});
    }

    &-item:not(:last-child) {
      border-bottom: 1px solid getShade($quaternary-color, 50);
    }

    &-item:hover {
      background-color: getShade($quaternary-color, 40);
    }

    &--is-open {
      display: block;
    }
  }

  &__control-actions-label {
    padding-left: $sp-s;
  }

  &__body {
    overflow: hidden;
    transition-property: max-height;
    transition-timing-function: linear;
  }
}
</style>
