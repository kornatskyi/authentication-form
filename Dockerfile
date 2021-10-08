FROM node:16-alpine3.11

WORKDIR /code

COPY package*.json ./

RUN npm install

RUN npm install -g serve

COPY . .

RUN  npm run build

EXPOSE 5000/tcp

CMD npm start