<template>
  <section
    :class="{
      'edit-switch': true,
      'edit-switch--editing-allowed': editingAllowed,
      'edit-switch--loading': loading,
    }"
  >
    <div
      v-if="loading"
      class="edit-switch__loading-indicator"
    >
      <span class="edit-switch__loading-indicator__icon"/>
      <span class="edit-switch__loading-indicator__label">
        {{ t.GENERAL.SAVING }}
      </span>
    </div>
    <div
      v-else-if="isEditMode && editingAllowed"
      class="edit-switch__actions"
    >
      <button
        class="btn edit-switch__actions__button edit-switch__actions__button--cancel"
        @click="cancel">
        <img
          :src="BUTTONS.cancel.icon"
          class="edit-switch__actions__button__icon">
        <p class="edit-switch__actions__button__label">{{ t.GENERAL.CANCEL }}</p>
      </button>
      <button
        class="btn edit-switch__actions__button edit-switch__actions__button--save"
        @click="save">
        <img
          :src="BUTTONS.save.icon"
          class="edit-switch__actions__button__icon">
        <p class="edit-switch__actions__button__label">{{ t.GENERAL.SAVE }}</p>
      </button>
    </div>
    <div
      v-else-if="!isEditMode && editingAllowed"
      class="edit-switch__actions"
    >
      <button
        class="btn edit-switch__actions__button edit-switch__actions__button--edit"
        @click="edit">
        <img
          :src="BUTTONS.edit.icon"
          class="edit-switch__actions__button__icon">
        <p class="edit-switch__actions__button__label">{{ t.GENERAL.EDIT }}</p>
      </button>
    </div>
    <div
      v-if="$slots.default"
      class="edit-switch__view"
    >
      <slot/>
    </div>
    <div
      v-if="$slots.edit && isEditMode && editingAllowed"
      class="edit-switch__edit"
    >
      <slot name="edit"/>
    </div>
    <div
      v-else-if="$slots.view"
      class="edit-switch__view"
    >
      <slot name="view"/>
    </div>
  </section>
</template>

<script>
import merge from 'lodash/merge';
import { getMessages } from 'hd-blocks/lang';
import editIcon from 'hd-blocks/assets/icons/ic_edit.svg';
import saveIcon from 'hd-blocks/assets/icons/ic_save.svg';
import cancelIcon from 'hd-blocks/assets/icons/ic_close--red.svg';

const BUTTONS = {
  edit: {
    icon: editIcon,
  },
  save: {
    icon: saveIcon,
  },
  cancel: {
    icon: cancelIcon,
  },
};

export default {
  name: 'HdEditSwitch',
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
$_green: #63B65B;
$_red: #E00016;

.edit-switch {
  $_root: &;

  display: flex;
  flex-direction: column;
  &__actions {
    display: flex;
    justify-content: flex-end;
    margin-bottom: $stack-s;
    &__button {
      display: flex;
      align-items: center;
      padding: 0;
      margin-left: $inline-m;
      cursor: pointer;
      &--edit {
        color: $vivid-blue;
      }
      &--save {
        color: $_green;
      }
      &--cancel {
        color: $_red;
      }
      &__label {
        display: none;
        font-size: 18px;
        font-weight: 400;
        line-height: 26px;
        margin-left: $inline-xs;
        @media (min-width: $break-tablet) {
          display: block;
        }
      }
    }
  }

  &__loading-indicator {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-bottom: $stack-s;

    &__icon {
      width: 20px;
      height: 20px;
      border-radius: 50%;
      border: 2px solid $vivid-blue;
      border-right-color: transparent;
      animation: edit-switch-loading-indicator-spin 1s linear infinite;
      content: '';
    }

    &__label {
      display: none;
      margin-left: $inline-s;
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
    margin-top: $stack-s * -1;
  }

  h3 + .field {
    margin-top: $stack-s;
  }
}

@keyframes edit-switch-loading-indicator-spin {
  from { transform: rotateZ(0deg); }
  to { transform: rotateZ(360deg); }
}
</style>
