/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue';
import { HdIcon } from 'homeday-blocks';
import { apartmentFloorIcon as bigIcon } from 'homeday-blocks/src/assets/big-icons';
import multiColorIcon from './assets/ic_multi-color.svg';
import multiColorIconWithClasses from './assets/ic_multi-color--with-classes.svg';
import classFromFillNote from '../notes/HdIconClassFromFill.md';
import fillFromClassNote from '../notes/HdIconFillFromClass.md';
import './styles/HdIcon.css';

storiesOf('Components|HdIcon', module)
  .add('simple', () => ({
    components: { HdIcon },
    data() {
      return {
        icon: bigIcon,
      };
    },
    template: `
      <div>
        <p>The <b>&lt;svg&gt;</svg></b> element is the root of the component,
          so you can use its native attributes, like <b>width</b> and <b>height</b> in this example:</p>
        <HdIcon
          :src="icon"
          width="64"
          height="64"
        />
        <br>
        <HdIcon
          :src="icon"
          width="128"
          height="128"
        />
        <p>or <b>transform</b>:</p>
        <HdIcon
          :src="icon"
          width="128"
          height="128"
          transform="rotate(90)"
        />
        <br>
        <HdIcon
          :src="icon"
          width="128"
          height="128"
          transform="skewX(-10)"
        />
      </div>
    `,
  }), { percy: { skip: true } })
  .add('using classFromFill 📝', () => ({
    components: { HdIcon },
    data() {
      return {
        icon: multiColorIcon,
      };
    },
    template: `
      <div>
        <p>Check the notes for implementation details</p>
        <HdIcon
          :src="icon"
          :class-from-fill="{ '#1895FF': 'secondary-color', '#1C3553': 'primary-color' }"
          width="200"
          height="200"
        />
        <p>We add <b>primary-color</b> and <b>secondary-color</b> classes to the svg paths based on their fill color
          (you can inspect the svg to make sure they were added successfully).</p><br>
        <p>For demo purposes we change the fill of the secondary color on hover.</p>
      </div>
    `,
  }), {
    notes: {
      markdown: classFromFillNote,
    },
    percy: {
      skip: true,
    },
  })
  .add('using fillFromClass 📝', () => ({
    components: { HdIcon },
    data() {
      return {
        icon: multiColorIconWithClasses,
      };
    },
    template: `
      <div>
        <p>Check the notes for implementation details</p>
        <HdIcon
          :src="icon"
          :fill-from-class="{ 'color-1': 'gray', 'color-2': 'rgb(200, 200, 200)' }"
          width="200"
          height="200"
        />

        <p>We change the fill color of the paths based on their class (originally defined in the icon's file)</p><br>
      </div>
    `,
  }), {
    notes: {
      markdown: fillFromClassNote,
    },
    percy: {
      skip: true,
    },
  });
