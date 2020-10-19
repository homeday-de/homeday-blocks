/* eslint-disable import/no-extraneous-dependencies */
import { component as VueCodeHighlight } from 'vue-code-highlight';
import './styles/Typography.scss';
import '../styles/utility/typographyUtility.scss';

export default {
  title: 'Typography/Document Typography',
  argTypes: {
    variation: {
      description: 'Examples of ratios to be used as parameter for the _document-typography_ SCSS mixin',
      table: {
        type: {
          summary: 'something short',
          detail: 'something really really long',
        },
      },
      control: {
        type: 'select',
        options: {
          'Minor Second (1.125)': 'ty-minor-second',
          'Minor Third (1.2)': 'ty-minor-third',
          'Major Third (1.25)': 'ty-major-third',
          'Perfect Fourth (1.333)': 'ty-perfect-fourth',
          'Augmented fourth (1.414)': 'ty-augmented-fourth',
          'Perfect Fifth (1.5)': 'ty-perfect-fifth',
          'Golden Ration (1.618)': 'ty-golden-ratio',
        },
      },
    },
    fontSize: {
      control: {
        type: 'number',
      },
    },
  },
  args: {
    variation: 'ty-minor-second',
    fontSize: 16,
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: {
    VueCodeHighlight,
  },
  computed: {
    ratio() {
      switch (this.variation) {
        case 'ty-minor-second':
          return '1.125';
        case 'ty-minor-third':
          return '1.2';
        case 'ty-major-third':
          return '1.25';
        case 'ty-perfect-fourth':
          return '1.333';
        case 'ty-augmented-fourth':
          return '1.414';
        case 'ty-perfect-fifth':
          return '1.5';
        default:
          return '1.618';
      }
    },
    style() {
      return `margin-bottom: 30px; font-size: ${this.fontSize}px`;
    },
  },
  template: `
      <div>
        <p>
        This mixins returns a set of typography rules for most of the typography HTML elements.
        <vue-code-highlight language="scss">
bodyOrMyElementSelector {
  @include document-typography({{ratio}});
}
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
});


export const DocumentTypography = Template.bind({});
