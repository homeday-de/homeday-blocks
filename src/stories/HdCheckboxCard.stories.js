import HdIcon from 'homeday-blocks/src/components/HdIcon.vue';
import HdButton from 'homeday-blocks/src/components/buttons/HdButton.vue';
import HdForm from 'homeday-blocks/src/components/form/HdForm.vue';
import HdCheckboxCard from 'homeday-blocks/src/components/form/HdCheckboxCard.vue';
import HdCheckboxCardGroup from 'homeday-blocks/src/components/form/HdCheckboxCardGroup.vue';
import {
  apartmentCommercial as apartmentCommercialIcon,
  houseCastle as houseCastleIcon,
  rocket as rocketIcon,
} from 'homeday-assets/L';
import {
  apartmentCommercial as apartmentCommercialIconM,
  houseCastle as houseCastleIconM,
  rocket as rocketIconM,
} from 'homeday-assets/M';

export default {
  title: 'Components/Form/HdCheckboxCard',
  component: HdCheckboxCard,
  subcomponents: { HdCheckboxCardGroup },
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
        "Input name, if you are working with a group of single `HdCheckboxCard` components. \n\nDon't forget to provide the same name if you wan't them to work properly together.",
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
    indeterminate: false,
    trueValue: true,
    falseValue: false,
    mode: 'card',
    lang: 'de',
  },
};

export const Default = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: {
    HdForm,
    HdCheckboxCard,
    HdIcon,
    HdButton,
  },
  data: () => ({
    propertyType: ['apartment'],
    apartmentCommercialIcon,
    apartmentCommercialIconM,
    houseCastleIcon,
    houseCastleIconM,
    rocketIcon,
    rocketIconM,
  }),
  methods: {
    onSubmit(result) {
      console.log(result);
    },
    onClear() {
      this.propertyType = [];
    },
  },
  template: `
  <div class="hd-checkbox-card">
    <h4>Selected value: <b>{{ propertyType }}</b></h4>

    <HdForm @submit="onSubmit" class="grid">
      <HdCheckboxCard
        name="property"
        native-value="apartment"
        v-model="propertyType"
        :disabled="disabled"
        :mode="mode"
        :required="required"
        :indeterminate="indeterminate"
        :true-value="trueValue"
        :false-value="falseValue"
      >
        <template #icon>
          <HdIcon :src="mode === 'card' ? apartmentCommercialIcon : apartmentCommercialIconM" />
        </template>

        Apartment
      </HdCheckboxCard>

      <HdCheckboxCard
        name="property"
        native-value="castle"
        v-model="propertyType"
        :disabled="disabled"
        :mode="mode"
        :required="required"
        :indeterminate="indeterminate"
        :true-value="trueValue"
        :false-value="falseValue"
      >
        <template #icon>
          <HdIcon :src="mode === 'card' ? houseCastleIcon : houseCastleIconM" />
        </template>

        Castle
      </HdCheckboxCard>

      <HdCheckboxCard
        name="property"
        native-value="space"
        v-model="propertyType"
        :disabled="disabled"
        :mode="mode"
        :required="required"
        :indeterminate="indeterminate"
        :true-value="trueValue"
        :false-value="falseValue"
      >
        <template #icon>
          <HdIcon :src="mode === 'card' ? rocketIcon : rocketIconM" />
        </template>

        Space
      </HdCheckboxCard>

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
<HdForm @submit="onSubmit" class="grid">
  <HdCheckboxCard
    name="property"
    native-value="apartment"
    v-model="propertyType"
    :disabled="disabled"
    :mode="mode"
    :required="required"
    :indeterminate="indeterminate"
    :true-value="trueValue"
    :false-value="falseValue"
  >
    <template #icon>
      <HdIcon :src="mode === 'card' ? apartmentCommercialIcon : apartmentCommercialIconM" />
    </template>

    Apartment
  </HdCheckboxCard>

  <HdCheckboxCard
    name="property"
    native-value="castle"
    v-model="propertyType"
    :disabled="disabled"
    :mode="mode"
    :required="required"
    :indeterminate="indeterminate"
    :true-value="trueValue"
    :false-value="falseValue"
  >
    <template #icon>
      <HdIcon :src="mode === 'card' ? houseCastleIcon : houseCastleIconM" />
    </template>

    Castle
  </HdCheckboxCard>

  <HdCheckboxCard
    name="property"
    native-value="space"
    v-model="propertyType"
    :disabled="disabled"
    :mode="mode"
    :required="required"
    :indeterminate="indeterminate"
    :true-value="trueValue"
    :false-value="falseValue"
  >
    <template #icon>
      <HdIcon :src="mode === 'card' ? rocketIcon : rocketIconM" />
    </template>

    Space
  </HdCheckboxCard>

  <HdButton type="submit">Submit</HdButton>
  <HdButton type="button" modifier="tertiary" @click="onClear">Reset</HdButton>
</HdForm>`,
    },
    description: {
      component: `
A simple checkbox that allows you to use a more intuitive way to pick from different options.

If you want to group checkboxes, don't forget to provide a \`v-model\` with an array value, otherwise this component won't work

This component has two modes, card, and tile. Just check the documentation and play with it.

The component works on its own you can group it or use it as a standalone version, but if you need fancier formatting, you can wrap it in a \`HdCheckboxCardGroup\`
      `,
    },
  },
};

export const Boolean = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: {
    HdForm,
    HdCheckboxCard,
    HdIcon,
    HdButton,
  },
  data: () => ({
    booleanValue: null,
    apartmentCommercialIcon,
    apartmentCommercialIconM,
    houseCastleIcon,
    houseCastleIconM,
    rocketIcon,
    rocketIconM,
  }),
  methods: {
    onSubmit(result) {
      console.log(result);
    },
    onClear() {
      this.propertyType = [];
    },
  },
  template: `
  <div class="hd-checkbox-card">
    <h4>Selected value: <b>{{ booleanValue }}</b></h4>

    <HdForm @submit="onSubmit" class="small">
      <HdCheckboxCard
        name="property"
        v-model="booleanValue"
        :disabled="disabled"
        :mode="mode"
        :required="required"
        :indeterminate="indeterminate"
      >
        <template #icon>
          <HdIcon :src="mode === 'card' ? apartmentCommercialIcon : apartmentCommercialIconM" />
        </template>

        Apartment
      </HdCheckboxCard>

      <HdButton type="submit">Submit</HdButton>
      <HdButton type="button" modifier="tertiary" @click="onClear">Reset</HdButton>
    </HdForm>
  </div>
  `,
});
Boolean.parameters = {
  docs: {
    source: {
      code: `
<HdForm @submit="onSubmit" class="small">
  <HdCheckboxCard
    name="property"
    v-model="value"
    :disabled="disabled"
    :mode="mode"
    :required="required"
    :indeterminate="indeterminate"
  >
    <template #icon>
      <HdIcon :src="mode === 'card' ? apartmentCommercialIcon : apartmentCommercialIconM" />
    </template>

    Apartment
  </HdCheckboxCard>

  <HdButton type="submit">Submit</HdButton>
  <HdButton type="button" modifier="tertiary" @click="onClear">Reset</HdButton>
</HdForm>`,
    },
    description: {
      story: `
Checkboxes can work with boolean values, just provide a \`null\` or \`boolean\` \`v-model\` for single checkboxes.
      `,
    },
  },
};

export const CustomTrueFalse = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: {
    HdForm,
    HdCheckboxCard,
    HdIcon,
    HdButton,
  },
  data: () => ({
    customTrueFalse: null,
    apartmentCommercialIcon,
    apartmentCommercialIconM,
    houseCastleIcon,
    houseCastleIconM,
    rocketIcon,
    rocketIconM,
  }),
  methods: {
    onSubmit(result) {
      console.log(result);
    },
    onClear() {
      this.propertyType = [];
    },
  },
  template: `
  <div class="hd-checkbox-card">
    <h4>Selected value: <b>{{ customTrueFalse }}</b></h4>

    <HdForm @submit="onSubmit" class="small">
      <HdCheckboxCard
        name="property"
        v-model="customTrueFalse"
        :disabled="disabled"
        :mode="mode"
        :required="required"
        :indeterminate="indeterminate"
        :true-value="trueValue"
        :false-value="falseValue"
      >
        <template #icon>
          <HdIcon :src="mode === 'card' ? apartmentCommercialIcon : apartmentCommercialIconM" />
        </template>

        Apartment
      </HdCheckboxCard>

      <HdButton type="submit">Submit</HdButton>
      <HdButton type="button" modifier="tertiary" @click="onClear">Reset</HdButton>
    </HdForm>
  </div>
  `,
});
CustomTrueFalse.args = {
  trueValue: 'on',
  falseValue: 'off',
};
CustomTrueFalse.parameters = {
  docs: {
    source: {
      code: `
<HdForm @submit="onSubmit" class="small">
  <HdCheckboxCard
    name="property"
    native-value="apartment"
    v-model="value"
    :disabled="disabled"
    :mode="mode"
    :required="required"
    :indeterminate="indeterminate"
    true-value="on"
    false-value="off"
  >
    <template #icon>
      <HdIcon :src="mode === 'card' ? apartmentCommercialIcon : apartmentCommercialIconM" />
    </template>

    Apartment
  </HdCheckboxCard>

  <HdButton type="submit">Submit</HdButton>
  <HdButton type="button" modifier="tertiary" @click="onClear">Reset</HdButton>
</HdForm>`,
    },
    description: {
      story: `
You can also change the default value for true-false values by providing native checkbox attributes \`true-value\` and \`false-value\`
      `,
    },
  },
};

export const Group = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: {
    HdForm,
    HdCheckboxCard,
    HdCheckboxCardGroup,
    HdIcon,
    HdButton,
  },
  data: () => ({
    propertyType: [],
    apartmentCommercialIcon,
    apartmentCommercialIconM,
    houseCastleIcon,
    houseCastleIconM,
    rocketIcon,
    rocketIconM,
  }),
  methods: {
    onSubmit(result) {
      console.log(result);
    },
    onClear() {
      this.propertyType = [];
    },
  },
  template: `
  <div class="hd-checkbox-card">
    <h4>
      Selected value: <b>{{ propertyType }}</b>
    </h4>

    <HdForm @submit="onSubmit">
      <HdCheckboxCardGroup
        class="radio-group"
        name="property-group"
        v-model="propertyType"
        :disabled="disabled"
        :mode="mode"
        :required="required"
      >
        <HdCheckboxCard native-value="apartment">
          <template #icon>
            <HdIcon :src="mode === 'card' ? apartmentCommercialIcon : apartmentCommercialIconM" />
          </template>

          Apartment
        </HdCheckboxCard>

        <HdCheckboxCard native-value="castle">
          <template #icon>
            <HdIcon :src="mode === 'card' ? houseCastleIcon : houseCastleIconM" />
          </template>

          Castle
        </HdCheckboxCard>

        <HdCheckboxCard native-value="space">
          <template #icon>
            <HdIcon :src="mode === 'card' ? rocketIcon : rocketIconM" />
          </template>

          Space
        </HdCheckboxCard>
      </HdCheckboxCardGroup>

      <HdButton type="submit">Submit</HdButton>
      <HdButton type="button" modifier="tertiary" @click="onClear">Reset</HdButton>
    </HdForm>
  </div>
  `,
});
Group.storyName = 'HdCheckboxCardGroup';
Group.parameters = {
  docs: {
    source: {
      code: `
<HdForm @submit="onSubmit">
  <HdCheckboxCardGroup
    class="radio-group"
    name="property-group"
    v-model="propertyType"
    :disabled="disabled"
    :mode="mode"
    :required="required"
    :indeterminate="indeterminate"
  >
    <HdCheckboxCard native-value="apartment">
      <template #icon>
        <HdIcon :src="mode === 'card' ? apartmentCommercialIcon : apartmentCommercialIconM" />
      </template>

      Apartment
    </HdCheckboxCard>

    <HdCheckboxCard native-value="castle">
      <template #icon>
        <HdIcon :src="mode === 'card' ? houseCastleIcon : houseCastleIconM" />
      </template>

      Castle
    </HdCheckboxCard>

    <HdCheckboxCard native-value="space">
      <template #icon>
        <HdIcon :src="mode === 'card' ? rocketIcon : rocketIconM" />
      </template>

      Space
    </HdCheckboxCard>
  </HdCheckboxCardGroup>

  <HdButton type="submit">Submit</HdButton>
  <HdButton type="button" modifier="tertiary" @click="onClear">Reset</HdButton>
</HdForm>`,
    },
    description: {
      story: `
As the name suggests, \`HdCheckboxCardGroup\` allows you to work with groups of \`HdCheckboxCard\`.

You don't need to use this component since you can pretty much do everything by just using \`HdCheckboxCard\`.

This component can be used for:

- Extract logic from \`HdCheckboxCards\`, since you just will define one time
- It handles automatically the children positioning
- Validation is handled as a **group** not **individual**

> As a restriction, all children **must be** \`HdCheckboxCards\`
      `,
    },
  },
};
