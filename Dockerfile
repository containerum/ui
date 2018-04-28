FROM node:9.2.1 as installer

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY . /usr/src/app
RUN npm install -g -s --no-progress yarn node-gyp && \
    yarn && \
    npm rebuild node-sass --force

ENV WEB_API="https://api.containerum.io:8082" \
    WS_API="wss://api.containerum.io:8082" \
    COUNTRY="US" \
    RECAPTCHA="6LejdSMUAAAAADNv4yBEqxz4TAyXEIYCbwphVSDS" \
    NODE_TLS_REJECT_UNAUTHORIZED=0

EXPOSE 3000

CMD yarn start:production:docker
