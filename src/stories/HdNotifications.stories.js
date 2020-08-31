import {
  HdNotifications,
  HdNotificationsBar,
  HdNotificationsTypes as TYPES,
} from 'homeday-blocks';

export default {
  title: 'Components/HdNotifications',
  component: HdNotifications,
  subcomponents: { HdNotificationsBar },
  argTypes: {
    // type: {
    //   control: { type: 'select', options: Object.keys(TYPES) },
    //   table: {
    //     defaultValue: { summary: 'info' },
    //   },
    // },
    notifications: {
      control: { type: 'object' },
    },
  },
  args: {
    notifications: [
      {
        id: 0,
        type: TYPES.NOTIFICATION,
        message: 'This is a slot.',
        urlLabel: 'Say "Hi" in the console',
        onClick: () => console.log('Hi'),
      }, {
        id: 1,
        type: TYPES.SUCCESS,
        message: 'HEEELLO',
        urlLabel: 'Say "Hi" in the console',
        onClick: () => console.log('Hi'),
      },
    ],
  },
  parameters: {
    docs: {
      source: {
        code: `
const notifications = [
  { id: 0, type: 'success', message: 'Hello', onClick: () => {} }
]

<HdNotifications
  :notifications="notifications"
>
  {{ text }}
</HdNotifications>
        `,
      },
    },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { HdNotifications },
  template: `
    <HdNotifications
      :notifications="notifications"
    />
  `,
});

export const Default = Template.bind({});

/* eslint-disable import/no-extraneous-dependencies */
/* import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';
import {
  select,
  text,
  boolean,
} from '@storybook/addon-knobs';
import {
  HdNotifications,
  HdNotificationsTypes,
} from 'homeday-blocks';

storiesOf('Components/HdNotifications', module)
  .add('using scropedSlots', () => ({
    components: {
      HdNotifications,
    },
    template: `
      <div>
        <HdNotifications
          style="margin: -8px"
          :notifications="notifications"
        >
          <template v-slot:default="{ notification }">
            <span>
              {{ notification.text }}
            </span>
            <a
              href="#"
              style="color: currentColor"
              @click.prevent="notification.onClick"
            >
              {{ notification.urlLabel }}
            </a>
          </template>
        </HdNotifications>
      </div>
    `,
    data() {
      return {
        notifications: [
          {
            id: 0,
            type: HdNotificationsTypes.NOTIFICATION,
            text: 'This is a slot.',
            urlLabel: 'Say "Hi" in the console',
            onClick: () => console.log('Hi'),
          },
        ],
      };
    },
  }))
  .add('Playground 🎛', () => ({
    components: { HdNotifications },
    props: {
      type: {
        type: String,
        default: select(
          'Type',
          Object.values(HdNotificationsTypes),
          HdNotificationsTypes.NOTIFICATION,
          'notification',
        ),
      },
      message: {
        type: String,
        default: text('message', 'Some text', 'notification'),
      },
      customIcon: {
        type: String,
        default: text('customIcon', '', 'notification'),
      },
      compact: {
        type: Boolean,
        default: boolean('Compact', false, 'general'),
      },
    },
    template: `
      <div>
        <HdNotifications
          :compact="compact"
          style="margin: -8px"
          :notifications="notifications"
          @heightChange="onHeightChange"
        />

        <div style="margin-top: 100px">
          <button @click="addNotification" style="margin-top: auto">Add a new notification</button>
          <button @click="removeNotification">Remove current notification</button>
          <p class="text-small">Change the knobs to add a different notifications</p>
          <p class="text-xsmall">(the numerical identifier is added for demo purposes only)</p>
        </div>
      </div>
    `,
    data() {
      return {
        notifications: [],
      };
    },
    mounted() {
      this.addNotification();
    },
    methods: {
      onHeightChange(height) {
        action('heightChange')(height);
      },
      addNotification() {
        const orderedMessage = `${this.notifications.length + 1} - ${this.message}`;

        this.notifications.push({
          type: this.type,
          customIcon: this.customIcon,
          message: orderedMessage,
        });
      },
      removeNotification() {
        this.notifications.pop();
      },
    },
  }));
*/
