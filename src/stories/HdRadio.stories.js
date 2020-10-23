import { HdRadio, HdButton } from 'homeday-blocks';
import ITEMS from './mocks/FORM_ITEMS';

export default {
  title: 'Components/Form/HdRadio',
  component: HdRadio,
  argTypes: {
    label: {
      control: { type: 'text' },
    },
    disabled: {
      control: { type: 'boolean' },
    },
    items: {
      control: { type: 'object' },
    },
    lang: {
      control: { type: 'select', options: ['de', 'en'] },
    },
    required: {
      control: { type: 'boolean' },
    },
    vertical: {
      control: { type: 'boolean' },
    },
    texts: {
      description: `For now the only text used is the required validation field. <code lang="javascript">${JSON.stringify({
        FORM: {
          VALIDATION: {
            REQUIRED: 'Dies ist ein Pflichtfeld.',
          },
        },
      })}</code>`,
      control: {
        type: 'object',
      },
    },
  },
  args: {
    label: 'Label',
    disabled: false,
    items: ITEMS,
    lang: 'de',
    name: 'my-radio',
    required: false,
    vertical: false,
    texts: null,
    value: null,
  },
  parameters: {
    docs: {
      source: {
        code: `
<template>
  <HdRadio
    v-model="myDataProperty"
    :name="name"
    :label="label"
    :items="items"
    :required="required"
    :vertical="vertical"
    :lang="lang"
    :disabled="disabled"
    :texts="texts"
  />
</template>
        `,
      },
    },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { HdRadio, HdButton },
  data: () => ({
    selectedValue: args.value,
  }),
  template: `
    <div>
      <HdRadio
        v-model="selectedValue"
        :name="name"
        :label="label"
        :items="items"
        :required="required"
        :vertical="vertical"
        :lang="lang"
        :disabled="disabled"
        :texts="texts"
        ref="myRadio"
        />

      <HdButton
        modifier="secondary"
        :style="{ marginTop: '2rem', marginRight: '0.5rem' }"
        @click.native="validate"
      >
        Submit
      </HdButton>

      <HdButton modifier="tertiary" @click.native="selectedValue = null">
        Reset form
      </HdButton>
    </div>
  `,
  methods: {
    validate() {
      const isValid = this.$refs.myRadio.validate();

      if (!isValid) {
        console.log('Not Valid');
      } else {
        console.log(`Valid! You selected: ${this.selectedValue}`);
      }
    },
  },
});

export const Default = Template.bind({});

export const Preselected = Template.bind({});
Preselected.args = {
  value: 'daenerys',
};
Preselected.parameters = {
  docs: {
    description: {
      story: 'To pre-select a value, just set an "item" prop in the `v-model`.',
    },
    source: {
      code: `
<template>
  <HdRadio
    v-model="myDataProperty"
    :name="name"
    :items="items"
  />

  <HdButton @click.native="validate">Submit</HdButton>
</template>

<script>
  export default {
    data: () => ({
      myDataProperty: 'option1'
    }),
    computed: {
      items() {
        return [
          { label: 'Option 1', value: 'option1' },
          { label: 'Option 2', value: 'option2' },
        ]
      },
    },
  }
</script>
      `,
    },
  },
};

export const Validation = Template.bind({});
Validation.args = {
  required: true,
};
Validation.parameters = {
  docs: {
    description: {
      story: `
You must add the \`required\` prop in order to enable validation.

You can manually trigger the validation using a \`ref\` in the \`HdRadio\` component and triggering the method \`this.$refs.myRadioRef.validate()\`.

Check the code bellow for a better example.
      `,
    },
    source: {
      code: `
<template>
  <HdRadio
    v-model="myDataProperty"
    :name="name"
    :items="items"
    required
    ref="myRadio"
  />

  <HdButton @click.native="validate">Submit</HdButton>
</template>

<script>
  export default {
    methods: {
      validate() {
        const isValid = this.$refs.myRadio.validate();

        if (!isValid) {
          console.log('Not Valid');
        } else {
          console.log('Valid');
        }
      },
    },
  }
</script>
      `,
    },
  },
};

export const Unlabelled = Template.bind({});
Unlabelled.args = {
  label: '',
};
Unlabelled.parameters = {
  docs: {
    description: {
      story: `If no value or an empty string is passed as the \`label\` prop,
       the component trims the label area to avoid unneeded empty space`,
    },
    source: {
      code: `
<template>
  <HdRadio
    v-model="myDataProperty"
    :name="name"
    :items="items"
    label=""
  />
</template>
      `,
    },
  },
};
