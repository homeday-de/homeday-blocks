import tooltipDirective from './tooltipDirective';
import HdTooltip from './HdTooltip.vue';

export default function install(Vue) {
  Vue.directive('hd-tooltip', tooltipDirective);
  const TooltipComponent = Vue.extend(HdTooltip);
  new TooltipComponent().$mount();
}
