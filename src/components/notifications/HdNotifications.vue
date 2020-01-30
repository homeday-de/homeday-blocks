<template>
  <div class="notifications">
    <transition-group
      name="notifications-bar-"
      tag="div"
    >
      <HdNotificationsBar
        v-for="(notification, i) in notifications"
        ref="notifications"
        :key="notification.id"
        :message="notification.message"
        :type="notification.type"
        :custom-icon="notification.customIcon || ''"
        :visible="i === notifications.length - 1"
        :offsetTop="offsetTop"
        :offsetRight="offsetRight"
        :offsetLeft="offsetLeft"
      />
    </transition-group>
    <div
      ref="sizer"
      :style="{
        height: `${sizerHeight}px`,
      }"
      class="notifications__sizer"
    />
  </div>
</template>

<script>
import onResize from 'homeday-blocks/src/services/on-resize';
import HdNotificationsBar from 'homeday-blocks/src/components/notifications/HdNotificationsBar.vue';

export default {
  name: 'HdNotifications',
  components: {
    HdNotificationsBar,
  },
  props: {
    notifications: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      sizerHeight: 0,
      offsetTop: 0,
      offsetRight: 0,
      offsetLeft: 0,
    };
  },
  watch: {
    notifications() {
      this.$nextTick(this.resizeNotifications);
    },
    sizerHeight() {
      this.$emit('heightChange', this.sizerHeight);
    },
  },
  mounted() {
    this.resizeNotifications();
    this.addResizeEvents();
    this.addRoutingEvents();
    this.calculateOffset();
  },
  beforeDestroy() {
    this.removeResizeEvents();
    this.removeRoutingEvents();
  },
  methods: {
    // Encapsulated in a method to be able to mock it in the tests
    getScrollHeight(el) {
      return el.scrollHeight;
    },
    resizeNotifications() {
      if (!this.notifications.length) {
        this.sizerHeight = 0;
        return;
      }

      if (!this.$refs.notifications) {
        this.sizerHeight = 0;
        return;
      }
      // Go through all the notifications and get the max height in order to
      // resize the sizer (since notification bars are position: fixed)
      const maxSize = this.$refs.notifications.reduce((maxHeight, { $el }) => {
        const elHeight = this.getScrollHeight($el);

        if (maxHeight >= elHeight) {
          return maxHeight;
        }

        return elHeight;
      }, 0);
      this.sizerHeight = maxSize;
    },
    calculateOffset() {
      const elRect = this.$el.getBoundingClientRect();
      const bodyRect = document.body.getBoundingClientRect();
      this.offsetTop = elRect.top - bodyRect.top;
      this.offsetRight = bodyRect.right - elRect.right;
      this.offsetLeft = elRect.left - bodyRect.left;
    },
    addRoutingEvents() {
      this.$el.addEventListener('click', this.routeOnClick, false);
    },
    // We are catching cliks on anchors, and if it's an internal link, we use
    // router push instead (for a nicer transition)
    routeOnClick(e) {
      if (e.target.nodeName !== 'A') {
        return;
      }

      if (e.target.hostname !== window.location.hostname) {
        return;
      }

      e.preventDefault();
      this.$emit('route', { path: e.target.pathname });
    },
    resizeHandler() {
      this.resizeNotifications();
      this.calculateOffset();
    },
    addResizeEvents() {
      onResize.onDebounced(this.resizeHandler);
    },
    removeResizeEvents() {
      onResize.offDebounced(this.resizeHandler);
    },
    removeRoutingEvents() {
      this.$el.removeEventListener('click', this.routeOnClick, false);
    },
  },
};
</script>

<style lang="scss">
@import 'homeday-blocks/src/styles/mixins.scss';

.notifications__sizer {
  transition: height ($time-s * 2) ease-in-out;
}
</style>
