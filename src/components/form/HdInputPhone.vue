<template>
  <div class="phone-input">
    <button
      class="phone-input__selector"
      aria-haspopup="listbox"
      aria-label="Choose a country code:"
      @click="toggleDropdown"
      :aria-activedescendant="`${selectedCountry.dial_code}, ${selectedCountry.name}`"
    >
      <span class="phone-input__selector__flag">{{selectedCountry.flag}}</span>
      <HdIcon
        width="24px"
        height="24px"
        :src="smallArrowIcon"
        :class="arrowClassNames"
      />
    </button>
    <ul
      id="country-codes-list"
      tabindex="-1"
      role="listbox"
      v-show="showDropdown"
      aria-label="Choose a country code:"
      class="phone-input__dropdown"
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
          <button @click="selectCountry(country)" class="option-country">
            <span class="option-country__flag">{{country.flag}}</span>
            <p class="option-country__name-and-code">
              <span class="option-country__name">{{country.name}}</span>
              <span class="option-country__dial-code">{{country.dial_code}}</span>
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
      label="Telefonnumer"
      v-model="phoneNumber"
      class="phone-input__field"
      placeholder="+55 555 555 5555"
      :custom-rules="[rule]"
      :formatter="phoneFormatter"
      @input="handleInputEvent"
    />
  </div>
</template>

<script>
/* eslint-disable import/no-extraneous-dependencies */
import HdInputFormatter from 'homeday-blocks/src/components/form/HdInputFormatter.vue';
import HdIcon from 'homeday-blocks/src/components/HdIcon.vue';
import { action } from '@storybook/addon-actions';
import COUNTRY_PHONE_CODES from 'homeday-blocks/src/assets/countries/country-phone-codes';
import { formatPhoneNumber } from 'homeday-blocks/src/services/utils';
import { smallArrow as smallArrowIcon } from 'homeday-assets';
import formField from './formFieldMixin';

const MAX_DIGITS_DIAL_CODE = 5;
const MIN_DIGITS_DIAL_CODE = 3;
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
  },
  data() {
    return {
      showDropdown: false,
      phoneNumber: COUNTRY_PHONE_CODES.find((country) => country.code === this.defaultCountry).dial_code,
      selectedCountry: COUNTRY_PHONE_CODES.find((country) => country.code === this.defaultCountry),
      focusedCountry: null,
      rule: {
        validate: (value) => {
          const hasMoreThan8Digits = value.length >= 8;
          const hasPlusDigit = value.includes('+');
          const isValid = hasPlusDigit && hasMoreThan8Digits;
          return isValid;
        },
        errorMessage: 'e.g. +55 555 555 5555',
      },
      smallArrowIcon,
    };
  },
  computed: {
    sortedCountriesList() {
      // Preferred countries first
      if (this.preferredCountries.length) {
        return COUNTRY_PHONE_CODES.sort((a, b) => {
          if (this.preferredCountries.includes(a.code) && this.preferredCountries.includes(b.code)) {
            return a.name > b.name;
          }
          if (this.preferredCountries.includes(a.code)) {
            return -1;
          } if (this.preferredCountries.includes(b.code)) {
            return 1;
          }
          return 0;
        });
      }
      return COUNTRY_PHONE_CODES;
    },
    arrowClassNames() {
      const baseClass = 'phone-input__selector__arrow';
      const directionClass = this.showDropdown ? 'phone-input__selector__arrow--down' : 'phone-input__selector__arrow--up';
      return [baseClass, directionClass];
    },
  },
  watch: {
    phoneNumber(newPhoneNumber) {
      const newSelectedCountry = COUNTRY_PHONE_CODES.find((country) => (
        country.dial_code === newPhoneNumber.substring(0, MIN_DIGITS_DIAL_CODE)
        || country.dial_code === newPhoneNumber.substring(0, MIN_DIGITS_DIAL_CODE + 1)
        || country.dial_code === newPhoneNumber.substring(0, MAX_DIGITS_DIAL_CODE)
      ));
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
    phoneFormatter(phone) {
      return formatPhoneNumber(this.selectedCountry.dial_code, phone);
    },
    keysHandler(event) {
      const { keyCode } = event;
      const firstCountryCode = this.sortedCountriesList[0].code;
      const lastCountryCode = this.sortedCountriesList[this.sortedCountriesList.length - 1].code;
      let countryNode = null;

      const foucsCountryCode = () => {
        countryNode.firstChild.focus();
        this.focusedCountry = countryNode.id;
      };

      if (keyCode === ARROW_DOWN_KEY_CODE) {
        if (this.focusedCountry === null) { // If there is no focus yet, focus first option
          [countryNode] = this.$refs[firstCountryCode];
        } else if (this.focusedCountry !== lastCountryCode) { // If there is, focus next option
          countryNode = this.$refs[this.focusedCountry][0].nextSibling;
        }
        foucsCountryCode();
      } else if (keyCode === ARROW_UP_KEY_CODE) {
        if (this.focusedCountry === null) { // If there is no focus yet, focus last option
          [countryNode] = this.$refs[lastCountryCode];
        } else if (this.focusedCountry !== firstCountryCode) { // If there is, focus prev option
          countryNode = this.$refs[this.focusedCountry][0].previousSibling;
        }
        foucsCountryCode();
      } else if (isAlphabetKey(keyCode)) {
        const keyString = event.key.toUpperCase();
        const firstMatchingCountryCode = this.sortedCountriesList.find((country) => country.name.charAt(0) === keyString).code;
        [countryNode] = this.$refs[firstMatchingCountryCode];
        foucsCountryCode();
      } else if (keyCode === ESC_KEY_CODE) {
        this.toggleDropdown();
      }
    },
    handleInputEvent(value) {
      this.$emit('input', formatPhoneNumber(this.selectedCountry.dial_code, value));
    },
  },
};
</script>

<style lang="scss" scoped>
@import 'homeday-blocks/src/styles/mixins.scss';

$dropdown-button-width: 74px;
$dropdown-button-height: 55px;

.phone-input {
  position: relative;
  display: flex;

  ::v-deep {
    .field__main .input {
      border-top-left-radius: 0 !important;
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

    &:focus-visible {
      z-index: 1;
      border-color: transparent;
    }
    &__flag {
      font-size: 30px;
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
      .option-country {
        display: flex;
        align-items: center;
        width: 100%;
        height: 44px;
        font-family: inherit;
        border: none;
        background-color: $white;
        &:hover,
        &:focus {
          cursor: pointer;
          background-color: getShade($neutral-gray, 40);
        }
        &__flag {
          font-size: 30px;
          margin-right: $sp-s;
        }
        &__name-and-code {
          text-align: left;
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
