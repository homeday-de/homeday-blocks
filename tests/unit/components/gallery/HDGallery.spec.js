import { wrapperFactoryBuilder } from 'tests/unit/helpers';
import HdGallery from '@/components/gallery/HdGallery.vue';
import HdGalleryPlaceholder from '@/components/gallery/HdGalleryPlaceholder.vue';
import ITEMS from '@/stories/mocks/GALLERY_ITEMS';

const wrapperFactory = wrapperFactoryBuilder(HdGallery, {
  props: {
    items: ITEMS,
  },
});

describe('HdGallery', () => {
  const build = (props) => {
    const wrapper = wrapperFactory({ props });

    return {
      wrapper,
      caption: () => wrapper.find('.gallery__caption'),
      nextButton: () => wrapper.find('.gallery__controls-next'),
      previousButton: () => wrapper.find('.gallery__controls-prev'),
      selectedPicture: () => wrapper.find('.gallery-media__object-picture'),
      selectedPictureImg: () => wrapper.find('.gallery-media__object-picture').exists()
        && wrapper.find('.gallery-media__object-picture').find('img'),
      selectedVideo: () => wrapper.find('.gallery-media__object').exists()
        && wrapper.find('.gallery-media__object').find('iframe'),
      selectedPictureInfo: () => wrapper.find('.gallery__info'),
      carousel: () => wrapper.findAll('.gallery__carousel'),
      carouselWrap: () => wrapper.findAll('.gallery-carousel__wrap'),
      flickity: () => wrapper.find('.gallery-carousel').find({ ref: 'flickity' }),
      placeholder: () => wrapper.find(HdGalleryPlaceholder),
    };
  };

  it('renders the component', () => {
    const { wrapper } = build();
    expect(wrapper.html()).toMatchSnapshot();
  });

  test('a user can navigate through the gallery', async () => {
    const items = ITEMS;
    const {
      placeholder,
      caption,
      nextButton,
      previousButton,
      selectedPictureImg,
      selectedVideo,
      carouselWrap,
      selectedPictureInfo,
    } = build({ items });

    function assetPictureIsSelected(index) {
      expect(caption().text()).toContain(items[index].caption);
      if (selectedPictureImg()) {
        expect(selectedPictureImg().attributes().src).toEqual(items[index].image);
        expect(selectedPictureImg().attributes().alt).toEqual(items[index].caption);
      } else {
        expect(selectedVideo().attributes().src).toEqual(items[index].video);
      }

      expect(selectedPictureInfo().text()).toContain(`${index + 1}/${items.length}`);
    }

    expect(placeholder().exists()).toBe(false);
    assetPictureIsSelected(0);

    await nextButton().trigger('click');
    assetPictureIsSelected(1);

    await carouselWrap().trigger('keydown', { key: 'ArrowRight' });
    assetPictureIsSelected(2);

    await carouselWrap().trigger('keydown', { key: 'ArrowDown' });
    assetPictureIsSelected(3);

    await carouselWrap().trigger('keydown', { key: 'ArrowLeft' });
    assetPictureIsSelected(2);

    await carouselWrap().trigger('keydown', { key: 'ArrowUp' });
    assetPictureIsSelected(1);

    await previousButton().trigger('click');
    assetPictureIsSelected(0);
  });

  it('displays a placeholder', () => {
    const expectedPlaceholderText = 'Little Stranger - Styles & Dynamics';
    const expectedPlaceholderIcon = 'static/media/ic_pictures.b82fd409.svg';
    const {
      placeholder,
      caption,
      selectedPicture,
      carouselWrap,
    } = build({
      items: [],
      placeholderText: expectedPlaceholderText,
      placeholderIcon: expectedPlaceholderIcon,
    });

    expect(caption().exists()).toBe(false);
    expect(selectedPicture().exists()).toBe(false);
    expect(carouselWrap().exists()).toBe(false);

    expect(placeholder().exists()).toBe(true);
    expect(placeholder().text()).toContain(expectedPlaceholderText);
    expect(placeholder().find('img').attributes().src).toBe(expectedPlaceholderIcon);
  });

  it('hides picture captions', () => {
    const { caption } = build({ showCaption: false });
    expect(caption().exists()).toBe(false);
  });

  it('starts the gallery at specific index', () => {
    const items = ITEMS;
    const expectedIndex = 3;
    const { selectedPictureImg } = build({ items, startIndex: expectedIndex });

    expect(selectedPictureImg().attributes().src).toEqual(items[expectedIndex].image);
    expect(selectedPictureImg().attributes().alt).toEqual(items[expectedIndex].caption);
  });
});
