import { mount } from '@vue/test-utils';
import HdGallery from '@/components/gallery/HdGallery.vue';
import ITEMS from '@/stories/mocks/GALLERY_ITEMS';

describe('HdGallery', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(HdGallery, {
      propsData: {
        items: ITEMS,
      },
    });
  });

  it('renders component', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('switchs elements and emits the proper events clicks', () => {
    const testIndex = 3;
    const figure = wrapper.find('.gallery__figure');
    figure.trigger('click');
    expect(wrapper.emitted('currentItemClick')[0][0]).toBe(0);

    wrapper.setData({ currentItemIndex: testIndex });

    figure.trigger('click');
    expect(wrapper.emitted('currentItemClick')[1][0]).toBe(testIndex);
  });
});
