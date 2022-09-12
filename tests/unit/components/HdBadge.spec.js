import { wrapperFactoryBuilder } from 'tests/unit/helpers';
import HdBadge from '@/components/HdBadge.vue';
import TYPES from '@/components/HdBadgeTypes';

const LABEL_SELECTOR = '.badge__label';
const DETAILS_SELECTOR = '.badge__details';
const ICON_SELECTOR = '.badge__icon';

const BADGE_WITH_DETAILS_CLASS = 'badge--with-details';
const BADGE_COLLAPSED_CLASS = 'badge--collapsed';

const defaultSlot = 'test <strong>badge</strong> details!';
const defaultLabel = 'test label';

const wrapperBuilder = wrapperFactoryBuilder(HdBadge, {
  props: {
    label: defaultLabel,
  },
  slots: {
    default: defaultSlot,
  },
  shallow: true,
});

describe('HdBadge', () => {
  it('should render', () => {
    const wrapper = wrapperBuilder();

    expect(wrapper.classes()).toContain('badge');
    expect(wrapper.html()).toMatchSnapshot();
  });

  describe('modifier variations', () => {
    it('should render with `badge--primary` class if modifier is set to primary', () => {
      const modifier = TYPES.PRIMARY;
      const className = `badge--${modifier}`;
      const wrapper = wrapperBuilder({
        props: {
          modifier,
        },
      });

      expect(wrapper.classes()).toContain(className);
      expect(wrapper.html()).toMatchSnapshot();
    });

    it('should render with `badge--secondary` class if modifier is set to secondary', () => {
      const modifier = TYPES.SECONDARY;
      const className = `badge--${modifier}`;
      const wrapper = wrapperBuilder({
        props: {
          modifier,
        },
      });

      expect(wrapper.classes()).toContain(className);
      expect(wrapper.html()).toMatchSnapshot();
    });

    it('should render with `badge--tertiary` class if modifier is set to tertiary', () => {
      const modifier = TYPES.TERTIARY;
      const className = `badge--${modifier}`;
      const wrapper = wrapperBuilder({
        props: {
          modifier,
        },
      });

      expect(wrapper.classes()).toContain(className);
      expect(wrapper.html()).toMatchSnapshot();
    });

    it('should render with `badge--disabled` class if modifier is set to disabled', () => {
      const modifier = TYPES.DISABLED;
      const className = `badge--${modifier}`;
      const wrapper = wrapperBuilder({
        props: {
          modifier,
        },
      });

      expect(wrapper.classes()).toContain(className);
      expect(wrapper.html()).toMatchSnapshot();
    });
  });

  it('should render label correctly', () => {
    const wrapper = wrapperBuilder();

    expect(wrapper.find(LABEL_SELECTOR).element.textContent.trim()).toBe(defaultLabel);
  });

  it('should render details correctly', () => {
    const wrapper = wrapperBuilder();

    expect(wrapper.classes()).toContain(BADGE_WITH_DETAILS_CLASS);
    expect(wrapper.find(DETAILS_SELECTOR).element.innerHTML).toBe(defaultSlot);
  });

  it('should collapse details if the label was clicked', async () => {
    const wrapper = wrapperBuilder();

    wrapper.find(LABEL_SELECTOR).element.click();

    await wrapper.vm.$nextTick();

    expect(wrapper.classes()).toContain(BADGE_COLLAPSED_CLASS);
  });

  it("should not render details if a slot wasn't provided", () => {
    const wrapper = wrapperBuilder({
      slots: {
        default: '',
      },
    });

    expect(wrapper.classes()).not.toContain(BADGE_WITH_DETAILS_CLASS);
    expect(wrapper.find(DETAILS_SELECTOR).exists()).toBeFalsy();
  });

  it('should render a default icon', () => {
    const wrapper = wrapperBuilder();

    expect(wrapper.find(ICON_SELECTOR).exists()).toBeTruthy();
  });

  it('should render a custom icon', () => {
    const ICON_PATH = 'fake/icon.svg';
    const wrapper = wrapperBuilder({
      props: {
        icon: ICON_PATH,
      },
    });

    expect(wrapper.find(ICON_SELECTOR).attributes().src).toBe(ICON_PATH);
  });

  it('should not render an icon if the prop `show-icon-before` is set false', () => {
    const wrapper = wrapperBuilder({
      props: {
        showIconBefore: false,
      },
    });

    expect(wrapper.find(ICON_SELECTOR).exists()).toBeFalsy();
  });
});
