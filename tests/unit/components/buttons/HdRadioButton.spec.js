import { mount } from '@vue/test-utils';
import HdRadioButton from '@/components/buttons/HdRadioButton.vue';

const desktopIcon = 'desktop-icon-url';
const desktopIconHover = 'desktop-icon-hover-url';
const mobileIcon = 'mobile-icon-url';

describe('HdRadioButton', () => {
  let wrapper;

  const name = 'lorem';
  const value = 'ipsum';
  const label = 'dolor';
  const ICON_SELECTOR = '.radioButton__icon';
  const ICON_HOVER_SELECTOR = '.radioButton__icon--isHover';

  beforeEach(() => {
    wrapper = mount(HdRadioButton, {
      propsData: {
        name,
        value,
        label,
        desktopIcon,
        desktopIconHover,
        mobileIcon,
      },
    });
  });

  test('the component is rendered', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  test('shows the provided icon', () => {
    expect(wrapper.find(ICON_SELECTOR).attributes().style).toEqual(expect.stringContaining(desktopIcon));
    expect(wrapper.find(ICON_HOVER_SELECTOR).attributes().style).toEqual(expect.stringContaining(desktopIconHover));
  });

  test('on change, the proper method is invoked', () => {
    const EVENT_EMITTED = 'select';
    const input = wrapper.find('input');
    expect(input.attributes().name).toBe(name);
    expect(input.attributes().value).toBe(value);
    expect(wrapper.find('label').text()).toBe(label);

    // Check events emitted before and after change
    expect(wrapper.emitted(EVENT_EMITTED)).toBeFalsy();
    input.trigger('change');
    expect(wrapper.emitted(EVENT_EMITTED)[0][0]).toMatchObject({ value, name });
  });
});
