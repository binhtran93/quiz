FROM node:18-alpine

RUN mkdir -p /home/node/backend/node_modules && chown -R node:node /home/node/backend

WORKDIR /home/node/backend

COPY backend/package*.json ./
RUN ls -l ./

RUN npm install

USER node

EXPOSE 5000

CMD [ "node_modules/.bin/ts-node-dev", "src/index.ts" ]