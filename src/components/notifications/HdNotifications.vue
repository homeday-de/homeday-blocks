<template>
  <div class="notifications">
    <transition name="notifications-slide-down" tag="div" appear>
      <HdNotification v-if="notification" v-bind="notification" :key="notification.id">
        <slot :notification="notification" />
      </HdNotification>
    </transition>
  </div>
</template>

<script>
import HdNotification from 'homeday-blocks/src/components/notifications/HdNotification.vue';

export default {
  name: 'HdNotifications',
  components: {
    HdNotification,
  },
  props: {
    notifications: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    notification() {
      const length = this.notifications?.length;
      return length && this.notifications[length - 1];
    },
  },
};
</script>

<style lang="scss">
@import 'homeday-blocks/src/styles/mixins.scss';

.notifications {
  position: relative;
  overflow: hidden;
  height: auto;
}

.notifications-slide-down-enter-active,
.notifications-slide-down-leave-active {
  transition: all ($time-s * 2) ease-in-out;
}

.notifications-slide-down-enter,
.notifications-slide-down-leave-to {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  transform: translateY(-100%);
  opacity: 0;
}
</style>
