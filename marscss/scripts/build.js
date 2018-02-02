let path = require('path');
const rimraf = require('mz-modules/rimraf');
const mkdirp = require('mz-modules/mkdirp');
let ncp = require('ncp').ncp;

const dist_path = './dist/';

function init() {
  clear_create_dist().then(copy_files);
}

function clear_create_dist() {
  return rimraf(dist_path).then(function() {
    return mkdirp(dist_path);
  });
}

function copy_files() {
  let files = ['./marscss.scss', './scss/'];

  files.forEach(function(value) {
    let destination = path.join(dist_path, value);

    ncp(value, destination);
  });
}

init();
