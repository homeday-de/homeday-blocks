<template>
  <div class="phone-input">
    <button
      class="phone-input__selector"
      @click="toggleDropdown"
      type="button"
    >
      <span class="phone-input__selector__flag">{{selectedCountry.flag}}</span>
      <HdIcon
        :src="smallArrowIcon"
        width="24px"
        height="24px"
        :class="arrowClassNames"
      />
    </button>
    <ul v-if="showDropdown" class="phone-input__dropdown">
      <template>
        <li v-for="(country, index) in sortedCountriesList" :key="country.name" class="phone-input__dropdown__option">
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
      placeholder="+55 (0) 555 55555555"
      :custom-rules="[rule]"
      :formatter="phoneFormatter"
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
      phoneNumber: '',
      selectedCountry: COUNTRY_PHONE_CODES.find((country) => country.code === this.defaultCountry),
      rule: {
        validate(value) {
          const hasMoreThan8Digits = value.length >= 8;
          const hasPlusDigit = value.includes('+');
          const isValid = hasPlusDigit && hasMoreThan8Digits;
          return isValid;
        },
        errorMessage: 'e.g. +55 (0) 555 55555555',
      },
      smallArrowIcon,
    };
  },
  computed: {
    sortedCountriesList() {
      // Preferred countries first
      if (this.preferredCountries.length) {
        return COUNTRY_PHONE_CODES.sort((a, b) => {
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
  },
  methods: {
    toggleDropdown() {
      this.showDropdown = !this.showDropdown;
    },
    selectCountry(country) {
      this.selectedCountry = country;
      this.toggleDropdown();
      if (!this.phoneNumber) {
        this.$refs.input.$refs.input.$refs.input.focus();
      }
    },
    phoneFormatter(phone) {
      return formatPhoneNumber(this.selectedCountry.dial_code, phone);
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
