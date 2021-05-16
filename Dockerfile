FROM node:lts-alpine
COPY . .
RUN npm install
RUN npm run compile
RUN npm run lint