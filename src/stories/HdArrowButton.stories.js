import HdArrowButton from 'homeday-blocks/src/components/buttons/HdArrowButton.vue';

export default {
  title: 'Components/Actions/HdArrowButton',
};

export const Right = {
  render: () => ({
    components: { HdArrowButton },
    data() {
      return {
        direction: 'right',
      };
    },
    template: `<hd-arrow-button
        :direction=direction
      />`,
  }),

  name: 'right',
};

export const Left = {
  render: () => ({
    components: { HdArrowButton },
    data() {
      return {
        direction: 'left',
      };
    },
    template: `<hd-arrow-button
        :direction=direction
      />`,
  }),

  name: 'left',
};

export const Disabled = {
  render: () => ({
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
  }),

  name: 'disabled',
};

export const Playground = {
  render: (_args, { argTypes }) => ({
    components: { HdArrowButton },
    props: Object.keys(argTypes),
    template: `<hd-arrow-button
      :direction=direction
      :disabled=disabled
    />`,
  }),
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
  parameters: {
    percy: { skip: true },
  },

  name: 'playground 🎛',
};
