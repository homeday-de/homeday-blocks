/* eslint-disable */
require('dotenv').config({ path: '.env.local' });
const fs = require('fs');
const fetch = require('node-fetch');
const _camelCase = require('lodash/camelCase');
const CONFIG = require('./CONFIG');

if (require.main == module) {
  const  firstArgument = process.argv[2];

  if (firstArgument === undefined) {
    importAllCollections();
  } else {
    importCollectionByName(firstArgument);
  }
}

/**
 * @param  {string} endpoint - the Figma endpoint
 */
function fetchFromFigma(endpoint) {
  return fetch(`https://api.figma.com/v1${endpoint}`, {
    headers: {
      'x-FIGMA-token': process.env.FIGMA_ACCESS_TOKEN,
    },
  }).then(res => res.json());
}

/**
 * @param  {string} name - the file name
 * @param  {RegExp} regex - the regex used to normalize the file
 */
function normalizeFilename({ name, regex }) {
  const matches = name.match(regex);

  return matches ? matches.pop() : null;
}

/**
 * @param  {string} url - the url where the icon can be downloaded
 * @param  {string} filename - the file name
 * @param  {string} dist - the folder where the file will be downloaded
 */
async function download({
  url,
  filename,
  dist = '',
}) {
  const distPath = `${process.cwd()}${dist}`;
  await fs.mkdir(distPath, { recursive: true }, (err) => {
    if (err) throw err;
  });
  const writer = fs.createWriteStream(`${distPath}/${filename}`);

  try {
    const response = await fetch(url);
    response.body.pipe(writer);

    return new Promise((resolve, reject) => {
      writer.on('finish', resolve(filename));
      writer.on('error', reject);
    });
  } catch(err) {
    return Promise.reject(new Error(err));
  }
}

/**
 * @param  {string} fileKey - the key to fetch the icons on Figma
 * @param  {string} format - the file format
 * @param  {string} dist - the path where the file will live
 * @param  {RegExp} filenameRegex - the regex used to rename the file
 * @param  {RegExp} matchingRegex - the regex used to group the files from Figma
 */
async function importAssetsFromFigma({
  fileKey,
  format,
  dist,
  filenameRegex,
  matchingRegex,
}) {
  if (process.env.FIGMA_ACCESS_TOKEN === undefined) {
    console.error('FIGMA_ACCESS_TOKEN is undefined. Did you add it to your environment variables?');
    process.exit(1);
  }

  const file = await fetchFromFigma(`/files/${fileKey}/components`);

  if (!file.meta.components || file.meta.components.length === 0) {
    console.warn('No components found for file', fileKey);
    return;
  }

  const filenameMap = file.meta.components
    .reduce((map, component) => {
      const isMatch = Array.isArray(component.name.match(matchingRegex));
      if (isMatch) {
        const filename = normalizeFilename({ name: component.name, regex: filenameRegex });
        map[component.node_id] = filename;
      }

      return map;
    }, {});

  const ids = Object.keys(filenameMap).join(',');
  const assets = await fetchFromFigma(`/images/${fileKey}?ids=${ids}&format=${format}`);

  if (assets.images === undefined) {
    console.warn('No images found for regexp', matchingRegex);
    return;
  }

  const downloadedFiles = await Promise.all(
    Object.entries(assets.images)
      .map(([id, url]) => url && download({
        url,
        filename: `${filenameMap[id]}.${format}`,
        dist,
      })),
  );

  createIndexFile({
    files: downloadedFiles,
    dist,
    exportNameRegex: new RegExp(`ic_(.*).${format}`),
    suffix: 'Icon',
  });
}

/**
 * @param  {object[]} files - the list of files imported from Figma
 * @param  {string} dist - the path where the icon will live
 * @param  {RegExp} exportNameRegex - the regex the file name should match
 * @param  {string} suffix - the suffix appended to the icon name
 */
function createIndexFile({ files, dist, exportNameRegex = '*', suffix = '' }) {
  const fileContent = [...new Set(files)]
    // To have a consistent order and avoid unnecessary line changes, we sort the array
    .sort((a, b) => b.localeCompare(a)) // Ascending
    .reduce((content, file) => {
      const nameMatches = file.match(exportNameRegex);
      if (!nameMatches) {
        return content;
      }

      const exportName = _camelCase(nameMatches.pop()) + suffix;
      return `export { default as ${exportName} } from './${file}';\n${content}`;
    }, '');

  fs.writeFile(`${process.cwd()}${dist}/index.js`, fileContent, (err) => {
    if (err) console.error('Failed to create index', err);
  });
}

/**
 * @param  {Object<string, object>} collection - the object representing the collection of icons - can be found on assets-importer/CONFIG.js
 */
async function importCollection(collection) {
  console.log(`📦 Importing collection "${collection.name}"...`);
  await importAssetsFromFigma({
    ...collection,
    fileKey: collection.figmaFileKey,
  });
  console.log(`✅ Collection "${collection.name}" has been imported successfully!`);
}

function importAllCollections() {
  console.log('Importing all the collections...');
  CONFIG.COLLECTIONS.forEach(collection => importCollection(collection));
}

/**
 * @param  {string} collectionName - the name of the collection to be imported
 */
function importCollectionByName(collectionName) {
  const collection = CONFIG.COLLECTIONS.find(({ name }) => name === collectionName);

  if (collection === undefined) {
    console.error(`Couldn't find collection "${collectionName}", make sure it's in CONFIG.js`);
    return;
  }

  importCollection(collection);
}
