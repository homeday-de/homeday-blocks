import { shallowMount } from '@vue/test-utils';
import Vue from 'vue';
import HdLoaderButton from '@/components/buttons/HdLoaderButton.vue';

Vue.use(HdLoaderButton);
// JSDOM API issue.
// querySelectorAll('paths') returns SVGElement instead of the DOM API SVGPathElement
SVGElement.prototype.getTotalLength = () => 42;

describe('HdLoaderButton', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(HdLoaderButton, {
      propsData: {
        label: 'Lorem',
      },
    });
  });

  test('the component is rendered', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });
});
