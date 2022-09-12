<script lang="ts">
import Vue, { PropOptions, VNode } from 'vue';
import deepmerge from 'deepmerge';
import _getOr from 'lodash/fp/getOr';
import { customRules } from '@/@types/global';
import { getMessages, Messages } from 'homeday-blocks/src/lang';
import { cloneVNodeElement } from 'homeday-blocks/src/services/utils';
import { name as HdRadioCardName } from 'homeday-blocks/src/components/form/HdRadioCard.vue';
import formFieldMixin from './formFieldMixin';

const getPropsDataFor =
  (vnode: VNode) =>
  <T extends unknown>(defaultValue: T, field: string): T =>
    _getOr(defaultValue, `componentOptions.propsData.${field}`, vnode);

export default Vue.extend({
  name: 'HdRadioCardGroup',
  mixins: [formFieldMixin],
  props: {
    name: {
      type: String,
      required: true,
    },
    value: [String, Number],
    disabled: Boolean,
    required: Boolean,
    mode: {
      type: String,
      default: 'card',
      validator: (value) => ['card', 'tile'].includes(value),
    },
    direction: {
      type: String,
      default: 'row',
      validator: (value) => ['row', 'col'].includes(value),
    },
    texts: {
      type: Object,
      default: () => ({}),
    },
    lang: {
      type: String,
      default: 'de',
    },
    customRules: {
      type: Array,
      default: () => [],
      validator: (rulesProvided) =>
        rulesProvided.every(
          ({ validate, errorMessage }) =>
            typeof validate === 'function' && typeof errorMessage === 'string'
        ),
    } as PropOptions<customRules>,
  },
  data(): {
    error: null | string;
  } {
    return {
      error: null,
    };
  },
  watch: {
    value() {
      this.validate();
    },
    required() {
      if (this.error) this.validate();
    },
    customRules() {
      if (this.error) this.validate();
    },
  },
  computed: {
    t(): Messages {
      return deepmerge(getMessages(this.lang), this.texts);
    },
    hasValidationErrors(): boolean {
      return Boolean(this.error);
    },
  },
  methods: {
    inputChanged(e: Event & { target: HTMLInputElement }): void {
      this.$emit('input', e.target.value);
    },
    validateForm(): string | null {
      if (this.required && !this.value) return this.t.FORM.VALIDATION.SELECT_ONE_OPTION;

      const firstFailingRule = this.customRules.find(({ validate }) => !validate(this.value));
      if (firstFailingRule) return firstFailingRule.errorMessage;

      return null;
    },
    /**
     * This is a default validate function
     * it is a special function that is automatically
     * invoked by HdForm.
     *
     * By surrounding HdRadioCard with a HdRadioCardGroup
     * this function is automatically overridden.
     *
     */
    validate(): boolean {
      this.error = this.validateForm();
      return !this.hasValidationErrors;
    },
  },
  render(h) {
    const children: VNode[] = this.$slots.default || [];

    const clones: VNode[] = children
      .filter(
        ({ tag, componentOptions }) => Boolean(tag) && componentOptions?.tag === HdRadioCardName
      )
      .map((vnode) => {
        const getPropsData = getPropsDataFor(vnode);
        const clone = cloneVNodeElement(
          vnode,
          {
            props: {
              name: getPropsData(this.name, 'name'),
              value: getPropsData(this.value, 'value'),
              nativeValue: getPropsData(null, 'nativeValue'),
              disabled: getPropsData(this.disabled, 'disabled'),
              ariaLabel: getPropsData('', 'ariaLabel'),
              ariaLabelledBy: getPropsData('', 'ariaLabelledBy'),
              mode: getPropsData(this.mode, 'mode'),
              isInvalid: this.hasValidationErrors,
            },
            nativeOn: {
              input: this.inputChanged,
            },
          },
          h
        );
        return h('div', {}, [clone]);
      });

    const errorVdom: VNode = this.hasValidationErrors
      ? h('div', { class: 'radio-group__error' }, this.error)
      : h();

    return h('div', { class: 'radio-group' }, [clones, errorVdom]);
  },
});
</script>

<style lang="scss" scoped>
@import 'homeday-blocks/src/styles/mixins.scss';

.radio-group {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(269px, 1fr));
  gap: $sp-m;
}

.radio-group__error {
  grid-column: 1 / -1;
  display: block;
  margin-top: -$sp-s;
  color: $error-color;
  @include font('DS-100');
}
</style>
