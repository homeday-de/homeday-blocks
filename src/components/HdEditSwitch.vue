<template>
  <section
    :class="{
      'edit-switch': true,
      'edit-switch--editing-allowed': editingAllowed,
      'edit-switch--loading': loading,
    }"
  >
    <div v-if="loading" class="edit-switch__loading-indicator">
      <span class="edit-switch__loading-indicator__icon" />
      <span class="edit-switch__loading-indicator__label">
        {{ t.GENERAL.SAVING }}
      </span>
    </div>
    <div v-else-if="isEditMode && editingAllowed" class="edit-switch__actions">
      <button
        class="btn edit-switch__actions__button edit-switch__actions__button--cancel"
        @click="cancel"
      >
        <HdIcon :src="BUTTONS.cancel.icon" class="edit-switch__actions__button__icon" />
        <p class="edit-switch__actions__button__label">{{ t.GENERAL.CANCEL }}</p>
      </button>
      <button
        class="btn edit-switch__actions__button edit-switch__actions__button--save"
        @click="save"
      >
        <HdIcon :src="BUTTONS.save.icon" class="edit-switch__actions__button__icon" />
        <p class="edit-switch__actions__button__label">{{ t.GENERAL.SAVE }}</p>
      </button>
    </div>
    <div v-else-if="!isEditMode && editingAllowed" class="edit-switch__actions">
      <button
        class="btn edit-switch__actions__button edit-switch__actions__button--edit"
        @click="edit"
      >
        <HdIcon :src="BUTTONS.edit.icon" class="edit-switch__actions__button__icon" />
        <p class="edit-switch__actions__button__label">{{ t.GENERAL.EDIT }}</p>
      </button>
    </div>
    <div v-if="$slots.default" ref="defaultSlot" class="edit-switch__view">
      <slot />
    </div>
    <div
      v-if="$slots.edit && isEditMode && editingAllowed"
      ref="editSlot"
      class="edit-switch__edit"
    >
      <slot name="edit" />
    </div>
    <div v-else-if="$slots.view" ref="viewSlot" class="edit-switch__view">
      <slot name="view" />
    </div>
  </section>
</template>

<script>
import HdIcon from 'homeday-blocks/src/components/HdIcon.vue';
import merge from 'lodash/merge';
import { getMessages } from 'homeday-blocks/src/lang';
import { edit as editIcon, check as checkIcon, close as closeIcon } from 'homeday-assets';

const BUTTONS = {
  edit: {
    icon: editIcon,
  },
  save: {
    icon: checkIcon,
  },
  cancel: {
    icon: closeIcon,
  },
};

export default {
  name: 'HdEditSwitch',
  components: {
    HdIcon,
  },
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
    editing: {
      type: Boolean,
      default: false,
    },
    editingAllowed: {
      type: Boolean,
      default: true,
    },
    texts: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      BUTTONS,
      isEditMode: this.editing,
    };
  },
  watch: {
    editing(value) {
      this.isEditMode = value;
    },
  },
  computed: {
    t() {
      return merge(getMessages(this.lang), this.texts);
    },
  },
  methods: {
    save() {
      this.$emit('save');
    },
    edit() {
      this.isEditMode = true;
      this.$emit('edit');
    },
    cancel() {
      this.isEditMode = false;
      this.$emit('cancel');
    },
  },
};
</script>

<style lang="scss">
@import 'homeday-blocks/src/styles/mixins.scss';

.edit-switch {
  $_root: &;

  display: flex;
  flex-direction: column;
  &__actions {
    display: flex;
    justify-content: flex-end;
    margin-bottom: $sp-s;
    &__button {
      display: flex;
      align-items: center;
      padding: 0;
      margin-left: $sp-m;
      cursor: pointer;
      &--edit {
        color: getShade($secondary-color, 110);
      }
      &--save {
        color: $success-color;
      }
      &--cancel {
        color: $error-color;
      }
      &__label {
        font-size: 18px;
        font-weight: 400;
        line-height: 26px;
        margin-left: $sp-xs;
      }
      &__icon path {
        fill: currentColor;
      }
    }
  }

  &__loading-indicator {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-bottom: $sp-s;

    &__icon {
      width: 20px;
      height: 20px;
      border-radius: 50%;
      border: 2px solid getShade($secondary-color, 110);
      border-right-color: transparent;
      animation: edit-switch-loading-indicator-spin 1s linear infinite;
      content: '';
    }

    &__label {
      display: none;
      margin-left: $sp-s;
      font-size: 18px;
      line-height: 26px;

      @media (min-width: $break-tablet) {
        display: block;
      }
    }
  }

  &__view,
  &__edit {
    transition: opacity $time-s ease-in-out;

    #{$_root}--loading & {
      opacity: 0.3;
      pointer-events: none;
    }
  }

  &--editing-allowed .details-table-wrap:first-child {
    padding-top: 0;
    margin-top: $sp-s * -1;
  }

  h3 + .field {
    margin-top: $sp-s;
  }
}

@keyframes edit-switch-loading-indicator-spin {
  from {
    transform: rotateZ(0deg);
  }
  to {
    transform: rotateZ(360deg);
  }
}
</style>
