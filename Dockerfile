FROM ubuntu:17.10

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app/
RUN apt-get update
RUN apt-get install -y libpng-dev autoconf
RUN apt-get install -y curl
RUN curl -sL https://deb.nodesource.com/setup_8.x | bash -
RUN apt-get install -y nodejs
RUN npm install yarn -g
RUN npm install

COPY . /usr/src/app
ENV WEB_API "https://web.api.containerum.io:5000"
RUN npm run build
RUN apt-get autoremove

EXPOSE 3000
CMD REACT_APP_API=$WEB_API npm run start & npm run start-omnidesk
