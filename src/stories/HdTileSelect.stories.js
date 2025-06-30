import HdTileSelect from 'homeday-blocks/src/components/form/HdTileSelect.vue';

const watch = {
  value(newValue) {
    console.log(`Selected value: ${newValue}`);
  },
};

export default {
  title: 'Components/Selection Controls/HdTileSelect',
};

export const Simple = () => ({
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
});

export const SimpleWithObjectItems = {
  render: () => ({
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
  }),

  name: 'Simple with Object items',
};

export const CustomFormatter = {
  render: () => ({
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
        formatter: (value) => `Formatted ${value}`,
      };
    },
    watch,
  }),

  name: 'Custom formatter',
};

export const AcceptNewValue = {
  render: () => ({
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
  }),

  name: 'Accept new value',
};

export const Required = () => ({
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
});
