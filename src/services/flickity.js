export function hidePaginationWhenNotNeeded() {
  const viewport = this.size.width;
  const fullSize = Math.round(this.slideableWidth);

  if (fullSize > viewport) {
    this.bindDrag();
    this.element.classList.remove('flickity--no-controls');
  } else if (fullSize <= viewport) {
    this.unbindDrag();
    this.element.classList.add('flickity--no-controls');
  }
}

export default {
  hidePaginationWhenNotNeeded,
};
