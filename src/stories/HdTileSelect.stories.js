/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue';
import { HdTileSelect } from 'homeday-blocks';

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
    >
      {{ value }}
    </HdTileSelect>
  `,
  data() {
    return {
      items: [1, 2, 3],
      value: 0,
      formatter: value => (`Formatted ${value}`),
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
