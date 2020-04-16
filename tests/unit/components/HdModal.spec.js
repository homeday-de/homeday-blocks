import { wrapperFactoryBuilder } from 'tests/unit/helpers';
import HdModal from '@/components/HdModal.vue';

const HEADER_SELECTOR = '.modal__header';
const CONTENT_SELECTOR = '.modal__body';
const ACTIONS_SELECTOR = '.modal__actions';
const MODAL_WITHOUT_CLOSE_ICON_SELECTOR = 'modal--no-close-icon';
const MODAL_WITHOUT_SPACING = 'modal--no-spacing';
const MODAL_WITHOUT_EXTERNAL_SPACING = 'modal--no-external-spacing';

const HEADER = '<div>This is the modal header.</div>';
const CONTENT = '<div>This is the modal content.</div>';
const ACTIONS = [
  {
    label: 'Cancel',
    callback: () => console.log('Cancel'),
  },
  {
    label: 'Save',
    callback: () => console.log('Save'),
    type: 'primary',
  },
];

const wrapperBuilder = wrapperFactoryBuilder(HdModal, {
  slots: {
    header: HEADER,
    content: CONTENT,
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

    expect(wrapper.find(HEADER_SELECTOR).element.innerHTML).toBe(HEADER);
    expect(wrapper.find(CONTENT_SELECTOR).element.innerHTML).toBe(CONTENT);
  });

  it('renders the actions correctly', async () => {
    const wrapper = wrapperBuilder();

    expect(wrapper.find(ACTIONS_SELECTOR).exists()).toBeFalsy();

    wrapper.setProps({
      actions: ACTIONS,
    });

    await wrapper.vm.$nextTick();

    expect(wrapper.find(ACTIONS_SELECTOR).exists()).toBeTruthy();
    expect(wrapper.find(ACTIONS_SELECTOR).element.children.length).toBe(ACTIONS.length);
  });

  it('doesn\'t render the close icon if the prop `show-close-icon` is true', () => {
    const wrapper = wrapperBuilder({
      props: {
        showCloseIcon: true,
      },
    });
    const modal = wrapper.get({ ref: 'modal' });

    expect(modal.classes(MODAL_WITHOUT_CLOSE_ICON_SELECTOR)).toBeFalsy();
  });

  it('doesn\'t render spacing if the prop `no-spacing` is true', async () => {
    const wrapper = wrapperBuilder({
      props: {
        noSpacing: true,
      },
    });
    const modal = wrapper.get({ ref: 'modal' });

    expect(modal.classes(MODAL_WITHOUT_SPACING)).toBeTruthy();
  });

  it('doesn\'t render external spacing if the prop `no-external-spacing` is true', () => {
    const wrapper = wrapperBuilder({
      props: {
        noExternalSpacing: true,
      },
    });
    const modal = wrapper.get({ ref: 'modal' });

    expect(modal.classes(MODAL_WITHOUT_EXTERNAL_SPACING)).toBeTruthy();
  });
});
