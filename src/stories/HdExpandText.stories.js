/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue';
import { number } from '@storybook/addon-knobs';
import { HdExpandText } from 'homeday-blocks';

storiesOf('Components|HdExpandText', module)
  .add('default 🎛', () => ({
    components: { HdExpandText },
    props: {
      lines: {
        type: Number,
        default: number('Lines', 4, {
          range: true,
          min: 1,
          max: 20,
          step: 1,
        }),
      },
    },
    template: `
      <div style="max-width: 800px; margin: auto;">
        <HdExpandText :lines="lines">
          Ullamco. Cillum velit error, aliqua magni yet magni aute. Ad
          velitesse, for eius nesciunt eaque, et. Aute quia dolores. Quo aute.
          Minima incidunt nor in ea. Ullamco nihil, yet iste laboriosam nisi.
          Incididunt. Perspiciatis nisi or culpa. Qui qui magnam so et but
          labore so ullamco. Laudantium ea eiusmod, but lorem. Nesciunt cillum
          nesciunt but consequat incidunt aspernatur. Voluptate consequatur.
          Nequeporro. Quia. Quaerat aliquip, but unde, and perspiciatis adipisci
          duis. Excepteur quam nor irure and aliquid or laboris, quis ipsum.
          Doloremque beatae, beatae.
        </HdExpandText>
      </div>
    `,
  }))
  .add('custom translation 🎛', () => ({
    components: { HdExpandText },
    props: {
      lines: {
        type: Number,
        default: number('Lines', 4, {
          range: true,
          min: 1,
          max: 20,
          step: 1,
        }),
      },
    },
    data() {
      return {
        value: '',
        texts: {
          EXPAND_TEXT: {
            TOGGLE: {
              SHOW_MORE: 'I need more!',
              SHOW_LESS: 'Ughh... Close it please',
            },
          },
        },
      };
    },
    template: `
      <div style="max-width: 800px; margin: auto;">
        <HdExpandText
          :lines="lines"
          :texts="texts"
        >
          Ullamco. Cillum velit error, aliqua magni yet magni aute. Ad
          velitesse, for eius nesciunt eaque, et. Aute quia dolores. Quo aute.
          Minima incidunt nor in ea. Ullamco nihil, yet iste laboriosam nisi.
          Incididunt. Perspiciatis nisi or culpa. Qui qui magnam so et but
          labore so ullamco. Laudantium ea eiusmod, but lorem. Nesciunt cillum
          nesciunt but consequat incidunt aspernatur. Voluptate consequatur.
          Nequeporro. Quia. Quaerat aliquip, but unde, and perspiciatis adipisci
          duis. Excepteur quam nor irure and aliquid or laboris, quis ipsum.
          Doloremque beatae, beatae.
        </HdExpandText>
      </div>
    `,
  }));
