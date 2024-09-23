FROM node:18-alpine

RUN mkdir -p /home/node/frontend/node_modules && chown -R node:node /home/node/frontend

WORKDIR /home/node/frontend

COPY frontend/package*.json ./
RUN ls -l ./

RUN npm install

USER node

EXPOSE 3000

CMD [ "node_modules/.bin/react-scripts", "start" ]