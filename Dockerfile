FROM node:18 AS development

WORKDIR /home/node/app

COPY package*.json ./

RUN npm ci

COPY . .