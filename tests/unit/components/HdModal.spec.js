import { shallowMount } from '@vue/test-utils';
import HdModal from '@/components/HdModal.vue';

const HEADER_SELECTOR = '.modal__header';
const CONTENT_SELECTOR = '.modal__body';
const ACTIONS_SELECTOR = '.modal__actions';
const MODAL_WITHOUT_CLOSE_ICON_SELECTOR = '.modal--no-close-icon';
const MODAL_WITHOUT_SPACING = '.modal--no-spacing';
const MODAL_WITHOUT_EXTERNAL_SPACING = '.modal--no-external-spacing';

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

describe('HdModal', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(HdModal, {
      slots: {
        header: HEADER,
        content: CONTENT,
      },
    });
  });

  test('renders component', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  test('renders the slots correctly', () => {
    expect(wrapper.find(HEADER_SELECTOR).element.innerHTML).toBe(HEADER);
    expect(wrapper.find(CONTENT_SELECTOR).element.innerHTML).toBe(CONTENT);
  });

  test('renders the actions correctly', () => {
    expect(wrapper.find(ACTIONS_SELECTOR).exists()).toBeFalsy();

    wrapper.setProps({
      actions: ACTIONS,
    });

    expect(wrapper.find(ACTIONS_SELECTOR).exists()).toBeTruthy();
    expect(wrapper.find(ACTIONS_SELECTOR).element.children.length).toBe(ACTIONS.length);
  });

  test('doesn\'t render the close icon if the prop `show-close-icon` is true', () => {
    wrapper.setProps({
      showCloseIcon: true,
    });

    expect(wrapper.classes(MODAL_WITHOUT_CLOSE_ICON_SELECTOR)).toBeTruthy();
  });

  test('doesn\'t render spacing if the prop `no-spacing` is true', () => {
    wrapper.setProps({
      noSpacing: true,
    });

    expect(wrapper.classes(MODAL_WITHOUT_SPACING)).toBeTruthy();
  });

  test('doesn\'t render external spacing if the prop `no-external-spacing` is true', () => {
    wrapper.setProps({
      noExternalSpacing: true,
    });

    expect(wrapper.classes(MODAL_WITHOUT_EXTERNAL_SPACING)).toBeTruthy();
  });
});
