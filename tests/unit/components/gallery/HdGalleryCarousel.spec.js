import { wrapperFactoryBuilder } from 'tests/unit/helpers';
import onResize from 'homeday-blocks/src/services/on-resize';
import HdGalleryCarousel from '@/components/gallery/HdGalleryCarousel.vue';
import ITEMS from '@/stories/mocks/GALLERY_ITEMS';

jest.mock('homeday-blocks/src/services/on-resize');

describe('HdGalleryCarousel', () => {
  const build = (props) => {
    const wrapper = wrapperFactoryBuilder(HdGalleryCarousel, {
      props: {
        items: ITEMS,
      },
    })({ props });

    return {
      wrapper,
      galleryItems: () => wrapper.findAll('.gallery-carousel__item'),
      pager: () => wrapper.find('.gallery-carousel__pager'),
      flickity: () => wrapper.find({ ref: 'flickity' }),
      wrap: () => wrapper.find('.gallery-carousel__wrap'),
      activeThumbnail: () => wrapper.find('.is-active'),
      activeThumbnailImg: () => wrapper.find('.is-active').find('img'),
    };
  };

  it('should render as expected', () => {
    const { wrapper } = build();
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render items correctly', () => {
    const { galleryItems } = build();

    expect(galleryItems()).toHaveLength(ITEMS.length);
    ITEMS.forEach(({ caption, thumbnail }, index) => {
      const img = galleryItems().at(index).get('img');
      expect(img.attributes().alt).toBe(caption);
      expect(img.attributes().src).toBe(thumbnail);
    });
  });

  it('should dispose component listeners', async () => {
    const { wrapper, flickity } = build();
    const offSpy = jest.spyOn(flickity().vm, 'off');

    await wrapper.vm.$nextTick();
    wrapper.destroy();

    expect(offSpy).toHaveBeenNthCalledWith(1, 'change', expect.anything());
    expect(offSpy).toHaveBeenNthCalledWith(2, 'staticClick', expect.anything());
    expect(onResize.offDebounced).toHaveBeenCalled();
  });

  it('should change selected gallery item when user types directional keys', async () => {
    const items = [ITEMS[3], ITEMS[4]];
    const {
      wrapper, activeThumbnail, activeThumbnailImg, wrap,
    } = build({
      items,
    });

    await wrapper.vm.$nextTick();

    // no current thumbnail is "active" until
    // we trigger any change inside the carousel
    expect(activeThumbnail().exists()).toBe(false);

    let nextIndex = 1;
    await wrap().trigger('keydown', { key: 'ArrowRight' });
    await wrapper.setProps({ value: nextIndex });

    expect(activeThumbnailImg().attributes().alt).toBe(items[1].caption);
    expect(activeThumbnailImg().attributes().src).toBe(items[1].thumbnail);
    expect(wrapper.emitted('input')[0][0]).toBe(nextIndex);

    nextIndex = 0;
    await wrap().trigger('keydown', { key: 'ArrowDown' });
    await wrapper.setProps({ value: nextIndex });

    expect(activeThumbnailImg().attributes().alt).toBe(items[0].caption);
    expect(activeThumbnailImg().attributes().src).toBe(items[0].thumbnail);
    expect(wrapper.emitted('input')[1][0]).toBe(nextIndex);

    nextIndex = 1;
    await wrap().trigger('keydown', { key: 'ArrowLeft' });
    await wrapper.setProps({ value: nextIndex });

    expect(activeThumbnailImg().attributes().alt).toBe(items[1].caption);
    expect(activeThumbnailImg().attributes().src).toBe(items[1].thumbnail);
    expect(wrapper.emitted('input')[2][0]).toBe(nextIndex);

    nextIndex = 0;
    await wrap().trigger('keydown', { key: 'ArrowUp' });
    await wrapper.setProps({ value: nextIndex });

    expect(activeThumbnailImg().attributes().alt).toBe(items[0].caption);
    expect(activeThumbnailImg().attributes().src).toBe(items[0].thumbnail);
    expect(wrapper.emitted('input')[3][0]).toBe(nextIndex);
  });
});
