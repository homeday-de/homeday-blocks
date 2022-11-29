import HdPager, { HdPagerModifierEnum } from 'homeday-blocks/src/components/HdPager.vue';

export default {
  title: 'Components/HdPager',
  component: HdPager,
  argTypes: {
    value: {
      control: 'number',
      description: 'Current position of the pager',
    },
    count: {
      control: 'number',
      description: 'Number of bullets',
    },
    maxVisible: {
      control: 'number',
      description: 'Maximum number of visible bullets',
    },
    white: {
      control: 'boolean',
      description: 'White color, used for black backgrounds',
    },
    modifier: {
      control: { type: 'select', options: Object.values(HdPagerModifierEnum) },
    },
  },
  args: {
    value: 1,
    count: 10,
    maxVisible: 6,
    white: false,
    modifier: HdPagerModifierEnum.WIDE,
  },
};

const Template = (_args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { HdPager },
  template: `
      <div :style="backgroundColorStyle">
        <HdPager
          v-bind="$props"
          v-model="page"
        />
      </div>
      `,
  data() {
    return {
      page: 0,
    };
  },
  computed: {
    backgroundColorStyle() {
      return {
        backgroundColor: this.$props.white ? 'black' : 'white',
      };
    },
  },
  watch: {
    page(newPage) {
      console.log('Page changed: ', newPage);
    },
  },
});

export const Wide = Template.bind({});
Wide.args = {
  modifier: HdPagerModifierEnum.WIDE,
};

export const White = Template.bind({});
White.args = {
  white: true,
};

export const Condensed = Template.bind({});
Condensed.args = {
  white: false,
  count: 10,
  modifier: HdPagerModifierEnum.CONDENSED,
};

export const Disabled = (_args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { HdPager },
  template: `
      <div @touchstart="registerStart" @touchend="registerEnd">
        <p>Clicking on the pager won't change a thing, but you can swipe left/right.</p>
        <p>Make sure you're in mobile mode to enable swiping.</p>
        <br />
        <HdPager
          v-bind="$props"
          v-model="page"
        />
      </div>
      `,
  data() {
    return {
      page: 0,
      touchstartX: 0,
      touchendX: 0,
    };
  },
  watch: {
    page(newPage) {
      console.log('Page changed: ', newPage);
    },
  },
  methods: {
    handleGesture() {
      if (this.touchstartX > this.touchendX) this.page += 1;
      else this.page -= 1;
    },
    registerStart(event) {
      this.touchstartX = event.changedTouches[0].screenX;
    },
    registerEnd(event) {
      this.touchendX = event.changedTouches[0].screenX;
      this.handleGesture();
    },
  },
});
Disabled.args = {
  disabled: true,
  count: 5,
  modifier: HdPagerModifierEnum.CONDENSED,
};
