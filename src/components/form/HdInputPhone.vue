<template>
  <div class="phone-input">
    <button
      class="phone-input__selector"
      aria-haspopup="listbox"
      @click="toggleDropdown"
      :aria-label="t.FORM.PHONE.LABEL"
      :aria-activedescendant="activeCountryCodeAndName"
    >
      <span :class="selectedFlagClassNames"></span>
      <HdIcon
        width="24px"
        height="24px"
        :src="smallArrowIcon"
        :class="arrowClassNames"
      />
    </button>
    <ul
      tabindex="-1"
      role="listbox"
      v-show="showDropdown"
      class="phone-input__dropdown"
      :aria-label="t.FORM.PHONE.LABEL"
    >
      <template>
        <li
          v-for="(country, index) in sortedCountriesList"
          :key="country.code"
          :id="country.code"
          class="phone-input__dropdown__option"
          role="option"
          :aria-selected="selectedCountry.code === country.code"
          :ref="country.code"
        >
          <button @click="selectCountry(country)" class="option">
            <span :class="getOptionFlagClassNames(country.code)"></span>
            <p>
              <span class="option__name">{{t.COUNTRIES[country.code]}}</span>
              <span class="option__dial-code">{{country.dial_code}}</span>
            </p>
          </button>
          <hr v-if="index === preferredCountries.length - 1" class="phone-input__dropdown__divider" />
        </li>
      </template>
    </ul>
    <HdInputFormatter
      ref="input"
      type="tel"
      name="phoneNumber"
      v-model="phoneNumber"
      class="phone-input__field"
      :placeholder="placeholder"
      :label="label"
      :custom-rules="[isValidNumber, isMobileNumber, canBeInternationallyDialled]"
      :formatter="phoneFormatter"
      @input="handleInputEvent"
    />
  </div>
</template>

<script>
/* eslint-disable import/no-extraneous-dependencies */
import { action } from '@storybook/addon-actions';
import HdInputFormatter from 'homeday-blocks/src/components/form/HdInputFormatter.vue';
import HdIcon from 'homeday-blocks/src/components/HdIcon.vue';
import { getMessages } from 'homeday-blocks/src/lang';
import { smallArrow as smallArrowIcon } from 'homeday-assets';
import countryCodes from 'country-codes-list';
import PhoneNumber from 'awesome-phonenumber';
import formField from './formFieldMixin';

const COUNTRY_PHONE_CODES = countryCodes
  .customArray({ code: '{countryCode}', dial_code: '+{countryCallingCode}' });

const MAX_DIGITS_DIAL_CODE = 5;
const ARROW_UP_KEY_CODE = 38;
const ARROW_DOWN_KEY_CODE = 40;
const ESC_KEY_CODE = 27;

const ALPHABET_UPPERCASE_CODES = [65, 90];
const ALPHABET_LOWERCASE_CODES = [97, 122];

const isAlphabetKey = (key) => {
  const [A, Z] = ALPHABET_UPPERCASE_CODES;
  const [a, z] = ALPHABET_LOWERCASE_CODES;
  return (key >= A && key <= Z) || (key >= a && key <= z);
};

export default {
  name: 'HdInputPhone',
  mixins: [
    formField,
  ],
  inheritAttrs: false,
  components: {
    HdInputFormatter,
    HdIcon,
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
    label: {
      type: String,
      required: true,
    },
    lang: {
      type: String,
      default: 'de',
    },
  },
  data() {
    return {
      showDropdown: false,
      phoneNumber: COUNTRY_PHONE_CODES.find((country) => country.code === this.defaultCountry)?.dial_code,
      selectedCountry: COUNTRY_PHONE_CODES.find((country) => country.code === this.defaultCountry),
      focusedCountry: null,
      isValidNumber: {
        validate: (value) => {
          const phoneNumber = new PhoneNumber(value);
          return phoneNumber.isValid();
        },
        errorMessage: this.t.FORM.VALIDATION.INVALID_NUMBER,
      },
      isMobileNumber: {
        validate: (value) => {
          const phoneNumber = new PhoneNumber(value);
          return phoneNumber.isMobile();
        },
        errorMessage: this.t.FORM.VALIDATION.NOT_MOBILE_NUMBER,
      },
      canBeInternationallyDialled: {
        validate: (value) => {
          const phoneNumber = new PhoneNumber(value);
          return phoneNumber.canBeInternationallyDialled();
        },
        errorMessage: this.t.FORM.VALIDATION.NOT_INTERNATIONAL_NUMBER,
      },
      smallArrowIcon,
    };
  },
  computed: {
    sortedCountriesList() {
      // Preferred countries first
      if (this.preferredCountries.length) {
        return COUNTRY_PHONE_CODES.sort((a, b) => {
          // Alphabetical order on preferred countries
          if (this.preferredCountries.includes(a.code) && this.preferredCountries.includes(b.code)) {
            return this.t.COUNTRIES[a.code] > this.t.COUNTRIES[b.code];
          }
          if (this.preferredCountries.includes(a.code)) {
            return -1;
          } if (this.preferredCountries.includes(b.code)) {
            return 1;
          // Alphabetical order on rest of countries
          } if (!this.preferredCountries.includes(a.code) && !this.preferredCountries.includes(b.code)) {
            return (this.t.COUNTRIES[a.code] > this.t.COUNTRIES[b.code]) ? 1 : -1;
          }
          return 0;
        });
      }
      return COUNTRY_PHONE_CODES;
    },
    placeholder() {
      return `${this.selectedCountry.dial_code} 555 555 5555`;
    },
    arrowClassNames() {
      const baseClass = 'phone-input__selector__arrow';
      const directionClass = this.showDropdown ? 'phone-input__selector__arrow--down' : 'phone-input__selector__arrow--up';
      return [baseClass, directionClass];
    },
    selectedFlagClassNames() {
      const baseClass = 'phone-input__selector__flag';
      const countryClass = `flag-icon flag-icon-${this.selectedCountry.code.toLowerCase()}`;
      return [baseClass, countryClass];
    },
    activeCountryCodeAndName() {
      return `${this.selectedCountry.dial_code}, ${this.t.COUNTRIES[this.selectedCountry.code]}`;
    },
    t() {
      return getMessages(this.lang);
    },
  },
  watch: {
    phoneNumber(newPhoneNumber) {
      const phoneNumber = new PhoneNumber(newPhoneNumber);
      const phoneCountryCode = `+${phoneNumber.getCountryCode()}`;
      const newSelectedCountry = COUNTRY_PHONE_CODES.find((country) => country.dial_code === phoneCountryCode);

      if (newSelectedCountry) this.selectedCountry = newSelectedCountry;
      action('input')(newPhoneNumber);
    },
    selectedCountry(newCountry, prevCountry) {
      if (this.phoneNumber.length >= MAX_DIGITS_DIAL_CODE) {
        this.phoneNumber = this.phoneNumber.replace(prevCountry.dial_code, newCountry.dial_code);
      } else {
        this.phoneNumber = newCountry.dial_code;
      }
    },
    showDropdown(isShown) {
      let selectKeys;
      if (isShown) {
        selectKeys = window.addEventListener('keyup', this.keysHandler);
      } else {
        window.removeEventListener('keyup', selectKeys);
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
      if (this.phoneNumber.length <= MAX_DIGITS_DIAL_CODE) {
        this.$refs.input.$refs.input.$refs.input.focus();
      }
    },
    handleInputEvent(value) {
      const phoneNumber = new PhoneNumber(value);
      this.$emit('input', phoneNumber.getNumber('international'));
    },
    phoneFormatter(phone) {
      const phoneNumber = new PhoneNumber(phone);
      if (phone === `+${phoneNumber.getCountryCode()}`) {
        return phone;
      }
      return phoneNumber.getNumber('international');
    },
    keysHandler(event) {
      const { keyCode } = event;
      const firstCountryCode = this.sortedCountriesList[0].code;
      const lastCountryCode = this.sortedCountriesList[this.sortedCountriesList.length - 1].code;
      let countryNode = null;

      const focusCountryCode = () => {
        if (countryNode !== null) {
          countryNode.firstChild.focus();
          this.focusedCountry = countryNode.id;
        }
      };

      if (keyCode === ARROW_DOWN_KEY_CODE) {
        if (this.focusedCountry === null) { // If there is no focus yet, focus first option
          [countryNode] = this.$refs[firstCountryCode];
        } else if (this.focusedCountry !== lastCountryCode) { // If there is, focus next option
          countryNode = this.$refs[this.focusedCountry][0]?.nextSibling;
        }
        focusCountryCode();
      } else if (keyCode === ARROW_UP_KEY_CODE) {
        if (this.focusedCountry === null) { // If there is no focus yet, focus last option
          [countryNode] = this.$refs[lastCountryCode];
        } else if (this.focusedCountry !== firstCountryCode) { // If there is, focus prev option
          countryNode = this.$refs[this.focusedCountry][0]?.previousSibling;
        }
        focusCountryCode();
      } else if (isAlphabetKey(keyCode)) {
        const keyString = event.key.toUpperCase();
        const firstMatchingCountryCode = this.sortedCountriesList.find(
          (country) => this.t.COUNTRIES[country.code].charAt(0) === keyString,
        )?.code;
        if (firstMatchingCountryCode) {
          [countryNode] = this.$refs[firstMatchingCountryCode];
          focusCountryCode();
        }
      } else if (keyCode === ESC_KEY_CODE) {
        this.toggleDropdown();
      }
    },
    getOptionFlagClassNames(code) {
      const baseClass = 'option__flag';
      const countryClass = `flag-icon flag-icon-${code.toLowerCase()}`;
      return [baseClass, countryClass];
    },
  },
};
</script>

<style lang="scss" scoped>
@import 'homeday-blocks/src/styles/mixins.scss';

$flag-icons-path: '../../../node_modules/flag-icons-svg/svg';
@import './node_modules/flag-icons-svg/sass/_variables.scss';
@import './node_modules/flag-icons-svg/sass/flag-icons.scss';

$dropdown-button-width: 74px;
$dropdown-button-height: 55px;

.phone-input {
  position: relative;
  display: flex;

  ::v-deep {
    .field .field__body .field__main .input {
      border-top-left-radius: 0;
    }
    .field__border {
      left: -$dropdown-button-width;
      width: calc(100% + #{$dropdown-button-width});
    }
    .field__helper {
      transform: translateX(-$dropdown-button-width);
      width: calc(100% + #{$dropdown-button-width});
    }
  }

  &__selector {
    width: $dropdown-button-width;
    height: $dropdown-button-height;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    background: $secondary-bg;
    border: none;
    border-top-left-radius: $sp-xs;
    border-right: $sp-xxs solid getShade($quaternary-color, 60);
    &:hover {
      cursor: pointer;
    }
    &:focus-visible {
      z-index: 1;
      border-color: transparent;
    }
    &__flag {
      font-size: 18px;
    }
    &__arrow {
      &--up {
        transform: rotate(90deg);
      }
      &--down {
        transform: rotate(-90deg);
      }
      ::v-deep path {
        fill: $neutral-gray;
      }
    }
  }

  &__field {
    flex: 1;
  }

  &__dropdown {
    position: absolute;
    top: $dropdown-button-height + 1;
    left: 0;
    z-index: 10;
    width: 100%;
    max-height: 264px;
    overflow: auto;
    border-radius: $sp-xs;
    background-color: $white;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.5);
    &__option {
      .option {
        display: flex;
        align-items: center;
        width: 100%;
        height: 44px;
        font-family: inherit;
        border: none;
        background-color: $white;
        text-align: left;
        &:hover,
        &:focus {
          cursor: pointer;
          background-color: getShade($neutral-gray, 40);
        }
        &__flag {
          font-size: 18px;
          margin-right: $sp-s;
        }
        &__name {
          @include font("DS-100");
        }
        &__dial-code {
          @include font("DS-100");
          color: getShade($neutral-gray, 85);
        }
      }
    }
    &__divider {
      margin: 0;
    }
  }
}

</style>
