# Building the library

To build the library simply execute the command `npm run build` which runs the script `scripts/build.js`.

## How does the build script work?

The script finds all components, components types and services files then build each file separately with [Vue-CLI](https://cli.vuejs.org/guide/cli-service.html#vue-cli-service-build) and when its done it creates the library index file `main.js` that exports all the compiled files.

Vue-CLI was chosen due to providing the best support for Vue and its ability to do all the necessary build steps.

### Build targets

- Components: all files with the extension `.vue` in the path `src/components` (example: `HdAlert.vue`)
- Component Types: all files with the extension `.js` in the path `src/components` (example: `HdAlertTypes.js`)
- Services: all files with the extension `.js` in the path `src/services` (example: `date.js`)

To ignore compilation of a certain file, add its name to the array `blackListedFiles` in [build.js#L14](/scripts/build.js#L14)


### Build output

For each compiled file the script outputs a minified UMD bundle for consuming directly in browsers or with AMD loaders.
Example: `dist/HdAlert.umd.min.js`


## Gotchas
- All compiled services output file name case is converted to PascalCase and suffixed with `Service` to maintain the previous exported services naming pattern.
Example: `src/services/event-emitter.js` -> `dist/EventEmitterService.umd.min.js`