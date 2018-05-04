const merge = require('lodash/fp/merge');

const defaultConfig = require('./default');

module.exports = merge(defaultConfig, {
  webApi: 'https://{{ WEB_API }}',
  wsApi: 'wss://{{ WEB_API }}'
});
