import './styles/HdRadioCard.scss';
import {
  HdRadioCard, HdRadioCardGroup, HdButton, HdIcon, HdForm,
} from 'homeday-blocks';
import {
  apartmentCommercial as apartmentCommercialIcon,
  houseCastle as houseCastleIcon,
  rocket as rocketIcon,
} from 'homeday-assets/L';

export default {
  title: 'Components/Form/HdRadioCard',
  component: HdRadioCard,
  subcomponents: { HdRadioCardGroup },
  argTypes: {
    disabled: {
      control: { type: 'boolean' },
    },
    required: {
      control: { type: 'boolean' },
    },
    mode: {
      control: { type: 'select', options: ['card', 'tile'] },
    },
    lang: {
      control: { type: 'select', options: ['de', 'en'] },
    },
    name: {
      description:
        "Input name, if you are working with a group of single `HdRadioCard` components. \n\nDon't forget to provide the same name if you wan't them to work properly together.",
      control: {
        type: null,
      },
    },
    value: {
      description: 'This is used in `v-model` to bind the value to some data variable.',
      control: {
        type: null,
      },
    },
    nativeValue: {
      description: 'This is the actual value of the radio button.',
      control: {
        type: null,
      },
    },
    ariaLabel: {
      description:
        'The aria-label attribute is used to define a string that labels the current element. Use it in cases where a text label is not visible on the screen. If there is visible text labeling the element, use aria-labelledby instead.',
      control: {
        type: null,
      },
    },
    ariaLabelledBy: {
      description:
        'The aria-labelledby attribute establishes relationships between objects and their label(s), and its value should be one or more element IDs, which refer to elements that have the text needed for labeling. List multiple element IDs in a space delimited fashion.',
      control: {
        type: null,
      },
    },
    texts: {
      description: `This is a text object containing translations that will be merged with HomedayBlocks internal translation system.
      \nFor now the only text used is the required validation field.`,
      table: {
        type: {
          summary: 'Validation rules used in the component',
          detail: `{
  FORM: {
    VALIDATION: {
      REQUIRED: 'Dies ist ein Pflichtfeld.',
    },
  },
}`,
        },
      },
      control: {
        type: 'object',
      },
    },
    customRules: {
      description:
        'Custom validation rules, it accepts an array of objects that will be automatically executed for you.',
    },
  },
  args: {
    disabled: false,
    required: false,
    mode: 'card',
    lang: 'de',
  },
};

export const Default = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: {
    HdForm,
    HdRadioCard,
    HdIcon,
    HdButton,
  },
  data: () => ({
    propertyType: null,
    apartmentCommercialIcon,
    houseCastleIcon,
    rocketIcon,
  }),
  methods: {
    onSubmit(result) {
      console.log(result);
    },
    onClear() {
      this.propertyType = null;
      this.formResult = null;
    },
  },
  template: `
  <div>
    <h4>Selected value: <b>{{ propertyType }}</b></h4>

    <HdForm @submit="onSubmit" class="grid">
      <HdRadioCard
        name="property"
        native-value="apartment"
        v-model="propertyType"
        :disabled="disabled"
        :mode="mode"
        :required="required"
      >
        <template #icon>
          <HdIcon :src="apartmentCommercialIcon" />
        </template>

        Apartment
      </HdRadioCard>

      <HdRadioCard
        name="property"
        native-value="castle"
        v-model="propertyType"
        :disabled="disabled"
        :mode="mode"
        :required="required"
      >
        <template #icon>
          <HdIcon :src="houseCastleIcon" />
        </template>

        Castle
      </HdRadioCard>

      <HdRadioCard
        name="property"
        native-value="space"
        v-model="propertyType"
        :disabled="disabled"
        :mode="mode"
        :required="required"
      >
        <template #icon>
          <HdIcon :src="rocketIcon" />
        </template>

        Space
      </HdRadioCard>

      <HdButton type="submit">Submit</HdButton>
      <HdButton type="button" modifier="tertiary" @click="onClear">Reset</HdButton>
    </HdForm>
  </div>
  `,
});
Default.parameters = {
  docs: {
    source: {
      code: `
<HdForm @submit="onSubmit">
  <HdRadioCard
    name="property"
    native-value="apartment"
    v-model="propertyType"
    :disabled="disabled"
    :mode="mode"
    :required="required"
  >
    <template #icon>
      <HdIcon :src="apartmentCommercialIcon" />
    </template>

    Apartment
  </HdRadioCard>

  <HdRadioCard
    name="property"
    native-value="castle"
    v-model="propertyType"
    :disabled="disabled"
    :mode="mode"
    :required="required"
  >
    <template #icon>
      <HdIcon :src="houseCastleIcon" />
    </template>

    Castle
  </HdRadioCard>

  <HdRadioCard
    name="property"
    native-value="space"
    v-model="propertyType"
    :disabled="disabled"
    :mode="mode"
    :required="required"
  >
    <template #icon>
      <HdIcon :src="rocketIcon" />
    </template>

    Space
  </HdRadioCard>

  <HdButton type="submit">Submit</HdButton>
  <HdButton type="button" modifier="tertiary" @click="onClear">Reset</HdButton>
</HdForm>`,
    },
    description: {
      component: `
A simple radio input that allows you to use a more intuitive way to pick from different options.

This component has two modes, card, and tile. Just check the documentation and play with it.

The component works on its own you can group it or use it as a standalone version, but if you need fancier formatting, you can wrap it in a \`HdRadioCardGroup\`
      `,
    },
  },
};

export const Group = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: {
    HdForm,
    HdRadioCard,
    HdRadioCardGroup,
    HdIcon,
    HdButton,
  },
  data: () => ({
    propertyType: null,
    apartmentCommercialIcon,
    houseCastleIcon,
    rocketIcon,
  }),
  methods: {
    onSubmit(result) {
      console.log(result);
    },
    onClear() {
      this.propertyType = null;
    },
  },
  template: `
  <div>
    <h4>
      Selected value: <b>{{ propertyType }}</b>
    </h4>

    <HdForm @submit="onSubmit">
      <HdRadioCardGroup
        class="radio-group"
        name="property-group"
        v-model="propertyType"
        :disabled="disabled"
        :mode="mode"
        :required="required"
      >
        <HdRadioCard native-value="apartment">
          <template #icon>
            <HdIcon :src="apartmentCommercialIcon" />
          </template>

          Apartment
        </HdRadioCard>

        <HdRadioCard native-value="castle">
          <template #icon>
            <HdIcon :src="houseCastleIcon" />
          </template>

          Castle
        </HdRadioCard>

        <HdRadioCard native-value="space">
          <template #icon>
            <HdIcon :src="rocketIcon" />
          </template>

          Space
        </HdRadioCard>
      </HdRadioCardGroup>

      <HdButton type="submit">Submit</HdButton>
      <HdButton type="button" modifier="tertiary" @click="onClear">Reset</HdButton>
    </HdForm>
  </div>
  `,
});
Group.storyName = 'HdRadioCardGroup';
Group.parameters = {
  docs: {
    source: {
      code: `
<HdForm @submit="onSubmit">
  <HdRadioCardGroup
    class="radio-group"
    name="property-group"
    v-model="propertyType"
    :disabled="disabled"
    :mode="mode"
    :required="required"
  >
    <HdRadioCard native-value="apartment">
      <template #icon>
        <HdIcon :src="apartmentCommercialIcon" />
      </template>

      Apartment
    </HdRadioCard>

    <HdRadioCard native-value="castle">
      <template #icon>
        <HdIcon :src="houseCastleIcon" />
      </template>

      Castle
    </HdRadioCard>

    <HdRadioCard native-value="space">
      <template #icon>
        <HdIcon :src="rocketIcon" />
      </template>

      Space
    </HdRadioCard>
  </HdRadioCardGroup>

  <HdButton type="submit">Submit</HdButton>
  <HdButton type="button" modifier="tertiary" @click="onClear">Reset</HdButton>
</HdForm>`,
    },
    description: {
      story: `
As the name suggests, \`HdRadioCardGroup\` allows you to work with groups of \`HdRadioCard\`.

You don't need to use this component since you can pretty much do everything by just using \`HdRadioCard\`.

This component can be used for:

- Extract logic from \`HdRadioCards\`, since you just will define one time
- It handles automatically the children positioning
- Validation is handled as a **group** not **individual**

> ❗️ As a restriction, all children **must be** \`HdRadioCards\`
      `,
    },
  },
};
