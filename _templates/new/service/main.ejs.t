---
inject: true
append: true
skip_if: <%= name %>
to: main.ts
---
export { default as <%= h.changeCase.camel(name) %>Service } from './src/services/<%= name %>';