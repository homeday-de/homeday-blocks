/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue';
import HdArrowButton from 'homeday-blocks/src/components/buttons/HdArrowButton.vue';

storiesOf('Components/Actions/HdArrowButton', module)
  .add('right', () => ({
    components: { HdArrowButton },
    data() {
      return {
        direction: 'right',
      };
    },
    template: `<hd-arrow-button
      :direction=direction
    />`,
  }))
  .add('left', () => ({
    components: { HdArrowButton },
    data() {
      return {
        direction: 'left',
      };
    },
    template: `<hd-arrow-button
      :direction=direction
    />`,
  }))
  .add('disabled', () => ({
    components: { HdArrowButton },
    data() {
      return {
        direction: 'left',
        disabled: true,
      };
    },
    template: `<hd-arrow-button
      :direction=direction
      :disabled=disabled
    />`,
  }))
  .add(
    'playground 🎛',
    (args) => ({
      components: { HdArrowButton },
      props: Object.keys(args),
      template: `<hd-arrow-button
        :direction=direction
        :disabled=disabled
      />`,
    }),
    {
      args: {
        direction: 'right',
        disabled: false,
      },
      argTypes: {
        direction: {
          name: 'Arrow direction',
          control: { type: 'select' },
          options: ['right', 'left'],
        },
        disabled: {
          name: 'Button disabled state',
          control: { type: 'boolean' },
        },
      },
      percy: { skip: true },
    }
  );
