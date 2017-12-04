FROM node:slim

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app/
RUN apt update
RUN apt install -y libpng-dev libpng libfontconfig1
RUN wget -q -O /tmp/libpng12.deb http://mirrors.kernel.org/ubuntu/pool/main/libp/libpng/libpng12-0_1.2.54-1ubuntu1_amd64.deb \
      && dpkg -i /tmp/libpng12.deb \
      && rm /tmp/libpng12.deb
RUN npm install

COPY . /usr/src/app
ENV WEB_API "https://web.api.containerum.io:5000"
RUN npm run build

EXPOSE 3000
CMD REACT_APP_API=$WEB_API npm run start & npm run start-omnidesk
