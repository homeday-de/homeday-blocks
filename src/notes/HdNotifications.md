Sample Vuex store module:

```js
import uuidv4 from 'uuid/v4';
import Vue from 'vue';

const NOTIFICATION_DEFAULTS = {
  type: 'notification',
  message: '',
  duration: 5000,
  customIcon: '',
};

export default {
  state: {
    notifications: [],
  },
  actions: {
    addNotification({ commit, dispatch, state }, {
      type = NOTIFICATION_DEFAULTS.type,
      message = NOTIFICATION_DEFAULTS.message,
      customIcon = NOTIFICATION_DEFAULTS.customIcon,
      // For how long should the notification be displayed before it hides itself
      // Set to 0 for a permanent notification
      duration = NOTIFICATION_DEFAULTS.duration,
    }) {
      const notification = {
        type,
        message,
        customIcon,
        id: uuidv4(),
      };

      commit('setNotifications', [...state.notifications, notification]);

      if (duration > 0) {
        setTimeout(() => {
          dispatch('removeNotification', {
            id: notification.id,
          });
        }, duration);
      }

      return notification.id;
    },
    removeNotification({ commit, state }, { id: idToRemove }) {
      const filteredNotifications = state.notifications.filter(({ id }) => id !== idToRemove);
      commit('setNotifications', filteredNotifications);
    },
  },
  mutations: {
    setNotifications(state, notifications) {
      Vue.set(state, 'notifications', notifications);
    },
  },
};
```