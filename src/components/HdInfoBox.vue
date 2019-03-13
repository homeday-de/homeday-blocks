<template>
  <section class="info-box">
    <img
      :src="icon"
      class="info-box__icon"
    >
    <p
      class="info-box__message"
      v-html="message"
    />
  </section>
</template>

<script>
export default {
  name: 'HdInfoBox',
  props: {
    message: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      // eslint-disable-next-line global-require
      icon: require('hd-blocks/assets/icons/ic_info.svg'),
    };
  },
};
</script>

<style lang="scss">
@import 'hd-blocks/styles/mixins.scss';

.info-box {
  display: flex;
  align-items: flex-start;
  padding-bottom: $stack-s;
  border-bottom: 1px solid $heather;
  color: $nevada;

  &__icon {
    margin: $stack-xs $inline-s $stack-xs $stack-xs;
  }

  &__message {
    @include font('text-xsmall');

    margin-top: $stack-xs;

    @media (min-width: $break-tablet) {
      @include font('text-small');

      margin-top: 0;
    }

    a {
      color: inherit;
    }
  }
}
</style>
