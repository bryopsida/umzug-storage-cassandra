FROM node:lts-alpine
RUN apk add --no-cache bash curl
COPY . .
RUN npm install
RUN npm run compile
RUN npm run lint