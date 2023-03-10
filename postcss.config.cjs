const postcssNesting = require('postcss-nested');
const postcssImport = require('postcss-import');
const combineSelectors = require('postcss-combine-duplicated-selectors');
const customMedia = require('postcss-custom-media');
const importGlob = require('postcss-import-ext-glob');
const importJson = require('@daltontan/postcss-import-json');
const designTokens = require('postcss-design-tokens');

const tokens = require('./src/styles/tokens.json');

module.exports = {
  plugins: [
    importGlob(),
    postcssImport(),
    customMedia(),
    postcssNesting(),
    combineSelectors(),
    importJson,
    designTokens({ tokens }),
  ],
};
