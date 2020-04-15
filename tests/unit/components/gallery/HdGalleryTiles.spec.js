import { wrapperFactoryBuilder } from 'tests/unit/helpers';
import HdGalleryTiles from '@/components/gallery/HdGalleryTiles.vue';
import ITEMS from '@/stories/mocks/GALLERY_ITEMS';

const TILE_SELECTOR = '.gallery-tile';
const SECOND_TILE_SELECTOR = '.gallery-tiles__container div:nth-child(2)';
const MORE_PHOTOS_SELECTOR = '.gallery-tile__more-photos';

const wrapperBuilder = wrapperFactoryBuilder(HdGalleryTiles, {
  props: {
    items: ITEMS,
  },
});

describe('HdGalleryTiles', () => {
  it('renders component', () => {
    const wrapper = wrapperBuilder();

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('emits the proper event when the user clicks on an image', () => {
    const wrapper = wrapperBuilder();
    const chosenImageIndex = 2;
    const image = wrapper.findAll(TILE_SELECTOR).at(chosenImageIndex);

    image.trigger('click');

    expect(wrapper.emitted('itemClick')[0][0]).toBe(chosenImageIndex);
  });

  it('emits the proper event clicking on the _more photos_ button', () => {
    const wrapper = wrapperBuilder();
    const button = wrapper.findAll(MORE_PHOTOS_SELECTOR);

    button.trigger('click');

    expect(wrapper.emitted('itemClick')[0][0]).toBe(0);
  });

  it('emits the proper event with keydown on an image', () => {
    const wrapper = wrapperBuilder();
    const image = wrapper.find(SECOND_TILE_SELECTOR);

    image.trigger('keydown.space');
    expect(wrapper.emitted('itemClick').length).toBe(1);

    image.trigger('keydown.enter');
    expect(wrapper.emitted('itemClick').length).toBe(2);
  });
});
