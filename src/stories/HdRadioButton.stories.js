/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';

import HdRadioButton from '../components/HdRadioButton.vue';
import HdRadioButtonNote from '../notes/HdRadioButton.md';

console.log(HdRadioButtonNote);
storiesOf('HdRadioButton', module)
  .add('with label', () => ({
    components: { HdRadioButton },
    template: `<HdRadioButton
      @select="action" 
      desktopIcon="https://via.placeholder.com/96"
      desktopIconHover="https://via.placeholder.com/96?text=Hover"
      mobileIcon="https://via.placeholder.com/96"
      label="Testerino" 
      value="test"
      name="name" 
    />`,
    methods: { action: action('clicked') },
  }), { notes: 'test 123' })
  .add('without label', () => ({
    components: { HdRadioButton },
    template: `<HdRadioButton
      @select="action" 
      desktopIcon="https://via.placeholder.com/96"
      desktopIconHover="https://via.placeholder.com/96?text=Hover"
      mobileIcon="https://via.placeholder.com/96"
      value="test"
      name="name" 
    />`,
    methods: { action: action('clicked') },
  }), { notes: { markdown: HdRadioButtonNote } });
