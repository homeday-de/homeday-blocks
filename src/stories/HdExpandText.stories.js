import { HdExpandText } from 'homeday-blocks';

export default {
  title: 'Components/HdExpandText',
  component: HdExpandText,
  argTypes: {
    lines: {
      control: {
        type: 'range',
        max: 20,
      },
    },
    lang: {
      control: {
        type: 'select',
        options: ['de', 'en'],
      },
    },
    texts: {
      table: {
        type: {
          summary: 'object',
          detail: `
{
  "EXPAND_TEXT": {
    "TOGGLE": {
      "SHOW_MORE": string,
      "SHOW_LESS": string
    }
  }
}
          `,
        },
      },
    },
  },
  args: {
    marginTop: 0,
    marginBottom: 0,
    lines: 5,
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { HdExpandText },
  template: `
    <div style="max-width: 800px; margin: auto;">
      <HdExpandText
        :lines="lines"
        :margin-top="marginTop"
        :margin-bottom="marginBottom"
        :lang="lang"
        :texts="texts"
        :approximate-line-height="approximateLineHeight"
        :lines-fallback="linesFallback"
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
});

export const Default = Template.bind({});

export const CustomTranslation = Template.bind({});
CustomTranslation.args = {
  texts: {
    EXPAND_TEXT: {
      TOGGLE: {
        SHOW_MORE: 'I need more!',
        SHOW_LESS: 'Ughh... Close it please',
      },
    },
  },
};
