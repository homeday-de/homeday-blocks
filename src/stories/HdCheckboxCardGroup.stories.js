import HdCheckboxCard from 'homeday-blocks/src/components/form/HdCheckboxCard.vue';
import HdCheckboxCardStory from 'homeday-blocks/src/stories/HdCheckboxCard.stories';
import HdCheckboxCardGroup from 'homeday-blocks/src/components/form/HdCheckboxCardGroup.vue';
import HdIcon from 'homeday-blocks/src/components/HdIcon.vue';
import HdButton from 'homeday-blocks/src/components/buttons/HdButton.vue';
import HdForm from 'homeday-blocks/src/components/form/HdForm.vue';
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
  title: 'Components/Selection Controls/HdCheckboxCardGroup',
  component: HdCheckboxCardGroup,
  argTypes: { ...HdCheckboxCardStory.argTypes },
  args: { ...HdCheckboxCardStory.args },
};

export const Default = {
  render: (_args, { argTypes }) => ({
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
  }),
  parameters: {
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
  },

  name: 'HdCheckboxCardGroup',
};
