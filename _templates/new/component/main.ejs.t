---
inject: true
before: "Services"
eof_last: false
skip_if: <%= name %>
to: main.js
---
export { default as <%= name %> } from './src/<%= path %>/<%= name %>.vue';