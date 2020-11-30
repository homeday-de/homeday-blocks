import './styles/StoryContainers.css';
import {
  HdLink,
  HdLinkTypes as TYPES,
} from 'homeday-blocks';
import HdLinkNote from '../notes/HdLink.md';

export default {
  title: 'Components/HdLink',
  component: HdLink,
  argTypes: {
    href: {
      control: {
        type: 'text',
      },
    },
    modifier: {
      control: {
        type: 'select',
        options: TYPES,
      },
    },
  },
  args: {
    modifier: TYPES[0],
    href: 'https://www.homeday.de',
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { HdLink },
  computed: {
    normalizedModifier() {
      return `${this.modifier.charAt(0).toUpperCase()}${this.modifier.slice(1)}`.replace('-', ' ');
    },
  },
  template: `
    <div>
      <div 
        class="story-container"
        :class="{'story-container--dark': 'dark' === modifier || 'secondary-dark' === modifier }"
      >
        <HdLink
          :modifier="modifier"
          :href="href"
        >
          {{ normalizedModifier }}
        </HdLink>
      </div>

      <div 
        class="story-container"
        :class="{'story-container--dark': 'dark' === modifier || 'secondary-dark' === modifier }"
      >
        <p>
          Lorem ipsum dolor sit amet, <HdLink :modifier="modifier" :href="href"> consectetur </HdLink>
          consectetur adipiscing elit. Donec non imperdiet magna, non finibus risus. Nullam in fringilla 
          risus, vel aliquam tellus. Donec <HdLink :modifier="modifier" :href="href"> euismod luctus lorem eget </HdLink>efficitur. 
          Quisque ut mollis tellus. 
          <ul style="list-style: disk;">
            <li><HdLink :modifier="modifier" :href="href"> Maecenas ultricies vulputate mauris et porttitor. </HdLink></li>
            <li><HdLink :modifier="modifier" :href="href"> Donec vehicula tellus </HdLink></li>
            <li><HdLink :modifier="modifier" :href="href"> vitae velit accumsan </HdLink></li>
            <li><HdLink :modifier="modifier" :href="href"> Fringilla </HdLink></li>
          </ul>
          Erat facilisis. Fusce iaculis tempus lorem, 
          eget pulvinar tortor venenatis ut. Etiam venenatis tincidunt efficitur. Nulla sagittis 
          sodales quam vitae fermentum.
        </p>
      </div>

      <div>
        Please, operate on the Controls panel to see all the variants.
      </div>
    </div>
  `,
});

export const Default = Template.bind({});
Default.parameters = {
  docs: {
    description: {
      component: HdLinkNote,
    },
  },
};
