<template>
  <div class="phone-input">
    <button
      class="phone-input__selector"
      @click="toggleDropdown"
      type="button"
    >
      <span>{{countryCode}}</span>
      <!-- <HdIcon
        :src="smallArrowIcon"
        width="24px"
        height="24px"
        class="phone-input__selector__arrow"
      /> -->
    </button>
    <HdInput
      ref="input"
      type="tel"
      :name="name"
      v-model="computedValue"
      v-bind="$attrs"
      class="phone-input__field"
    >
    </HdInput>
    <div v-if="showDropdown" class="phone-input__drowpdown">
      <ul>
        <li v-for="country in countryCodes" :key="country.code">
          <button @click="selectCountryCode(country.code)">
            {{country.code}}
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import HdInput from 'homeday-blocks/src/components/form/HdInput.vue';
// import HdIcon from 'homeday-blocks/src/components/HdIcon.vue';
import formField from './formFieldMixin';

export default {
  name: 'HdInputPhone',
  mixins: [
    formField,
  ],
  inheritAttrs: false,
  components: {
    HdInput,
    // HdIcon,
  },
  props: {
    value: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      required: true,
    },
    countryCodes: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      showDropdown: false,
      countryCode: this.countryCodes[0].code,
    };
  },
  computed: {
    computedValue: {
      get() { return this.value; },
      set(value) {
        this.$emit('input', value);
      },
    },
  },
  methods: {
    toggleDropdown() {
      this.showDropdown = !this.showDropdown;
    },
    selectCountryCode(countryCode) {
      this.countryCode = countryCode;
      this.toggleDropdown();
    },
    showError(...args) {
      return this.$refs.input.showError(...args);
    },
    showHelper(...args) {
      return this.$refs.input.showHelper(...args);
    },
    validate(...args) {
      return this.$refs.input.validate(...args);
    },
    hideError(...args) {
      return this.$refs.input.hideError(...args);
    },
  },
};
</script>

<style lang="scss" scoped>
@import 'homeday-blocks/src/styles/mixins.scss';
.phone-input {
  position: relative;
  display: flex;

  ::v-deep {
    .field__border {
      left: -74px;
      width: calc(100% + 74px);
    }
    .field__helper {
      transform: translateX(-74px);
      width: calc(100% + 74px);
    }
  }

  &__selector {
    width: 74px;
    height: 56px;
    background: $secondary-bg;
    border: none;
    border-right: 2px solid getShade($quaternary-color, 60);
    border-bottom: 2px solid getShade($quaternary-color, 60);
  }

  &__field {
    flex: 1;
  }

  &__drowpdown {
    position: absolute;
    top: 56px;
    left: 0;
    width: 100%;
    background-color: pink;
  }
}

</style>
