FROM node:9.2.1

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app/
RUN npm install -g -s --no-progress yarn node-gyp && \
    yarn && \
    npm rebuild node-sass --force

COPY . /usr/src/app
#ENV WEB_API "https://web.api.containerum.io:5000"
#ENV WEB_API_OTHER "https://web.api.containerum.io:5000"
#ENV WEB_API_LOGIN "https://94.130.209.147:8082"
#ENV WS_API "wss://94.130.209.147:8082"
ENV WEB_API "http://192.168.88.200:5000"
ENV WEB_API_OTHER "http://192.168.88.200:5000"
ENV WEB_API_LOGIN "https://192.168.88.200:8082"
ENV WS_API "wss://192.168.88.200:8082"
ENV COUNTRY "US"
ENV RECAPTCHA "6LejdSMUAAAAADNv4yBEqxz4TAyXEIYCbwphVSDS"
RUN yarn build

EXPOSE 3000
CMD WEB_API=$WEB_API WEB_API_OTHER=$WEB_API_OTHER RECAPTCHA=$RECAPTCHA COUNTRY=$COUNTRY yarn start:prod:docker & yarn start:omnidesk
