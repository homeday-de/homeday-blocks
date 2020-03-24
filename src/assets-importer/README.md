# Assets Importer

### Prerequisites
Make sure that you have a `.env.local` file in the root directory of the project with the variable `FIGMA_ACCESS_TOKEN`

E.g:
```
# .env.local
FIGMA_ACCESS_TOKEN=xxxxx-xxxxxxxx-xxxx-xxx-xxxx-xxxxxxxxxxx
```

⚠ *Do not commit this file.*


### Configuration
In the CONFIG.js file you can add/remove/edit the figma files from where you want to import the assets, and also specifiy where/how to store them.

The files go under `FIGMA_FILES` property.
Each file entry should contain the following properties:

`KEY` *(String)* The key of the
`SHOULD_MATCH_REGEX` *(RegExp)* The regular expression that the component's name should match to be imported.
`FILENAME_REGEX` *(RegExp)* A regular expression to generate the new file name based on the original component name.
`DIST` *(String)* A path to the directory where the files will be saved.
`FORMAT` *(String)* The format you want for the image (The currently supported formats: jpg, png, svg, and pdf).

// TODO: Use functions instead of RegExp.

### How to use
Run the command:
```
npm run import-assets
```