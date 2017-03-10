FROM node:4-onbuild

COPY . .
RUN npm i

EXPOSE 3000
CMD ["npm", "start"]
