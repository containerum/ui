/* eslint max-len:0 */

module.exports = {
  host: process.env.HOST || 'localhost',
  port: process.env.PORT,
  REACT_APP_API: process.env.REACT_APP_API,
  app: {
    htmlAttributes: { lang: 'en' },
    title: 'Containerum',
    titleTemplate: 'Containerum - %s',
    meta: [
      { name: 'description', content: 'Cloud Docker Hosting for Fast Deploy' },
    ],
  },
};
