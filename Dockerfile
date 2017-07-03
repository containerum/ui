FROM node:slim

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app/
RUN npm install

COPY . /usr/src/app
ENV WEB_API "http://web.api.containerum.io:5000"

RUN npm install -g serve

EXPOSE 5000
CMD npm run build && serve -s build
