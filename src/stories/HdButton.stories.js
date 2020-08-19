/* eslint-disable import/no-extraneous-dependencies */
import { action } from '@storybook/addon-actions';
import {
  HdButton,
  HdButtonTypes as TYPES,
} from 'homeday-blocks';
import { plusIcon } from 'homeday-blocks/src/assets/small-icons';

export default {
  title: 'Components/HdButton',
  component: HdButton,
  argTypes: {
    modifier: {
      control: { type: 'select', options: Object.values(TYPES) },
      table: {
        defaultValue: { summary: TYPES.PRIMARY },
      },
    },
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
      <HdButton
        @click="onClick"
        :modifier="modifier"
        :isInDarkBackground="isInDarkBackground"
        :disabled="disabled"
        :iconSrc="icon"
      >{{ text }}</HdButton>
    `,
  computed: {
    icon() {
      return this.iconSrc ? plusIcon : '';
    },
  },
  methods: {
    onClick: action('clicked'),
  },
});

export const Default = Template.bind({});
Default.args = {
  modifier: TYPES.PRIMARY,
  text: 'Default',
};
Default.parameters = {
  docs: {
    source: {
      code: `
import { plusIcon } from 'homeday-blocks/src/assets/small-icons';

<HdButton
  @click="onClick"
  :isInDarkBackground="false"
  :disabled="false"
  :iconSrc="plusIcon"
>
  {{ text }}
</HdButton>
      `,
    },
  },
};

export const Primary = Template.bind({});
Primary.args = {
  modifier: TYPES.PRIMARY,
  text: 'Primary',
};
Primary.parameters = {
  docs: {
    source: {
      code: `
<HdButton
  @click="onClick"
  :modifier="primary"
  :isInDarkBackground="false"
  :disabled="false"
  :iconSrc="plusIcon"
>
  {{ text }}
</HdButton>
      `,
    },
  },
};

export const Secondary = Template.bind({});
Secondary.args = {
  modifier: TYPES.SECONDARY,
  text: 'Secondary',
};
Secondary.parameters = {
  docs: {
    source: {
      code: `
<HdButton
  @click="onClick"
  :modifier="secondary"
  :isInDarkBackground="false"
  :disabled="false"
  :iconSrc="plusIcon"
>
  {{ text }}
</HdButton>
      `,
    },
  },
};

export const Tertiary = Template.bind({});
Tertiary.args = {
  modifier: TYPES.TERTIARY,
  text: 'Tertiary',
};
Tertiary.parameters = {
  docs: {
    source: {
      code: `
<HdButton
  @click="onClick"
  :modifier="tertiary"
  :isInDarkBackground="false"
  :disabled="false"
  :iconSrc="plusIcon"
>
  {{ text }}
</HdButton>
      `,
    },
  },
};

export const Flat = Template.bind({});
Flat.args = {
  modifier: TYPES.FLAT,
  text: 'Flat',
};
Flat.parameters = {
  docs: {
    source: {
      code: `
<HdButton
  @click="onClick"
  :modifier="flat"
  :isInDarkBackground="false"
  :disabled="false"
  :iconSrc="plusIcon"
>
  {{ text }}
</HdButton>
      `,
    },
  },
};

export const Ghost = Template.bind({});
Ghost.args = {
  modifier: TYPES.GHOST,
  text: 'Ghost',
};
Ghost.parameters = {
  docs: {
    source: {
      code: `
<HdButton
  @click="onClick"
  :modifier="ghost"
  :isInDarkBackground="false"
  :disabled="false"
  :iconSrc="plusIcon"
>
  {{ text }}
</HdButton>
      `,
    },
  },
};
