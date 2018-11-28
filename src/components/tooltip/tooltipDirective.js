/* eslint-disable no-use-before-define, prefer-destructuring */

function getFormattedBinding(binding) {
  // in case of: v-tooltip.left="'test'"
  let { value, modifiers } = binding;
  // in case of: v-tooltip="{value: 'test', direction: 'left'}"
  if (typeof binding.value === 'object') {
    value = binding.value.value;
    modifiers = {
      [binding.value.direction]: true,
    };
  }
  return { value, modifiers };
}
export default {
  componentUpdated(el, binding) {
    if (binding.value !== binding.oldValue) {
      el.setAttribute('aria-label', getFormattedBinding(binding).value);
    }
  },
  bind(el, binding, vnode) {
    const tooltipElm = window.tooltipElement;
    if (tooltipElm === undefined) return;
    let tooltipRect = tooltipElm.getBoundingClientRect();

    const eventsIn = ['mouseenter', 'focus'];
    const eventsOut = ['mouseleave', 'blur'];

    const { value, modifiers } = getFormattedBinding(binding);

    const parent = document.body;
    const SPACING_HORIZONTAL = 8;
    const SPACING_VERTICAL = 2;

    eventsIn.forEach(event => el.addEventListener(event, show));
    eventsOut.forEach(event => el.addEventListener(event, hide));

    parent.style.position = parent.style.position || 'relative'; // To position the tooltip reltively to its parent
    parent.appendChild(tooltipElm);
    el.setAttribute('aria-label', value);

    function show() {
      tooltipElm.innerText = el.getAttribute('aria-label');
      tooltipElm.classList.add('show');
      reflow();
    }
    function hide() {
      tooltipElm.classList.remove('show');
    }
    function reflow() {
      tooltipElm.style.top = 'auto';
      tooltipElm.style.left = 'auto';
      tooltipElm.style.right = 'auto';
      vnode.context.$nextTick(() => {
        const elRect = el.getBoundingClientRect();
        const parentRect = parent.getBoundingClientRect();
        refreshTooltipRect();

        if (modifiers.left) {
          tooltipElm.classList.add('left');
          tooltipElm.style.right = `${(parentRect.right - elRect.right) + elRect.width + SPACING_HORIZONTAL}px`;
          refreshTooltipRect();
          tooltipElm.style.top = `${(elRect.top - parentRect.top - (tooltipRect.height / 2)) + (elRect.height / 2)}px`;
        } else {
          tooltipElm.classList.remove('left');
          tooltipElm.style.top = `${(elRect.top - parentRect.top) + elRect.height + SPACING_VERTICAL}px`;
          const left = (elRect.left - parentRect.left - (tooltipRect.width / 2)) + (elRect.width / 2);
          tooltipElm.style.left = `${left}px`;
          // To void overflow
          if (left < 0) {
            tooltipElm.style.left = '0px';
          }
        }
      });
    }
    function refreshTooltipRect() {
      tooltipRect = tooltipElm.getBoundingClientRect();
    }
  },
};
