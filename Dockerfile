FROM node:latest-alpine

WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)

COPY package*.json ./

RUN yarn install

# Bundle app source
COPY . .

RUN yarn run build
