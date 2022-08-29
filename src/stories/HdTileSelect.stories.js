/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue';
import HdTileSelect from 'homeday-blocks/src/components/form/HdTileSelect.vue';

const stories = storiesOf('Components/Form/HdTileSelect', module);
const watch = {
  value(newValue) {
    console.log(`Selected value: ${newValue}`);
  },
};

stories.add('Simple', () => ({
  components: { HdTileSelect },
  template: `
    <HdTileSelect
      v-model="value"
      :items="items"
      name="myTileSelect"
      required
    >
      {{ value }}
    </HdTileSelect>
  `,
  data() {
    return {
      items: [1, 2, 3],
      value: 0,
    };
  },
  watch,
}));

stories.add('Simple with Object items', () => ({
  components: { HdTileSelect },
  template: `
    <HdTileSelect
      v-model="value"
      :items="items"
      name="myTileSelect"
    >
      {{ value }}
    </HdTileSelect>
  `,
  data() {
    return {
      items: [
        {
          value: true,
          text: 'Yes',
        },
        {
          value: false,
          text: 'No',
        },
      ],
      value: '',
    };
  },
  watch,
}));

stories.add('Custom formatter', () => ({
  components: { HdTileSelect },
  template: `
    <HdTileSelect
      v-model="value"
      :items="items"
      :formatter="formatter"
      name="myTileSelect"
    >
      {{ value }}
    </HdTileSelect>
  `,
  data() {
    return {
      items: [1, 2, 3],
      value: 0,
      formatter: (value) => (`Formatted ${value}`),
    };
  },
  watch,
}));

stories.add('Accept new value', () => ({
  components: { HdTileSelect },
  template: `
    <HdTileSelect
      v-model="value"
      :items="items"
      accept-new-value
      name="myTileSelect"
    >
      {{ value }}
    </HdTileSelect>
  `,
  data() {
    return {
      items: [1, 2, 3],
      value: 0,
    };
  },
  watch,
}));

stories.add('Required', () => ({
  components: { HdTileSelect },
  template: `
    <div>
      <HdTileSelect
        ref="tileSelect"
        v-model="value"
        :items="items"
        name="myTileSelect"
        required
      >
        {{ value }}
      </HdTileSelect>

      <button @click="validate">Validate</button>
    </div>
  `,
  data() {
    return {
      items: [1, 2, 3],
      value: null,
    };
  },
  watch,
  methods: {
    validate() {
      const isValid = this.$refs.tileSelect.validate();
      console.log('isValid', isValid);
    },
  },
}));
