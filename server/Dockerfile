FROM node:12.18.1-alpine3.12

RUN npm install -g nodemon

RUN mkdir -p /app/server
WORKDIR /app/server

COPY package*.json /app/server/
COPY yarn* /app/server/

RUN yarn install

COPY . /app/server/

CMD ["nodemon", "src/index.js"]