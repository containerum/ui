/* @flow */
/* eslint-disable */

const path = require('path');
const glob = require('glob');
const compressing = require('compressing');
const replace = require('replace');

const webApi = process.env.WEB_API || 'api.containerum.io:8082';
const pathToPublic = path.join(process.cwd(), './public');
const pathToJS = `${pathToPublic}/assets/main.*.js`;

glob(pathToJS, {}, function(err, files) {
  if (err) {
    console.log(`replace error - ${err}`);
    return;
  }
  const pathToCompressJS = files[0];
  files.push(`${pathToCompressJS}.map`);
  replace({
    regex: '{{ WEB_API }}',
    replacement: webApi,
    paths: files,
    recursive: true,
    silent: true
  });
  console.log(`replace {{ WEB_API }} to ${webApi} in ${pathToCompressJS}`);
  compressing.gzip
    .compressFile(pathToCompressJS, `${pathToCompressJS}.gz`)
    .then(() => console.log(`compressing in ${pathToCompressJS}.gz done`))
    .catch(error => console.log(`compressing error - ${error}`));
});
