/* @flow */
/* eslint-disable */

const path = require('path');
const glob = require('glob');
const compressing = require('compressing');
const replace = require('replace');

const apiHost = process.env.API_HOST || 'api.containerum.io';
const apiProtocol = process.env.API_PROTOCOL_TYPE === 'ssl' ? 'https' : 'http';
const apiWSProtocol = process.env.API_PROTOCOL_TYPE === 'ssl' ? 'wss' : 'ws';
const apiPort = process.env.API_PORT;
const api = `${apiProtocol}://${apiHost}${apiPort ? `:${apiPort}` : ''}`;
const apiWS = `${apiWSProtocol}://${apiHost}${apiPort ? `:${apiPort}` : ''}`;
const recaptcha = process.env.RECAPTCHA || null;
const defaultCountry = process.env.COUNTRY || 'US';
const latestRelease = process.env.LATEST_RELEASE || '';
const pathToPublic = path.join(process.cwd(), './public');
const pathToJS = `${pathToPublic}/assets/main.*.js`;

glob(pathToJS, {}, (err, files) => {
  if (err) {
    console.log(`replace error - ${err}`);
    return;
  }
  const pathToCompressJS = files[0];
  files.push(`${pathToCompressJS}.map`);
  replace({
    regex: '{{ API }}',
    replacement: api,
    paths: files,
    recursive: true,
    silent: true
  });
  replace({
    regex: '{{ API_WS }}',
    replacement: apiWS,
    paths: files,
    recursive: true,
    silent: true
  });
  replace({
    regex: '{{ RECAPTCHA }}',
    replacement: recaptcha,
    paths: files,
    recursive: true,
    silent: true
  });
  replace({
    regex: '{{ DEFAULT_COUNTRY }}',
    replacement: defaultCountry,
    paths: files,
    recursive: true,
    silent: true
  });
  replace({
    regex: '{{ LATEST_RELEASE }}',
    replacement: latestRelease,
    paths: files,
    recursive: true,
    silent: true
  });
  console.log(
    `replace ENV's in ${pathToCompressJS}`
  );
  compressing.gzip
    .compressFile(pathToCompressJS, `${pathToCompressJS}.gz`)
    .then(() => console.log(`compressing in ${pathToCompressJS}.gz done`))
    .catch(error => console.log(`compressing error - ${error}`));
});
