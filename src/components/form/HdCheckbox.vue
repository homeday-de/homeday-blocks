<template>
  <div class="checkbox" :class="{isChecked, error}"
    @keydown.space.enter.prevent="toggle" @click="toggle" tabindex="0">
    <input class="checkbox__input" type="checkbox" :name="name || ''" v-model="isChecked"/>
    <div class="checkbox__box">
      <div class="checkbox__box__overlay"></div>
      <div class="checkbox__box__border"></div>
      <div class="checkbox__box__tick"></div>
    </div>
    <p class="checkbox__label">{{ label }}</p>
  </div>
</template>

<script>
export default {
  name: 'hdCheckbox',
  props: ['label', 'checked', 'name', 'required'],
  data() {
    return {
      isChecked: !!this.checked,
      error: null,
    };
  },
  created() {
    this.$emit('dataChange', { name: this.name, value: this.isChecked, error: this.error });
  },
  methods: {
    toggle() {
      this.isChecked = !this.isChecked;
      this.error = null;
      this.$emit('dataChange', { name: this.name, value: this.isChecked, error: this.error });
    },
    validityCheck() {
      this.validate();
      this.$emit('dataChange', { name: this.name, value: this.isChecked, error: this.error });
    },
    validate() {
      if (this.required && !this.isChecked) {
        this.error = this.$t('FORM.VALIDATION.REQUIRED');
      } else {
        this.error = null;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.checkbox {
  display: flex;
  align-items: center;
  position: relative;
  cursor: default;
  &__input {
    display: none;
  }
  &__box {
    position: relative;
    flex: 0 0 20px;
    width: 20px;
    height: 20px;
    cursor: pointer;
    border-radius: 3px;
    overflow: hidden;
    outline-width: 0;
    &__overlay {
      display: block;
      position: absolute;
      top:0; left:0;
      width: 100%;
      height: 100%;
      background-color: $vivid-blue;
      border-radius: 50%;
      transform: scale(0);
      opacity: 0;
      transition: transform .3s, opacity .2s;
    }
    &__border {
      display: block;
      position: absolute;
      top:0; left:0;
      width: 100%;
      height: 100%;
      border-radius: 3px;
      border: 2px solid $nevada;
      transition: border-color .3s;
    }
    &__tick {
      position: absolute;
      top:0; left:0;
      width: 100%;
      height: 100%;
      background-image: url('../../assets/img/icons/ic_checkmark-white.svg');
      background-repeat: no-repeat;
      background-position: center;
      background-size: 20px;
      opacity: 0;
      transition: opacity .2s;
    }
  }
  &__label {
    flex: 1;
    margin-left: $inline-s;
    text-align: left;
    @include font('text-small');
  }
  &.isChecked {
    .checkbox__box {
      &__overlay {
        transform: scale(1.3);
        opacity: 1;
      }
      &__border {
        border-color: transparent;
      }
      &__tick {
        opacity: 1;
      }
    }
  }
  &.error {
    .checkbox__box {
      &__border {
        border-color: $torch-red;
      }
    }
  }
}
</style>
