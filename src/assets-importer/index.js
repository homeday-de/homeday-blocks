/* eslint-disable */
require('dotenv').config({ path: '.env.local' });
const fs = require('fs');
const fetch = require('node-fetch');
const _camelCase = require('lodash/camelCase');
const CONFIG = require('./CONFIG');

if (process.env.FIGMA_ACCESS_TOKEN === undefined) {
  console.error('FIGMA_ACCESS_TOKEN is undefined. Did you add it to your environment variables?');
  return;
}

function fetchFromFigma(endpoint) {
  return fetch(`https://api.figma.com/v1${endpoint}`, {
    headers: {
      'x-FIGMA-token': process.env.FIGMA_ACCESS_TOKEN,
    },
  }).then(res => res.json());
}

function normalizeFilename({ name, regex }) {
  const matches = name.match(regex);

  return matches ? matches.pop() : null;
}

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

async function importAssetsFromFigma({
  fileKey,
  format,
  dist,
  filenameRegex,
  shouldMatchRegex,
}) {
  const file = await fetchFromFigma(`/files/${fileKey}/components`);

  if (!file.meta.components || file.meta.components.length === 0) {
    console.warn('No components found for file', fileKey);
    return;
  }

  const filenameMap = file.meta.components
    .reduce((map, component) => {
      const isMatch = Array.isArray(component.name.match(shouldMatchRegex));
      if (isMatch) {
        const filename = normalizeFilename({ name: component.name, regex: filenameRegex });
        map[component.node_id] = filename;
      }

      return map;
    }, {});

  const ids = Object.keys(filenameMap).join(',');
  const assets = await fetchFromFigma(`/images/${fileKey}?ids=${ids}&format=${format}`);

  if (assets.images === undefined) {
    console.warn('No images found for regexp', shouldMatchRegex);
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

  createIndex({
    files: downloadedFiles,
    dist,
    exportNameRegex: new RegExp(`ic_(.*).${format}`),
    suffix: 'Icon',
  });
}

function createIndex({ files, dist, exportNameRegex = '*', suffix = '' }) {
  const fileContent = [...new Set(files)]
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


function importAll() {
  CONFIG.FIGMA_FILES.forEach(FIGMA_FILE => importAssetsFromFigma({
    fileKey: FIGMA_FILE.KEY,
    format: FIGMA_FILE.FORMAT,
    filenameRegex: FIGMA_FILE.FILENAME_REGEX,
    shouldMatchRegex: FIGMA_FILE.SHOULD_MATCH_REGEX,
    dist: FIGMA_FILE.DIST,
  }));
};

importAll();
