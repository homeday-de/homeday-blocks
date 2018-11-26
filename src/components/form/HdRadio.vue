<template>
  <section class="radio__wrapper" :class="wrapperClasses">
    <div v-for="item in items" class="radio" :key="`radio-${item.value}`"
      :class="{isSelected: selectedRadio === item.value, error}"
      @keydown.space.enter.prevent="radioSelect(item.value)"
      @click="radioSelect(item.value)"
      tabindex="0">
      <input class="radio__input" type="radio"
        :name="name" v-model="selectedRadio"
        :value="item.value"
      />
      <div class="radio__circle"></div>
      <p class="radio__label">{{ item.label }}</p>
    </div>
  </section>
</template>

<script>
export default {
  name: 'hdCheckbox',
  props: ['label', 'items', 'selected', 'name', 'required', 'vertical'],
  data() {
    return {
      selectedRadio: this.selected,
      error: null,
    };
  },
  computed: {
    wrapperClasses() {
      return {
        'radio__wrapper--vertical': this.vertical,
      };
    },
  },
  created() {
    this.$emit('dataChange', { name: this.name, value: this.selectedRadio, error: this.error });
  },
  methods: {
    radioSelect(value) {
      this.selectedRadio = value;
      this.validityCheck();
    },
    validityCheck() {
      this.validate();
      this.$emit('dataChange', { name: this.name, value: this.selectedRadio, error: this.error });
    },
    validate() {
      if (this.required && this.selectedRadio === undefined) {
        this.error = this.$t('FORM.VALIDATION.REQUIRED');
      } else {
        this.error = null;
      }
    },
  },
  watch: {
    selected() {
      this.selectedRadio = this.selected;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.radio {
  display: flex;
  align-items: center;
  position: relative;
  flex: 1;
  cursor: default;
  margin: 0 0 0 $inline-s;
  &__wrapper {
    display: flex;
    flex-direction: row;
    margin-bottom: $stack-m;
    flex: 1;
    &--vertical {
      flex-direction: column;
    }
  }
  &__input {
    display: none;
  }
  &__circle {
    position: relative;
    flex: 0 0 20px;
    width: 20px;
    max-width: 20px;
    height: 20px;
    cursor: pointer;
    border-radius: 50%;
    overflow: hidden;
    outline-width: 0;
    border: 2px solid $nevada;
    &:before {
      content: '';
      display: block;
      position: absolute;
      top: 3px;
      left: 3px;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background-color: $vivid-blue;
      transform: scale(0);
      opacity: 0;
      transition: transform .2s, opacity .2s;
    }
  }
  &__label {
    flex: 1;
    margin: 0 0 0 $inline-s;
    text-align: left;
    @include font('text-small');
  }
  &.isSelected {
    .radio__circle {
      border-color: $vivid-blue;
      &:before {
        transform: scale(1);
        opacity: 1;
      }
    }
  }
  &.error {
    .radio__circle {
      border-color: $torch-red;
    }
  }
}
</style>
