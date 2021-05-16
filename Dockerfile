FROM node:lts-alpine
RUN APK add --no-cache bash
COPY . .
RUN npm install
RUN npm run compile
RUN npm run lint