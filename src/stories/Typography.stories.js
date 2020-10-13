/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue';
import { withKnobs, select } from '@storybook/addon-knobs';

storiesOf('Typography/Typographies', module)
  .addDecorator(withKnobs)
  .add('Ready to use Typographies 🎛', () => ({
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
    props: {
      variation: {
        default: select('Typography variation', [
          'ty-minor-second',
          'ty-minor-third',
          'ty-major-third',
          'ty-perfect-fourth',
          'ty-augmented-fourth',
          'ty-perfect-fifth',
          'ty-golden-ratio',
        ],
        'ty-minor-second'),
      },
    },
    template: `
    <div>
        <p style="font-size: 2.5em; margin-bottom: 1em;">
          Based on https://type-scale.com/
        </p>
        <div :class="variation" style="margin-bottom: 30px">
          <strong>{{typographyClass}}</strong>
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
          Small text:
          <small>
             Cras scelerisque in sapien ullamcorper scelerisque
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
  }));
