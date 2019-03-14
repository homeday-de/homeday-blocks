/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';
import { select } from '@storybook/addon-knobs';

import HdNotifications from 'hd-blocks/components/notifications/HdNotifications.vue';
import HdNotificationsNote from '../notes/HdNotifications.md';

storiesOf('HdNotifications', module)
  .add('default', () => ({
    components: { HdNotifications },
    props: {
      type: {
        type: String,
        default: select(
          'Type',
          [
            'notification',
            'success',
            'error',
            'warning',
          ],
          'notification',
        ),
      },
    },
    template: `
      <div style="max-width: 800px; margin: auto;">
        <HdNotifications
          :notifications="transformedNotifications"
          @heightChange="onHeightChange"
          @route="onRoute"
        />
      </div>
    `,
    data() {
      return {
        notifications: [
          {
            id: 0,
            message: 'Hello world!, <a href="/test">This is a link...</a>',
          },
        ],
      };
    },
    computed: {
      transformedNotifications() {
        return this.notifications.map(notification => ({
          ...notification,
          type: this.type,
        }));
      },
    },
    methods: {
      onRoute(route) {
        action('route')(route);
      },
      onHeightChange(height) {
        action('heightChange')(height);
      },
    },
  }), {
    notes: {
      markdown: HdNotificationsNote,
    },
  })
  .add('custom icon', () => ({
    components: { HdNotifications },
    props: {
      type: {
        type: String,
        default: select(
          'Type',
          [
            'notification',
            'success',
            'error',
            'warning',
          ],
          'warning',
        ),
      },
    },
    template: `
      <div style="max-width: 800px; margin: auto;">
        <HdNotifications
          :notifications="transformedNotifications"
          @heightChange="onHeightChange"
          @route="onRoute"
        />
      </div>
    `,
    data() {
      return {
        notifications: [
          {
            id: 0,
            message: 'Hello world!, <a href="/test">This is a link...</a>',
          },
        ],
        // eslint-disable-next-line global-require
        customIcon: require('./assets/homeday-icon.svg'),
      };
    },
    computed: {
      transformedNotifications() {
        return this.notifications.map(notification => ({
          ...notification,
          type: this.type,
          customIcon: this.customIcon,
        }));
      },
    },
    methods: {
      onRoute(route) {
        action('route')(route);
      },
      onHeightChange(height) {
        action('heightChange')(height);
      },
    },
  }));
