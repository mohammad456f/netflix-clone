# Build stage
FROM node:20.19-alpine

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . .

RUN npm run build