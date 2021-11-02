<template>
  <div class="phone-input">
    <button
      class="phone-input__selector"
      @click="toggleDropdown"
      type="button"
    >
      <span>{{selectedCountry.flag}}</span>
      <!-- <HdIcon
        :src="smallArrowIcon"
        width="24px"
        height="24px"
        class="phone-input__selector__arrow"
      /> -->
    </button>
    <HdInputFormatter
      type="tel"
      label="Telefonnumer"
      name="phoneNumber"
      v-model="phoneNumber"
      :formatter="phoneFormatter"
      class="phone-input__field"
      placeholder="+55 (0) 555 55555555"
    >
    </HdInputFormatter>
    <div v-if="showDropdown" class="phone-input__drowpdown">
      <ul>
        <li v-for="country in preferredCountriesList" :key="country.name">
          <button @click="selectCountry(country)">
            {{country.dial_code}}
            {{country.flag}}
            {{country.name}}
          </button>
        </li>
        <hr v-if="preferredCountriesList.length" />
        <li v-for="country in restOfCountriesList" :key="country.name">
          <button @click="selectCountry(country)">
            {{country.dial_code}}
            {{country.flag}}
            {{country.name}}
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
/* eslint-disable import/no-extraneous-dependencies */
import HdInputFormatter from 'homeday-blocks/src/components/form/HdInputFormatter.vue';
// import HdIcon from 'homeday-blocks/src/components/HdIcon.vue';
import { action } from '@storybook/addon-actions';
import COUNTRY_PHONE_CODES from 'homeday-blocks/src/assets/countries/country-phone-codes';
import { formatPhoneNumber } from 'homeday-blocks/src/services/utils';
import formField from './formFieldMixin';

const MAX_DIGITS_DIAL_CODE = 4;

export default {
  name: 'HdInputPhone',
  mixins: [
    formField,
  ],
  inheritAttrs: false,
  components: {
    HdInputFormatter,
    // HdIcon,
  },
  props: {
    defaultCountry: {
      type: String,
      default: 'DE',
    },
    preferredCountries: {
      type: Array,
      default: () => ([]),
    },
    value: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      showDropdown: false,
      phoneNumber: '',
      selectedCountry: COUNTRY_PHONE_CODES.find((country) => country.code === this.defaultCountry),
    };
  },
  computed: {
    preferredCountriesList() {
      if (this.preferredCountries.length) {
        return COUNTRY_PHONE_CODES.filter((country) => (
          this.preferredCountries.includes(country.code)
        ));
      }
      return COUNTRY_PHONE_CODES;
    },
    restOfCountriesList() {
      if (this.preferredCountries.length) {
        return COUNTRY_PHONE_CODES.filter((country) => (
          !this.preferredCountries.includes(country.code)
        ));
      }
      return COUNTRY_PHONE_CODES;
    },

  },
  watch: {
    phoneNumber(newPhoneNumber) {
      const newSelectedCountry = COUNTRY_PHONE_CODES.find((country) => (
        country.dial_code === newPhoneNumber.substring(0, 3)
        || country.dial_code === newPhoneNumber.substring(0, 4)
        || country.dial_code === newPhoneNumber.substring(0, 5)
      ));
      if (newSelectedCountry) this.selectedCountry = newSelectedCountry;
      action('input')(newPhoneNumber);
    },
    selectedCountry(newCountry, prevCountry) {
      if (this.phoneNumber.length >= MAX_DIGITS_DIAL_CODE + 1) {
        this.phoneNumber = this.phoneNumber.replace(prevCountry.dial_code, newCountry.dial_code);
      } else {
        this.phoneNumber = newCountry.dial_code;
      }
    },
  },
  methods: {
    toggleDropdown() {
      this.showDropdown = !this.showDropdown;
    },
    selectCountry(country) {
      this.selectedCountry = country;
      this.toggleDropdown();
    },
    phoneFormatter(phone) {
      const formattedPhone = formatPhoneNumber(this.selectedCountry.dial_code, phone);
      if (phone) {
        return formattedPhone;
      }
      return phone;
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
