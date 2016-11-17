var path = require('path');

var buildExtension = require('@jupyterlab/extension-builder').buildExtension;

buildExtension({
  entry: './lib/plugin',
  name: 'rsjupyter',
  outputDir : './rsjupyter/static'
});
