FROM node:9.2.1

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app/
RUN npm install -g -s --no-progress yarn node-gyp && \
    yarn && \
    npm rebuild node-sass --force

COPY . /usr/src/app
ENV WEB_API "https://api.containerum.io:8082"
ENV WEB_API_OTHER "https://api.containerum.io:8082"
ENV WEB_API_LOGIN "https://api.containerum.io:8082"
ENV WS_API "wss://api.containerum.io:8082"
#ENV WEB_API "http://192.168.88.200:5000"
#ENV WEB_API_OTHER "http://192.168.88.200:5000"
#ENV WEB_API_LOGIN "http://192.168.88.200:8082"
#ENV WS_API "ws://192.168.88.200:8082"
ENV COUNTRY "US"
ENV RECAPTCHA "6LejdSMUAAAAADNv4yBEqxz4TAyXEIYCbwphVSDS"
ENV NODE_TLS_REJECT_UNAUTHORIZED 0
RUN yarn build

EXPOSE 3000
CMD yarn start:prod:docker & yarn start:omnidesk
