import HdBadge from 'homeday-blocks/src/components/HdBadge.vue';
import TYPES from 'homeday-blocks/src/components/HdBadgeTypes';

export default {
  title: 'Components/HdBadge',
  component: HdBadge,
  argTypes: {
    modifier: {
      control: { type: 'select', options: Object.values(TYPES) },
      table: {
        defaultValue: { summary: TYPES.DEFAULT },
      },
    },
    details: {
      control: { type: 'text' },
      description: 'Details default slot of the badge',
    },
  },
  args: {
    label: 'Badge',
    modifier: TYPES.DEFAULT,
    icon: '',
    showIconBefore: true,
    details: null,
  },
  parameters: {
    docs: {
      source: {
        code: `
<HdBadge
  :label="label"
  :modifier="modifier"
  :icon="icon"
  :show-icon-before="showIconBefore"
>
  {{ details }}
</HdBadge>
        `,
      },
    },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { HdBadge },
  template: `
    <HdBadge
      :label="label"
      :modifier="modifier"
      :icon="icon"
      :show-icon-before="showIconBefore"
    >
      <template v-if="details">{{ details }}</template>
    </HdBadge>
  `,
});

export const WithoutDetails = Template.bind({});

export const WithDetails = Template.bind({});
WithDetails.args = {
  details: 'test badge details!',
};
