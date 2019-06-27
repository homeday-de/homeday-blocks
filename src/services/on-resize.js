import EventEmitter from 'hd-blocks/services/event-emitter';
import throttle from 'lodash/throttle';
import debounce from 'lodash/debounce';

const throttledResize = throttle(() => {
  EventEmitter.$emit('resize.throttled');
}, 100);
const debouncedResize = debounce(() => {
  EventEmitter.$emit('resize.debounced');
}, 300);

window.addEventListener('resize', () => {
  throttledResize();
  debouncedResize();
}, false);

window.addEventListener('orientationchange', () => {
  throttledResize();
  debouncedResize();
}, false);

export default {
  onThrottled: (cb) => {
    EventEmitter.$on('resize.throttled', cb);
  },
  offThrottled: (cb) => {
    EventEmitter.$off('resize.throttled', cb);
  },
  onDebounced: (cb) => {
    EventEmitter.$on('resize.debounced', cb);
  },
  offDebounced: (cb) => {
    EventEmitter.$off('resize.debounced', cb);
  },
};
