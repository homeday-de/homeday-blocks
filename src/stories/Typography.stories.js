/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue';
import { withKnobs, select, number } from '@storybook/addon-knobs';
import './styles/Typography.scss';

storiesOf('Typography/Typographies', module)
  .addDecorator(withKnobs)
  .add('Typography mixins 🎛', () => ({
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
      <p style="margin-top: 1em;">
        Usage: 
      </p>
      <p style="font-family: 'Courier New', courier, sans; background: #f6f6f6; padding: 1em 0.7em;">
        <b>@include font(</b>'{{ variation }}'<b>)</b>;
      </p>
    </div>
    `,
  }))
  .add('Ready to use Typographies 🎛', () => ({
    props: {
      variation: {
        default: select('Typography variation', {
          'Minor Second': 'ty-minor-second',
          'Minor Third': 'ty-minor-third',
          'Major Third': 'ty-major-third',
          'Perfect Fourth': 'ty-perfect-fourth',
          'Augmented fourth': 'ty-augmented-fourth',
          'Perfect Fifth': 'ty-perfect-fifth',
          'Golden Ration': 'ty-golden-ratio',
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
