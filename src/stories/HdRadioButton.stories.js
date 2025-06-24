/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';
import HdRadioButton from 'homeday-blocks/src/components/buttons/HdRadioButton.vue';

storiesOf('Components/Selection Controls/HdRadioButton', module).add(
  'base 🎛',
  (args) => ({
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
    props: Object.keys(args),
    methods: { action: action('clicked') },
  }),
  {
    args: {
      label: 'Test Label',
      desktopIcon: 'https://picsum.photos/id/237/96',
      desktopIconHover: 'https://picsum.photos/id/237/96?grayscale',
      mobileIcon: 'https://picsum.photos/id/237/48',
      value: 'Value',
      name: 'Name',
    },
    argTypes: {
      label: {
        name: 'Label',
        control: { type: 'text' },
      },
      desktopIcon: {
        name: 'Desktop Icon',
        control: { type: 'text' },
      },
      desktopIconHover: {
        name: 'Desktop Icon Hover',
        control: { type: 'text' },
      },
      mobileIcon: {
        name: 'Mobile Icon',
        control: { type: 'text' },
      },
      value: {
        name: 'Value',
        control: { type: 'text' },
      },
      name: {
        name: 'Name',
        control: { type: 'text' },
      },
    },
  }
);
