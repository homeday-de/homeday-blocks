/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';
import { text, boolean, number } from '@storybook/addon-knobs';
import { HdLoaderButton } from 'homeday-blocks';
import hdLoaderButtonNote from '../notes/HdLoaderButton.md';

storiesOf('Components|HdLoaderButton', module)
  .add('Playground 🎛', () => ({
    components: { HdLoaderButton },
    props: {
      label: {
        type: String,
        default: text('Label', 'Loader Button Label'),
      },
      isStatic: {
        type: Boolean,
        default: boolean('Static?', true),
      },
      resetOnSuccess: {
        type: Boolean,
        default: boolean('Reset on success state?', true),
      },
      idleResetTime: {
        type: Number,
        default: number('Reset time?', 200),
      },
      height: {
        type: Number,
        default: number('Height', 46),
      },
      loadingCircleStrokeWidth: {
        type: Number,
        default: number('Loading circle stroke width', 4),
      },
      disabled: {
        type: Boolean,
        default: boolean('Disabled?', false),
      },
    },
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
      :disabled=disabled
    />`,
    methods: {
      clicked: action('clicked 123'),
      success: action('success'),
      error: action('error'),
    },
  }), {
    notes: hdLoaderButtonNote,
  });
