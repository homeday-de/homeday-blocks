import { wrapperFactoryBuilder } from 'tests/unit/helpers';
import Vue from 'vue';
import HdTooltipped from '@/components/tooltip/HdTooltipped.vue';
import HdInput from '@/components/form/HdInput.vue';
import tooltipDirective from '@/components/tooltip/tooltipDirective';

// required to properly solve HDTooltipped
Vue.directive('hd-tooltip', tooltipDirective);

const wrapperBuilder = wrapperFactoryBuilder(HdTooltipped);

describe('HdTooltipped', () => {
  it('renders empty', () => {
    const wrapper = wrapperBuilder();

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('renders full', () => {
    const wrapper = wrapperBuilder({
      props: {
        component: HdInput,
        value: 'Lorem ipsum',
        direction: 'left',
        props: {
          label: 'dolor sit ammet',
          type: 'text',
          name: 'testInput',
        },
      },
    });

    expect(wrapper.html()).toMatchSnapshot();
  });
});
