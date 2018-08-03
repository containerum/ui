const merge = require('lodash/fp/merge');

const defaultConfig = require('./default');

module.exports = merge(defaultConfig, {
  webApi: '{{ API }}',
  wsApi: '{{ API_WS }}',
  appRecaptcha: '{{ RECAPTCHA }}',
  defaultCountry: '{{ DEFAULT_COUNTRY }}',
  latestRelease: '{{ LATEST_RELEASE }}'
});
