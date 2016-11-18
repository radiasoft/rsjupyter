var buildExtension = require('@jupyterlab/extension-builder').buildExtension;

buildExtension({
  entry: './lib/plugin.js',
  name: 'rsjupyter',
  outputDir : './rsjupyter/static'
});
