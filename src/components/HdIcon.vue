<template>
  <inline-svg :src="src" :id="id" :title="title" :transform-source="transform" v-bind="$attrs" />
</template>

<script lang="ts">
import _intersection from 'lodash/intersection';
import InlineSvg from 'vue-inline-svg';
import Vue, { PropType } from 'vue';

export interface HdIconProps {
  src: string;
  title?: string;
  id?: string;
  description: string | null;
  fillFromClass?: { [key: string]: string };
  classFromFill?: { [key: string]: string };
}

export default Vue.extend({
  name: 'HdIcon',
  inheritAttrs: false,
  components: {
    InlineSvg,
  },
  props: {
    src: {
      type: String as PropType<HdIconProps['src']>,
      required: true,
    },
    title: {
      type: String as PropType<HdIconProps['title']>,
    },
    id: {
      type: String as PropType<HdIconProps['id']>,
    },
    description: {
      type: String as PropType<HdIconProps['description']>,
      default: null,
    },
    // to set a fill based on the path's class
    fillFromClass: {
      type: Object as PropType<HdIconProps['fillFromClass']>,
      default: null,
    },
    // To add class based on the path's fill
    classFromFill: {
      type: Object as PropType<HdIconProps['classFromFill']>,
      default: null,
    },
  },
  data(): {
    hasAddedAccessibilityTags: boolean;
  } {
    return {
      hasAddedAccessibilityTags: false,
    };
  },
  methods: {
    transform(svg: HTMLElement): HTMLElement {
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
    addAccessibilityTags(svg: HTMLElement): void {
      if (!this.hasAddedAccessibilityTags) {
        const randId = Math.floor(Math.random() * 1000);
        if (this.description) this.addDescTag(svg, randId);
        this.hasAddedAccessibilityTags = true;
      }
    },
    addDescTag(svg: HTMLElement, randId: number): void {
      const descId = `${this.id || randId}-desc`;
      const descTag = document.createElementNS('http://www.w3.org/2000/svg', 'desc');
      descTag.id = descId;
      descTag.textContent = this.description;
      svg.appendChild(descTag);
      svg.setAttribute('aria-describedby', descId);
    },
    getFillFromClassNames(classNames: string | null): string | null {
      if (!classNames || !this.fillFromClass) {
        return null;
      }

      const classNameMatches = _intersection(
        (classNames || '').split(' '),
        Object.keys(this.fillFromClass)
      );

      return this.fillFromClass[classNameMatches[0]];
    },
    getClassNameFromFill(fill: string | null): string {
      if (!fill || !this.classFromFill) {
        return '';
      }

      return this.classFromFill[fill];
    },
  },
});
</script>
