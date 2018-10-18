const path = require('path');
const ncp = require('ncp').ncp;
const rimraf = require('mz-modules/rimraf');
const mkdirp = require('mz-modules/mkdirp');

const external_path = path.join(__dirname, '..', 'scss', 'external');

function init() {
  clean_create_external().then(copy_bootstrap);
}

function clean_create_external() {
  return rimraf(external_path).then(function() {
    return mkdirp(external_path);
  });
}

function copy_bootstrap() {
  const bootstrap_path = path.dirname(
    require.resolve('bootstrap/package.json')
  );
  const bootstrap_mixings_path = path.join(bootstrap_path, 'scss', 'mixins');

  const bootstrap_files = [
    '_grid.scss',
    '_grid-framework.scss',
    '_breakpoints.scss'
  ];

  bootstrap_files.forEach(function(value) {
    const source = path.join(bootstrap_mixings_path, value);
    const destination = path.join(external_path, value);
    ncp(source, destination);
  });
}

init();
