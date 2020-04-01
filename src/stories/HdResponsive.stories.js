/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue';
import { HdResponsive } from 'homeday-blocks';
import HdResponsiveNote from '../notes/HdResponsive.md';

storiesOf('Components|HdResponsive', module)
  .add('default 📝', () => ({
    components: { HdResponsive },
    data() {
      return {
        breakpoints: {
          s: '(max-width:599px)',
          m: '(min-width:600px)',
          l: '(min-width:900px)',
          xl: '(min-width:1200px)',
        },
      };
    },
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
  }), {
    notes: {
      markdown: HdResponsiveNote,
    },
  });
