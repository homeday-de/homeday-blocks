<template>
  <transition name="modal">
    <article
      ref="hd-modal"
      class="hd-modal"
      :class="{ 'hd-modal--with-icon': withIcon }"
    >
      <div class="hd-modal__overlay" @click="onClose" />
      <slot>
        <div class="hd-modal__container">
          <header class="hd-modal__header">
            <hd-icon
              v-if="withIcon"
              :src="iconSrc"
              class="hd-modal__modal-icon"
            />
            <h3 class="hd-modal__title">
              <slot name="title" />
            </h3>
          </header>

          <div class="hd-modal__body">
            <slot name="body" />
          </div>

          <footer
            :class="{
            'hd-modal__footer': !isCustomFooter,
            'hd-modal__footer--wide': isWide && !isCustomFooter,
          }"
          >
            <slot name="footer">
              <slot
                v-for="(button, name) in actions"
                :name="name"
                :value="button"
              >
                <hd-button
                  :key="`action-${name}`"
                  v-bind="button"
                  class="hd-modal__action"
                  @click="$emit('action', button)"
                >
                  {{ button.text }}
                </hd-button>
              </slot>
            </slot>
          </footer>

          <button
            v-if="isCloseButtonVisible"
            type="button"
            class="hd-modal__close-button"
            @click="onClose()"
          >
            <hd-icon
              :src="closeIcon"
              class="hd-modal__close-icon"
            />
          </button>
        </div>
      </slot>
    </article>
  </transition>
</template>

<script>
import HdButton from 'homeday-blocks/src/components/buttons/HdButton.vue';
import HdIcon from 'homeday-blocks/src/components/HdIcon.vue';
import { close as closeIcon } from 'homeday-assets';

export default {
  name: 'HdModal',
  components: {
    HdButton,
    HdIcon,
  },
  props: {
    iconSrc: {
      type: String,
      default: '',
    },
    isWide: {
      type: Boolean,
      default: false,
    },
    isCloseButtonVisible: {
      type: Boolean,
      default: true,
    },
    lang: {
      type: String,
      default: 'de',
    },
    actions: {
      type: Array,
      default: () => [],
      validator: (actions) => {
        const indexOfActionMissingName = actions.findIndex((action) => typeof action.name !== 'string');

        if (indexOfActionMissingName >= 0) {
          // eslint-disable-next-line no-console
          console.warn(`The attribute "name" is required on actions[${indexOfActionMissingName}]`);
          return false;
        }

        return true;
      },
    },
  },
  data() {
    return {
      closeIcon,
    };
  },
  computed: {
    withIcon() {
      return this.iconSrc.length > 0;
    },
    isCustomFooter() {
      return Boolean(this.actions.length === 0);
    },
  },
  methods: {
    onClose() {
      this.$emit('close');
    },
  },
};
</script>

<style lang="scss">
@import 'homeday-blocks/src/styles/mixins.scss';
$mobile-browser-footer-buffer: 75px;

.hd-modal {
  position: fixed;
  z-index: 100;
  display: flex;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  align-items: flex-end;
  justify-content: center;
  padding: #{$sp-m + $sp-s} $sp-m #{$sp-m + $mobile-browser-footer-buffer} $sp-m;

  @media (min-width: $break-tablet) {
    align-items: center;
  }
}

.hd-modal__overlay {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: getShade($primary-color, 110);
  opacity: 0.7;
  transition: opacity 0.3s ease;
}

.hd-modal__container {
  @include elevation(9);

  position: relative;
  z-index: 9999;
  width: 100%;
  max-width: 568px;
  padding: #{$sp-l + $sp-s} $sp-m $sp-m;
  background-color: $white;
  border-radius: 4px;
  max-height: 90%;
  overflow: scroll;
}

.hd-modal__header {
  display: flex;
  margin-bottom: $sp-xs;
}

.hd-modal__modal-icon {
  width: #{$sp-l + $sp-m + $sp-s};
  height: #{$sp-l + $sp-m + $sp-s};
  margin-bottom: $sp-s;

  @media (min-width: $break-tablet) {
    width: #{$sp-l};
    height: #{$sp-l};
    margin-bottom: 0;
    margin-right: $sp-s;
  }
}

.hd-modal__title {
  @include font('DS-200');
  font-weight: bold;
}

.hd-modal__body {
  @include font('DS-100');
  margin-bottom: $sp-s;

  @media (min-width: $break-tablet) {
    margin-bottom: $sp-m;
  }
}

.hd-modal__footer {
  width: 100%;
  display: flex;

  .hd-modal__action {
    flex: 1;

    &:not(:last-child) {
      margin-right: $sp-s;
    }
  }

  @media (min-width: $break-tablet) {
    justify-content: flex-end;

    .hd-modal__action {
      flex: 0 1 auto;
    }
  }
}

.hd-modal__footer--wide {
  flex-direction: column;

  .hd-modal__action {
    &:not(:last-child) {
      margin-right: 0;
      margin-bottom: $sp-s;
    }
  }

  @media (min-width: $break-tablet) {
    flex-direction: row;

    .hd-modal__action {
      flex: 1;

      &:not(:last-child) {
        margin-right: $sp-s;
        margin-bottom: 0;
      }
    }
  }
}

.hd-modal__close-button {
  position: absolute;
  right: $sp-m;
  top: $sp-m;
  width: #{$sp-m + $sp-s};
  height: #{$sp-m + $sp-s};
  padding: 0;
  background: rgba(255, 255, 255, 0.1);
  border: 0;
  cursor: pointer;
}

.hd-modal--with-icon {
  .hd-modal__header {
    flex-direction: column;
    align-items: center;

    @media (min-width: $break-tablet) {
      flex-direction: row;
    }
  }

  .hd-modal__body {
    display: flex;
    align-items: center;
    flex-direction: column;

    @media (min-width: $break-tablet) {
      align-items: flex-start;
    }
  }
}
</style>
