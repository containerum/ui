FROM ubuntu:17.10

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app/
RUN apt-get update
RUN apt-get install -y libpng-dev
RUN apt-get install -y wget
RUN wget -q -O /tmp/libpng12.deb http://mirrors.kernel.org/ubuntu/pool/main/libp/libpng/libpng12-0_1.2.54-1ubuntu1_amd64.deb \
      && dpkg -i /tmp/libpng12.deb \
      && rm /tmp/libpng12.deb
RUN apt-get install -y curl
RUN curl -sL https://deb.nodesource.com/setup_8.x | bash -
RUN apt-get install -y nodejs
RUN npm install yarn -g
RUN npm install

COPY . /usr/src/app
ENV WEB_API "https://web.api.containerum.io:5000"
ENV WEB_API_OTHER "https://web.api.containerum.io:5000"
ENV COUNTRY "US"
ENV RECAPTCHA "6LejdSMUAAAAADNv4yBEqxz4TAyXEIYCbwphVSDS"
RUN npm run build
RUN apt-get autoremove

EXPOSE 3000
CMD REACT_APP_API=$WEB_API REACT_APP_OTHER=$WEB_API_OTHER REACT_APP_RECAPTCHA=$RECAPTCHA npm run start & npm run start-omnidesk
