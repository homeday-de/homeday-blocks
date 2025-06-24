import HdRadioCard from 'homeday-blocks/src/components/form/HdRadioCard.vue';
import HdRadioCardStory from 'homeday-blocks/src/stories/HdRadioCard.stories';
import HdRadioCardGroup from 'homeday-blocks/src/components/form/HdRadioCardGroup.vue';
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
  title: 'Components/Selection Controls/HdRadioCardGroup',
  component: HdRadioCardGroup,
  argTypes: { ...HdRadioCardStory.argTypes },
  args: { ...HdRadioCardStory.args },
};

export const Group = (_args, { argTypes }) => ({
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
      this.propertyType = null;
    },
  },
  template: `
  <div class="hd-radio-card">
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
            <HdIcon :src="mode === 'card' ? apartmentCommercialIcon : apartmentCommercialIconM" />
          </template>

          Apartment
        </HdRadioCard>

        <HdRadioCard native-value="castle">
          <template #icon>
            <HdIcon :src="mode === 'card' ? houseCastleIcon : houseCastleIconM" />
          </template>

          Castle
        </HdRadioCard>

        <HdRadioCard native-value="space">
          <template #icon>
            <HdIcon :src="mode === 'card' ? rocketIcon : rocketIconM" />
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
