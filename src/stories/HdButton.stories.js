import HdButton, { TYPES } from 'homeday-blocks/src/components/buttons/HdButton.vue';
import { plus as plusIcon } from 'homeday-assets';

export default {
  title: 'Components/HdButton',
  component: HdButton,
  argTypes: {
    text: {
      control: 'text',
      description: 'Text default slot of the button',
    },
    iconSrc: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
    modifier: {
      control: { type: 'select', options: Object.values(TYPES) },
      table: {
        defaultValue: { summary: TYPES.PRIMARY },
      },
    },
    isInDarkBackground: {
      control: 'boolean',
    },
    onClick: {
      action: 'onClick',
    },
  },
  args: {
    modifier: TYPES.PRIMARY,
    text: '',
    isInDarkBackground: false,
    iconSrc: false,
    disabled: false,
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { HdButton },
  template: `
    <div>
      <HdButton
        @click="onClick"
        :modifier="modifier"
        :isInDarkBackground="isInDarkBackground"
        :disabled="disabled"
        :iconSrc="icon"
      >{{ text }}</HdButton>
      <div :style="style" />
    </div>
      `,
  computed: {
    icon() {
      return this.iconSrc ? plusIcon : '';
    },
    style() {
      return {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: this.isInDarkBackground ? '#1C3553' : '#FFF',
        zIndex: -1,
      };
    },
  },
});

export const Primary = Template.bind({});
Primary.args = {
  modifier: TYPES.PRIMARY,
  text: 'Primary',
};

export const Secondary = Template.bind({});
Secondary.args = {
  modifier: TYPES.SECONDARY,
  text: 'Secondary',
};

export const Tertiary = Template.bind({});
Tertiary.args = {
  modifier: TYPES.TERTIARY,
  text: 'Tertiary',
};

export const IconButton = Template.bind({});
IconButton.args = {
  modifier: TYPES.PRIMARY,
  text: '',
  iconSrc: true,
};

export const Flat = Template.bind({});
Flat.args = {
  modifier: TYPES.FLAT,
  text: 'Flat',
};

export const Ghost = Template.bind({});
Ghost.args = {
  modifier: TYPES.GHOST,
  text: 'Ghost',
};
