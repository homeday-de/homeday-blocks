import {
  disableBodyScroll,
  enableBodyScroll,
} from 'body-scroll-lock';

export function elOffset(el) {
  const box = el.getBoundingClientRect();
  const clientTop = document.clientTop || document.body.clientTop || 0;
  const clientLeft = document.clientLeft || document.body.clientLeft || 0;
  const scrollTop = window.pageYOffset || document.scrollTop || 0;
  const scrollLeft = window.pageXOffset || document.scrollLeft || 0;

  return {
    top: box.top + (scrollTop - clientTop),
    left: box.left + (scrollLeft - clientLeft),
    width: box.width,
    height: box.height,
  };
}

export function getDocumentHeight() {
  return Math.max(
    document.body.scrollHeight, document.documentElement.scrollHeight,
    document.body.offsetHeight, document.documentElement.offsetHeight,
    document.body.clientHeight, document.documentElement.clientHeight,
  );
}

export function isWindowFullyScrolled() {
  if (window.pageYOffset + document.documentElement.clientHeight >= getDocumentHeight()) {
    return true;
  }

  return false;
}

export function freezeScrolling(el) {
  // eslint-disable-next-line no-param-reassign
  el.style['-webkit-overflow-scrolling'] = 'touch';
  disableBodyScroll(el);
}

export function unfreezeScrolling(el) {
  // eslint-disable-next-line no-param-reassign
  el.style['-webkit-overflow-scrolling'] = 'auto';
  enableBodyScroll(el);
}

export function isElVisible({ el, offset = 0 }) {
  if (el == null) {
    return false;
  }

  const { top: offsetTop } = elOffset(el);

  if (offsetTop < window.pageYOffset + offset) {
    return false;
  }

  if (offsetTop > window.pageYOffset + window.innerHeight) {
    return false;
  }

  return true;
}

export function isScrolledPastElBottom({
  el,
  // The default offset will check whether we reached the bottom of the element
  // with the bottom edge of the screen
  offset = window.innerHeight,
}) {
  if (el == null) {
    return false;
  }

  const { top: offsetTop } = elOffset(el);

  const elBottom = offsetTop + el.clientHeight;

  if (elBottom > window.pageYOffset + offset) {
    return false;
  }

  return true;
}

export function scrollToEl({ el, offset = 0, onlyIfNotVisible = true }) {
  const toScroll = [
    document.documentElement,
    document.body,
  ];

  if (el == null || (onlyIfNotVisible && isElVisible({ el, offset }))) {
    return;
  }

  if (typeof document.documentElement.scrollIntoView === 'function') {
    el.scrollIntoView({ behavior: 'smooth' });
    return;
  }

  toScroll.forEach((toScrollEl) => {
    toScrollEl.scrollTo({
      top: elOffset(el).top - offset,
      behavior: 'smooth',
    });
  });
}

export default {
  elOffset,
  getDocumentHeight,
  isWindowFullyScrolled,
  freezeScrolling,
  unfreezeScrolling,
  isElVisible,
  isScrolledPastElBottom,
  scrollToEl,
};
