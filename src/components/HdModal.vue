<template>
  <transition name="modal">
    <section
      :class="{
        'modal--no-spacing': noSpacing,
        'modal--no-external-spacing': noExternalSpacing,
        'modal--no-close-icon': !showCloseIcon,
        'modal--external-close-icon': externalCloseIcon,
        [`modal--mobile-align-${mobileAlign}`]: true,
        [`modal--spacing-${spacingSize}`]: true,
      }"
      class="modal"
      @click="onCloseClick"
    >
      <div
        :class="`modal__overlay--${overlayColor}`"
        class="modal__overlay"
      />
      <div
        :style="{
          width: width > 0 ? `${width}px` : null,
        }"
        class="modal__inner"
        @click.stop
      >
        <header
          v-if="$slots.header"
          class="modal__header"
        >
          <slot name="header" />
        </header>

        <div
          v-if="$slots.content"
          class="modal__body"
        >
          <slot name="content" />
        </div>

        <div
          v-if="actions.length > 0"
          class="modal__actions"
        >
          <button
            v-for="(action, i) in actions"
            :key="i"
            :disabled="action.disabled"
            :class="{
              'btn--primary': action.type === 'primary',
              'btn--ghost': action.type !== 'primary',
            }"
            class="modal__actions__action btn"
            type="button"
            @click="action.callback"
          >
            {{ action.label }}
          </button>
        </div>
        <button
          v-if="showCloseIcon"
          :class="`modal__close--${closeIconColor}`"
          class="modal__close"
          @click="onCloseClick"
        />
      </div>
    </section>
  </transition>
</template>

<script>
export default {
  name: 'HdModal',
  props: {
    closeIconColor: {
      type: String,
      default: 'dark',
      validator: closeIconColor => ['dark', 'light'].includes(closeIconColor),
    },
    showCloseIcon: {
      type: Boolean,
      default: true,
    },
    externalCloseIcon: {
      type: Boolean,
      default: false,
    },
    overlayColor: {
      type: String,
      default: 'dark',
      validator: overlayColor => ['dark', 'light'].includes(overlayColor),
    },
    width: {
      type: Number,
      default: 0,
      validator: maxWidth => maxWidth >= 0,
    },
    spacingSize: {
      type: String,
      default: 'large',
      validator: spacingSize => ['large', 'normal'].includes(spacingSize),
    },
    noSpacing: {
      type: Boolean,
      default: false,
    },
    noExternalSpacing: {
      type: Boolean,
      default: false,
    },
    mobileAlign: {
      type: String,
      default: 'center',
      validator: mobileAlign => ['center', 'bottom'].includes(mobileAlign),
    },
    actions: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    onCloseClick() {
      this.$emit('close');
    },
  },
};
</script>

<style lang="scss" scoped>
@import 'homeday-blocks/src/styles/mixins.scss';

.modal {
  $_root: &;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  padding: $inset-s;
  z-index: 100;
  animation: fadeIn .3s forwards;
  overflow: auto;
  -webkit-overflow-scrolling: touch;

  &--no-external-spacing {
    padding-right: 0;
    padding-left: 0;
  }

  &--external-close-icon {
    padding-top: $stack-s + 24px;
  }

  &__overlay {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.4);
    z-index: 0;
    pointer-events: none;

    &--light {
      background-color: rgba(255, 255, 255, 0.85);
    }
  }
  &__close {
    position: absolute;
    top: $stack-s;
    right: $inline-s;
    background: url('~@/assets/icons/ic_close.svg') no-repeat center / contain;
    width: 24px;
    height: 24px;
    padding: 0;
    border: 0;
    cursor: pointer;
    z-index: 2;

    @media (min-width: $break-tablet){
      top: $stack-m;
      right: $inline-m;
    }

    #{$_root}--external-close-icon & {
      top: -24px;
      right: 0;
      background: $primary-color url('~@/assets/icons/ic_close--white.svg');
      background-position: center;
      background-size: contain;
      background-repeat: no-repeat;
    }

    &--light {
      background: url('~@/assets/icons/ic_close--white.svg');
    }
  }
  &__inner {
    position: relative;
    max-width: 100%;
    margin: auto;
    z-index: 1;
    animation: fadeIn .5s forwards, bottomToNormal .5s forwards;
    background-color: white;
    border-radius: 3px;
    box-shadow: 0 5px 40px 0 rgba(0, 0, 0, 0.4);

    #{$_root}--mobile-align-bottom & {
      margin-bottom: 0;

      @media (min-width: $break-tablet) {
        margin-bottom: auto;
      }
    }
  }

  &__body {
    background-color: white;
    padding: $inset-l;

    #{$_root}--spacing-normal & {
      padding: $inset-m;
    }

    #{$_root}--no-spacing & {
      padding: 0;
    }
  }

  &__actions {
    display: flex;
    padding: $inset-m ($inset-m - ($inline-xs * 2));

    &__action {
      width: auto;
      margin-left: $inline-xs;
      margin-right: $inline-xs;
      flex-grow: 1;
      flex-shrink: 0;

      &.btn {
        box-shadow:
          0 1px 3px rgba(0, 0, 0, 0.24),
          0 0 2px rgba(0, 0, 0, 0.12);
      }

      &.btn--ghost {
        box-shadow:
          0 1px 3px rgba(0, 0, 0, 0.24),
          0 0 2px rgba(0, 0, 0, 0.12);

        @media (min-width: $break-tablet) {
          background-color: transparent;
          color: getShade($secondary-color, 110);
        }
      }
    }
  }

  &__header {
    padding: $inset-m;
    text-align: center;
    border-bottom: 1px solid getShade($quaternary-color, 60);
  }

  &-leave-active {
    animation: fadeOut .3s forwards;
    #{$_root}__inner {
      animation: fadeOut .15s forwards, normalToBottom .15s forwards;
    }
  }
}
</style>
