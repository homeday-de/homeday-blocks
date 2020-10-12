/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue';

storiesOf('Typography/Typographies', module)
  .add('Minor Second', () => ({
    data() {
      return {
        typographyClasses: [
          'ty-minor-second',
          'ty-minor-third',
          'ty-major-third',
          'ty-perfect-fourth',
          'ty-augmented-fourth',
          'ty-perfect-fifth',
          'ty-golden-ratio',
        ],
      };
    },
    template: `
      based on https://type-scale.com/
      <div>
        <div v-for="typographyClass in typographyClasses" :class="typographyClass" style="margin-bottom: 30px">
          <strong>{{typographyClass}}</strong>
          <h1>H1. Hello, world!</h1>
          <h2>H2. Hello, world!</h2>
          <h3>H3. Hello, world!</h3>
          <h4>H4. Hello, world!</h4>
          <h5>H5. Hello, world!</h5>
          <p>
            Paragraph: Hello, world!
          </p>
          <small>
            Small text: Hello, world!
          </small>
        </div>
      </div>
    `,
  }));
