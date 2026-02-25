FROM node:bookworm
WORKDIR /web-server

COPY ./web-server/src src
COPY ./web-server/public public
COPY ./web-server/templates templates
COPY ./web-server/package.json package.json
COPY ./web-server/package-lock.json package-lock.json

RUN npm install
# needs to include env variable for the weather API

EXPOSE 3000
CMD ["npm", "run", "start"]