import { mount } from '@vue/test-utils';
import HdGalleryTiles from '@/components/gallery/HdGalleryTiles.vue';
import ITEMS from '@/stories/mocks/GALLERY_ITEMS';

describe('HdGalleryTiles', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(HdGalleryTiles, {
      propsData: {
        items: ITEMS,
      },
    });
  });

  it('renders component', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('emits the proper event when the user clicks on an image', () => {
    const chosenImageIndex = 2;
    const image = wrapper.findAll('.gallery-tile').at(chosenImageIndex);
    image.trigger('click');

    expect(wrapper.emitted('itemClick')[0][0]).toBe(chosenImageIndex);
  });

  it('emits the proper event clicking on the _more photos_ button', () => {
    const button = wrapper.findAll('.gallery-tile__more-photos');
    button.trigger('click');

    expect(wrapper.emitted('itemClick')[0][0]).toBe(0);
  });
});
