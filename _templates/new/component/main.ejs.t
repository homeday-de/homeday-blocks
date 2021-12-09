---
inject: true
before: "Services"
eof_last: false
skip_if: <%= name %>
to: main.ts
---
export { default as <%= name %> } from './src/<%= path %>/<%= name %>.vue';