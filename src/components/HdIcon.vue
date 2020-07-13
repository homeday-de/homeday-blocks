<template>
  <inline-svg
    :src="src"
    :title="title"
    :id="id"
    :description="description"
    :transform-source="transform"
    v-bind="$attrs"
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
    src: {
      type: String,
      required: true,
    },
    title: {
      type: String,
    },
    id: {
      type: String,
    },
    description: {
      type: String,
    },
    // to set a fill based on the path's class
    fillFromClass: {
      type: Object,
      default: null,
    },
    // To add class based on the path's fill
    classFromFill: {
      type: Object,
      default: null,
    },
  },
  methods: {
    transform(svg) {
      this.addAccessibilityTags(svg);

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
    addAccessibilityTags(svg) {
      const randId = Math.floor(Math.random() * 1000);
      const attrs = [];
      if (this.title) {
        const titleId = `${this.id || randId}-title`;
        const titleTag = document.createElementNS('http://www.w3.org/2000/svg', 'title');
        titleTag.innerHTML = this.title;
        titleTag.id = titleId;
        svg.insertBefore(titleTag, svg.firstChild);
        attrs.push(titleId);
      }
      if (this.description) {
        const descId = `${this.id || randId}-desc`;
        const descTag = document.createElementNS('http://www.w3.org/2000/svg', 'desc');
        descTag.id = descId;
        svg.appendChild(descTag);
        attrs.push(descId);
      }
      if (attrs.length) svg.setAttribute('aria-labelledby', attrs.join(' '));
      svg.setAttribute('role', 'img');
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
