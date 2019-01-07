/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';
import { text, boolean, number } from '@storybook/addon-knobs';

import HdLoaderButton from 'hd-blocks-components/buttons/HdLoaderButton.vue';

storiesOf('HdLoaderButton', module)
  .add('with label', () => ({
    components: { HdLoaderButton },
    data: () => ({
      label: text('Label', 'Loader Button Label'),
      isStatic: boolean('Static?', true),
      resetOnSuccess: boolean('Reset on success state?', true),
      idleResetTime: number('Reset time?', 200),
      height: number('Height', 46),
      loadingCircleStrokeWidth: number('Loading circle stroke width', 4),
    }),
    template: `<HdLoaderButton
      @click="clicked"
      @success="success"
      @error="error"
      :label=label
      :isStatic=isStatic
      :idleResetTime=idleResetTime
      :resetOnSuccess=resetOnSuccess
      :loadingCircleStrokeWidth=loadingCircleStrokeWidth
      :buttonHeight=height
    />`,
    methods: {
      clicked: action('clicked 123'),
      success: action('success'),
      error: action('error'),
    },
  }));
