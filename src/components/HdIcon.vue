<template>
  <inline-svg
    v-bind="$attrs"
    :transform-source="transform"
  />
</template>

<script>
import _intersection from 'lodash/intersection';
import InlineSvg from 'vue-inline-svg';

export default {
  name: 'HdIcon',
  inheritAttrs: false,
  components: {
    InlineSvg,
  },
  props: {
    rotate: {
      type: Number,
      default: 0,
    },
    fillFromClass: {
      type: Object,
      default: null,
    },
    // To add class
    classFromFill: {
      type: Object,
      default: null,
    },
  },
  methods: {
    transform(svg) {
      if (!this.fillFromClass && !this.classFromFill) {
        return svg;
      }

      const paths = svg.querySelectorAll('path');
      paths.forEach((path) => {
        const newFill = this.getFillFromClassNames(path.getAttribute('class'));
        if (newFill) {
          path.setAttribute('fill', newFill);
        }

        const newClassName = this.getClassNameFromFill(path.getAttribute('fill'));
        if (newClassName) {
          path.setAttribute('class', `${path.getAttribute('class')} ${newClassName}`);
        }
      });

      return svg;
    },
    getFillFromClassNames(classNames) {
      if (!classNames || !this.fillFromClass) {
        return null;
      }

      const classNameMatches = _intersection(
        (classNames || '').split(' '),
        Object.keys(this.fillFromClass),
      );

      return this.fillFromClass[classNameMatches[0]];
    },
    getClassNameFromFill(fill) {
      if (!fill || !this.classFromFill) {
        return '';
      }

      return this.classFromFill[fill];
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
