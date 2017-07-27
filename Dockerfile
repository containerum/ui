FROM node:slim

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app/
RUN npm install

COPY . /usr/src/app
ENV WEB_API "http://web.api.containerum.io:5000"

EXPOSE 3000
CMD npm start
