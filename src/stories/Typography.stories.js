/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue';
import { withKnobs, select, number } from '@storybook/addon-knobs';
import { component as VueCodeHighlight } from 'vue-code-highlight';
import './styles/Typography.scss';

storiesOf('Typography/Typographies', module)
  .addDecorator(withKnobs)
  .add('Typography mixins 🎛', () => ({
    components: {
      VueCodeHighlight,
    },
    props: {
      variation: {
        default: select('Font variation', [
          'DS-60',
          'DS-80',
          'DS-100',
          'DS-200',
          'DS-300',
          'DS-400',
          'DS-500',
          'DS-600',
          'DS-700',
          'DS-800',
        ], 'DS-60'),
      },
    },
    template: `
    <div>
      <p :class="variation">
        <b>{{variation}}</b>: Die heiße Zypernsonne quälte Max und Victoria ja böse auf dem Weg bis zur Küste.
      </p>
      <p style="margin-top: 3em;">
        Usage:
        <vue-code-highlight language="scss">
<pre>myElementSelector {
  @include font('{{ variation }}'): 
}</pre>
        </vue-code-highlight>
      </p>
    </div>
    `,
  }))
  .add('Scale Ratio Typographies 🎛', () => ({
    components: {
      VueCodeHighlight,
    },
    props: {
      variation: {
        default: select('Typography variation', {
          'Minor Second (1.125)': 'ty-minor-second',
          'Minor Third (1.2)': 'ty-minor-third',
          'Major Third (1.25)': 'ty-major-third',
          'Perfect Fourth (1.333)': 'ty-perfect-fourth',
          'Augmented fourth (1.414)': 'ty-augmented-fourth',
          'Perfect Fifth (1.5)': 'ty-perfect-fifth',
          'Golden Ration (1.618)': 'ty-golden-ratio',
        },
        'ty-minor-second'),
      },
      fontSize: {
        type: Number,
        default: number('fontSize', 16, { min: 0, max: 900 }),
      },
    },
    computed: {
      style() {
        return `margin-bottom: 30px; font-size: ${this.fontSize}px`;
      },
    },
    template: `
      <div>
        <p>
        Usage: 
        <vue-code-highlight language="scss">
<pre>bodyOrMyElementSelector {
  @include document-typography(1.333); // Perfect Fourth
}</pre>
        </vue-code-highlight>
        </p>
        <div :class="variation" :style="style">
          <h1>H1. Hello, world!</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
          <h2>H2. Hello, world!</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
            Cras quis congue nulla. Duis dolor justo, commodo eu vulputate sed, ultrices non dui. Sed vel ligula a quam laoreet lacinia. Integer porttitor, elit vel bibendum tincidunt, sem nulla tristique enim, venenatis eleifend mi ipsum eget purus. Vestibulum pulvinar massa ac ex facilisis, eget sagittis velit ultricies. Mauris in libero et dui ultrices rhoncus. Curabitur molestie elit tellus, in pulvinar sem placerat at. Maecenas porta tellus eu odio tempor faucibus. Aliquam mattis dignissim nunc vel facilisis. Vivamus sit amet lectus id nisl sollicitudin sollicitudin quis nec ex. Nulla facilisi. Vestibulum tellus enim, iaculis ut felis eget, condimentum aliquam nunc. Phasellus vehicula tincidunt dolor ac tristique.
          </p>
          <p>
            <b>Small text:</b>
            <small>
              Based on https://type-scale.com/
            </small>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
            Cras quis congue nulla. Duis dolor justo, commodo eu vulputate sed, ultrices non dui. Sed vel ligula a quam laoreet lacinia. Integer porttitor, elit vel bibendum tincidunt, sem nulla tristique enim, venenatis eleifend mi ipsum eget purus. Vestibulum pulvinar massa ac ex facilisis, eget sagittis velit ultricies. Mauris in libero et dui ultrices rhoncus. Curabitur molestie elit tellus, in pulvinar sem placerat at. Maecenas porta tellus eu odio tempor faucibus. Aliquam mattis dignissim nunc vel facilisis. Vivamus sit amet lectus id nisl sollicitudin sollicitudin quis nec ex. Nulla facilisi. Vestibulum tellus enim, iaculis ut felis eget, condimentum aliquam nunc. Phasellus vehicula tincidunt dolor ac tristique.
          </p>
          </p>
          <h3>H3. Hello, world!</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras quis congue nulla. Duis dolor justo, commodo eu vulputate sed, ultrices non dui. Sed vel ligula a quam laoreet lacinia. Integer porttitor, elit vel bibendum tincidunt, sem nulla tristique enim, venenatis eleifend mi ipsum eget purus. Vestibulum pulvinar massa ac ex facilisis, eget sagittis velit ultricies. Mauris in libero et dui ultrices rhoncus. Curabitur molestie elit tellus, in pulvinar sem placerat at. Maecenas porta tellus eu odio tempor faucibus. Aliquam mattis dignissim nunc vel facilisis. Vivamus sit amet lectus id nisl sollicitudin sollicitudin quis nec ex. Nulla facilisi. Vestibulum tellus enim, iaculis ut felis eget, condimentum aliquam nunc. Phasellus vehicula tincidunt dolor ac tristique.
          </p>
          <h4>H4. Hello, world!</h4>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras quis congue nulla. Duis dolor justo, commodo eu vulputate sed, ultrices non dui. Sed vel ligula a quam laoreet lacinia. Integer porttitor, elit vel bibendum tincidunt, sem nulla tristique enim, venenatis eleifend mi ipsum eget purus. Vestibulum pulvinar massa ac ex facilisis, eget sagittis velit ultricies. Mauris in libero et dui ultrices rhoncus. Curabitur molestie elit tellus, in pulvinar sem placerat at. Maecenas porta tellus eu odio tempor faucibus. Aliquam mattis dignissim nunc vel facilisis. Vivamus sit amet lectus id nisl sollicitudin sollicitudin quis nec ex. Nulla facilisi. Vestibulum tellus enim, iaculis ut felis eget, condimentum aliquam nunc. Phasellus vehicula tincidunt dolor ac tristique.
          </p>
          <h5>H5. Hello, world!</h5>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras quis congue nulla. Duis dolor justo, commodo eu vulputate sed, ultrices non dui. Sed vel ligula a quam laoreet lacinia. Integer porttitor, elit vel bibendum tincidunt, sem nulla tristique enim, venenatis eleifend mi ipsum eget purus. Vestibulum pulvinar massa ac ex facilisis, eget sagittis velit ultricies. Mauris in libero et dui ultrices rhoncus. Curabitur molestie elit tellus, in pulvinar sem placerat at. Maecenas porta tellus eu odio tempor faucibus. Aliquam mattis dignissim nunc vel facilisis. Vivamus sit amet lectus id nisl sollicitudin sollicitudin quis nec ex. Nulla facilisi. Vestibulum tellus enim, iaculis ut felis eget, condimentum aliquam nunc. Phasellus vehicula tincidunt dolor ac tristique.
          </p>
        </div>
      </div>
    `,
    style: `
      color: red;
    `,
  }));
