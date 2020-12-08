/* eslint-disable import/no-extraneous-dependencies */
import { component as VueCodeHighlight } from 'vue-code-highlight';

export default {
  title: 'Typography/Homeday Typography',
};

const Template = () => ({
  components: {
    VueCodeHighlight,
  },
  template: `
      <div>
        <p>
        This mixins returns a set of typography rules for most of the typography HTML elements.
        <vue-code-highlight language="scss">
html {
  @include hd-typography;
  font-size: 16px;
}
        </vue-code-highlight>

        </p>
        <div style="background: #f5f2f0; padding: 32px;">
          <div class="hd-typography" style="background: white;">
            <h1>H1. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras quis congue nulla. Duis dolor justo, commodo eu vulputate sed, ultrices non dui. Sed vel ligula a quam laoreet lacinia. </h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
            <h2>H2. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras quis congue nulla. Duis dolor justo, commodo eu vulputate sed, ultrices non dui. Sed vel ligula a quam laoreet lacinia. </h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
              Cras quis congue nulla. Duis dolor justo, commodo eu vulputate sed, ultrices non dui. Sed vel ligula a quam laoreet lacinia. Integer porttitor, elit vel bibendum tincidunt, sem nulla tristique enim, venenatis eleifend mi ipsum eget purus. Vestibulum pulvinar massa ac ex facilisis, eget sagittis velit ultricies. Mauris in libero et dui ultrices rhoncus. Curabitur molestie elit tellus, in pulvinar sem placerat at. Maecenas porta tellus eu odio tempor faucibus. Aliquam mattis dignissim nunc vel facilisis. Vivamus sit amet lectus id nisl sollicitudin sollicitudin quis nec ex. Nulla facilisi. Vestibulum tellus enim, iaculis ut felis eget, condimentum aliquam nunc. Phasellus vehicula tincidunt dolor ac tristique.
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
              Cras quis congue nulla. Duis dolor justo, commodo eu vulputate sed, ultrices non dui. Sed vel ligula a quam laoreet lacinia. Integer porttitor, elit vel bibendum tincidunt, sem nulla tristique enim, venenatis eleifend mi ipsum eget purus. Vestibulum pulvinar massa ac ex facilisis, eget sagittis velit ultricies. Mauris in libero et dui ultrices rhoncus. Curabitur molestie elit tellus, in pulvinar sem placerat at. Maecenas porta tellus eu odio tempor faucibus. Aliquam mattis dignissim nunc vel facilisis. Vivamus sit amet lectus id nisl sollicitudin sollicitudin quis nec ex. Nulla facilisi. Vestibulum tellus enim, iaculis ut felis eget, condimentum aliquam nunc. Phasellus vehicula tincidunt dolor ac tristique.
            </p>
            <h3>H3. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras quis congue nulla. Duis dolor justo, commodo eu vulputate sed, ultrices non dui. Sed vel ligula a quam laoreet lacinia. </h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras quis congue nulla. Duis dolor justo, commodo eu vulputate sed, ultrices non dui. Sed vel ligula a quam laoreet lacinia. Integer porttitor, elit vel bibendum tincidunt, sem nulla tristique enim, venenatis eleifend mi ipsum eget purus. Vestibulum pulvinar massa ac ex facilisis, eget sagittis velit ultricies. Mauris in libero et dui ultrices rhoncus. Curabitur molestie elit tellus, in pulvinar sem placerat at. Maecenas porta tellus eu odio tempor faucibus. Aliquam mattis dignissim nunc vel facilisis. Vivamus sit amet lectus id nisl sollicitudin sollicitudin quis nec ex. Nulla facilisi. Vestibulum tellus enim, iaculis ut felis eget, condimentum aliquam nunc. Phasellus vehicula tincidunt dolor ac tristique.
            </p>
            <h4>H4. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras quis congue nulla. Duis dolor justo, commodo eu vulputate sed, ultrices non dui. Sed vel ligula a quam laoreet lacinia. </h4>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras quis congue nulla. Duis dolor justo, commodo eu vulputate sed, ultrices non dui. Sed vel ligula a quam laoreet lacinia. Integer porttitor, elit vel bibendum tincidunt, sem nulla tristique enim, venenatis eleifend mi ipsum eget purus. Vestibulum pulvinar massa ac ex facilisis, eget sagittis velit ultricies. Mauris in libero et dui ultrices rhoncus. Curabitur molestie elit tellus, in pulvinar sem placerat at. Maecenas porta tellus eu odio tempor faucibus. Aliquam mattis dignissim nunc vel facilisis. Vivamus sit amet lectus id nisl sollicitudin sollicitudin quis nec ex. Nulla facilisi. Vestibulum tellus enim, iaculis ut felis eget, condimentum aliquam nunc. Phasellus vehicula tincidunt dolor ac tristique.
            </p>
            <h5>H5. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras quis congue nulla. Duis dolor justo, commodo eu vulputate sed, ultrices non dui. Sed vel ligula a quam laoreet lacinia. </h5>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras quis congue nulla. Duis dolor justo, commodo eu vulputate sed, ultrices non dui. Sed vel ligula a quam laoreet lacinia. Integer porttitor, elit vel bibendum tincidunt, sem nulla tristique enim, venenatis eleifend mi ipsum eget purus. Vestibulum pulvinar massa ac ex facilisis, eget sagittis velit ultricies. Mauris in libero et dui ultrices rhoncus. Curabitur molestie elit tellus, in pulvinar sem placerat at. Maecenas porta tellus eu odio tempor faucibus. Aliquam mattis dignissim nunc vel facilisis. Vivamus sit amet lectus id nisl sollicitudin sollicitudin quis nec ex. Nulla facilisi. Vestibulum tellus enim, iaculis ut felis eget, condimentum aliquam nunc. Phasellus vehicula tincidunt dolor ac tristique.
            </p>
          </div>
        </div>
      </div>
  `,
});


export const DocumentTypography = Template.bind({});
