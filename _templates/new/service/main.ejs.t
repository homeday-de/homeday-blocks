---
inject: true
append: true
skip_if: <%= name %>
to: main.js
---
export { default as <%= h.changeCase.camel(name) %>Service } from './src/services/<%= name %>';