/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';
import { text } from '@storybook/addon-knobs';
import HdRadioButton from 'homeday-blocks/src/components/buttons/HdRadioButton.vue';

storiesOf('Components/HdRadioButton', module).add('base 🎛', () => ({
  components: { HdRadioButton },
  template: `<HdRadioButton
      @select="action"
      :desktopIcon="desktopIcon"
      :desktopIconHover="desktopIconHover"
      :mobileIcon="mobileIcon"
      :label="label"
      :value="value"
      :name="name"
    />`,
  props: {
    label: {
      type: String,
      default: text('label', 'Test Label'),
    },
    desktopIcon: {
      type: String,
      default: text('desktopIcon', 'https://via.placeholder.com/96'),
    },
    desktopIconHover: {
      type: String,
      default: text('desktopIconHover', 'https://via.placeholder.com/96?text=Hover'),
    },
    mobileIcon: {
      type: String,
      default: text('mobileIcon', 'https://via.placeholder.com/96'),
    },
    value: {
      type: String,
      default: text('value', 'Value'),
    },
    name: {
      type: String,
      default: text('name', 'Name'),
    },
  },
  methods: { action: action('clicked') },
}));
