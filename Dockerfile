FROM node:18.18.0-alpine

WORKDIR /usr/src/app

COPY package*.json ./
COPY .env ./

RUN npm install

COPY . .

EXPOSE 5000

CMD ["npx", "ts-node", "src/index.ts"]
