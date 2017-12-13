/* eslint max-len:0 */

module.exports = {
  host: process.env.HOST || '0.0.0.0',
  port: process.env.PORT,
  country: process.env.COUNTRY || 'US',
  app: {
    htmlAttributes: { lang: 'en' },
    title: 'Containerum',
    titleTemplate: 'Cloud Docker Hosting for Fast Deploy',
    meta: [
      { name: 'description', content: 'Cloud Docker Hosting for Fast Deploy' },
    ],
  },
};
