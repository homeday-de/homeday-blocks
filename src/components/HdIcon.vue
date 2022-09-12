<template>
  <inline-svg :src="src" :id="id" :title="title" :transform-source="transform" v-bind="$attrs" />
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
  data() {
    return {
      hasAddedAccessibilityTags: false,
    };
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
      if (!this.hasAddedAccessibilityTags) {
        const randId = Math.floor(Math.random() * 1000);
        if (this.description) this.addDescTag(svg, randId);
        this.hasAddedAccessibilityTags = true;
      }
    },
    addDescTag(svg, randId) {
      const descId = `${this.id || randId}-desc`;
      const descTag = document.createElementNS('http://www.w3.org/2000/svg', 'desc');
      descTag.id = descId;
      descTag.textContent = this.description;
      svg.appendChild(descTag);
      svg.setAttribute('aria-describedby', descId);
    },
    getFillFromClassNames(classNames) {
      if (!classNames || !this.fillFromClass) {
        return null;
      }

      const classNameMatches = _intersection(
        (classNames || '').split(' '),
        Object.keys(this.fillFromClass)
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
