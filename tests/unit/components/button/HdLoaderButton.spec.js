import { shallowMount } from '@vue/test-utils';
import HdLoaderButton from '@/components/buttons/HdLoaderButton.vue';

// FIXME: JSDOM API issue.
// querySelectorAll('paths') returns SVGElement instead of the DOM API SVGPathElement
SVGElement.prototype.getTotalLength = () => 42;

describe('HdLoaderButton', () => {
  let wrapper;
  const testLabel = 'Lorem';
  const mockedClick = jest.fn();

  beforeEach(() => {
    wrapper = shallowMount(HdLoaderButton, {
      propsData: {
        label: testLabel,
      },
    });

    wrapper.setMethods({ clicked: mockedClick });
  });

  test('the component is rendered', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  test('the label is displayed', () => {
    const labelContainer = wrapper.find('.loaderButton__button__label');
    expect(labelContainer.exists()).toBeTruthy();
    expect(labelContainer.text()).toEqual(testLabel);
  });

  test('clicking on the button, calls the proper method', () => {
    wrapper.find('.btn--primary').trigger('click');

    expect(mockedClick).toHaveBeenCalled();
  });
});
