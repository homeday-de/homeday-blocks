/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';
import { text } from '@storybook/addon-knobs';

import HdRadioButton from '../components/HdRadioButton.vue';
import HdRadioButtonNote from '../notes/HdRadioButton.md';

console.log(HdRadioButtonNote);
storiesOf('HdRadioButton', module)
  .add('with label', () => ({
    components: { HdRadioButton },
    data: () => ({
      label: text('label', 'Test Label'),
      desktopIcon: text('desktopIcon', 'https://via.placeholder.com/96'),
      desktopIconHover: text('desktopIconHover', 'https://via.placeholder.com/96?text=Hover'),
      mobileIcon: text('mobileIcon', 'https://via.placeholder.com/96'),
      value: text('value', 'Value'),
      name: text('name', 'Name'),
    }),
    template: `<HdRadioButton
      @select="action" 
      :desktopIcon="desktopIcon"
      :desktopIconHover="desktopIconHover"
      :mobileIcon="mobileIcon"
      :label="label" 
      :value="value"
      :name="name"
    />`,
    methods: { action: action('clicked') },
  }), { notes: { markdown: HdRadioButtonNote } });
