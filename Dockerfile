FROM node:slim

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app/
RUN npm install
RUN npm install -g serve

COPY . /usr/src/app
ENV WEB_API "https://web.api.containerum.io:5000"

EXPOSE 3000
CMD npm run build && serve -s build -p 3000
