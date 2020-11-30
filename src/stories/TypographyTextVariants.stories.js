/* eslint-disable import/no-extraneous-dependencies */
import { component as VueCodeHighlight } from 'vue-code-highlight';
import '../styles/utility/typographyUtility.scss';
import './styles/StoryContainers.css';

export default {
  title: 'Typography/Typography Text Variants',
  argTypes: {
    variation: {
      control: {
        type: 'select',
        options: [
          'font-DS-60',
          'font-DS-80',
          'font-DS-100',
          'font-DS-200',
          'font-DS-300',
          'font-DS-400',
          'font-DS-500',
          'font-DS-600',
          'font-DS-700',
          'font-DS-800',
        ],
      },
    },
  },
  args: {
    variation: 'font-DS-100',
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: {
    VueCodeHighlight,
  },
  template: `
    <div>
      <p :class="variation">
        <b>{{variation}}</b>: Die heiße Zypernsonne quälte Max und Victoria ja böse auf dem Weg bis zur Küste.
      </p>
      <p style="margin-top: 3em;">
        Usage:
        <vue-code-highlight language="scss">
myElementSelector {
  @include font('{{ variation }}'): 
}
        </vue-code-highlight>
      </p>
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> :sparkles: :sparkles: manage legacy mixin
      <p>
        The <b> font </b> mixin allows the user to implement the text aesthetics from our current design system. 
        Each of the availailable variant values describes a font-size and a line-height.
      </p>
      <p>
        Please, use the <b>Controls</b> panel down here to check the variants.
      </p>
<<<<<<< HEAD
=======
>>>>>>> :recycle: refactoring based on PR comments
=======
>>>>>>> :sparkles: :sparkles: manage legacy mixin
    </div>
  `,
});

export const FontSizes = Template.bind({});
