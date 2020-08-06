/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue';
import { HdLoadingSpinner } from 'homeday-blocks';

storiesOf('Components|HdLoadingSpinner', module)
  .add('default', () => ({
    components: { HdLoadingSpinner },
    template: '<HdLoadingSpinner />',
  }));
