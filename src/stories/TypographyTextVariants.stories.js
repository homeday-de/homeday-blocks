/* eslint-disable import/no-extraneous-dependencies */
import { component as VueCodeHighlight } from 'vue-code-highlight';
import '../styles/utility/typographyUtility.scss';
import './styles/StoryContainers.css';

export default {
  title: 'Typography/Typography Text Variants',
  argTypes: {
    variant: {
      control: {
        type: 'select',
        options: [
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
        ],
      },
    },
  },
  args: {
    variant: 'DS-100',
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: {
    VueCodeHighlight,
  },
  template: `
    <div>
      <p :class="utilityClass()">
        <b>{{variant}}</b>: Die heiße Zypernsonne quälte Max und Victoria ja böse auf dem Weg bis zur Küste.
      </p>
      <p style="margin-top: 3em;">
        Usage:
        <vue-code-highlight language="scss">
myElementSelector {
  @include font('{{ variant }}'): 
}
        </vue-code-highlight>
      </p>
      <p>
        The <b> font </b> mixin allows the user to implement the text aesthetics from our current design system. 
        Each of the availailable variant values describes a font-size and a line-height.
      </p>
      <p>
        <b>Helper CSS Classes</b> are also available in the format of <b>'font-#variant#'</b>. In the text example above, the <b>.font-{{variant}}</b> class is used.
      </p>
      <p>
        Please, use the <b>Controls</b> panel down here to check the variants.
      </p>
    </div>
  `,
  methods: {
    utilityClass() {
      return `font-${this.variant}`;
    },
  },
});

export const FontSizes = Template.bind({});
