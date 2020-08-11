---
to: tests/unit/services/<%= name %>.spec.js
---
import { myMethod } from '@/services/<%= name %>';

describe('<%= h.changeCase.camel(name) %> service', () => {
  it('works', () => {
    expect(myMethod()).toBe(true);
  });
});
