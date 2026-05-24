FROM node:24-alpine

WORKDIR /api

COPY package.json package-lock.json ./

RUN npm install

COPY . .

EXPOSE 3009

CMD ["node", "app.js"]