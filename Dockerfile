FROM node:20.18.0-alpine3.20 as base

WORKDIR /app

# copy package config files and folders
COPY package.json ./
COPY yarn.lock ./
COPY .yarnrc.yml ./
COPY .yarn ./.yarn

# Enable for yarn to function
RUN corepack enable

# install dependencies
RUN yarn install && yarn cache clean

# copy project files and folders to frontend folder (mounted as volume during development)
COPY . .

RUN yarn build