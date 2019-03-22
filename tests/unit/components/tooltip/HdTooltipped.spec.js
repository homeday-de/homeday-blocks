import { shallowMount } from '@vue/test-utils';
import Vue from 'vue';
import HDTooltipped from '@/components/tooltip/HdTooltipped.vue';
import HdInput from '@/components/form/HdInput.vue';
import tooltipDirective from '@/components/tooltip/tooltipDirective';

// required to properly solve HDTooltipped
Vue.directive('hd-tooltip', tooltipDirective);

describe('HDTooltipped', () => {
  let emptyWrapper;
  let wrapper;

  beforeEach(() => {
    emptyWrapper = shallowMount(HDTooltipped);

    wrapper = shallowMount(HDTooltipped, {
      propsData: {
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
  });

  test('the component is rendered', () => {
    expect(emptyWrapper.html()).toMatchSnapshot();
    expect(wrapper.html()).toMatchSnapshot();
  });
});
