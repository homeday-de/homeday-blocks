import { HdResponsive } from 'homeday-blocks';
import HdResponsiveNote from '../notes/HdResponsive.md';

export default {
  title: 'Components/HdResponsive',
  component: HdResponsive,
  args: {
    breakpoints: {
      s: '(max-width:599px)',
      m: '(min-width:600px)',
      l: '(min-width:900px)',
      xl: '(min-width:1200px)',
    },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { HdResponsive },
  template: `
    <HdResponsive
      :breakpoints="breakpoints"
      #default="{ matches, indeterminate }"
    >
      <div v-if="indeterminate">Matching could not be reliably determined (server side rendering, unit tests environment)</div>
      <div v-else-if="matches.xl">xl breakpoint matched</div>
      <div v-else-if="matches.l">l breakpoint matched</div>
      <div v-else-if="matches.m">m breakpoint matched</div>
      <div v-else-if="matches.s">s breakpoint matched</div>
    </HdResponsive>
  `,
});

export const Default = Template.bind({});
Default.parameters = {
  docs: {
    description: {
      component: HdResponsiveNote,
    },
  },
};
