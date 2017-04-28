FROM node:slim

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app/
RUN npm install

COPY . /usr/src/app

RUN npm run build
RUN npm install -g serve

EXPOSE 5000
CMD [ "serve", "-s", "build" ]
