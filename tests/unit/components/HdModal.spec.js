import { wrapperFactoryBuilder } from 'tests/unit/helpers';
import HdModal from '@/components/HdModal.vue';

const TITLE_SELECTOR = '.hd-modal__title';
const BODY_SELECTOR = '.hd-modal__body';
const ACTIONS_SELECTOR = '.hd-modal__footer';
const CLOSE_BUTTON_SELECTOR = '.hd-modal__close-button';
const HEADER_SELECTOR = '.hd-modal__header';
const ICON_SELECTOR = 'hd-icon-stub';
const WITH_ICON_SELECTOR = '.hd-modal--with-icon';
const WIDE_ACTIONS_CLASS_NAME = 'hd-modal__footer--wide';

const TITLE = '<div>This is the modal title.</div>';
const BODY = '<div>This is the modal body.</div>';
const ROOT = '<div>This is the modal root element</div>'

const wrapperBuilder = wrapperFactoryBuilder(HdModal, {
  slots: {
    title: TITLE,
    body: BODY,
    root: ROOT,
    lang: 'de',
  },
  shallow: true,
});

describe('HdModal', () => {
  it('renders component', () => {
    const wrapper = wrapperBuilder();

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('renders the slots correctly', () => {
    const wrapper = wrapperBuilder();

    expect(wrapper.find(TITLE_SELECTOR).element.innerHTML).toBe(TITLE);
    expect(wrapper.find(BODY_SELECTOR).element.innerHTML).toBe(BODY);
  });

  it('renders the close button by default', () => {
    const wrapper = wrapperBuilder();
    expect(wrapper.find(CLOSE_BUTTON_SELECTOR).exists()).toBe(true);
  });

  it('doesn\'t renders the close button if the `isCloseButtonVisible` is false', async () => {
    const wrapper = wrapperBuilder();

    expect(wrapper.find(CLOSE_BUTTON_SELECTOR).exists()).toBe(true);

    wrapper.setProps({
      isCloseButtonVisible: false,
    });

    await wrapper.vm.$nextTick();

    expect(wrapper.find(CLOSE_BUTTON_SELECTOR).exists()).toBe(false);
  });

  it('renders the icon within the header only if the `iconSrc` prop has a value', async () => {
    const wrapper = wrapperBuilder();
    const iconSrc = 'https://dummy.url';

    expect(wrapper.find(WITH_ICON_SELECTOR).exists()).toBe(false);
    expect(wrapper.find(HEADER_SELECTOR).find(ICON_SELECTOR).exists()).toBe(false);

    wrapper.setProps({
      iconSrc,
    });

    await wrapper.vm.$nextTick();

    expect(wrapper.find(WITH_ICON_SELECTOR).exists()).toBe(true);
    expect(wrapper.find(HEADER_SELECTOR).find(ICON_SELECTOR).exists()).toBe(true);
    expect(wrapper.find(HEADER_SELECTOR).find(ICON_SELECTOR).attributes('src')).toBe(iconSrc);
  });

  it('renders the wide actions if `isWide` prop is true', async () => {
    const wrapper = wrapperBuilder();

    const actionList = [{
      name: 'saveData',
      modifier: 'tertiary',
      text: 'Save Data',
      isInDarkBackground: false,
      disabled: false,
    }, {
      name: 'refreshPage',
      modifier: 'primary',
      text: 'Refresh Page',
      isInDarkBackground: false,
      disabled: false,
    }];

    wrapper.setProps({
      actions: actionList,
    });

    await wrapper.vm.$nextTick();

    expect(wrapper.find(ACTIONS_SELECTOR).attributes('class').includes(WIDE_ACTIONS_CLASS_NAME)).toBe(false);

    wrapper.setProps({
      isWide: true,
    });

    await wrapper.vm.$nextTick();

    expect(wrapper.find(ACTIONS_SELECTOR).attributes('class').includes(WIDE_ACTIONS_CLASS_NAME)).toBe(true);
  });

  it('renders the modal with custom root element if `isCleanSheet` prop is true', async () => {
    const wrapper = wrapperBuilder();

    wrapper.setProps({
      isCleanSheet: true,
    });

    await wrapper.vm.$nextTick();

    expect(wrapper.html()).toMatchSnapshot();
  })
});
