import { shallowMount } from '@vue/test-utils';
import HdBadge, { TYPES } from '@/components/HdBadge.vue';

const LABEL_SELECTOR = '.badge__label';
const DETAILS_SELECTOR = '.badge__details';
const ICON_SELECTOR = '.badge__icon';

const BADGE_WITH_DETAILS_CLASS = 'badge--with-details';
const BADGE_COLLAPSED_CLASS = 'badge--collapsed';


const TEST_PROPS = {
  label: 'test label',
};

const TEST_SLOT = 'test <strong>badge</strong> details!';


describe('HdBadge', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(HdBadge, {
      propsData: TEST_PROPS,
      slots: {
        default: TEST_SLOT,
      },
    });
  });

  it('should render', () => {
    expect(wrapper.classes()).toContain('badge');
    expect(wrapper.html()).toMatchSnapshot();
  });

  describe('modifier variations', () => {
    it('should render with `badge--primary` class if modifier is set to primary', () => {
      const modifier = TYPES.PRIMARY;
      const className = `badge--${modifier}`;

      wrapper.setProps({
        modifier,
      });

      expect(wrapper.classes()).toContain(className);
      expect(wrapper.html()).toMatchSnapshot();
    });

    it('should render with `badge--secondary` class if modifier is set to secondary', () => {
      const modifier = TYPES.SECONDARY;
      const className = `badge--${modifier}`;

      wrapper.setProps({
        modifier,
      });

      expect(wrapper.classes()).toContain(className);
      expect(wrapper.html()).toMatchSnapshot();
    });

    it('should render with `badge--tertiary` class if modifier is set to tertiary', () => {
      const modifier = TYPES.TERTIARY;
      const className = `badge--${modifier}`;

      wrapper.setProps({
        modifier,
      });

      expect(wrapper.classes()).toContain(className);
      expect(wrapper.html()).toMatchSnapshot();
    });

    it('should render with `badge--disabled` class if modifier is set to disabled', () => {
      const modifier = TYPES.DISABLED;
      const className = `badge--${modifier}`;

      wrapper.setProps({
        modifier,
      });

      expect(wrapper.classes()).toContain(className);
      expect(wrapper.html()).toMatchSnapshot();
    });
  });

  test('should render label correctly', () => {
    expect(wrapper.find(LABEL_SELECTOR).element.textContent.trim()).toBe(TEST_PROPS.label);
  });

  test('should render details correctly', () => {
    expect(wrapper.classes()).toContain(BADGE_WITH_DETAILS_CLASS);
    expect(wrapper.find(DETAILS_SELECTOR).element.innerHTML).toBe(TEST_SLOT);
  });

  test('should collapse details if the label was clicked', () => {
    wrapper.find(LABEL_SELECTOR).element.click();

    expect(wrapper.classes()).toContain(BADGE_COLLAPSED_CLASS);
  });

  test('should not render details if a slot wasn\'t provided', () => {
    wrapper = shallowMount(HdBadge, {
      propsData: TEST_PROPS,
      slots: {},
    });

    expect(wrapper.classes()).not.toContain(BADGE_WITH_DETAILS_CLASS);
    expect(wrapper.find(DETAILS_SELECTOR).exists()).toBeFalsy();
  });

  test('should render a default icon', () => {
    expect(wrapper.find(ICON_SELECTOR).exists()).toBeTruthy();
  });

  test('should render a custom icon', () => {
    const ICON_PATH = 'fake/icon.svg';

    wrapper.setProps({
      icon: ICON_PATH,
    });

    expect(wrapper.find(ICON_SELECTOR).attributes().src).toBe(ICON_PATH);
  });

  test('should not render an icon if the prop `show-icon-before` is set false', () => {
    wrapper.setProps({
      showIconBefore: false,
    });

    expect(wrapper.find(ICON_SELECTOR).exists()).toBeFalsy();
  });
});
