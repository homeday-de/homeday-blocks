import {
  HdLink,
  HdLinkTypes as TYPES,
} from 'homeday-blocks';
import HdLinkNote from '../notes/HdLink.md';

export default {
  title: 'Components/HdLink',
  component: HdLink,
  argTypes: {
    href: {
      control: {
        type: 'text',
      },
    },
    modifier: {
      control: {
        type: 'select',
        options: TYPES,
      },
    },
  },
  args: {
    modifier: TYPES[0],
    href: 'https://www.homeday.de',
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { HdLink },
  computed: {
    capitalizedModifier() {
      return this.modifier.charAt(0).toUpperCase() + this.modifier.slice(1);
    },
  },
  template: `
    <HdLink
      :modifier="modifier"
      :href="href"
    >
      {{ capitalizedModifier }}
    </HdLink>
  `,
});

export const Default = Template.bind({});
Default.parameters = {
  docs: {
    description: {
      component: HdLinkNote,
    },
  },
};

export const Primary = Template.bind({});
Primary.args = {
  modifier: TYPES[0],
};

export const Secondary = Template.bind({});
Secondary.args = {
  modifier: TYPES[1],
};
