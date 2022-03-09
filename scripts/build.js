/* eslint-disable */
const _camelCase = require('lodash/camelCase');
const _startCase = require('lodash/startCase');
const pLimit = require('p-limit');
const path = require('path');
const fs = require('fs');
const os = require('os');
const util = require('util');
const exec = util.promisify(require('child_process').exec);

const basePath = './src/';
const componentsPath = `${basePath}components/`;
const servicesPath = `${basePath}services/`;
const outputDirectory = 'dist';
const numberOfCpuCores = os.cpus().length;

const blackListedFiles = [
  'tooltipDirective.js',
  'formFieldMixin.js',
  'FieldBase.vue',
  'TextFieldBase.vue',
  'HdCheckboxIndicator.vue',
  'HdRadioIndicator.vue',
  'HdTileSelectItem.vue',
  'HdTileSelectEditableItem.vue',
];

(async () => {
  console.time('Execution time');
  console.log('🚧 Building homeday-blocks...');

  cleanUpOutputDirectory();

  const components = findFilesByExtension(componentsPath, 'vue');
  const componentTypes = findFilesByExtension(componentsPath, 'js');
  const services = findFilesByExtension(servicesPath, 'js');
  const filesToBeCompiled = omitBlackListedFiles(components.concat(componentTypes, services));

  const buildResult = await build(filesToBeCompiled);
  const filesCompiledSuccessfully = [];
  const filesFailedToCompile = [];
  buildResult.forEach((result, index) => {
    if (result.stdout.includes('Compiled')) {
      filesCompiledSuccessfully.push(filesToBeCompiled[index]);
    } else if (result.stderr) {
      filesFailedToCompile.push(filesToBeCompiled[index]);
    }
  });

  createIndexFile(filesCompiledSuccessfully);

  console.log(`✅ ${filesCompiledSuccessfully.length} files compiled successfully.`);
  if (filesFailedToCompile.length) console.log(`🚨 ${filesFailedToCompile.length} files did not compile successfully.`, filesFailedToCompile);
  console.timeEnd('Execution time');
})();

/**
 * Finds files in a path by extension
 * @param {string} base
 * @param {string} extension
 * @param {string[]} [files]
 * @param {string[]} [result]
 * @returns {string[]}
 */
 function findFilesByExtension(base, extension, files, result) {
  files = files || fs.readdirSync(base);
  result = result || [];

  files.forEach(
    (file) => {
      const newBase = path.join(base, file);
      if (fs.statSync(newBase).isDirectory()) {
        result = findFilesByExtension(newBase, extension, fs.readdirSync(newBase), result);
      } else if (path.parse(file).ext === `.${extension}`) {
        result.push(newBase);
      }
    },
  );
  return result;
}

/**
 * Builds the list of files using Vue-CLI
 * @param {string[]} filePaths
 * @returns {string[]}
 */
function build(filePaths) {
  if (filePaths?.length) {
    const limit = pLimit(numberOfCpuCores);
    const commands = filePaths.map((filePath) => `npx vue-cli-service build --no-clean --target lib --formats umd-min --name ${getFileName(filePath)} ${filePath}`);
    const buildPromises = commands.map((command) => limit(() => exec(command)));
    return Promise.all(buildPromises);
  }
  return [];
}

/**
 * Create the library index file (main.js) from the list of file paths
 * @param {string[]} filePaths
 */
function createIndexFile(filePaths) {
  const indexFileHeader = '// Auto-generated by the build script\n/* eslint-disable */\n';
  const indexFileContent = filePaths.map((filePath) => {
    const fileName = getFileName(filePath);
    return `export { default as ${fileName} } from 'homeday-blocks/${outputDirectory}/${fileName}.umd.min';`;
  }).join('\n');
  try {
    fs.writeFileSync(`${__dirname}//../main.js`, indexFileHeader.concat(indexFileContent));
  } catch (error) {
    console.error(error);
  }
}

/**
 * Returns a list of file paths that are not blacklisted
 * @param {string[]} filePaths
 * @returns {string[]}
 */
function omitBlackListedFiles(filePaths) {
  if (filePaths?.length) {
    return filePaths.filter( ( filePath ) => !blackListedFiles.includes( path.parse(filePath).base ) );
  }
  return [];
}

/**
 * Converts a string case to PascalCase
 * @param {string} string
 * @returns {string}
 */
function pascalCase(string){
  return _startCase(_camelCase(string)).replace(/ /g, '');
}

/**
 * Returns the file name in PascalCase from the file path, services are suffixed with 'Service'
 * @param {string} filePath
 * @returns {string}
 */
function getFileName(filePath) {
  let fileName = path.parse(filePath).name;
  if (filePath.includes('services')) fileName += 'Service';
  return pascalCase(fileName);
}

/**
 * Removes the output directory (dist) if already exists
 */
function cleanUpOutputDirectory() {
  fs.rmSync(`${__dirname}/../${outputDirectory}`, {force: true, recursive: true});
}
